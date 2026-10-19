import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/AreaPage";

export const Route = createFileRoute("/catering-botez-cluj")({
  head: () => landingHead("catering-botez-cluj"),
  component: () => <LandingPage slug="catering-botez-cluj" />,
});
