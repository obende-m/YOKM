import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Pending } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";
import { STORIES } from "@/lib/yokm";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Stories — Yendel Ocha Kpeling Ministry" },
      {
        name: "description",
        content:
          "Stories from the widows, volunteers and community members connected with Yendel Ocha Kpeling Ministry in Jos, Plateau State, Nigeria.",
      },
      { property: "og:title", content: "Stories — Yendel Ocha Kpeling Ministry" },
      {
        property: "og:description",
        content: "Accounts shared by the widows and community YOKM serves in Jos, Nigeria.",
      },
    ],
  }),
  component: Stories,
});

function Stories() {
  return (
    <>
      <PageHero
        eyebrow="Stories"
        title="Told by the women themselves"
        intro="YOKM publishes stories only as the widows and community members choose to share them. Nothing here is written on their behalf."
      />

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        {STORIES.length === 0 ? (
          <Reveal className="max-w-2xl">
            <Pending label="No stories have been published yet">
              When the ministry gathers and approves accounts from widows, beneficiaries, volunteers
              or community members, each one will appear here with a name (or chosen anonymous
              label), photograph, location and related area of work.
            </Pending>
          </Reveal>
        ) : (
          <ul className="grid gap-px bg-border md:grid-cols-2">
            {STORIES.map((s) => (
              <Reveal as="li" key={s.slug} className="bg-background p-8">
                <p className="eyebrow text-accent">{s.location}</p>
                <h2 className="mt-4 text-2xl">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.excerpt}</p>
                <p className="mt-5 eyebrow text-muted-foreground">{s.person}</p>
              </Reveal>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
