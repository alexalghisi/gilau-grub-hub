import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import daily from "@/assets/daily.jpg";
import event from "@/assets/event.jpg";
import kitchen from "@/assets/kitchen.jpg";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/despre")({
  head: () => pageHead(
    "/despre",
    "Despre Optim Catering Gilău — bucătărie & galerie",
    "Cunoaște echipa Optim Catering din Gilău, județul Cluj: bucătărie românească, ingrediente proaspete și galerie foto de la evenimente.",
  ),
  component: Page,
});

const photos = [
  { src: hero, alt: "Bufet de catering cu preparate românești" },
  { src: kitchen, alt: "Bucătar Optim Catering pregătind un preparat" },
  { src: event, alt: "Catering la o nuntă în Cluj" },
  { src: daily, alt: "Meniul zilei Optim Catering" },
];

function Page() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="eyebrow">Despre noi</p>
          <h1 className="mt-3 text-4xl md:text-5xl">Bucătărie de casă, din Gilău</h1>
        </div>
        <p className="self-end text-lg text-muted-foreground">
          Optim Catering gătește zilnic în Gilău, județul Cluj, pentru familii, firme și evenimente. Rețete românești, ingrediente proaspete și livrare la timp în Florești și Cluj-Napoca.
        </p>
      </div>
      <h2 className="mt-16 text-3xl">Galerie</h2>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {photos.map((p) => (
          <img key={p.alt} src={p.src} alt={p.alt} loading="lazy" width={1024} height={1024} className="aspect-square w-full rounded-2xl object-cover" />
        ))}
      </div>
    </div>
  );
}
