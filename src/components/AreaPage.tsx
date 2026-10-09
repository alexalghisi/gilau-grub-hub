import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import hero from "@/assets/event.jpg";

export type Area = {
  slug: string;
  city: string;
  title: string;
  description: string;
  intro: string;
  points: string[];
  distance: string;
};

export const AREAS: Record<string, Area> = {
  gilau: {
    slug: "catering-gilau",
    city: "Gilău",
    title: "Catering Gilău — Meniul zilei & evenimente | Optim Catering",
    description: "Catering în Gilău: meniul zilei gătit în fiecare dimineață, prânz pentru firme, nunți, botezuri și evenimente. Bucătărie locală pe Str. Republicii 191. Sună 0727 944 844.",
    intro: "Suntem din Gilău. Bucătăria noastră este pe Str. Republicii 191, așa că mâncarea ajunge caldă, în câteva minute, oriunde în comună.",
    points: ["Meniul zilei de luni până vineri", "Ridicare personală sau livrare locală", "Mese pentru nunți, botezuri și pomeni", "Pachete de prânz pentru firmele din zonă"],
    distance: "0 km — bucătăria noastră este aici",
  },
  cluj: {
    slug: "catering-cluj",
    city: "Cluj-Napoca",
    title: "Catering Cluj-Napoca — Prânz firme & evenimente | Optim Catering",
    description: "Catering Cluj-Napoca: meniul zilei pentru birouri, catering pentru evenimente corporate, nunți și botezuri. Mâncare românească gătită zilnic. Cere ofertă: 0727 944 844.",
    intro: "Livrăm în Cluj-Napoca prânzuri calde pentru echipe și organizăm catering complet pentru evenimente, de la ședințe la nunți.",
    points: ["Prânz zilnic pentru birouri și echipe", "Catering pentru evenimente corporate", "Meniuri de nuntă și botez", "Ofertă personalizată pe număr de persoane"],
    distance: "aprox. 18 km de bucătăria din Gilău",
  },
  floresti: {
    slug: "catering-floresti",
    city: "Florești",
    title: "Catering Florești — Meniul zilei & livrare | Optim Catering",
    description: "Catering în Florești, Cluj: meniul zilei livrat cald, prânz pentru firme, catering pentru petreceri, nunți și botezuri. Optim Catering — 0727 944 844.",
    intro: "Florești este la câteva minute de bucătăria noastră. Livrăm prânzul zilei și gătim pentru evenimentele tale de familie.",
    points: ["Livrare rapidă a meniului zilei", "Catering pentru petreceri și aniversări", "Nunți, botezuri și mese festive", "Abonamente de prânz pentru firme"],
    distance: "aprox. 8 km de bucătăria din Gilău",
  },
};

export function areaLd(a: Area) {
  const url = `https://optimcatering.ro/${a.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Catering ${a.city}`,
      serviceType: "Catering",
      url,
      description: a.description,
      areaServed: { "@type": "City", name: a.city },
      provider: {
        "@type": "FoodEstablishment",
        name: SITE.name,
        telephone: SITE.phone,
        address: { "@type": "PostalAddress", streetAddress: SITE.street, addressLocality: SITE.locality, addressRegion: SITE.region, postalCode: SITE.postal, addressCountry: "RO" },
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `Servicii catering ${a.city}`,
        itemListElement: a.points.map((p) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: p } })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Acasă", item: "https://optimcatering.ro/" },
        { "@type": "ListItem", position: 2, name: `Catering ${a.city}`, item: url },
      ],
    },
  ];
}

export function AreaPage({ a }: { a: Area }) {
  const others = Object.values(AREAS).filter((o) => o.slug !== a.slug);
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="eyebrow">Zona {a.city} · {a.distance}</p>
          <h1 className="mt-4 text-4xl leading-tight md:text-6xl">
            Catering <span className="text-gradient">{a.city}</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">{a.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={SITE.phoneHref} className="btn-ink">Sună {SITE.phone}</a>
            <Link to="/contact" className="btn-outline">Cere ofertă</Link>
          </div>
        </div>
        <div className="glass overflow-hidden rounded-3xl p-2">
          <img src={hero} alt={`Catering pentru evenimente în ${a.city} — Optim Catering`} width={1024} height={1024} className="aspect-[4/3] w-full rounded-2xl object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="text-2xl md:text-3xl">Ce oferim în {a.city}</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {a.points.map((p, i) => (
            <li key={p} className="glass rounded-2xl p-6">
              <span className="font-display text-sm text-ember">0{i + 1}</span>
              <p className="mt-3 font-semibold">{p}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/meniul-zilei" className="btn-outline">Vezi meniul zilei</Link>
          <Link to="/meniuri" className="btn-outline">Servicii & meniuri</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="glass rounded-3xl p-8">
          <h2 className="text-xl">Livrăm și în zonele apropiate</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {others.map((o) => (
              <a key={o.slug} href={`/${o.slug}`} className="btn-outline">Catering {o.city}</a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
