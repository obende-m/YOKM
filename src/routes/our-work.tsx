import { Link, createFileRoute } from "@tanstack/react-router";

import community from "@/assets/community-gathering.jpg";
import hero from "@/assets/hero-widow-portrait.jpg";
import skills from "@/assets/skills-hands.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { formatDate, renderRichText, usePublished, useUpcomingEvents, type ProgramRow } from "@/lib/cms";
import { WORK_AREAS } from "@/lib/yokm";

const IMAGES = [skills, community, hero];

export const Route = createFileRoute("/our-work")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
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
  const { data: programs = [] } = usePublished<ProgramRow>("programs");
  const { data: events = [] } = useUpcomingEvents();
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

      {programs.length > 0 && (
        <section className="border-b border-border bg-cream">
          <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
            <p className="eyebrow text-muted-foreground">Programs</p>
            <h2 className="mt-4 text-3xl md:text-4xl">Current programs</h2>
            <div className="mt-10 grid gap-12 md:grid-cols-2">
              {programs.map((p) => (
                <Reveal key={p.id}>
                  <article>
                    {p.cover_url && <img src={p.cover_url} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />}
                    <div className="mt-5 flex items-center gap-3">
                      <h3 className="font-serif text-2xl">{p.name}</h3>
                      {p.status !== "active" && <span className="eyebrow text-muted-foreground">{p.status}</span>}
                    </div>
                    {p.short_description && <p className="mt-3 leading-relaxed text-muted-foreground">{p.short_description}</p>}
                    {p.full_description && <div className="prose-article mt-4 text-sm" dangerouslySetInnerHTML={{ __html: renderRichText(p.full_description) }} />}
                    {p.donation_cta && <Link to="/donate" className="mt-5 inline-block eyebrow text-accent">{p.donation_cta} →</Link>}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {events.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
          <h2 className="text-3xl">Upcoming</h2>
          <ul className="mt-8 divide-y divide-border">
            {events.map((e) => (
              <li key={e.id} className="grid gap-4 py-6 md:grid-cols-[200px_1fr_auto] md:items-start">
                <span className="eyebrow text-accent">{formatDate(e.event_date)}{e.event_time ? ` · ${e.event_time}` : ""}</span>
                <div>
                  <p className="font-serif text-xl">{e.title}</p>
                  {e.location && <p className="mt-1 text-sm text-muted-foreground">{e.location}</p>}
                  {e.description && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{e.description}</p>}
                </div>
                {e.link && <a href={e.link} target="_blank" rel="noreferrer" className="eyebrow text-primary underline-offset-4 hover:underline">Details →</a>}
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
