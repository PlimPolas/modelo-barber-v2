import { createFileRoute } from "@tanstack/react-router";

import { LandingPage } from "@/components/landing/landing-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atelier Barbers — Premium Barbershop" },
      {
        name: "description",
        content:
          "Walk in. Look great. Atelier Barbers offers precision cuts, classic shaves, and grooming services for the modern gentleman.",
      },
      { property: "og:title", content: "Atelier Barbers — Premium Barbershop" },
      {
        property: "og:description",
        content: "Precision cuts, classic shaves and grooming in Melbourne CBD.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  return <LandingPage />;
}
