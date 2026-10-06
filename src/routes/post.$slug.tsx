import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

import type { Database } from "@/integrations/supabase/types";
import { formatDate, renderRichText, type Post } from "@/lib/cms";

const getPost = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ slug: z.string().max(200) }).parse(d))
  .handler(async ({ data }) => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const sb = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });
    const { data: post } = await sb.from("posts").select("*").eq("slug", data.slug).eq("published", true).maybeSingle();
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
      ],
    };
  },
  component: PostPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-5 pt-40 pb-24">
      <h1 className="text-4xl">Not found</h1>
      <p className="mt-4 text-muted-foreground">This page is not published.</p>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-2xl px-5 pt-40 pb-24">
      <p className="text-muted-foreground">This page could not be loaded. Please try again.</p>
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
          <Link to={isStory ? "/stories" : "/journal"} className="eyebrow text-muted-foreground hover:text-foreground">
            ← {isStory ? "Stories" : "Journal"}
          </Link>
          <h1 className="mt-6 text-4xl md:text-6xl">{p.title}</h1>
          <p className="eyebrow mt-6 text-accent">
            {[isStory ? p.person : p.author, isStory ? p.location : p.category, formatDate(p.published_at)].filter(Boolean).join(" · ")}
          </p>
        </div>
      </header>
      {p.cover_url && (
        <div className="mx-auto mt-10 max-w-4xl px-5">
          <img src={p.cover_url} alt={p.title} className="w-full object-cover" />
        </div>
      )}
      <div className="prose-yokm mx-auto mt-12 max-w-2xl px-5" dangerouslySetInnerHTML={{ __html: renderRichText(p.body) }} />
    </article>
  );
}
