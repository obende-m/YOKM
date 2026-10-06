import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { formatDate, usePosts } from "@/lib/cms";
import { Reveal } from "./Reveal";

export function PostGrid({ kind, empty }: { kind: "journal" | "story"; empty: ReactNode }) {
  const { data, isLoading } = usePosts(kind);
  if (isLoading) return <div className="h-40" />;
  if (!data?.length) return <>{empty}</>;
  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((p) => (
        <Reveal as="li" key={p.id}>
          <Link to="/post/$slug" params={{ slug: p.slug }} className="group block">
            {p.cover_url && (
              <div className="aspect-[4/3] overflow-hidden rounded-[calc(var(--radius)+2px)]">
                <img src={p.cover_url} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
            )}
            <p className="eyebrow mt-5 text-accent">
              {kind === "story" ? [p.person, p.location].filter(Boolean).join(" · ") : [p.category, formatDate(p.published_at)].filter(Boolean).join(" · ")}
            </p>
            <h2 className="mt-3 text-2xl group-hover:text-primary">{p.title}</h2>
            {p.excerpt && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>}
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
