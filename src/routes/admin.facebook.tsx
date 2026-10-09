import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getFbStatus } from "@/lib/posts.functions";

const statusQ = queryOptions({ queryKey: ["fb-status"], queryFn: () => getFbStatus() });

export const Route = createFileRoute("/admin/facebook")({
  validateSearch: (s: Record<string, unknown>) => ({ status: typeof s["status"] === "string" ? s["status"] : undefined }),
  loader: ({ context }) => context.queryClient.ensureQueryData(statusQ),
  head: () => ({
    meta: [
      { title: "Conectare Facebook — Optim Catering" },
      { name: "description", content: "Administrare conexiune Facebook pentru meniul zilei." },
      { property: "og:title", content: "Conectare Facebook — Optim Catering" },
      { property: "og:description", content: "Administrare conexiune Facebook." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const { data } = useSuspenseQuery(statusQ);
  const { status } = Route.useSearch();
  const [key, setKey] = useState("");
  return (
    <div className="mx-auto max-w-lg px-5 py-20">
      <p className="eyebrow">Administrare</p>
      <h1 className="mt-3 text-3xl md:text-4xl">Conectare pagina Facebook</h1>
      {status === "ok" && <p className="mt-6 rounded-xl border border-ember p-4 text-sm">Pagina a fost conectată. Meniul se sincronizează automat.</p>}
      {status === "eroare" && <p className="mt-6 rounded-xl border border-destructive p-4 text-sm">Conectarea nu a reușit. Încearcă din nou.</p>}
      <div className="glass mt-8 rounded-2xl p-6 text-sm">
        <p><span className="text-muted-foreground">Stare:</span> {data.connected ? `Conectat — ${data.pageName}` : "Neconectat"}</p>
        <p className="mt-2"><span className="text-muted-foreground">Ultima sincronizare:</span> {data.lastSync ? new Date(data.lastSync).toLocaleString("ro-RO") : "—"}</p>
      </div>
      <form className="mt-8 space-y-4" action="/api/public/facebook/login" method="get">
        <label className="block text-sm font-semibold" htmlFor="key">Cheia de administrator</label>
        <input id="key" name="key" type="password" className="field" value={key} onChange={(e) => setKey(e.target.value)} required />
        <button className="btn-ink w-full" type="submit">Conectează cu Facebook</button>
      </form>
      <p className="mt-6 text-xs text-muted-foreground">Administratorul paginii Optim Catering aprobă accesul în fereastra Facebook. Site-ul citește doar postările publice ale paginii.</p>
    </div>
  );
}
