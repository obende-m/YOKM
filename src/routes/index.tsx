import { Link, createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

import community from "@/assets/community-gathering.jpg";
import hero from "@/assets/hero-widow-portrait.jpg";
import skills from "@/assets/skills-hands.jpg";
import { BounceCards } from "@/components/site/BounceCards";
import { MorphingCardStack } from "@/components/site/MorphingCardStack";
import { Reveal } from "@/components/site/Reveal";
import { usePublished, type MetricRow } from "@/lib/cms";
import { MISSION, ORG, STORIES, VISION, WORK_AREAS } from "@/lib/yokm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Yendel Ocha Kpeling Ministry (YOKM) — Awake Oh Ye Widows" },
      {
        name: "description",
        content:
          "YOKM is a Christian ministry in Jos, Plateau State, Nigeria, reaching widows in all aspects of life and equipping them to discover purpose, develop their gifts and become independent.",
      },
      { property: "og:title", content: "Yendel Ocha Kpeling Ministry — Awake Oh Ye Widows" },
      {
        property: "og:description",
        content:
          "A Christian ministry in Jos, Nigeria, equipping widows to discover God's purpose, develop their gifts and become independent.",
      },
    ],
  }),
  component: Home,
});

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[min(85svh,760px)] min-h-[550px] overflow-hidden bg-ink max-[380px]:min-h-[590px]">
      <motion.img
        src={hero}
        alt="A widow in Jos, Plateau State, standing in the late afternoon light"
        width={1920}
        height={1280}
        style={reduced ? undefined : { scale }}
        className="absolute inset-0 h-full w-full object-cover object-[48%_center] md:object-[60%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--ink)_0%,transparent_78%)] opacity-90" />

      <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-10 text-ink-foreground md:px-10 md:pb-16">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow text-ink-foreground/75"
        >
          {ORG.name}
        </motion.p>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 max-w-[16ch] text-[clamp(2.6rem,8vw,6rem)] leading-[0.95]"
        >
          Awake, Oh Ye Widows
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-xl text-sm leading-relaxed text-ink-foreground/90 md:mt-6 md:text-lg"
        >
          A Christian ministry in Jos, Plateau State, reaching widows in every aspect of life — so
          that they discover God&rsquo;s purpose, develop their gifts and stand independent.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex flex-wrap gap-3 sm:flex-row md:mt-8"
        >
          <Link
            to="/our-work"
            className="group inline-flex items-center justify-center gap-3 bg-accent px-5 py-3.5 text-xs uppercase tracking-[0.12em] text-accent-foreground md:px-7 md:py-4"
          >
            Discover our work
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            to="/donate"
            className="inline-flex items-center justify-center border border-ink-foreground/75 px-5 py-3.5 text-xs uppercase tracking-[0.12em] transition-colors hover:bg-ink-foreground/10 md:px-7 md:py-4"
          >
            Support the mission
          </Link>
        </motion.div>
      </div>

      <motion.div
        style={reduced ? undefined : { opacity: fade }}
        className="pointer-events-none absolute bottom-6 right-5 hidden items-center gap-3 text-ink-foreground/60 md:right-10 md:flex"
      >
        <span className="eyebrow">Scroll</span>
        <span className="block h-10 w-px bg-ink-foreground/40" />
      </motion.div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-14 md:px-10 md:py-24">
      <div className="grid gap-6 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-4">
          <p className="eyebrow text-muted-foreground">The heart of YOKM</p>
          <p className="mt-4 font-serif text-lg text-primary">Awake. Discover. Become.</p>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-8">
          <h2 className="text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[1.06]">
            No woman should have to carry loss alone, and no widow should live below the purpose God
            placed in her.
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {ORG.positioning}
          </p>
          <p className="mt-8 font-serif text-base text-foreground">
            &ldquo;{ORG.motto}&rdquo;
          </p>
          <p className="mt-2 eyebrow text-muted-foreground">
            {ORG.coverScriptures.join(" · ")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section className="border-y border-border bg-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10 md:py-20">
        <Reveal>
          <p className="eyebrow text-muted-foreground">Our vision</p>
        </Reveal>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <ol className="divide-y divide-border">
              {VISION.map((v, i) => (
                <Reveal as="li" key={v.key} delay={i * 0.08}>
                  <div className="grid grid-cols-[auto_1fr] gap-6 py-8 md:gap-10">
                    <span className="eyebrow pt-2 text-accent">0{i + 1}</span>
                    <div>
                      <h3 className="text-2xl md:text-3xl">{v.key}</h3>
                      <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{v.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal delay={0.15} className="img-zoom self-start">
            <img
              src={community}
              alt="Women gathered in prayer and encouragement"
              width={1280}
              height={1600}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  const [open, setOpen] = useState<string | null>(MISSION[0].no);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-14 md:px-10 md:py-24">
      <div className="grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <p className="eyebrow text-muted-foreground">Our mission</p>
          <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.08]">
            Ten commitments, held in Scripture.
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            These are the ministry&rsquo;s own words. Select any commitment to read it in full with
            the Scripture it rests on.
          </p>
        </Reveal>

        <div className="md:col-span-8">
          <ul className="border-t border-border">
            {MISSION.map((m, i) => {
              const active = open === m.no;
              return (
                <Reveal as="li" key={m.no} delay={Math.min(i * 0.04, 0.24)}>
                  <div className="border-b border-border">
                    <button
                      type="button"
                      onClick={() => setOpen(active ? null : m.no)}
                      aria-expanded={active}
                      className="group flex w-full items-baseline gap-5 py-6 text-left md:gap-8"
                    >
                      <span className="eyebrow text-accent">{m.no}</span>
                      <span className="flex-1 font-serif text-xl md:text-2xl">{m.label}</span>
                      <span
                        className={`text-muted-foreground transition-transform duration-500 ${
                          active ? "rotate-45" : ""
                        }`}
                        aria-hidden
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-8 pl-[3.1rem] md:pl-[4.4rem]">
                          <p className="max-w-2xl text-base leading-relaxed text-foreground md:text-lg">
                            {m.text}
                          </p>
                          <p className="mt-3 eyebrow text-muted-foreground">{m.scripture}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function HumanStory() {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-[1400px] gap-6 px-5 py-14 md:px-10 md:py-20 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <BounceCards
            images={[
              { src: community, alt: "Women praying together" },
              { src: skills, alt: "A widow working at a sewing machine" },
              { src: hero, alt: "A widow in Jos in the late afternoon light" },
              { src: skills, alt: "Hands at work on fabric" },
              { src: community, alt: "Women gathered in encouragement" },
            ]}
          />
        </div>

        <Reveal delay={0.12}>
          <p className="eyebrow text-ink-foreground/55">Stories</p>
          <h2 className="mt-5 text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.06]">
            Behind every widow is a woman, a family, a story.
          </h2>
          <p className="mt-7 max-w-xl leading-relaxed text-ink-foreground/70">
            YOKM tells stories only as the women themselves choose to share them. As accounts are
            gathered and approved, they will be published here in the widows&rsquo; own words.
          </p>
          {STORIES.length === 0 && (
            <p className="mt-6 text-sm text-ink-foreground/50">
              No stories have been published yet.
            </p>
          )}
          <Link
            to="/stories"
            className="group mt-9 inline-flex items-center gap-3 border-b border-ink-foreground/40 pb-1 text-xs uppercase tracking-[0.18em]"
          >
            Read the stories
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="mx-auto grid max-w-[1400px] gap-8 px-5 py-14 md:px-10 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <Reveal>
        <p className="eyebrow text-muted-foreground">Our work</p>
        <h2 className="mt-4 max-w-md text-[clamp(2rem,4vw,3.4rem)] leading-[1.04]">
          Six areas drawn directly from the ministry&rsquo;s mission.
        </h2>
        <Link to="/our-work" className="rule-link mt-8 inline-block eyebrow">
          Read about our work →
        </Link>
      </Reveal>

      <div>
        <MorphingCardStack
          cards={WORK_AREAS.map((w, i) => ({
            id: w.slug,
            no: String(i + 1).padStart(2, "0"),
            title: w.title,
            text: w.text,
            meta: w.scripture,
          }))}
        />
      <p className="mt-8 max-w-2xl text-xs leading-relaxed text-muted-foreground">
        These areas are drawn from YOKM&rsquo;s supplied mission. They are not presented as official
        named programmes.
      </p>
      </div>
    </section>
  );
}

function Impact() {
  const { data = [] } = usePublished<MetricRow>("impact_metrics");
  if (data.length === 0) return null;
  return (
    <section className="border-y border-border bg-cream">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-24 md:grid-cols-3 md:px-10">
        {data.map((m) => (
          <Reveal key={m.id}>
            <p className="font-serif text-5xl text-primary">{m.value}</p>
            <p className="mt-3 text-sm text-foreground">{m.title}{m.year ? ` (${m.year})` : ""}</p>
            {m.description && <p className="mt-1 text-xs text-muted-foreground">{m.description}</p>}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Give() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal>
            <p className="eyebrow text-primary-foreground/60">Support YOKM</p>
            <h2 className="mt-5 max-w-[14ch] text-[clamp(2rem,4.6vw,4rem)] leading-[1.02]">
              Help carry hope further.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md leading-relaxed text-primary-foreground/75">
              Giving to YOKM is participation in the mission — standing with widows as they grow in
              faith, discover their gifts and become independent.
            </p>
            <Link
              to="/donate"
              className="group mt-8 inline-flex items-center gap-3 bg-primary-foreground px-7 py-4 text-xs uppercase tracking-[0.18em] text-primary"
            >
              Ways to give
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Vision />
      <Mission />
      <HumanStory />
      <Work />
      <Impact />
      <Give />
    </>
  );
}
