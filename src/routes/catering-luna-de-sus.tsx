import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/AreaPage";

export const Route = createFileRoute("/catering-luna-de-sus")({
  head: () => landingHead("catering-luna-de-sus"),
  component: () => <LandingPage slug="catering-luna-de-sus" />,
});
