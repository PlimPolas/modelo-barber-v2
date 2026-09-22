import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/components/landing/inner-pages";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Atelier Barbers" },
      {
        name: "description",
        content: "Our craft, our shop, and the philosophy behind Atelier Barbers in Melbourne CBD.",
      },
    ],
  }),
  component: AboutPage,
});
