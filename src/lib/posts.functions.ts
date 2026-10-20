import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type MenuPost = { id: string; message: string | null; images: string[]; permalink: string | null; created_time: string; menu_date?: string };

// Written daily by .github/workflows/meniul-zilei.yml (Facebook page -> `meniu-data` branch).
const GITHUB_MENU_URL = "https://raw.githubusercontent.com/alexalghisi/gilau-grub-hub/meniu-data/posts.json";

async function githubPosts(): Promise<MenuPost[]> {
  try {
    const res = await fetch(GITHUB_MENU_URL, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return [];
    const data = (await res.json()) as MenuPost[];
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error("github menu", e);
    return [];
  }
}

function pub() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

async function supabasePosts(): Promise<MenuPost[]> {
  try {
    const { data, error } = await pub()
      .from("fb_posts")
      .select("id, message, images, permalink, created_time")
      .order("created_time", { ascending: false })
      .limit(30);
    if (error) {
      console.error(error.message);
      return [];
    }
    return data ?? [];
  } catch (e) {
    console.error("fb_posts", e);
    return [];
  }
}

export const getMenuPosts = createServerFn({ method: "GET" }).handler(async (): Promise<MenuPost[]> => {
  const [gh, sb] = await Promise.all([githubPosts(), supabasePosts()]);
  const byId = new Map<string, MenuPost>();
  for (const p of [...sb, ...gh]) byId.set(p.id, { ...byId.get(p.id), ...p });
  return [...byId.values()].sort((a, b) => b.created_time.localeCompare(a.created_time)).slice(0, 30);
});

export const getFbStatus = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.from("fb_connection").select("page_name, updated_at").eq("id", 1).maybeSingle();
  const { data: last } = await supabaseAdmin.from("fb_posts").select("synced_at").order("synced_at", { ascending: false }).limit(1).maybeSingle();
  return { connected: !!data, pageName: data?.page_name ?? null, lastSync: last?.synced_at ?? null };
});
