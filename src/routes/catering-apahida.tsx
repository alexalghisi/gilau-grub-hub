import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/AreaPage";

export const Route = createFileRoute("/catering-apahida")({
  head: () => landingHead("catering-apahida"),
  component: () => <LandingPage slug="catering-apahida" />,
});
