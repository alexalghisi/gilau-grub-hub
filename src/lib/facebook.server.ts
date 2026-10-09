const G = "https://graph.facebook.com/v21.0";

type FbPost = {
  id: string;
  message?: string;
  created_time: string;
  permalink_url?: string;
  full_picture?: string;
  attachments?: { data: { media?: { image?: { src: string } }; subattachments?: { data: { media?: { image?: { src: string } } }[] } }[] };
};

function imagesOf(p: FbPost): string[] {
  const out: string[] = [];
  for (const a of p.attachments?.data ?? []) {
    for (const s of a.subattachments?.data ?? []) if (s.media?.image?.src) out.push(s.media.image.src);
    if (!a.subattachments && a.media?.image?.src) out.push(a.media.image.src);
  }
  if (!out.length && p.full_picture) out.push(p.full_picture);
  return out;
}

export async function syncFacebook() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: conn } = await supabaseAdmin.from("fb_connection").select("page_id, page_token").eq("id", 1).maybeSingle();
  if (!conn) return { ok: false, error: "not_connected" };
  const fields = "message,created_time,permalink_url,full_picture,attachments{media,subattachments{media}}";
  const res = await fetch(`${G}/${conn.page_id}/posts?fields=${encodeURIComponent(fields)}&limit=25&access_token=${conn.page_token}`);
  const json = (await res.json()) as { data?: FbPost[]; error?: { message: string } };
  if (!res.ok || !json.data) {
    console.error("facebook sync failed", json.error?.message);
    return { ok: false, error: "facebook_error" };
  }
  const rows = json.data
    .filter((p) => p.message || p.full_picture)
    .map((p) => ({ id: p.id, message: p.message ?? null, images: imagesOf(p), permalink: p.permalink_url ?? null, created_time: p.created_time, synced_at: new Date().toISOString() }));
  if (rows.length) await supabaseAdmin.from("fb_posts").upsert(rows);
  return { ok: true, count: rows.length };
}

export async function exchangeAndStore(code: string, redirectUri: string) {
  const id = process.env["META_APP_ID"]!;
  const secret = process.env["META_APP_SECRET"]!;
  const t1 = (await (await fetch(`${G}/oauth/access_token?client_id=${id}&client_secret=${secret}&redirect_uri=${encodeURIComponent(redirectUri)}&code=${code}`)).json()) as { access_token?: string };
  if (!t1.access_token) throw new Error("code_exchange_failed");
  const t2 = (await (await fetch(`${G}/oauth/access_token?grant_type=fb_exchange_token&client_id=${id}&client_secret=${secret}&fb_exchange_token=${t1.access_token}`)).json()) as { access_token?: string };
  const userToken = t2.access_token ?? t1.access_token;
  const pages = (await (await fetch(`${G}/me/accounts?fields=id,name,access_token&access_token=${userToken}`)).json()) as { data?: { id: string; name: string; access_token: string }[] };
  const list = pages.data ?? [];
  const page = list.find((p) => /optim/i.test(p.name)) ?? list[0];
  if (!page) throw new Error("no_page");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await supabaseAdmin.from("fb_connection").upsert({ id: 1, page_id: page.id, page_name: page.name, page_token: page.access_token, updated_at: new Date().toISOString() });
  return page.name;
}
