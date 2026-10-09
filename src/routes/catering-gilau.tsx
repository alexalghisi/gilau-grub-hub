import { createFileRoute } from "@tanstack/react-router";
import { AREAS, AreaPage, areaLd } from "@/components/AreaPage";
import { pageHead } from "@/lib/seo";

const a = AREAS.gilau;

export const Route = createFileRoute("/catering-gilau")({
  head: () => ({
    ...pageHead("/catering-gilau", a.title, a.description),
    scripts: areaLd(a).map((d) => ({ type: "application/ld+json", children: JSON.stringify(d) })),
  }),
  component: () => <AreaPage a={a} />,
});
