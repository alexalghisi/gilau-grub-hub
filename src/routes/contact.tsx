import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SITE } from "@/lib/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => pageHead(
    "/contact",
    "Contact & cerere ofertă catering Cluj | Optim Catering",
    "Cere o ofertă de catering pentru nuntă, botez sau firmă în Gilău, Florești și Cluj-Napoca. Răspundem rapid telefonic sau pe email.",
  ),
  component: Page,
});

function Page() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-2">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 text-4xl md:text-5xl">Cere o ofertă de catering</h1>
        <address className="mt-8 space-y-2 not-italic text-lg">
          <p><a href={SITE.phoneHref} className="font-display text-3xl text-ember">{SITE.phone}</a></p>
          <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          <p>{SITE.street}, {SITE.locality}, județul {SITE.region}</p>
          <p className="text-muted-foreground">{SITE.hours}</p>
        </address>
        <iframe title="Hartă Optim Catering Gilău" loading="lazy" className="mt-8 aspect-[4/3] w-full rounded-none border border-border" src="https://www.google.com/maps?q=Strada%20Republicii%20191%2C%20Gil%C4%83u%2C%20Cluj&output=embed" />
      </div>
      <form
        className="space-y-4 rounded-none border border-border bg-card p-7"
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          const body = [...f.entries()].map(([k, v]) => `${k}: ${v}`).join("\n");
          window.location.href = `mailto:${SITE.email}?subject=Cerere ofertă catering&body=${encodeURIComponent(body)}`;
          setSent(true);
        }}
      >
        <input required name="Nume" placeholder="Nume" className="field" />
        <input required name="Telefon" type="tel" placeholder="Telefon" className="field" />
        <div className="grid grid-cols-2 gap-4">
          <select name="Tip eveniment" className="field">
            <option>Nuntă</option><option>Botez</option><option>Eveniment privat</option><option>Firmă / prânz zilnic</option>
          </select>
          <input name="Persoane" type="number" min={1} placeholder="Nr. persoane" className="field" />
        </div>
        <input name="Data" type="date" className="field" />
        <textarea name="Detalii" rows={4} placeholder="Detalii despre eveniment" className="field resize-none" />
        <button className="btn-ink w-full">Trimite cererea</button>
        {sent && <p className="text-sm text-ember">Mulțumim! Se deschide aplicația de email.</p>}
      </form>
    </div>
  );
}
