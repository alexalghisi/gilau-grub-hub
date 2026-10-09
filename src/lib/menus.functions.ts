import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const BUCKET = "menu-photos";

function checkKey(key: string) {
  const real = process.env["ADMIN_KEY"];
  if (!real) throw new Error("Cheia de administrator nu este configurată.");
  if (key.length !== real.length) throw new Error("Cheie greșită.");
  let diff = 0;
  for (let i = 0; i < key.length; i++) diff |= key.charCodeAt(i) ^ real.charCodeAt(i);
  if (diff) throw new Error("Cheie greșită.");
}

export type PublicItem = { name: string; description: string | null; category: string | null; price: number | null; allergens: string[] };
export type PublicMenu = { id: string; menu_date: string; items: PublicItem[]; images: string[] };

export const checkAdmin = createServerFn({ method: "POST" })
  .inputValidator((d: { key: string }) => z.object({ key: z.string().min(1) }).parse(d))
  .handler(async ({ data }) => {
    checkKey(data.key);
    return { ok: true };
  });

export const extractDailyMenu = createServerFn({ method: "POST" })
  .inputValidator((d: { key: string; text: string; images: string[] }) =>
    z.object({ key: z.string(), text: z.string().max(10000), images: z.array(z.string()).max(6) }).parse(d),
  )
  .handler(async ({ data }) => {
    checkKey(data.key);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { extractMenu } = await import("./menu-ai.server");
    const parsed = data.images.map((u) => {
      const m = /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/.exec(u);
      if (!m) throw new Error("Format de imagine invalid.");
      return { mediaType: m[1]!, base64: m[2]! };
    });
    const paths: string[] = [];
    for (const img of parsed) {
      const ext = img.mediaType.split("/")[1];
      const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
      const bytes = Uint8Array.from(atob(img.base64), (c) => c.charCodeAt(0));
      const { error } = await supabaseAdmin.storage.from(BUCKET).upload(path, bytes, { contentType: img.mediaType });
      if (error) throw new Error("Nu am putut salva poza.");
      paths.push(path);
    }
    try {
      const items = await extractMenu(data.text, parsed);
      return { items, paths, error: null as string | null };
    } catch (e) {
      console.error("menu extract failed", e);
      const msg = e instanceof Error && /402|credit/i.test(e.message) ? "Creditele AI s-au terminat." : "AI-ul nu a putut citi meniul. Poți completa manual.";
      return { items: [], paths, error: msg };
    }
  });

const itemZ = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(500).nullable(),
  category: z.string().max(80).nullable(),
  price: z.number().min(0).max(10000).nullable(),
  allergens: z.array(z.string().max(40)).max(14),
});

export const saveDailyMenu = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({
      key: z.string(),
      menu_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      text: z.string().max(10000),
      items: z.array(itemZ).min(1).max(40),
      paths: z.array(z.string().max(200)).max(6),
      published: z.boolean(),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    checkKey(data.key);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("daily_menus").insert({
      menu_date: data.menu_date, source_text: data.text, items: data.items, images: data.paths, published: data.published,
    });
    if (error) throw new Error("Nu am putut salva meniul.");
    return { ok: true };
  });

export const getDailyMenus = createServerFn({ method: "GET" }).handler(async (): Promise<PublicMenu[]> => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("daily_menus")
    .select("id, menu_date, items, images")
    .eq("published", true)
    .order("menu_date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(20);
  if (error || !data) return [];
  const all = data.flatMap((m) => m.images);
  const signed = all.length ? (await supabaseAdmin.storage.from(BUCKET).createSignedUrls(all, 60 * 60 * 24 * 7)).data ?? [] : [];
  const map = new Map(signed.map((s) => [s.path, s.signedUrl]));
  return data.map((m) => ({
    id: m.id,
    menu_date: m.menu_date,
    items: (m.items as PublicItem[]) ?? [],
    images: m.images.map((p) => map.get(p)).filter((u): u is string => !!u),
  }));
});
