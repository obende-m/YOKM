import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Pending } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Privacy Policy — Yendel Ocha Kpeling Ministry" },
      {
        name: "description",
        content: "Privacy policy for the Yendel Ocha Kpeling Ministry website.",
      },
      { property: "og:title", content: "Privacy Policy — Yendel Ocha Kpeling Ministry" },
      {
        property: "og:description",
        content: "Privacy policy for the YOKM website.",
      },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="mx-auto max-w-3xl px-5 py-20 md:px-10">
        <Reveal>
          <Pending label="Official privacy policy text pending">
            This page will carry YOKM&rsquo;s own privacy policy. No policy text has been written on
            the ministry&rsquo;s behalf.
          </Pending>
        </Reveal>
      </section>
    </>
  );
}
