import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageHero } from "@/components/site/PageHero";
import { Pending } from "@/components/site/Placeholder";
import { PostGrid } from "@/components/site/PostGrid";
import { Reveal } from "@/components/site/Reveal";
import { usePosts, useSiteText } from "@/lib/cms";

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
  const t = useSiteText();
  const posts = usePosts("journal");
  const [category, setCategory] = useState("");
  const categories = [...new Set((posts.data ?? []).map((p) => p.category).filter(Boolean))].sort();
  const shown = category ? posts.data?.filter((p) => p.category === category) : posts.data;
  return (
    <>
      <PageHero eyebrow="Journal" title="Updates from the ministry" intro={t("journal_intro")} />
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        {categories.length > 1 && (
          <div className="mb-12 flex flex-wrap gap-2" aria-label="Filter by category">
            {["", ...categories].map((c) => (
              <button
                key={c || "all"}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={`border px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary"
                }`}
              >
                {c || "All"}
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
            <Reveal className="max-w-2xl">
              <Pending label="No articles have been published yet">
                Updates from the ministry will appear here as they are written.
              </Pending>
            </Reveal>
          }
        />
      </section>
    </>
  );
}
