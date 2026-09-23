import { createFileRoute } from "@tanstack/react-router";

import { LandingPage } from "@/components/landing/landing-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Golden Hands — Premium Barbershop" },
      {
        name: "description",
        content:
          "Cortes, barba e cuidados masculinos em Lisboa. Golden Hands offers precision cuts, classic shaves, and grooming services for the modern gentleman.",
      },
      { property: "og:title", content: "Golden Hands — Premium Barbershop" },
      {
        property: "og:description",
        content: "Precision cuts, classic shaves and grooming in Lisboa.",
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
