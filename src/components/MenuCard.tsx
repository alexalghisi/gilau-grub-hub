import { fmtDate, type DailyMenu } from "@/lib/site";

export function MenuCard({ menu, featured }: { menu: DailyMenu; featured?: boolean }) {
  return (
    <article className={featured ? "rounded-none glass p-7 shadow-[var(--glow)]" : "rounded-none border border-border bg-card p-6"}>
      <div className="flex items-center justify-between gap-3">
        <span className={featured ? "eyebrow" : "eyebrow"}>{featured ? "Oferta zilei" : "Meniu"}</span>
        <time dateTime={menu.date} className="text-xs capitalize opacity-70">{fmtDate(menu.date)}</time>
      </div>
      <ul className="mt-5 space-y-4">
        {menu.dishes.map((d) => (
          <li key={d.name} className="flex items-baseline gap-3">
            <div>
              <p className={featured ? "font-display text-xl" : "font-display text-lg"}>{d.name}</p>
              {d.note && <p className="text-xs opacity-60">{d.note}</p>}
            </div>
            <span className="flex-1 -translate-y-1 border-b border-dotted border-current opacity-25" />
            <span className={featured ? "text-sm font-semibold text-ember" : "text-sm font-semibold text-ember"}>{d.price} lei</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
