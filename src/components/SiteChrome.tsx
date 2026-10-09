import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

const nav = [
  { to: "/meniul-zilei", label: "Meniul zilei" },
  { to: "/meniuri", label: "Servicii & meniuri" },
  { to: "/despre", label: "Despre & galerie" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 glass">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold">Optim</span>
          <span className="eyebrow">Catering</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-muted-foreground transition-colors hover:text-ember" activeProps={{ className: "text-foreground font-semibold" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <a href={SITE.phoneHref} className="btn-ink !px-4 !py-2 text-sm">Sună acum</a>
      </div>
      <nav className="flex gap-5 overflow-x-auto px-5 pb-3 text-sm md:hidden">
        {nav.map((n) => (
          <Link key={n.to} to={n.to} className="whitespace-nowrap text-muted-foreground" activeProps={{ className: "text-ember font-semibold" }}>
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
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
      <p className="border-t border-ink-foreground/10 py-5 text-center text-xs opacity-50">© {new Date().getFullYear()} Optim Catering · Catering Gilău · Catering Cluj</p>
    </footer>
  );
}

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background md:hidden">
      <a href={SITE.phoneHref} className="py-4 text-center text-sm font-semibold">Sună</a>
      <Link to="/contact" className="bg-ember py-4 text-center text-sm font-semibold text-primary-foreground">Cere ofertă</Link>
    </div>
  );
}
