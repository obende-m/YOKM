import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Pending } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Yendel Ocha Kpeling Ministry" },
      {
        name: "description",
        content: "Terms of use for the Yendel Ocha Kpeling Ministry website.",
      },
      { property: "og:title", content: "Terms of Use — Yendel Ocha Kpeling Ministry" },
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
      <PageHero eyebrow="Legal" title="Terms of Use" />
      <section className="mx-auto max-w-3xl px-5 py-20 md:px-10">
        <Reveal>
          <Pending label="Official terms of use pending">
            This page will carry YOKM&rsquo;s own terms of use once they are provided.
          </Pending>
        </Reveal>
      </section>
    </>
  );
}
