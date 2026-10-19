import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/AreaPage";

export const Route = createFileRoute("/catering-savadisla")({
  head: () => landingHead("catering-savadisla"),
  component: () => <LandingPage slug="catering-savadisla" />,
});
