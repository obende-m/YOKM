import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, HandHeart, Mail, MapPin, Phone, Sparkles } from "lucide-react";

import { RevealImage, Rise, SplitText } from "@/components/motion";
import AccordionGallery from "@/components/reactbits/AccordionGallery.jsx";
import { PhotoCard, SectionHead } from "@/components/site/Blocks";
import { Cta } from "@/components/site/Cta";
import {
  contactChannels,
  formatDate,
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

const pad2 = (n: number) => String(n).padStart(2, "0");

/* 1. Hero: a rounded panel, words on the left and a photograph on the right. */
function Hero() {
  const t = useSiteText();
  const photo = pick(t("home_hero_image"), PHOTOS.giftSmiles);
  return (
    <section className="bg-paper pt-[6.5rem] md:pt-[8.5rem]">
      <div className="wrap">
        <div className="relative grid overflow-hidden rounded-[var(--r-panel)] bg-wine text-paper lg:grid-cols-12">
          <div className="relative z-10 flex flex-col justify-center p-7 pb-28 sm:p-10 sm:pb-32 lg:col-span-7 lg:p-14 lg:pb-36 xl:p-16 xl:pb-40">
            <p className="pill enter-fade self-start bg-paper/10 text-sky">
              <MapPin aria-hidden className="h-3.5 w-3.5" />
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
              className="display-xl mt-7 max-w-[10ch]"
            />
            <p
              className="lede enter-up mt-7 max-w-xl text-paper/85"
              style={{ animationDelay: "0.7s" }}
            >
              {t("home_hero_intro")}
            </p>
            <div
              className="enter-up mt-9 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "0.85s" }}
            >
              <Cta to="/about" variant="accent">
                Read our story
              </Cta>
              <Cta to="/donate" variant="outline-light">
                Donate to YOKM
              </Cta>
            </div>
            <p
              className="enter-fade mt-10 font-serif text-lg italic text-paper/75"
              style={{ animationDelay: "1.1s" }}
            >
              &ldquo;{ORG.motto}&rdquo;
            </p>
          </div>
          <div className="relative min-h-[22rem] lg:col-span-5 lg:min-h-[40rem]">
            <RevealImage
              photo={photo}
              priority
              square
              delay={0.1}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="!absolute inset-0"
              imgClassName="object-[30%_center]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* 2. Three doors into the site, overlapping the bottom of the hero. */
function Doors() {
  const doors = [
    {
      to: "/our-work",
      photo: PHOTOS.handingGift,
      title: "Our work",
      text: "Six areas of care, from faith and skills to family and community.",
      cta: "See our work",
    },
    {
      to: "/stories",
      photo: PHOTOS.twoWomen,
      title: "Stories",
      text: "Accounts shared by widows in their own words, with their consent.",
      cta: "Read the stories",
    },
    {
      to: "/get-involved",
      photo: PHOTOS.standingPortrait,
      title: "Get involved",
      text: "Give, volunteer, partner or pray with the ministry.",
      cta: "Find your place",
    },
  ];
  return (
    <section className="relative z-10 bg-paper">
      <div className="wrap">
        <div className="-mt-20 grid gap-5 sm:px-4 md:-mt-24 md:grid-cols-3 lg:px-10">
          {doors.map((d, i) => (
            <PhotoCard
              key={d.to}
              to={d.to}
              photo={d.photo}
              title={d.title}
              text={d.text}
              cta={d.cta}
              delay={i * 0.08}
              aspect="aspect-[16/10]"
            />
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
                { icon: MapPin, k: "Based in", v: ORG.shortLocation },
                { icon: BookOpen, k: "Registered", v: "Incorporated Trustee, March 2015" },
              ].map(({ icon: Icon, k, v }) => (
                <li key={k} className="flex gap-4 rounded-2xl bg-blush/70 p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-wine text-paper">
                    <Icon aria-hidden className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="eyebrow block text-plum">{k}</span>
                    <span className="mt-1 block text-[0.95rem] leading-snug">{v}</span>
                  </span>
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
  const icons = [Sparkles, HandHeart, BookOpen];
  return (
    <section className="section-pad bg-blush">
      <div className="wrap">
        <SectionHead
          eyebrow="Our vision"
          title="What the ministry *hopes for* every widow"
          action={{ to: "/about", hash: "vision", label: "Read the vision" }}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {vision.map((v, i) => {
            const Icon = icons[i % icons.length]!;
            return (
              <Rise key={v.id} delay={i * 0.08} className="card p-8 md:p-9">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-wine text-paper">
                    <Icon aria-hidden className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span className="numeral text-5xl text-plum/30">{pad2(i + 1)}</span>
                </div>
                <h3 className="h-sub mt-8">{v.label}</h3>
                <p className="mt-3 leading-relaxed text-ink/70">{v.body}</p>
              </Rise>
            );
          })}
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
              className="card card-dark flex flex-col p-6"
            >
              <span className="numeral text-4xl text-sky">{pad2(i + 1)}</span>
              <h3 className="mt-5 font-serif text-[1.25rem] font-medium leading-tight">
                {m.label}
              </h3>
              <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-paper/72">{m.body}</p>
              {m.scripture && (
                <p className="eyebrow mt-5 text-[0.65rem] text-rose">{m.scripture}</p>
              )}
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
              badge={pad2(i + 1)}
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
                  <Link
                    to={c.to as "/"}
                    className="card group h-full !flex-row items-start gap-6 p-7"
                  >
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-blush text-wine">
                      <BookOpen aria-hidden className="h-6 w-6" strokeWidth={1.6} />
                    </span>
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
            <div className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blush text-wine">
                <MapPin aria-hidden className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <div>
                <dt className="eyebrow text-plum">Office</dt>
                <dd className="mt-1 whitespace-pre-line leading-relaxed">{t("contact_address")}</dd>
              </div>
            </div>
            {channels.map((c) => {
              const Icon = c.label === "Email" ? Mail : Phone;
              return (
                <div key={c.label} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blush text-wine">
                    <Icon aria-hidden className="h-5 w-5" strokeWidth={1.7} />
                  </span>
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
