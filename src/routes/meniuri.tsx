import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/meniuri")({
  head: () => pageHead(
    "/meniuri",
    "Servicii catering Cluj: nunți, botezuri, firme | Optim",
    "Catering pentru nunți, botezuri, evenimente private și firme în Cluj și Gilău. Meniuri românești, gustări reci, feluri calde și deserturi.",
  ),
  component: Page,
});

const groups = [
  { t: "Catering evenimente", d: "Petreceri private, aniversări, cumetrii.", items: ["Platouri reci asortate", "Feluri calde la alegere", "Sarmale cu mămăligă", "Deserturi de casă"] },
  { t: "Nunți & botezuri", d: "Meniu complet, de la aperitiv la desert.", items: ["Aperitiv rece", "Peşte sau preparat intermediar", "Friptură asortată cu garnituri", "Sarmale", "Tort & prăjituri"] },
  { t: "Prânz pentru firme", d: "Abonamente zilnice pentru birouri și șantiere.", items: ["Supă / ciorbă", "Fel principal cu garnitură", "Salată", "Livrare la oră fixă"] },
];

function Page() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="eyebrow">Servicii & meniuri</p>
      <h1 className="mt-3 text-4xl md:text-5xl">Catering pentru orice ocazie</h1>
      <p className="mt-4 max-w-[60ch] text-muted-foreground">Prețurile pentru evenimente se stabilesc în funcție de meniu și numărul de invitați.</p>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {groups.map((g) => (
          <section key={g.t} className="rounded-none border border-border bg-card p-7">
            <h2 className="text-2xl">{g.t}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{g.d}</p>
            <ul className="mt-5 space-y-2 border-t border-border pt-5 text-sm">
              {g.items.map((i) => <li key={i}>— {i}</li>)}
            </ul>
          </section>
        ))}
      </div>
      <Link to="/contact" className="btn-ink mt-12">Cere o ofertă personalizată</Link>
    </div>
  );
}
