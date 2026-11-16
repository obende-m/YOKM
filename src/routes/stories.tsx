import { createFileRoute } from "@tanstack/react-router";

import { Rise } from "@/components/motion";
import { PageBanner, SectionHead } from "@/components/site/Blocks";
import { Cta } from "@/components/site/Cta";
import { Pending } from "@/components/site/Placeholder";
import { PostGrid } from "@/components/site/PostGrid";
import { usePosts, useSiteText } from "@/lib/cms";
import { PHOTOS } from "@/lib/photos";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Stories | Yendel Ocha Kpeling Ministry" },
      {
        name: "description",
        content:
          "Stories from the widows, volunteers and community members connected with Yendel Ocha Kpeling Ministry in Jos, Plateau State, Nigeria.",
      },
      { property: "og:title", content: "Stories | Yendel Ocha Kpeling Ministry" },
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
      <PageBanner
        eyebrow="Stories"
        title="Told by the women *themselves*"
        intro={t("stories_intro")}
        photo={PHOTOS.twoWomen}
      />
      <section className="section-pad bg-paper">
        <div className="wrap">
          <PostGrid
            kind="story"
            posts={posts.data}
            loading={posts.isLoading}
            error={posts.isError}
            empty={
              <Pending
                label="The first stories are being gathered with care"
                action={
                  <Cta to="/contact" variant="solid">
                    Share a story with us
                  </Cta>
                }
              >
                An account appears here only when the person who gives it chooses to share it, under
                her own name or anonymously.
              </Pending>
            }
          />
        </div>
      </section>
      <section className="section-pad bg-blush">
        <div className="wrap">
          <SectionHead eyebrow="How stories are shared" title="Every story is *hers*" center />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                k: "Shared by choice",
                v: "Stories appear only when the person chooses to share them.",
              },
              {
                k: "In her own words",
                v: "Nothing here is written on anyone’s behalf.",
              },
              {
                k: "Consent on record",
                v: "A story cannot be published without recorded consent.",
              },
            ].map(({ k, v }, i) => (
              <Rise key={k} delay={i * 0.08} className="card p-8 text-center">
                <span aria-hidden className="mx-auto block h-1 w-10 rounded-full bg-plum" />
                <h3 className="h-sub mt-6">{k}</h3>
                <p className="mt-3 leading-relaxed text-ink/70">{v}</p>
              </Rise>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
