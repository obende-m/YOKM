import { createFileRoute } from "@tanstack/react-router";

import { PageBanner } from "@/components/site/Blocks";
import { Pending } from "@/components/site/Placeholder";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Terms of Use | Yendel Ocha Kpeling Ministry" },
      {
        name: "description",
        content: "Terms of use for the Yendel Ocha Kpeling Ministry website.",
      },
      { property: "og:title", content: "Terms of Use | Yendel Ocha Kpeling Ministry" },
      {
        property: "og:description",
        content: "Terms of use for the YOKM website.",
      },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <>
      <PageBanner eyebrow="Legal" title="Terms of Use" />
      <section className="section-pad bg-paper">
        <div className="wrap">
          <Pending label="The ministry’s terms of use will be published here">
            This page will carry YOKM’s own terms of use once they are provided.
          </Pending>
        </div>
      </section>
    </>
  );
}
