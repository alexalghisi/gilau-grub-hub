import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getMenuPosts, type MenuPost } from "@/lib/posts.functions";
import { MenuCard } from "@/components/MenuCard";
import { DAILY_MENUS, SITE } from "@/lib/site";
import { pageHead } from "@/lib/seo";

const postsQ = queryOptions({ queryKey: ["menu-posts"], queryFn: () => getMenuPosts(), staleTime: 300_000 });

export const Route = createFileRoute("/meniul-zilei")({
  head: () => ({
    ...pageHead(
      "/meniul-zilei",
      "Meniul zilei Gilău & Cluj — Optim Catering",
      "Meniul zilei Optim Catering, actualizat zilnic: supe, feluri principale și deserturi cu livrare în Gilău, Florești și Cluj-Napoca.",
    ),
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Menu",
        name: "Meniul zilei — Optim Catering",
        hasMenuItem: DAILY_MENUS[0].dishes.map((d) => ({
          "@type": "MenuItem", name: d.name, description: d.note,
          offers: { "@type": "Offer", price: d.price, priceCurrency: "RON" },
        })),
      }),
    }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQ),
  component: Page,
});

function PostCard({ p, featured }: { p: MenuPost; featured?: boolean }) {
  const date = new Date(p.created_time).toLocaleDateString("ro-RO", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  return (
    <article className={`glass overflow-hidden rounded-none ${featured ? "md:grid md:grid-cols-2" : ""}`}>
      {p.images.length > 0 && (
        <div className={`grid gap-1 ${p.images.length > 1 && featured ? "grid-cols-2" : ""}`}>
          {(featured ? p.images.slice(0, 4) : p.images.slice(0, 1)).map((src, i) => (
            <img key={src} src={src} alt={`Meniul zilei Optim Catering — ${date}${i ? ` (${i + 1})` : ""}`} loading={featured ? "eager" : "lazy"} className="aspect-square h-full w-full object-cover" />
          ))}
        </div>
      )}
      <div className="p-6 md:p-8">
        <p className="eyebrow capitalize">{date}</p>
        {p.message && <p className={`mt-4 whitespace-pre-line ${featured ? "text-base" : "line-clamp-6 text-sm text-muted-foreground"}`}>{p.message}</p>}
        {p.permalink && <a href={p.permalink} target="_blank" rel="noopener" className="mt-5 inline-block text-sm text-ember underline">Vezi pe Facebook</a>}
      </div>
    </article>
  );
}

function Page() {
  const { data: posts } = useSuspenseQuery(postsQ);
  if (posts.length) {
    const [latest, ...older] = posts as [MenuPost, ...MenuPost[]];
    return (
      <div className="mx-auto max-w-6xl px-5 py-14">
        <p className="eyebrow">Preluat automat de pe Facebook</p>
        <h1 className="mt-3 text-4xl md:text-5xl">Meniul zilei</h1>
        <p className="mt-4 max-w-[55ch] text-muted-foreground">Comenzi telefonic la <a className="font-semibold text-foreground" href={SITE.phoneHref}>{SITE.phone}</a>. Livrare în Gilău, Florești și Cluj-Napoca.</p>
        <div className="mt-10"><PostCard p={latest} featured /></div>
        {older.length > 0 && <>
          <h2 className="mt-20 text-3xl">Istoric meniuri</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">{older.map((p) => <PostCard key={p.id} p={p} />)}</div>
        </>}
      </div>
    );
  }
  const [today, ...history] = DAILY_MENUS;
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="eyebrow">Actualizat zilnic</p>
      <h1 className="mt-3 text-4xl md:text-5xl">Meniul zilei</h1>
      <p className="mt-4 max-w-[55ch] text-muted-foreground">Comenzi telefonic la <a className="font-semibold text-foreground" href={SITE.phoneHref}>{SITE.phone}</a>. Livrare în Gilău, Florești și Cluj-Napoca.</p>
      <div className="mt-10 max-w-xl"><MenuCard menu={today} featured /></div>

      <h2 className="mt-20 text-3xl">Istoric meniuri</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {history.map((m) => <MenuCard key={m.date} menu={m} />)}
      </div>
    </div>
  );
}
