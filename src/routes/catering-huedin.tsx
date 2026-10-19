import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/AreaPage";

export const Route = createFileRoute("/catering-huedin")({
  head: () => landingHead("catering-huedin"),
  component: () => <LandingPage slug="catering-huedin" />,
});
