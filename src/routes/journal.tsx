import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Pending } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Journal — Yendel Ocha Kpeling Ministry" },
      {
        name: "description",
        content:
          "Ministry updates, outreach reports, teachings and announcements from Yendel Ocha Kpeling Ministry in Jos, Plateau State, Nigeria.",
      },
      { property: "og:title", content: "Journal — Yendel Ocha Kpeling Ministry" },
      {
        property: "og:description",
        content: "Updates, outreach reports and teachings from YOKM in Jos, Nigeria.",
      },
    ],
  }),
  component: Journal,
});

function Journal() {
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Updates from the ministry"
        intro="Outreach reports, teachings, announcements and community updates will be published here."
      />
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <Reveal className="max-w-2xl">
          <Pending label="No articles have been published yet">
            Nothing is published here until the ministry writes it. Articles will carry a cover
            image, author, date, category and full text.
          </Pending>
        </Reveal>
      </section>
    </>
  );
}
