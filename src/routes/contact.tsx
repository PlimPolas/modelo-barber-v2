import { createFileRoute } from "@tanstack/react-router";

import { ContactPage } from "@/components/landing/inner-pages";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Atelier Barbers" },
      {
        name: "description",
        content: "Visit Atelier Barbers in Melbourne CBD. Walk-ins welcome.",
      },
    ],
  }),
  component: ContactPage,
});
