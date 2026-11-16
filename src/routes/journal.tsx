import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageBanner } from "@/components/site/Blocks";
import { Cta } from "@/components/site/Cta";
import { Pending } from "@/components/site/Placeholder";
import { PostGrid } from "@/components/site/PostGrid";
import { usePosts, useSiteText } from "@/lib/cms";
import { PHOTOS } from "@/lib/photos";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Journal | Yendel Ocha Kpeling Ministry" },
      {
        name: "description",
        content:
          "Ministry updates, outreach reports, teachings and announcements from Yendel Ocha Kpeling Ministry in Jos, Plateau State, Nigeria.",
      },
      { property: "og:title", content: "Journal | Yendel Ocha Kpeling Ministry" },
      {
        property: "og:description",
        content: "Updates, outreach reports and teachings from YOKM in Jos, Nigeria.",
      },
    ],
  }),
  component: Journal,
});

function Journal() {
  const t = useSiteText();
  const posts = usePosts("journal");
  const [category, setCategory] = useState("");
  const categories = [...new Set((posts.data ?? []).map((p) => p.category).filter(Boolean))].sort();
  const shown = category ? posts.data?.filter((p) => p.category === category) : posts.data;

  return (
    <>
      <PageBanner
        eyebrow="Journal"
        title="News and teaching from the *ministry*"
        intro={t("journal_intro")}
        photo={PHOTOS.biblesRaised}
      />
      <section className="section-pad bg-paper">
        <div className="wrap">
          {categories.length > 1 && (
            <div
              className="mb-10 flex flex-wrap gap-2"
              role="group"
              aria-label="Filter by category"
            >
              {["", ...categories].map((c) => (
                <button
                  key={c || "all"}
                  type="button"
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                  className={`min-h-11 rounded-full px-5 text-sm font-medium transition-colors ${
                    category === c
                      ? "bg-wine text-paper"
                      : "bg-blush text-ink/75 hover:bg-wine/15 hover:text-wine"
                  }`}
                >
                  {c || "All articles"}
                </button>
              ))}
            </div>
          )}
          <PostGrid
            kind="journal"
            posts={shown}
            loading={posts.isLoading}
            error={posts.isError}
            empty={
              <Pending
                label="The first articles are being written"
                action={
                  <Cta to="/contact" variant="solid">
                    Contact the ministry
                  </Cta>
                }
              >
                Outreach reports, teachings and announcements will be published here as the ministry
                writes them.
              </Pending>
            }
          />
        </div>
      </section>
    </>
  );
}
