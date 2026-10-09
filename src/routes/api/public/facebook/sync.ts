import { createFileRoute } from "@tanstack/react-router";
import { syncFacebook } from "@/lib/facebook.server";

// Idempotent: only re-reads the connected page's own posts. Called by the scheduled job.
export const Route = createFileRoute("/api/public/facebook/sync")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!request.headers.get("authorization")) return new Response("Unauthorized", { status: 401 });
        const r = await syncFacebook();
        return Response.json({ ok: r.ok, count: "count" in r ? r.count : 0 });
      },
    },
  },
});
