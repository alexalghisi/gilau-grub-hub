import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import daily from "@/assets/daily.jpg";
import event from "@/assets/event.jpg";
import { MenuCard } from "@/components/MenuCard";
import { DAILY_MENUS, SITE } from "@/lib/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "/",
      "Catering Gilău & Cluj — Meniul zilei | Optim Catering",
      "Optim Catering: catering în Gilău, Florești și Cluj-Napoca. Meniul zilei livrat cald, catering evenimente, nunți, botezuri și firme.",
    ),
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
          <p className="eyebrow mb-5">Catering Gilău · Florești · Cluj-Napoca</p>
          <h1 className="text-[clamp(2.5rem,6.5vw,4.8rem)] font-semibold leading-[1.02]">
            Catering în Gilău și Cluj, <em className="font-normal text-ember">gătit ca acasă.</em>
          </h1>
          <p className="mt-6 max-w-[48ch] text-lg text-muted-foreground">
            Meniul zilei livrat cald, catering pentru evenimente, nunți, botezuri și firme — pregătit în bucătăria noastră din Gilău.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/meniul-zilei" className="btn-ink">Vezi meniul zilei</Link>
            <Link to="/contact" className="btn-outline">Cere ofertă eveniment</Link>
          </div>
        </div>
        <div className="md:col-span-5">
          <MenuCard menu={today} featured />
          <a href={SITE.phoneHref} className="btn-ember mt-3 w-full">Comandă la {SITE.phone}</a>
        </div>
      </section>

      <img src={hero} alt="Masă de catering cu sarmale, friptură și salate — Optim Catering Gilău" width={1600} height={1008} className="mx-auto aspect-[21/9] w-full max-w-6xl object-cover md:rounded-none" />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow">Servicii</p>
        <h2 className="mt-3 text-3xl md:text-4xl">Ce pregătim pentru tine</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map((s, i) => (
            <Link key={s.t} to={s.to} className="group rounded-none border border-border p-7 transition glass hover:-translate-y-1 hover:border-ember hover:shadow-[var(--glow)]">
              <span className="text-xs text-ember">0{i + 1}</span>
              <h3 className="mt-3 text-2xl">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="glass text-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2">
          <img src={daily} alt="Meniul zilei: ciorbă, pui la cuptor cu piure și salată" width={1024} height={1024} loading="lazy" className="aspect-square w-full rounded-none object-cover" />
          <div>
            <p className="eyebrow !text-ember-soft">Catering Cluj</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Livrăm în toată zona metropolitană Cluj</h2>
            <p className="mt-5 opacity-75">
              Din Gilău până în Florești și Cluj-Napoca, aducem mâncare caldă la birou, acasă sau la eveniment. Meniul se schimbă zilnic și îl publicăm aici și pe Facebook.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {SITE.areas.map((a) => (
                <li key={a} className="rounded-none border border-border px-3 py-1 text-sm">Catering {a}</li>
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
          <Link to="/contact" className="btn-ink mt-8">Cere ofertă</Link>
        </div>
        <img src={event} alt="Catering pentru nunți și evenimente în Cluj" width={1024} height={1024} loading="lazy" className="aspect-[4/3] w-full rounded-none object-cover" />
      </section>
    </>
  );
}
