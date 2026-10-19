import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { pageHead } from "@/lib/seo";
import { LANDINGS, AREA_LINKS, SERVICE_LINKS, type Landing, type LandingSlug } from "@/lib/landing";
import { WaIcon, WhatsAppLink } from "@/components/WhatsApp";
import { AdBanner } from "@/components/Ads";
import event from "@/assets/event.jpg";
import daily from "@/assets/daily.jpg";
import hero from "@/assets/hero.jpg";
import kitchen from "@/assets/kitchen.jpg";

const IMAGES = { event, daily, hero, kitchen } as const;

/** Compatibilitate cu importurile vechi. */
export const AREAS = {
  gilau: LANDINGS["catering-gilau"],
  cluj: LANDINGS["catering-cluj"],
  floresti: LANDINGS["catering-floresti"],
};

export function landingLd(l: Landing) {
  const url = `https://optimcatering.ro/${l.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: l.name,
      serviceType: "Catering",
      url,
      description: l.description,
      areaServed: l.city
        ? { "@type": "City", name: l.city }
        : { "@type": "AdministrativeArea", name: "Județul Cluj" },
      provider: { "@id": "https://optimcatering.ro/#business", "@type": "FoodEstablishment", name: SITE.name, telephone: "+40727944844" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: l.name,
        itemListElement: l.points.map((p) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: p } })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: l.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Acasă", item: "https://optimcatering.ro/" },
        { "@type": "ListItem", position: 2, name: l.name, item: url },
      ],
    },
  ];
}

export function landingHead(slug: LandingSlug) {
  const l: Landing = LANDINGS[slug];
  return {
    ...pageHead(`/${l.slug}`, l.title, l.description),
    scripts: landingLd(l).map((d) => ({ type: "application/ld+json", children: JSON.stringify(d) })),
  };
}

/** Păstrat pentru compatibilitate. */
export const areaLd = landingLd;

export function LandingPage({ slug }: { slug: LandingSlug }) {
  return <AreaPage a={LANDINGS[slug]} />;
}

export function AreaPage({ a }: { a: Landing }) {
  const areas = AREA_LINKS.filter((o) => o.slug !== a.slug);
  const services = SERVICE_LINKS.filter((o) => o.slug !== a.slug);
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="eyebrow">{a.eyebrow}</p>
          <h1 className="mt-4 text-4xl leading-tight md:text-6xl">
            {a.h1Lead} <span className="text-gradient">{a.h1Accent}</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">{a.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppLink topic={a.wa} className="btn-ember inline-flex items-center gap-2">
              <WaIcon /> Comandă pe WhatsApp
            </WhatsAppLink>
            <a href={SITE.phoneHref} className="btn-ink">Sună {SITE.phone}</a>
            <Link to="/contact" className="btn-outline">Cere ofertă</Link>
          </div>
        </div>
        <div className="glass overflow-hidden rounded-2xl p-2">
          <img src={IMAGES[a.image]} alt={`${a.name} — Optim Catering`} width={1024} height={1024} className="aspect-[4/3] w-full rounded-2xl object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="text-2xl md:text-3xl">Ce oferim{a.city ? ` în ${a.city}` : ""}</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {a.points.map((p, i) => (
            <li key={p} className="glass rounded-2xl p-6">
              <span className="font-display text-sm text-ember">0{i + 1}</span>
              <p className="mt-3 font-semibold">{p}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 max-w-3xl space-y-4 text-muted-foreground">
          {a.body.map((p) => <p key={p}>{p}</p>)}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/meniul-zilei" className="btn-outline">Vezi meniul zilei</Link>
          <Link to="/meniuri" className="btn-outline">Servicii & meniuri</Link>
        </div>
      </section>

      <AdBanner box />

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="text-2xl md:text-3xl">Întrebări frecvente</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {a.faq.map((f) => (
            <details key={f.q} className="glass rounded-2xl p-6" open>
              <summary className="cursor-pointer font-semibold">{f.q}</summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="glass rounded-2xl p-8">
          <h2 className="text-xl">Catering în tot județul Cluj</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {areas.map((o) => (
              <a key={o.slug} href={`/${o.slug}`} className="btn-outline">{o.name}</a>
            ))}
          </div>
          <h2 className="mt-8 text-xl">Servicii</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {services.map((o) => (
              <a key={o.slug} href={`/${o.slug}`} className="btn-outline">{o.name}</a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
