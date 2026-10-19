import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/AreaPage";

export const Route = createFileRoute("/catering-baciu")({
  head: () => landingHead("catering-baciu"),
  component: () => <LandingPage slug="catering-baciu" />,
});
