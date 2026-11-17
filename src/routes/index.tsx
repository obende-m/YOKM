import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Pause, Play } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { RevealImage, Rise, SplitText } from "@/components/motion";
import AccordionGallery from "@/components/reactbits/AccordionGallery.jsx";
import { PhotoCard, SectionHead } from "@/components/site/Blocks";
import { Cta } from "@/components/site/Cta";
import {
  contactChannels,
  formatDate,
  socialLinks,
  usePageItems,
  usePosts,
  usePublished,
  useSettings,
  useSiteText,
  useUpcomingEvents,
  type MediaRow,
  type MetricRow,
} from "@/lib/cms";
import { PHOTOS, pick } from "@/lib/photos";
import { ORG } from "@/lib/yokm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Yendel Ocha Kpeling Ministry (YOKM) | Awake Oh Ye Widows" },
      {
        name: "description",
        content:
          "YOKM is a Christian ministry in Jos, Plateau State, Nigeria, reaching widows in all aspects of life and equipping them to discover purpose, develop their gifts and become independent.",
      },
      { property: "og:title", content: "Yendel Ocha Kpeling Ministry | Awake Oh Ye Widows" },
      {
        property: "og:description",
        content:
          "A Christian ministry in Jos, Nigeria, equipping widows to discover God's purpose, develop their gifts and become independent.",
      },
    ],
  }),
  component: Home,
});

/* 1. Hero: a full-bleed slideshow of the ministry's own photographs. */
function Hero() {
  const t = useSiteText();
  const { data: settings = {} } = useSettings();
  const { data: media = [] } = usePublished<MediaRow>("media");
  const socials = socialLinks(settings);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const custom = t("home_hero_image");
  const featured = media.filter((m) => m.featured && m.url);
  // Hand-picked, high-resolution frames; a photograph set in Page Text leads the set.
  const slides: { src: string; srcSet?: string; alt: string }[] = [
    ...(custom ? [{ src: custom, alt: "" }] : []),
    PHOTOS.giftSmiles,
    PHOTOS.crowdTrees,
    PHOTOS.biblesRaised,
    PHOTOS.groupTrees,
  ].slice(0, 4);
  const count = slides.length;
  const thumbs = (featured.length >= 3 ? featured.slice(0, 3) : []).map((m) => m.url);
  const proof =
    thumbs.length === 3
      ? thumbs
      : [PHOTOS.seatedRow.src, PHOTOS.twoWomen.src, PHOTOS.addressing.src];

  useEffect(() => {
    if (reduced || paused || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => window.clearInterval(id);
  }, [reduced, paused, count]);

  const slide = slides[index % count]!;

  return (
    <section
      className="relative isolate overflow-hidden bg-wine-deep pt-[4.75rem] text-paper md:flex md:min-h-[100svh] md:items-center md:pt-0"
      aria-roledescription="carousel"
      aria-label="Photographs from the ministry"
    >
      <div className="relative -z-20 aspect-[4/3] w-full overflow-hidden md:absolute md:inset-0 md:aspect-auto">
        <AnimatePresence initial={false}>
          <motion.img
            key={slide.src}
            src={slide.src}
            srcSet={slide.srcSet}
            sizes="100vw"
            alt={slide.alt}
            {...(index === 0 ? { fetchPriority: "high" as const } : {})}
            initial={{ opacity: 0, scale: reduced ? 1 : 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.4 }, scale: { duration: 8, ease: "linear" } }}
            className="absolute inset-0 h-full w-full object-cover md:object-[60%_center]"
          />
        </AnimatePresence>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,var(--wine-deep),transparent)] md:hidden"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden md:block bg-[linear-gradient(90deg,color-mix(in_srgb,var(--wine-deep)_92%,transparent)_0%,color-mix(in_srgb,var(--wine-deep)_60%,transparent)_40%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 hidden md:block h-56 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--wine-deep)_75%,transparent),transparent)]"
      />

      <div className="wrap relative pb-6 pt-2 md:pb-52 md:pt-44">
        <div className="max-w-3xl">
          <p className="pill enter-fade bg-paper/12 text-paper backdrop-blur-sm">
            {ORG.shortLocation}
          </p>
          <SplitText
            as="h1"
            text={t("home_hero_title")}
            trigger="mount"
            accentLast
            accentClass="accent-word text-sky"
            delay={0.2}
            stagger={0.08}
            className="display-xl mt-7 max-w-[11ch]"
          />
          <p
            className="lede enter-up mt-7 max-w-xl text-paper/88"
            style={{ animationDelay: "0.7s" }}
          >
            {t("home_hero_intro")}
          </p>
          <div
            className="enter-up mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.85s" }}
          >
            <Cta to="/about" variant="accent" orb>
              Read our story
            </Cta>
            <Cta to="/donate" variant="outline-light">
              Donate to YOKM
            </Cta>
          </div>
          {media.length > 0 && (
            <Link
              to="/gallery"
              className="enter-fade group mt-10 hidden items-center gap-4 sm:inline-flex"
              style={{ animationDelay: "1.1s" }}
            >
              <span className="flex -space-x-3">
                {proof.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-11 w-11 rounded-full border-2 border-wine-deep object-cover"
                  />
                ))}
              </span>
              <span className="text-[0.95rem] leading-snug text-paper/90 group-hover:underline">
                Photographs from the ministry&rsquo;s work
              </span>
            </Link>
          )}
        </div>
      </div>

      {socials.length > 0 && (
        <ul className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow block py-1 text-paper/70 [writing-mode:vertical-rl] hover:text-sky"
              >
                {s.label}
              </a>
            </li>
          ))}
          <li aria-hidden className="h-16 w-px bg-paper/30" />
        </ul>
      )}

      {count > 1 && (
        <div className="wrap flex items-center gap-1 pb-20 md:absolute md:bottom-44 md:right-10 md:w-auto md:pb-0 xl:right-16">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Show photograph ${i + 1} of ${count}`}
              aria-current={i === index % count ? "true" : undefined}
              onClick={() => setIndex(i)}
              className="grid h-11 w-9 place-items-center"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-500 ${
                  i === index % count ? "w-7 bg-sky" : "w-2 bg-paper/50 hover:bg-paper"
                }`}
              />
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play the slideshow" : "Pause the slideshow"}
            className="ml-1 grid h-11 w-11 place-items-center rounded-full bg-paper/12 text-paper hover:bg-paper/20"
          >
            {paused ? (
              <Play aria-hidden className="h-4 w-4" />
            ) : (
              <Pause aria-hidden className="h-4 w-4" />
            )}
          </button>
        </div>
      )}

      <svg
        aria-hidden
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -bottom-px h-[60px] w-full text-paper md:h-[110px]"
      >
        <path
          d="M0 120V60C240 108 480 120 720 96C960 72 1200 18 1440 30V120Z"
          fill="currentColor"
        />
      </svg>
    </section>
  );
}

/* 2. Three doors into the site: photograph cards overlapping the hero's curve. */
function Doors() {
  const doors = [
    {
      to: "/our-work",
      photo: PHOTOS.handingGift,
      title: "Reaching widows in every part of life",
      cta: "See our work",
    },
    {
      to: "/stories",
      photo: PHOTOS.twoWomen,
      title: "Stories told in their own words",
      cta: "Read the stories",
    },
    {
      to: "/get-involved",
      photo: PHOTOS.standingPortrait,
      title: "Give, volunteer, partner or pray",
      cta: "Get involved",
    },
  ];
  return (
    <section className="relative z-10 bg-paper">
      <div className="wrap">
        <div className="grid gap-4 pt-12 md:grid-cols-3 md:gap-5 md:pt-16">
          {doors.map((d, i) => (
            <Rise key={d.to} delay={i * 0.08}>
              <Link
                to={d.to as "/"}
                className="card group relative aspect-[16/11] justify-end text-paper md:aspect-[4/3.4]"
              >
                <img
                  src={d.photo.src}
                  srcSet={d.photo.srcSet}
                  sizes="(min-width: 768px) 30vw, 100vw"
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--wine-deep)_92%,transparent)_10%,color-mix(in_srgb,var(--wine-deep)_35%,transparent)_60%,transparent)]"
                />
                <span className="relative p-6 md:p-7">
                  <span className="block font-serif text-[1.55rem] leading-tight md:text-[1.7rem]">
                    {d.title}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-wine transition-colors group-hover:bg-sky group-hover:text-wine-deep">
                    {d.cta}
                    <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                  </span>
                </span>
              </Link>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 3. Who we are: words beside a pair of overlapping photographs. */
function About() {
  const t = useSiteText();
  return (
    <section className="section-pad bg-paper">
      <div className="wrap grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="pill bg-plum/10 text-plum">About YOKM</p>
          <SplitText
            text={t("home_heart_heading")}
            className="h-section mt-5 max-w-[20ch]"
            stagger={0.03}
          />
          <Rise>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-ink/72">{ORG.positioning}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { k: "Based in", v: ORG.shortLocation },
                { k: "Registered", v: "Incorporated Trustee, March 2015" },
              ].map(({ k, v }) => (
                <li key={k} className="rounded-2xl border-l-4 border-plum bg-blush/70 p-4 pl-5">
                  <span className="eyebrow block text-plum">{k}</span>
                  <span className="mt-1 block text-[0.95rem] leading-snug">{v}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <Cta to="/about" variant="solid">
                Read who we are
              </Cta>
            </div>
          </Rise>
        </div>
        <div className="relative pb-16 pr-8 sm:pr-16">
          <RevealImage
            photo={pick(t("home_vision_image"), PHOTOS.seatedRow)}
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="aspect-[5/4] w-full shadow-[0_30px_60px_-30px_rgb(59_15_40_/_0.5)]"
          />
          <RevealImage
            photo={PHOTOS.seatedDrums}
            sizes="(min-width: 1024px) 22vw, 50vw"
            delay={0.2}
            from="left"
            className="!absolute bottom-0 right-0 aspect-square w-[46%] border-[6px] border-paper shadow-[0_24px_48px_-24px_rgb(59_15_40_/_0.6)]"
          />
          <Rise
            delay={0.3}
            className="absolute bottom-6 left-4 max-w-[15rem] rounded-2xl bg-wine p-5 text-paper shadow-xl sm:left-6"
          >
            <p className="eyebrow text-sky">Our motto</p>
            <p className="mt-2 font-serif text-xl italic leading-snug">{ORG.motto}</p>
          </Rise>
        </div>
      </div>
    </section>
  );
}

/* 4. Vision: three numbered cards. */
function Vision() {
  const vision = usePageItems("vision");
  if (vision.length === 0) return null;
  return (
    <section className="section-pad bg-blush">
      <div className="wrap">
        <SectionHead
          eyebrow="Our vision"
          title="What the ministry *hopes for* every widow"
          action={{ to: "/about", hash: "vision", label: "Read the vision" }}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {vision.map((v, i) => (
            <Rise key={v.id} delay={i * 0.08} className="card border-t-4 border-plum p-8 md:p-9">
              <h3 className="h-sub">{v.label}</h3>
              <p className="mt-3 leading-relaxed text-ink/70">{v.body}</p>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 5. Mission: ten commitments as a grid of compact cards. */
function Mission() {
  const mission = usePageItems("mission");
  if (mission.length === 0) return null;
  return (
    <section className="section-pad bg-wine text-paper">
      <div className="wrap">
        <SectionHead
          tone="dark"
          eyebrow="Our mission"
          title={`${mission.length === 10 ? "Ten" : String(mission.length)} commitments, each resting on *Scripture*`}
          intro="The ministry’s own words, with the passage each one rests on."
          action={{ to: "/about", hash: "mission", label: "Read the full mission" }}
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {mission.map((m, i) => (
            <Rise
              as="li"
              key={m.id}
              delay={(i % 5) * 0.06}
              className="card card-sky flex flex-col p-6"
            >
              <span aria-hidden className="block h-1 w-8 rounded-full bg-sky" />
              <h3 className="mt-5 font-serif text-[1.25rem] font-medium leading-tight">
                {m.label}
              </h3>
              <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-paper/72">{m.body}</p>
              {m.scripture && <p className="eyebrow mt-5 text-[0.65rem] text-sky">{m.scripture}</p>}
            </Rise>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* 6. Areas of work: a photograph card for each. */
function Work() {
  const t = useSiteText();
  const areas = usePageItems("work_area");
  if (areas.length === 0) return null;
  const photos = [
    PHOTOS.worship,
    PHOTOS.biblesRaised,
    PHOTOS.addressing,
    PHOTOS.seatedHall,
    PHOTOS.groupTrees,
    PHOTOS.giftGiven,
  ];
  return (
    <section className="section-pad bg-paper">
      <div className="wrap">
        <SectionHead
          eyebrow="Our work"
          title={t("home_work_heading")}
          action={{ to: "/our-work", label: "See all our work" }}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a, i) => (
            <PhotoCard
              key={a.id}
              to="/our-work"
              hash={`area-${i + 1}`}
              photo={photos[i % photos.length]!}
              title={a.label}
              text={a.body}
              meta={a.scripture}
              delay={(i % 3) * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* 7. Moments: the accordion gallery of the ministry's photographs. */
function Moments() {
  const { data: media = [] } = usePublished<MediaRow>("media");
  const cms = media.filter((m) => m.url).slice(0, 6);
  const items =
    cms.length >= 4
      ? cms.map((m) => ({ image: m.url, label: m.caption || "", alt: m.alt || m.caption || "" }))
      : [
          { image: PHOTOS.worship.src, label: "Worship", alt: PHOTOS.worship.alt },
          {
            image: PHOTOS.biblesRaised.src,
            label: "Bible distribution",
            alt: PHOTOS.biblesRaised.alt,
          },
          { image: PHOTOS.giftSmiles.src, label: "Christmas giveaway", alt: PHOTOS.giftSmiles.alt },
          { image: PHOTOS.teachingCircle.src, label: "Teaching", alt: PHOTOS.teachingCircle.alt },
          { image: PHOTOS.crowdTrees.src, label: "Gathering together", alt: PHOTOS.crowdTrees.alt },
          { image: PHOTOS.seatedDrums.src, label: "Fellowship", alt: PHOTOS.seatedDrums.alt },
        ];
  return (
    <section className="section-pad overflow-hidden bg-night text-paper">
      <div className="wrap">
        <SectionHead
          tone="dark"
          eyebrow="Gallery"
          title="Moments from the *ministry*"
          intro="Teaching, worship and care among widows in Jos and beyond."
          action={{ to: "/gallery", label: "View the gallery" }}
        />
        <Rise className="mt-12">
          <AccordionGallery
            items={items}
            defaultIndex={2}
            height={480}
            radius={20}
            gap={12}
            expandRatio={0.5}
            tilt={6}
            accentColor="#5cb8ee"
            overlayColor="#0c2a45"
            grayscale={false}
          />
        </Rise>
      </div>
    </section>
  );
}

/* 8. A short scripture band. */
function Scripture() {
  return (
    <section className="bg-paper py-20 md:py-24">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[var(--r-panel)] bg-blush px-7 py-14 text-center md:px-16 md:py-20">
          <p className="pill bg-plum/10 text-plum">The calling behind the name</p>
          <blockquote className="mx-auto mt-7 max-w-4xl">
            <SplitText
              as="p"
              text="“Awake thou that sleepest, and arise from the dead, and Christ shall give thee *light.*”"
              accentClass="accent-word text-plum"
              stagger={0.04}
              className="font-serif text-[clamp(1.8rem,3.6vw,3.2rem)] leading-[1.15] tracking-[-0.02em]"
            />
            <footer className="eyebrow mt-6 text-ink/60">Ephesians 5:14 · also Isaiah 52:1</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

/* 9. Numbers the ministry has published (only when there are any). */
function Impact() {
  const { data = [] } = usePublished<MetricRow>("impact_metrics");
  if (data.length === 0) return null;
  return (
    <section className="bg-paper pb-20">
      <div className="wrap grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((m, i) => (
          <Rise key={m.id} delay={i * 0.06} className="card p-7">
            <p className="font-serif text-5xl text-wine">{m.value}</p>
            <p className="mt-3 font-medium">
              {m.title}
              {m.year ? ` (${m.year})` : ""}
            </p>
            {m.description && <p className="mt-1 text-sm text-ink/60">{m.description}</p>}
          </Rise>
        ))}
      </div>
    </section>
  );
}

/* 10. Stories and journal: the latest posts as cards. */
function Latest() {
  const stories = usePosts("story", 3);
  const journal = usePosts("journal", 3);
  const posts = [...(stories.data ?? []), ...(journal.data ?? [])]
    .sort((a, b) => (b.published_at ?? "").localeCompare(a.published_at ?? ""))
    .slice(0, 3);
  const loaded = stories.isSuccess && journal.isSuccess;
  return (
    <section className="bg-paper pb-20 md:pb-28">
      <div className="wrap">
        <SectionHead
          eyebrow="Stories & news"
          title="From the *ministry*"
          action={{ to: "/journal", label: "All articles" }}
        />
        {posts.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((p, i) => (
              <Rise key={p.id} delay={i * 0.08} className="h-full">
                <Link to="/post/$slug" params={{ slug: p.slug }} className="card group h-full">
                  <div className="card-media aspect-[16/10] bg-blush">
                    {p.cover_url && <img src={p.cover_url} alt="" loading="lazy" />}
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <p className="eyebrow text-plum">
                      {[
                        p.kind === "story" ? "Story" : p.category || "Journal",
                        formatDate(p.published_at),
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    <h3 className="h-sub mt-3">{p.title}</h3>
                    {p.excerpt && <p className="mt-3 flex-1 text-ink/70">{p.excerpt}</p>}
                  </div>
                </Link>
              </Rise>
            ))}
          </div>
        ) : (
          loaded && (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {[
                {
                  to: "/stories",
                  title: "Stories are being gathered",
                  text: "Accounts will appear here when the women who give them choose to share them.",
                  cta: "Visit the stories page",
                },
                {
                  to: "/journal",
                  title: "The journal is being prepared",
                  text: "Outreach reports, teachings and announcements will be published here.",
                  cta: "Visit the journal",
                },
              ].map((c, i) => (
                <Rise key={c.to} delay={i * 0.08} className="h-full">
                  <Link to={c.to as "/"} className="card group h-full border-t-4 border-plum p-7">
                    <span>
                      <span className="h-sub block">{c.title}</span>
                      <span className="mt-2 block text-ink/70">{c.text}</span>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-wine">
                        {c.cta}
                        <ArrowRight
                          aria-hidden
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </span>
                  </Link>
                </Rise>
              ))}
            </div>
          )
        )}
      </div>
    </section>
  );
}

/* 11. Upcoming events (only when there are any). */
function Events() {
  const { data = [] } = useUpcomingEvents(3);
  if (data.length === 0) return null;
  return (
    <section className="section-pad bg-blush">
      <div className="wrap">
        <SectionHead
          eyebrow="Events"
          title="Upcoming *gatherings*"
          action={{ to: "/our-work", hash: "events", label: "All events" }}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {data.map((e, i) => {
            const d = e.event_date ? new Date(`${e.event_date}T00:00:00Z`) : null;
            return (
              <Rise key={e.id} delay={i * 0.08} className="card !flex-row gap-5 p-6">
                <span className="grid h-20 w-20 shrink-0 place-content-center rounded-2xl bg-wine text-center text-paper">
                  <span className="font-serif text-3xl leading-none">
                    {d ? d.getUTCDate() : ""}
                  </span>
                  <span className="eyebrow mt-1 text-[0.6rem] text-sky">
                    {d ? d.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" }) : ""}
                  </span>
                </span>
                <span>
                  <span className="h-sub block text-[1.3rem]">{e.title}</span>
                  <span className="mt-2 block text-sm text-ink/65">
                    {[e.event_time, e.location].filter(Boolean).join(" · ")}
                  </span>
                </span>
              </Rise>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* 12. Give and get in touch: a call to action beside the contact details. */
function GiveAndContact() {
  const t = useSiteText();
  const { data: settings = {} } = useSettings();
  const channels = contactChannels(settings);
  return (
    <section className="bg-paper pb-20 md:pb-28">
      <div className="wrap grid gap-6 lg:grid-cols-12">
        <div className="relative isolate overflow-hidden rounded-[var(--r-panel)] bg-wine p-8 text-paper md:p-12 lg:col-span-7">
          <RevealImage
            photo={pick(t("home_give_image"), PHOTOS.crowdTrees, "")}
            square
            zoom={false}
            sizes="60vw"
            className="!absolute inset-0 -z-10 opacity-25"
          />
          <p className="pill bg-paper/10 text-sky">Support YOKM</p>
          <SplitText
            text={t("home_give_heading")}
            accentLast
            accentClass="accent-word text-sky"
            className="display mt-6 max-w-[12ch]"
          />
          <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-paper/82">
            {t("home_give_text")}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Cta to="/donate" variant="accent">
              Donate to YOKM
            </Cta>
            <Cta to="/get-involved" variant="outline-light">
              Other ways to help
            </Cta>
          </div>
        </div>
        <div className="card p-8 md:p-10 lg:col-span-5">
          <p className="pill self-start bg-plum/10 text-plum">Contact</p>
          <h2 className="h-section mt-5">Visit or write to us</h2>
          <dl className="mt-8 space-y-5">
            <div className="border-b border-ink/10 pb-5">
              <div>
                <dt className="eyebrow text-plum">Office</dt>
                <dd className="mt-1 whitespace-pre-line leading-relaxed">{t("contact_address")}</dd>
              </div>
            </div>
            {channels.map((c) => {
              return (
                <div key={c.label} className="border-b border-ink/10 pb-5 last:border-0">
                  <div>
                    <dt className="eyebrow text-plum">{c.label}</dt>
                    <dd className="mt-1">
                      <a
                        href={c.href}
                        className="hover:text-wine hover:underline"
                        {...(c.href?.startsWith("https")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {c.value}
                      </a>
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>
          <div className="mt-auto pt-9">
            <Cta to="/contact" variant="outline">
              Send a message
            </Cta>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Doors />
      <About />
      <Vision />
      <Mission />
      <Work />
      <Moments />
      <Scripture />
      <Impact />
      <Latest />
      <Events />
      <GiveAndContact />
    </>
  );
}
