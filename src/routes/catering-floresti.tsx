import { createFileRoute } from "@tanstack/react-router";
import { AREAS, AreaPage, areaLd } from "@/components/AreaPage";
import { pageHead } from "@/lib/seo";

const a = AREAS.floresti;

export const Route = createFileRoute("/catering-floresti")({
  head: () => ({
    ...pageHead("/catering-floresti", a.title, a.description),
    scripts: areaLd(a).map((d) => ({ type: "application/ld+json", children: JSON.stringify(d) })),
  }),
  component: () => <AreaPage a={a} />,
});
