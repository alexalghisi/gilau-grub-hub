import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/AreaPage";

export const Route = createFileRoute("/catering-nunta-cluj")({
  head: () => landingHead("catering-nunta-cluj"),
  component: () => <LandingPage slug="catering-nunta-cluj" />,
});
