import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { openCookieSettings } from "@/components/CookieConsent";

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
        <a href={SITE.phoneHref} className="btn-ink shrink-0 !px-4 !py-2 text-sm">Sună acum</a>
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
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">Optim Catering</p>
          <p className="mt-3 text-sm opacity-70">Catering în Gilău, Florești și Cluj-Napoca. Meniul zilei, evenimente, nunți, botezuri și prânz pentru firme.</p>
        </div>
        <address className="not-italic text-sm leading-7 opacity-80">
          <p className="eyebrow !text-ember-soft mb-2">Contact</p>
          {SITE.locality}, jud. {SITE.region}<br />
          <a href={SITE.phoneHref}>{SITE.phone}</a><br />
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
          {SITE.hours}
        </address>
        <div className="text-sm leading-7 opacity-80">
          <p className="eyebrow !text-ember-soft mb-2">Zone de livrare</p>
          {SITE.areas.join(" · ")}
          <p className="mt-3 flex flex-col">
            <Link to="/catering-gilau" className="hover:text-ember">Catering Gilău</Link>
            <Link to="/catering-cluj" className="hover:text-ember">Catering Cluj-Napoca</Link>
            <Link to="/catering-floresti" className="hover:text-ember">Catering Florești</Link>
          </p>
          <p className="mt-4"><a href={SITE.facebook} target="_blank" rel="noopener" className="underline">Urmărește-ne pe Facebook</a></p>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10 px-5 py-5 text-center text-xs">
        <p className="opacity-50">© {new Date().getFullYear()} Optim Catering · Catering Gilău · Catering Cluj</p>
        <button type="button" onClick={openCookieSettings} className="mt-2 underline opacity-60 hover:opacity-100 md:hidden">Setări cookie-uri</button>
      </div>
    </footer>
  );
}

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background/90 backdrop-blur-md md:hidden">
      <a href={SITE.phoneHref} className="py-4 text-center text-sm font-semibold">Sună</a>
      <Link to="/contact" className="bg-ember py-4 text-center text-sm font-semibold text-primary-foreground">Cere ofertă</Link>
    </div>
  );
}
