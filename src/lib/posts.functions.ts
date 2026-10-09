import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type MenuPost = { id: string; message: string | null; images: string[]; permalink: string | null; created_time: string };

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

export const getMenuPosts = createServerFn({ method: "GET" }).handler(async (): Promise<MenuPost[]> => {
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
});

export const getFbStatus = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.from("fb_connection").select("page_name, updated_at").eq("id", 1).maybeSingle();
  const { data: last } = await supabaseAdmin.from("fb_posts").select("synced_at").order("synced_at", { ascending: false }).limit(1).maybeSingle();
  return { connected: !!data, pageName: data?.page_name ?? null, lastSync: last?.synced_at ?? null };
});
