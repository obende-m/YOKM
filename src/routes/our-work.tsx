import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";

import { RevealImage, Rise, SplitText } from "@/components/motion";
import { PageBanner, SectionHead } from "@/components/site/Blocks";
import { Cta } from "@/components/site/Cta";
import {
  formatDate,
  renderRichText,
  usePageItems,
  usePublished,
  useSiteText,
  useUpcomingEvents,
  type ProgramRow,
} from "@/lib/cms";
import { PHOTOS, pick } from "@/lib/photos";

export const Route = createFileRoute("/our-work")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Our Work | Yendel Ocha Kpeling Ministry" },
      {
        name: "description",
        content:
          "Areas of YOKM's work with widows in Jos, Nigeria: spiritual growth, independence, skills and talents, resource management, community support, and family, church and society.",
      },
      { property: "og:title", content: "Our Work | Yendel Ocha Kpeling Ministry" },
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
  const t = useSiteText();
  return (
    <>
      <PageBanner
        eyebrow="Our work"
        title="Reaching widows in *all aspects* of life"
        intro={t("work_intro")}
        photo={pick(t("work_image"), PHOTOS.teachingCircle)}
      />
      <Areas />
      <Programs />
      <Events />
      <section className="bg-paper pb-20 md:pb-28">
        <div className="wrap">
          <div className="flex flex-col items-start gap-8 rounded-[var(--r-panel)] bg-wine p-8 text-paper md:flex-row md:items-center md:justify-between md:p-12">
            <SplitText
              text="Stand with the *widows* of Jos"
              accentClass="accent-word text-sky"
              className="h-section max-w-[14ch]"
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Cta to="/donate" variant="accent">
                Donate to YOKM
              </Cta>
              <Cta to="/get-involved" variant="outline-light">
                Other ways to help
              </Cta>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/** The six areas as alternating rows: a rounded photograph beside the words. */
function Areas() {
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
          eyebrow="Six areas of work"
          title="Drawn directly from the ministry’s *mission*"
          center
        />
        <div className="mt-14 space-y-6 md:mt-16">
          {areas.map((a, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={a.id}
                id={`area-${i + 1}`}
                className="card scroll-mt-32 grid items-center gap-0 md:grid-cols-2"
              >
                <RevealImage
                  photo={photos[i % photos.length]!}
                  square
                  sizes="(min-width: 768px) 45vw, 100vw"
                  from={flip ? "right" : "left"}
                  className={`aspect-[4/3] h-full w-full md:aspect-auto md:min-h-[22rem] ${
                    flip ? "md:order-2" : ""
                  }`}
                />
                <div className="p-8 md:p-12">
                  <h2 className="h-section">{a.label}</h2>
                  <p className="mt-4 text-[1.05rem] leading-relaxed text-ink/72">{a.body}</p>
                  {a.scripture && (
                    <p className="eyebrow mt-6 flex items-center gap-3 text-plum">
                      <span aria-hidden className="h-px w-8 bg-current" />
                      {a.scripture}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Programs() {
  const { data: raw = [] } = usePublished<ProgramRow>("programs");
  if (raw.length === 0) return null;
  const programs = [...raw].sort((a, b) => Number(b.featured) - Number(a.featured));
  return (
    <section id="programs" className="section-pad scroll-mt-28 bg-blush">
      <div className="wrap">
        <SectionHead eyebrow="Programmes" title="Current *programmes*" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {programs.map((p, i) => (
            <Rise key={p.id} delay={(i % 2) * 0.08} className="card h-full">
              {p.cover_url && (
                <div className="card-media aspect-[16/9]">
                  <img src={p.cover_url} alt="" loading="lazy" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-7 md:p-9">
                <div className="flex flex-wrap gap-2">
                  {p.featured && <span className="pill bg-wine text-paper">Featured</span>}
                  {p.status !== "active" && (
                    <span className="pill bg-plum/10 text-plum">{p.status}</span>
                  )}
                </div>
                <h3 className="h-section mt-4 text-[clamp(1.6rem,2.4vw,2.2rem)]">{p.name}</h3>
                {p.short_description && (
                  <p className="mt-3 text-[1.05rem] leading-relaxed text-ink/72">
                    {p.short_description}
                  </p>
                )}
                {p.full_description && (
                  <div
                    className="prose-yokm mt-4 text-base"
                    dangerouslySetInnerHTML={{ __html: renderRichText(p.full_description) }}
                  />
                )}
                {p.donation_cta && (
                  <div className="mt-auto pt-8">
                    <Cta to="/donate" variant="solid">
                      {p.donation_cta}
                    </Cta>
                  </div>
                )}
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

function Events() {
  const { data: events = [] } = useUpcomingEvents();
  if (events.length === 0) return null;
  return (
    <section id="events" className="section-pad scroll-mt-28 bg-paper">
      <div className="wrap">
        <SectionHead eyebrow="Events" title="Upcoming *gatherings*" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.map((e, i) => {
            const d = e.event_date ? new Date(`${e.event_date}T00:00:00Z`) : null;
            const link = e.link && /^(https?:\/\/|mailto:|tel:)/i.test(e.link) ? e.link : "";
            return (
              <Rise key={e.id} delay={(i % 3) * 0.08} className="card h-full p-7">
                <div className="flex items-center gap-4">
                  <span className="grid h-16 w-16 shrink-0 place-content-center rounded-2xl bg-wine text-center text-paper">
                    <span className="font-serif text-2xl leading-none">
                      {d ? d.getUTCDate() : ""}
                    </span>
                    <span className="eyebrow mt-1 text-[0.58rem] text-sky">
                      {d ? d.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" }) : ""}
                    </span>
                  </span>
                  <h3 className="h-sub text-[1.35rem]">{e.title}</h3>
                </div>
                <ul className="mt-5 space-y-2 text-sm text-ink/70">
                  <li className="flex items-center gap-2">
                    <CalendarDays aria-hidden className="h-4 w-4 text-plum" />
                    {[formatDate(e.event_date), e.event_time].filter(Boolean).join(" · ")}
                  </li>
                  {e.location && (
                    <li className="flex items-center gap-2">
                      <MapPin aria-hidden className="h-4 w-4 text-plum" />
                      {e.location}
                    </li>
                  )}
                </ul>
                {e.description && (
                  <p className="mt-4 flex-1 leading-relaxed text-ink/72">{e.description}</p>
                )}
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-wine"
                  >
                    Event details
                    <ArrowUpRight aria-hidden className="h-4 w-4" />
                  </a>
                )}
              </Rise>
            );
          })}
        </div>
        <p className="mt-10 text-center text-sm text-ink/60">
          Questions about an event?{" "}
          <Link to="/contact" className="font-semibold text-wine underline underline-offset-4">
            Contact the ministry
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
