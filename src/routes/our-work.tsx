import { Link, createFileRoute } from "@tanstack/react-router";

import community from "@/assets/community-gathering.jpg";
import hero from "@/assets/hero-widow-portrait.jpg";
import skills from "@/assets/skills-hands.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { EVENTS, WORK_AREAS } from "@/lib/yokm";

const IMAGES = [skills, community, hero];

export const Route = createFileRoute("/our-work")({
  head: () => ({
    meta: [
      { title: "Our Work — Yendel Ocha Kpeling Ministry" },
      {
        name: "description",
        content:
          "Areas of YOKM's work with widows in Jos, Nigeria: spiritual growth, independence, skills and talents, resource management, community support, and family, church and society.",
      },
      { property: "og:title", content: "Our Work — Yendel Ocha Kpeling Ministry" },
      {
        property: "og:description",
        content:
          "Six areas of work drawn directly from YOKM's mission to widows in Jos, Plateau State, Nigeria.",
      },
    ],
  }),
  component: OurWork,
});

function OurWork() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Reaching widows in all aspects of life"
        intro="The areas below are drawn directly from YOKM's supplied mission. They describe the ministry's thematic focus rather than officially named programmes."
      />

      <div>
        {WORK_AREAS.map((w, i) => {
          const flip = i % 2 === 1;
          return (
            <section
              key={w.slug}
              className={`border-b border-border ${i % 3 === 1 ? "bg-cream" : ""}`}
            >
              <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-2 lg:gap-20">
                <Reveal className={flip ? "lg:order-2" : ""}>
                  <span className="eyebrow text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mt-5 text-[clamp(1.7rem,3.4vw,2.8rem)] leading-tight">{w.title}</h2>
                  <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">{w.text}</p>
                  <p className="mt-6 eyebrow text-muted-foreground">{w.scripture}</p>
                </Reveal>
                {i < 3 && (
                  <Reveal delay={0.1} className={`img-zoom ${flip ? "lg:order-1" : ""}`}>
                    <img
                      src={IMAGES[i]}
                      alt=""
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </Reveal>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {EVENTS.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10">
          <h2 className="text-3xl">Upcoming</h2>
          <ul className="mt-8 divide-y divide-border">
            {EVENTS.map((e) => (
              <li key={e.title} className="flex flex-wrap gap-4 py-6">
                <span className="eyebrow text-accent">{e.date}</span>
                <span className="font-serif text-xl">{e.title}</span>
                <span className="text-sm text-muted-foreground">{e.location}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-5 py-20 md:flex-row md:items-center md:justify-between md:px-10">
          <h2 className="max-w-[16ch] text-[clamp(1.7rem,3.4vw,2.8rem)] leading-tight">
            Stand with the widows of Jos.
          </h2>
          <Link
            to="/donate"
            className="group inline-flex items-center gap-3 self-start bg-primary-foreground px-7 py-4 text-xs uppercase tracking-[0.18em] text-primary"
          >
            Support the mission
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
