import { createFileRoute } from "@tanstack/react-router";

import { ServicesPage } from "@/components/landing/inner-pages";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Atelier Barbers" },
      {
        name: "description",
        content: "Classic haircuts, fades, beard trims and styling at Atelier Barbers.",
      },
    ],
  }),
  component: ServicesPage,
});
