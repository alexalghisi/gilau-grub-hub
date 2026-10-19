import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/AreaPage";

export const Route = createFileRoute("/catering-firme-cluj")({
  head: () => landingHead("catering-firme-cluj"),
  component: () => <LandingPage slug="catering-firme-cluj" />,
});
