import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/AreaPage";

export const Route = createFileRoute("/catering-cluj")({
  head: () => landingHead("catering-cluj"),
  component: () => <LandingPage slug="catering-cluj" />,
});
