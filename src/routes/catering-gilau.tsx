import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/AreaPage";

export const Route = createFileRoute("/catering-gilau")({
  head: () => landingHead("catering-gilau"),
  component: () => <LandingPage slug="catering-gilau" />,
});
