import { createFileRoute } from "@tanstack/react-router";
import { exchangeAndStore, syncFacebook } from "@/lib/facebook.server";

export const Route = createFileRoute("/api/public/facebook/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const code = url.searchParams.get("code");
        const state = url.searchParams.get("state");
        const cookie = request.headers.get("cookie") ?? "";
        const saved = /(?:^|;\s*)fb_state=([^;]+)/.exec(cookie)?.[1];
        const back = (q: string) => new Response(null, { status: 302, headers: { Location: `/admin/facebook?${q}`, "Set-Cookie": "fb_state=; Path=/; Max-Age=0" } });
        if (!code || !state || state !== saved) return back("status=eroare");
        try {
          await exchangeAndStore(code, `${url.origin}/api/public/facebook/callback`);
          await syncFacebook();
          return back("status=ok");
        } catch (e) {
          console.error("facebook connect failed", e);
          return back("status=eroare");
        }
      },
    },
  },
});
