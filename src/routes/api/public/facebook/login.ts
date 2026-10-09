import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/facebook/login")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const key = url.searchParams.get("key");
        if (!key || key !== process.env["ADMIN_KEY"]) return new Response("Cheie greșită", { status: 403 });
        const appId = process.env["META_APP_ID"];
        if (!appId) return new Response("Aplicația Meta nu este configurată", { status: 500 });
        const state = crypto.randomUUID();
        const redirect = `${url.origin}/api/public/facebook/callback`;
        const fb = new URL("https://www.facebook.com/v21.0/dialog/oauth");
        fb.searchParams.set("client_id", appId);
        fb.searchParams.set("redirect_uri", redirect);
        fb.searchParams.set("state", state);
        fb.searchParams.set("scope", "pages_show_list,pages_read_engagement,pages_read_user_content");
        return new Response(null, {
          status: 302,
          headers: {
            Location: fb.toString(),
            "Set-Cookie": `fb_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
          },
        });
      },
    },
  },
});
