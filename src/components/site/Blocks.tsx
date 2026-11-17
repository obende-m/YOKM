import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import { Rise, SplitText } from "@/components/motion";
import type { Photo } from "@/lib/photos";

type Tone = "light" | "dark";

/**
 * The heading that opens a section: a small label, a serif title and a short line,
 * with an optional "see all" link aligned to the right on wide screens.
 */
export function SectionHead({
  eyebrow,
  title,
  intro,
  action,
  tone = "light",
  center = false,
  className = "",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  action?: { to: string; label: string; hash?: string };
  tone?: Tone;
  center?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`flex flex-col gap-6 ${
        center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      } ${className}`}
    >
      <div className={center ? "max-w-2xl" : "max-w-2xl"}>
        <p className={`pill ${dark ? "bg-paper/10 text-sky" : "bg-plum/10 text-plum"}`}>
          {eyebrow}
        </p>
        <SplitText
          text={title}
          className="h-section mt-5"
          accentClass={`accent-word ${dark ? "text-sky" : "text-plum"}`}
        />
        {intro && (
          <p
            className={`mt-4 text-[1.05rem] leading-relaxed ${dark ? "text-paper/72" : "text-ink/70"}`}
          >
            {intro}
          </p>
        )}
      </div>
      {action && (
        <Link
          to={action.to as "/"}
          hash={action.hash}
          className={`text-link shrink-0 ${dark ? "text-paper" : "text-wine"}`}
        >
          <span>{action.label}</span>
          <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.8} />
        </Link>
      )}
    </div>
  );
}

/**
 * The opening of every inner page: a rounded photographic panel with a soft wine
 * overlay, a breadcrumb, the page title and an introduction.
 */
export function PageBanner({
  eyebrow,
  title,
  intro,
  photo,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  photo?: Photo;
  children?: ReactNode;
}) {
  return (
    <section className="bg-paper pt-[6.5rem] md:pt-[8.5rem]">
      <div className="wrap">
        <div className="relative isolate flex min-h-[22rem] items-end overflow-hidden rounded-[var(--r-panel)] bg-wine text-paper md:min-h-[min(60svh,34rem)]">
          {photo && (
            <>
              <img
                src={photo.src}
                srcSet={photo.srcSet}
                sizes="(min-width: 1440px) 1340px, 100vw"
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                fetchPriority="high"
                style={{ objectPosition: photo.position ?? "top" }}
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--wine-deep)_92%,transparent)_0%,color-mix(in_srgb,var(--wine)_70%,transparent)_48%,color-mix(in_srgb,var(--wine)_20%,transparent)_100%)]"
              />
            </>
          )}
          <div className="w-full p-7 md:p-12 lg:p-16">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-paper/70">
                <li>
                  <Link to="/" className="hover:text-paper">
                    Home
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li aria-current="page" className="text-paper">
                  {eyebrow}
                </li>
              </ol>
            </nav>
            <h1 className="display mt-6 max-w-[16ch]">
              <Accented text={title} />
            </h1>
            {intro && <p className="lede mt-6 max-w-2xl text-paper/85">{intro}</p>}
            {children && <div className="mt-8">{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

/** An image-topped card that links somewhere: photograph, title, line, arrow. */
export function PhotoCard({
  to,
  hash,
  photo,
  title,
  text,
  meta,
  badge,
  delay = 0,
  aspect = "aspect-[4/3]",
  cta = "Find out more",
}: {
  to: string;
  hash?: string;
  photo: Photo;
  title: string;
  text?: string;
  meta?: string;
  badge?: string;
  delay?: number;
  aspect?: string;
  cta?: string;
}) {
  return (
    <Rise delay={delay} className="h-full">
      <Link to={to as "/"} hash={hash} className="card group h-full">
        <div className={`card-media ${aspect}`}>
          <img
            src={photo.src}
            srcSet={photo.srcSet}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            width={photo.width}
            height={photo.height}
          />
          {badge && (
            <span className="pill absolute left-4 top-4 bg-paper/95 text-wine shadow-sm">
              {badge}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6 md:p-7">
          {meta && <p className="eyebrow text-plum">{meta}</p>}
          <h3 className={`h-sub ${meta ? "mt-3" : ""}`}>{title}</h3>
          {text && <p className="mt-3 flex-1 leading-relaxed text-ink/70">{text}</p>}
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-wine">
            {cta}
            <ArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
              strokeWidth={1.8}
            />
          </span>
        </div>
      </Link>
    </Rise>
  );
}

/** Renders a title, setting words wrapped in *asterisks* in the italic accent. */
function Accented({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") ? (
          <span key={i} className="accent-word text-sky">
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
