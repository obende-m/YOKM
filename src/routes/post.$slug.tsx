import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { createPublicServerClient } from "@/integrations/supabase/client";
import { formatDate, renderRichText, type Post } from "@/lib/cms";

const getPost = createServerFn({ method: "GET" })
  .validator((d) => z.object({ slug: z.string().max(200) }).parse(d))
  .handler(async ({ data }) => {
    const sb = createPublicServerClient();
    const { data: post, error } = await sb
      .from("posts")
      .select("*")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (post ?? null) as Post | null;
  });

export const Route = createFileRoute("/post/$slug")({
  loader: async ({ params }) => {
    const post = await getPost({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData: p }) => {
    const title = p ? `${p.seo_title || p.title} — YOKM` : "YOKM";
    const desc = p ? p.seo_description || p.excerpt || "From Yendel Ocha Kpeling Ministry." : "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(p?.cover_url && /^https?:/.test(p.cover_url)
          ? [{ property: "og:image", content: p.cover_url }]
          : []),
      ],
    };
  },
  component: PostPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-5 pt-40 pb-24">
      <h1 className="text-4xl">Not found</h1>
      <p className="mt-4 text-muted-foreground">This page is not published.</p>
      <Link to="/journal" className="rule-link mt-6 inline-block eyebrow">
        Back to the Journal →
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-2xl px-5 pt-40 pb-24">
      <p className="text-muted-foreground">
        This page could not be loaded. Please refresh to try again.
      </p>
    </div>
  ),
});

function PostPage() {
  const p = Route.useLoaderData();
  const isStory = p.kind === "story";
  return (
    <article className="pb-24">
      <header className="bg-secondary px-5 pt-32 pb-12 md:px-10 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <Link
            to={isStory ? "/stories" : "/journal"}
            className="eyebrow text-muted-foreground hover:text-foreground"
          >
            ← {isStory ? "Stories" : "Journal"}
          </Link>
          <h1 className="mt-6 text-4xl md:text-6xl">{p.title}</h1>
          <p className="eyebrow mt-6 text-accent">
            {[
              isStory ? p.person : p.author,
              isStory ? p.location : p.category,
              formatDate(p.published_at),
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      </header>
      {p.cover_url && (
        <div className="mx-auto mt-10 max-w-4xl px-5">
          <img src={p.cover_url} alt={p.title} className="w-full object-cover" />
        </div>
      )}
      <div
        className="prose-yokm mx-auto mt-12 max-w-2xl px-5"
        dangerouslySetInnerHTML={{ __html: renderRichText(p.body) }}
      />
    </article>
  );
}
