import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/AreaPage";

export const Route = createFileRoute("/catering-turda")({
  head: () => landingHead("catering-turda"),
  component: () => <LandingPage slug="catering-turda" />,
});
