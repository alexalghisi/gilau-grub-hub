import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/AreaPage";

export const Route = createFileRoute("/catering-floresti")({
  head: () => landingHead("catering-floresti"),
  component: () => <LandingPage slug="catering-floresti" />,
});
