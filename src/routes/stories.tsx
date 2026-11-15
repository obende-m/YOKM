import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Pending } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";
import { PostGrid } from "@/components/site/PostGrid";
import { usePosts, useSiteText } from "@/lib/cms";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
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
  const t = useSiteText();
  const posts = usePosts("story");
  return (
    <>
      <PageHero eyebrow="Stories" title="Told by the women themselves" intro={t("stories_intro")} />

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <PostGrid
          kind="story"
          posts={posts.data}
          loading={posts.isLoading}
          error={posts.isError}
          empty={
            <Reveal className="max-w-2xl">
              <Pending label="No stories have been published yet">
                When the ministry gathers and approves accounts from widows, beneficiaries,
                volunteers or community members, each one will appear here with a name (or chosen
                anonymous label), photograph, location and related area of work.
              </Pending>
            </Reveal>
          }
        />
      </section>
    </>
  );
}
