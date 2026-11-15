import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { formatDate, type Post } from "@/lib/cms";
import { Reveal } from "./Reveal";

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
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
        {[0, 1, 2].map((i) => (
          <li key={i} className="animate-pulse">
            <div className="aspect-[4/3] bg-muted" />
            <div className="mt-5 h-3 w-24 bg-muted" />
            <div className="mt-3 h-6 w-3/4 bg-muted" />
          </li>
        ))}
      </ul>
    );
  }
  if (error)
    return (
      <p className="text-muted-foreground">
        This list could not be loaded. Please refresh the page to try again.
      </p>
    );
  if (!posts?.length) return <>{empty}</>;
  return (
    <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <Reveal as="li" key={p.id}>
          <Link to="/post/$slug" params={{ slug: p.slug }} className="group block">
            {p.cover_url && (
              <div className="aspect-[4/3] overflow-hidden rounded-[calc(var(--radius)+2px)]">
                <img
                  src={p.cover_url}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            )}
            <p className="eyebrow mt-5 text-accent">
              {kind === "story"
                ? [p.person, p.location].filter(Boolean).join(" · ")
                : [p.category, formatDate(p.published_at)].filter(Boolean).join(" · ")}
            </p>
            <h2 className="mt-3 text-2xl group-hover:text-primary">{p.title}</h2>
            {p.excerpt && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
            )}
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
