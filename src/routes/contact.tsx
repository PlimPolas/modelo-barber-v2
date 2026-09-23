import { createFileRoute } from "@tanstack/react-router";

import { ContactPage } from "@/components/landing/inner-pages";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Golden Hands" },
      {
        name: "description",
        content: "Visit Golden Hands in Lisboa. Agendamento online disponível.",
      },
    ],
  }),
  component: ContactPage,
});
