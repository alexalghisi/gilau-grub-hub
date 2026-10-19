import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { openCookieSettings } from "@/components/CookieConsent";
import { WaIcon, WhatsAppLink } from "@/components/WhatsApp";
import { AREA_LINKS, SERVICE_LINKS } from "@/lib/landing";

const nav = [
  { to: "/meniul-zilei", label: "Meniul zilei", short: "Meniul zilei" },
  { to: "/meniuri", label: "Servicii & meniuri", short: "Servicii" },
  { to: "/despre", label: "Despre & galerie", short: "Galerie" },
  { to: "/contact", label: "Contact", short: "Contact" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-5 md:flex md:justify-between md:py-4">
        <Link to="/" className="flex min-w-0 items-baseline gap-2">
          <span className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">Optim<span className="text-ember">.</span></span>
          <span className="eyebrow truncate !text-[0.62rem] md:!text-[0.72rem]">Catering</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-muted-foreground transition-colors hover:text-ember" activeProps={{ className: "text-foreground font-semibold" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <WhatsAppLink className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:opacity-90 md:h-10 md:w-10" label="Comandă pe WhatsApp">
            <WaIcon className="h-5 w-5" />
          </WhatsAppLink>
          <a href={SITE.phoneHref} className="btn-ink shrink-0 !px-4 !py-2 text-sm">Sună acum</a>
        </div>
      </div>
      <nav className="grid grid-cols-4 border-t border-border text-center text-[0.8rem] md:hidden">
        {nav.map((n) => (
          <Link key={n.to} to={n.to} className="truncate px-1 py-2.5 text-muted-foreground" activeProps={{ className: "text-ember font-semibold" }}>
            {n.short}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="glass text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl">Optim Catering</p>
          <p className="mt-3 text-sm opacity-70">Catering în Cluj-Napoca, Florești, Gilău și tot județul Cluj. Meniul zilei, platouri, evenimente, nunți, botezuri și prânz pentru firme.</p>
        </div>
        <address className="not-italic text-sm leading-7 opacity-80">
          <p className="eyebrow !text-ember-soft mb-2">Contact</p>
          {SITE.locality}, jud. {SITE.region}<br />
          <WhatsAppLink className="inline-flex items-center gap-1.5 font-semibold hover:text-ember">
            <WaIcon className="h-4 w-4 text-[#25D366]" /> {SITE.phone} · WhatsApp
          </WhatsAppLink><br />
          <a href={SITE.phoneHref}>Sună: {SITE.phone}</a><br />
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
          {SITE.hours}
        </address>
        <div className="text-sm leading-7 opacity-80">
          <p className="eyebrow !text-ember-soft mb-2">Zone de livrare</p>
          <p className="flex flex-col">
            {AREA_LINKS.map((l) => (
              <a key={l.slug} href={`/${l.slug}`} className="hover:text-ember">{l.name}</a>
            ))}
          </p>
        </div>
        <div className="text-sm leading-7 opacity-80">
          <p className="eyebrow !text-ember-soft mb-2">Servicii catering</p>
          <p className="flex flex-col">
            <Link to="/meniul-zilei" className="hover:text-ember">Meniul zilei Cluj</Link>
            {SERVICE_LINKS.map((l) => (
              <a key={l.slug} href={`/${l.slug}`} className="hover:text-ember">{l.name}</a>
            ))}
          </p>
          <p className="mt-4"><a href={SITE.facebook} target="_blank" rel="noopener" className="underline">Urmărește-ne pe Facebook</a></p>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10 px-5 py-5 text-center text-xs">
        <p className="opacity-50">© {new Date().getFullYear()} Optim Catering · Catering Cluj · Catering Florești · Catering Gilău</p>
        <button type="button" onClick={openCookieSettings} className="mt-2 underline opacity-60 hover:opacity-100 md:hidden">Setări cookie-uri</button>
      </div>
    </footer>
  );
}

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-background/90 backdrop-blur-md md:hidden">
      <a href={SITE.phoneHref} className="py-4 text-center text-sm font-semibold">Sună</a>
      <WhatsAppLink className="flex items-center justify-center gap-1.5 bg-[#25D366] py-4 text-center text-sm font-semibold text-white">
        <WaIcon className="h-4 w-4" /> WhatsApp
      </WhatsAppLink>
      <Link to="/contact" className="bg-ember py-4 text-center text-sm font-semibold text-primary-foreground">Cere ofertă</Link>
    </div>
  );
}
