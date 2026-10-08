import { createFileRoute } from "@tanstack/react-router";
import { MenuCard } from "@/components/MenuCard";
import { DAILY_MENUS, SITE } from "@/lib/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/meniul-zilei")({
  head: () => ({
    ...pageHead(
      "/meniul-zilei",
      "Meniul zilei Gilău & Cluj — Optim Catering",
      "Meniul zilei Optim Catering, actualizat zilnic: supe, feluri principale și deserturi cu livrare în Gilău, Florești și Cluj-Napoca.",
    ),
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Menu",
        name: "Meniul zilei — Optim Catering",
        hasMenuItem: DAILY_MENUS[0].dishes.map((d) => ({
          "@type": "MenuItem", name: d.name, description: d.note,
          offers: { "@type": "Offer", price: d.price, priceCurrency: "RON" },
        })),
      }),
    }],
  }),
  component: Page,
});

function Page() {
  const [today, ...history] = DAILY_MENUS;
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="eyebrow">Actualizat zilnic</p>
      <h1 className="mt-3 text-4xl md:text-5xl">Meniul zilei</h1>
      <p className="mt-4 max-w-[55ch] text-muted-foreground">Comenzi telefonic la <a className="font-semibold text-foreground" href={SITE.phoneHref}>{SITE.phone}</a>. Livrare în Gilău, Florești și Cluj-Napoca.</p>
      <div className="mt-10 max-w-xl"><MenuCard menu={today} featured /></div>

      <h2 className="mt-20 text-3xl">Istoric meniuri</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {history.map((m) => <MenuCard key={m.date} menu={m} />)}
      </div>
    </div>
  );
}
