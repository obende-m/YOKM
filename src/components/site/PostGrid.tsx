import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { Rise } from "@/components/motion";
import { formatDate, type Post } from "@/lib/cms";

const metaFor = (kind: "journal" | "story", p: Post) =>
  kind === "story"
    ? [p.person, p.location].filter(Boolean).join(" · ")
    : [p.category, formatDate(p.published_at)].filter(Boolean).join(" · ");

/** Posts as cards: the newest one wide, the rest in a grid. */
export function PostGrid({
  kind,
  posts,
  loading,
  error,
  empty,
}: {
  kind: "journal" | "story";
  posts: Post[] | undefined;
  loading: boolean;
  error?: boolean;
  empty: ReactNode;
}) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-3" aria-busy="true" aria-label="Loading">
        {[0, 1, 2].map((i) => (
          <div key={i} className="card animate-pulse">
            <div className="aspect-[16/10] bg-blush" />
            <div className="space-y-3 p-7">
              <div className="h-3 w-24 rounded bg-blush" />
              <div className="h-6 w-3/4 rounded bg-blush" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (error)
    return (
      <p className="text-ink/65">
        This list could not be loaded. Please refresh the page to try again.
      </p>
    );
  if (!posts?.length) return <>{empty}</>;

  const cta = kind === "story" ? "Read the story" : "Read the article";

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((p, i) => {
        const lead = i === 0;
        return (
          <Rise
            key={p.id}
            delay={lead ? 0 : ((i - 1) % 3) * 0.08}
            className={lead ? "md:col-span-2 lg:col-span-3" : "h-full"}
          >
            <Link
              to="/post/$slug"
              params={{ slug: p.slug }}
              className={`card group h-full ${lead ? "lg:!grid lg:grid-cols-2" : ""}`}
            >
              <div
                className={`card-media bg-blush ${lead ? "aspect-[16/10] lg:aspect-auto lg:min-h-[24rem]" : "aspect-[16/10]"}`}
              >
                {p.cover_url ? (
                  <img src={p.cover_url} alt="" loading="lazy" className="absolute inset-0" />
                ) : (
                  <span className="absolute inset-0 grid place-items-center font-serif text-2xl text-wine/35">
                    YOKM
                  </span>
                )}
              </div>
              <div className={`flex flex-1 flex-col ${lead ? "p-8 md:p-12" : "p-6 md:p-7"}`}>
                {metaFor(kind, p) && <p className="eyebrow text-plum">{metaFor(kind, p)}</p>}
                <h2 className={`mt-3 ${lead ? "h-section" : "h-sub"}`}>{p.title}</h2>
                {p.excerpt && (
                  <p
                    className={`mt-3 flex-1 leading-relaxed text-ink/70 ${lead ? "text-[1.05rem]" : ""}`}
                  >
                    {p.excerpt}
                  </p>
                )}
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-wine">
                  {cta}
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          </Rise>
        );
      })}
    </div>
  );
}
