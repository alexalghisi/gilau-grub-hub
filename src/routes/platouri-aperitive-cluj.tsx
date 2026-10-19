import { createFileRoute } from "@tanstack/react-router";
import { LandingPage, landingHead } from "@/components/AreaPage";

export const Route = createFileRoute("/platouri-aperitive-cluj")({
  head: () => landingHead("platouri-aperitive-cluj"),
  component: () => <LandingPage slug="platouri-aperitive-cluj" />,
});
