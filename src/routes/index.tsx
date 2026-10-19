import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import daily from "@/assets/daily.jpg";
import event from "@/assets/event.jpg";
import { MenuCard } from "@/components/MenuCard";
import { DAILY_MENUS, SITE } from "@/lib/site";
import { pageHead } from "@/lib/seo";
import { AREA_LINKS, SERVICE_LINKS } from "@/lib/landing";
import { WaIcon, WhatsAppLink } from "@/components/WhatsApp";
import { AdBanner } from "@/components/Ads";

const faq = [
  { q: "Unde livrați catering în județul Cluj?", a: "Livrăm meniul zilei în Gilău, Florești, Luna de Sus și Cluj-Napoca, iar catering pentru evenimente facem în tot județul Cluj: Apahida, Baciu, Săvădisla, Huedin, Turda și altele." },
  { q: "Cum comand rapid?", a: "Apasă butonul WhatsApp și mesajul se scrie singur, sau sună la 0727 944 844. Îți confirmăm comanda pe loc." },
  { q: "Faceți catering pentru nunți, botezuri și firme?", a: "Da: nunți și botezuri de la 20 la 300 de invitați, platouri aperitive, prânz zilnic la birou și petreceri de firmă, cu factură." },
  { q: "Cât costă meniul zilei?", a: "Ciorba pornește de la aproximativ 15 lei, iar felul principal de la 28–32 lei. Meniul se schimbă zilnic." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead(
      "/",
      "Catering Cluj, Florești & Gilău — Meniul zilei, nunți, firme | Optim Catering",
      "Optim Catering: catering în Cluj-Napoca, Florești, Gilău și tot județul Cluj. Meniul zilei livrat cald, platouri, catering evenimente, nunți, botezuri și firme. Comandă pe WhatsApp: 0727 944 844.",
    ),
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }),
    }],
  }),
  component: Home,
});

const services = [
  { t: "Meniul zilei", d: "Prânz cald gătit zilnic, livrat în Gilău, Florești și Cluj-Napoca.", to: "/meniul-zilei" },
  { t: "Catering evenimente", d: "Aniversări, petreceri private și evenimente de firmă, de la 20 la 300 de invitați.", to: "/meniuri" },
  { t: "Nunți & botezuri", d: "Meniuri complete, gustări reci, feluri calde și deserturi, cu servire.", to: "/meniuri" },
] as const;

function Home() {
  const [today] = DAILY_MENUS;
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-12 md:grid-cols-12 md:pt-20">
        <div className="md:col-span-7">
          <p className="eyebrow mb-5">Catering Cluj · Florești · Gilău</p>
          <h1 className="text-[clamp(2.5rem,6.5vw,4.8rem)] font-semibold leading-[1.02]">
            Catering în Cluj și Gilău, <em className="font-normal text-ember">gătit ca acasă.</em>
          </h1>
          <p className="mt-6 max-w-[48ch] text-lg text-muted-foreground">
            Meniul zilei livrat cald, platouri, catering pentru evenimente, nunți, botezuri și firme — pregătit în bucătăria noastră din Gilău, pentru tot județul Cluj.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/meniul-zilei" className="btn-ink">Vezi meniul zilei</Link>
            <Link to="/contact" className="btn-outline">Cere ofertă eveniment</Link>
          </div>
        </div>
        <div className="md:col-span-5">
          <MenuCard menu={today} featured />
          <WhatsAppLink topic="meniul zilei: " className="btn-ember mt-3 inline-flex w-full items-center justify-center gap-2">
            <WaIcon /> Comandă pe WhatsApp · {SITE.phone}
          </WhatsAppLink>
        </div>
      </section>

      <img src={hero} alt="Masă de catering cu sarmale, friptură și salate — Optim Catering Cluj" width={1600} height={1008} className="mx-auto aspect-[21/9] w-full max-w-6xl rounded-2xl object-cover" />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow">Servicii</p>
        <h2 className="mt-3 text-3xl md:text-4xl">Ce pregătim pentru tine</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map((s, i) => (
            <Link key={s.t} to={s.to} className="group rounded-2xl border border-border p-7 transition glass hover:-translate-y-1 hover:border-ember hover:shadow-[var(--glow)]">
              <span className="text-xs text-ember">0{i + 1}</span>
              <h3 className="mt-3 text-2xl">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {SERVICE_LINKS.map((l) => (
            <a key={l.slug} href={`/${l.slug}`} className="btn-outline">{l.name}</a>
          ))}
        </div>
      </section>

      <AdBanner />

      <section className="glass text-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2">
          <img src={daily} alt="Meniul zilei: ciorbă, pui la cuptor cu piure și salată" width={1024} height={1024} loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />
          <div>
            <p className="eyebrow">Catering Cluj</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Livrăm în tot județul Cluj</h2>
            <p className="mt-5 opacity-75">
              Din Gilău până în Florești, Cluj-Napoca și Apahida, aducem mâncare caldă la birou, acasă sau la eveniment. Meniul se schimbă zilnic și îl publicăm aici și pe Facebook.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {AREA_LINKS.map((a) => (
                <li key={a.slug}><a href={`/${a.slug}`} className="block rounded-2xl border border-border px-3 py-1 text-sm hover:border-ember hover:text-ember">{a.name}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2">
        <div>
          <p className="eyebrow">Evenimente</p>
          <h2 className="mt-3 text-3xl md:text-4xl">Nuntă, botez sau eveniment de firmă?</h2>
          <p className="mt-5 text-muted-foreground">Spune-ne data și numărul de invitați. Îți trimitem un meniu și o ofertă personalizată.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-ink">Cere ofertă</Link>
            <WhatsAppLink topic="catering pentru eveniment: data …, nr. invitați …" className="btn-outline inline-flex items-center gap-2">
              <WaIcon /> Ofertă pe WhatsApp
            </WhatsAppLink>
          </div>
        </div>
        <img src={event} alt="Catering pentru nunți și evenimente în Cluj" width={1024} height={1024} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <p className="eyebrow">Întrebări frecvente</p>
        <h2 className="mt-3 text-3xl md:text-4xl">Catering în Cluj — pe scurt</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faq.map((f) => (
            <details key={f.q} className="glass rounded-2xl p-6" open>
              <summary className="cursor-pointer font-semibold">{f.q}</summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
