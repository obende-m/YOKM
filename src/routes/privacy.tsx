import { createFileRoute } from "@tanstack/react-router";

import { PageBanner } from "@/components/site/Blocks";
import { Pending } from "@/components/site/Placeholder";

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
      <PageBanner eyebrow="Legal" title="Privacy Policy" />
      <section className="section-pad bg-paper">
        <div className="wrap">
          <Pending label="The ministry’s privacy policy will be published here">
            This page will carry YOKM’s own privacy policy. No policy text has been written on the
            ministry’s behalf.
          </Pending>
        </div>
      </section>
    </>
  );
}
