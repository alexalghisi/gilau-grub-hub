import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/AreaPage";

export const Route = createFileRoute("/catering-craciun-revelion-cluj")({
  head: () => landingHead("catering-craciun-revelion-cluj"),
  component: () => <LandingPage slug="catering-craciun-revelion-cluj" />,
});
