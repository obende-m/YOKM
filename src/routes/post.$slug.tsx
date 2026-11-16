import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { motion, useScroll } from "motion/react";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { RevealImage, SplitText } from "@/components/motion";
import { Cta } from "@/components/site/Cta";
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
    <section className="flex min-h-[100svh] items-end bg-paper">
      <div className="wrap pb-24 pt-40">
        <p className="eyebrow text-plum">Not published</p>
        <h1 className="display mt-8 max-w-[12ch]">
          This article is <span className="accent-word">not available</span>
        </h1>
        <p className="lede mt-8 max-w-lg text-ink/70">
          It may have been moved or taken down. The rest of the journal is still here.
        </p>
        <div className="mt-10">
          <Cta to="/journal" variant="solid">
            Read the journal
          </Cta>
        </div>
      </div>
    </section>
  ),
  errorComponent: () => (
    <section className="flex min-h-[80svh] items-end bg-paper">
      <div className="wrap pb-24 pt-40">
        <h1 className="h-section max-w-[16ch]">This article could not be loaded</h1>
        <p className="mt-6 text-ink/70">Please refresh the page to try again.</p>
      </div>
    </section>
  ),
});

function PostPage() {
  const p = Route.useLoaderData();
  const isStory = p.kind === "story";
  const { scrollYProgress } = useScroll();
  const meta = [
    isStory ? p.person : p.category,
    isStory ? p.location : p.author,
    formatDate(p.published_at),
  ].filter(Boolean);

  return (
    <article>
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-sky"
      />
      <header className="bg-paper text-ink">
        <div className="wrap pb-16 pt-32 md:pb-20 md:pt-44">
          <Link to={isStory ? "/stories" : "/journal"} className="text-link text-ink/60">
            <span>{isStory ? "All stories" : "The journal"}</span>
            <ArrowLeft aria-hidden className="order-first h-4 w-4" strokeWidth={1.6} />
          </Link>
          <div className="mx-auto mt-12 max-w-4xl text-center md:mt-16">
            {meta.length > 0 && <p className="eyebrow enter-fade text-plum">{meta.join(" · ")}</p>}
            <SplitText
              as="h1"
              text={p.title}
              trigger="mount"
              delay={0.1}
              stagger={0.05}
              className="mt-8 font-serif text-[clamp(2.6rem,6vw,5.6rem)] font-light leading-[0.98] tracking-[-0.02em]"
            />
            {p.excerpt && (
              <p
                className="lede enter-up mx-auto mt-8 max-w-2xl text-ink/70"
                style={{ animationDelay: "0.5s" }}
              >
                {p.excerpt}
              </p>
            )}
          </div>
        </div>
      </header>
      {p.cover_url && (
        <div className="bg-paper">
          <div className="wrap">
            <RevealImage
              photo={{ src: p.cover_url, width: 1600, height: 1000, alt: p.title }}
              priority
              className="aspect-[16/10] w-full md:aspect-[2/1]"
            />
          </div>
        </div>
      )}
      <div className="bg-paper pb-28 pt-16 md:pb-40 md:pt-24">
        <div
          className="prose-yokm mx-auto max-w-[44rem] px-5"
          data-dropcap
          dangerouslySetInnerHTML={{ __html: renderRichText(p.body) }}
        />
        <div className="mx-auto mt-20 flex max-w-[44rem] flex-col gap-6 border-t border-ink/15 px-5 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-xl italic text-ink/70">Yendel Ocha Kpeling Ministry</p>
          <Cta to={isStory ? "/stories" : "/journal"} variant="outline">
            {isStory ? "Read more stories" : "Read more articles"}
          </Cta>
        </div>
      </div>
    </article>
  );
}
