import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/components/landing/inner-pages";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Golden Hands" },
      {
        name: "description",
        content: "Our craft, our shop, and the philosophy behind Golden Hands in Lisboa.",
      },
    ],
  }),
  component: AboutPage,
});
