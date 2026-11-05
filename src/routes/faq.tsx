import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { FaqSection } from "@/components/site/Faq";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Heron AI" },
      { name: "description", content: "Answers to common questions about Heron AI, how it reviews models and proposes edits for your approval." },
      { property: "og:title", content: "FAQ — Heron AI" },
      { property: "og:description", content: "Common questions about Heron AI, its capabilities and how it works." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (<><Header /><main><FaqSection asPage /></main></>),
});
