import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Building2, CalendarDays, HandHeart, MapPin, Sparkles } from "lucide-react";

import { RevealImage, Rise, SplitText } from "@/components/motion";
import { PageBanner, SectionHead } from "@/components/site/Blocks";
import { Cta } from "@/components/site/Cta";
import { usePageItems, usePublished, useSiteText, type PersonRow } from "@/lib/cms";
import { PHOTOS, pick } from "@/lib/photos";
import { ORG } from "@/lib/yokm";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "About YOKM — Yendel Ocha Kpeling Ministry, Jos, Nigeria" },
      {
        name: "description",
        content:
          "Who we are: Yendel Ocha Kpeling Ministry, a Christian ministry for widows in Jos, Plateau State, Nigeria, registered as an Incorporated Trustee with the CAC.",
      },
      { property: "og:title", content: "About Yendel Ocha Kpeling Ministry" },
      {
        property: "og:description",
        content:
          "A Christian ministry for widows in Jos, Plateau State, Nigeria — our vision, mission and foundation.",
      },
    ],
  }),
  component: About,
});

const pad2 = (n: number) => String(n).padStart(2, "0");

function About() {
  const t = useSiteText();
  return (
    <>
      <PageBanner
        eyebrow="About"
        title="A Christian ministry for *widows* in Jos"
        intro={t("about_intro")}
        photo={pick(t("about_image"), PHOTOS.seatedRow)}
      />
      <Focus />
      <Vision />
      <Mission />
      <Visioner />
      <People />
      <Record />
    </>
  );
}

function Focus() {
  const t = useSiteText();
  return (
    <section className="section-pad bg-paper">
      <div className="wrap grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <RevealImage
            photo={PHOTOS.addressing}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-[4/3] w-full"
            parallax
          />
          <Rise
            delay={0.2}
            className="absolute -bottom-8 right-4 max-w-xs rounded-2xl bg-wine p-6 text-paper shadow-xl md:right-8"
          >
            <p className="eyebrow text-sky">Our motto</p>
            <p className="mt-2 font-serif text-2xl italic leading-snug">{ORG.motto}</p>
          </Rise>
        </div>
        <div className="pt-6 lg:pt-0">
          <p className="pill bg-plum/10 text-plum">Ministry focus</p>
          <SplitText
            text="“Awake, oh ye *widows*”"
            accentClass="accent-word text-plum"
            className="h-section mt-5"
          />
          <Rise>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-ink/72">
              {t("about_focus_text")}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  text: "Awake thou that sleepest, and arise from the dead, and Christ shall give thee light.",
                  ref: "Ephesians 5:14",
                },
                {
                  text: "Awake, awake; put on thy strength, O Zion; put on thy beautiful garments.",
                  ref: "Isaiah 52:1",
                },
              ].map((q) => (
                <blockquote key={q.ref} className="rounded-2xl bg-blush p-5">
                  <p className="font-serif text-lg italic leading-snug">&ldquo;{q.text}&rdquo;</p>
                  <footer className="eyebrow mt-3 text-plum">{q.ref}</footer>
                </blockquote>
              ))}
            </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}

function Vision() {
  const vision = usePageItems("vision");
  if (vision.length === 0) return null;
  const icons = [Sparkles, HandHeart, BookOpen];
  return (
    <section id="vision" className="section-pad scroll-mt-28 bg-blush">
      <div className="wrap">
        <SectionHead eyebrow="Our vision" title="Three hopes for *every* widow" center />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {vision.map((v, i) => {
            const Icon = icons[i % icons.length]!;
            return (
              <Rise key={v.id} delay={i * 0.08} className="card p-8 text-center md:p-10">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-wine text-paper">
                  <Icon aria-hidden className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <h3 className="h-sub mt-6">{v.label}</h3>
                <p className="mt-3 leading-relaxed text-ink/70">{v.body}</p>
              </Rise>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Mission() {
  const mission = usePageItems("mission");
  if (mission.length === 0) return null;
  return (
    <section id="mission" className="section-pad scroll-mt-28 bg-paper">
      <div className="wrap">
        <SectionHead
          eyebrow="Our mission"
          title="In the ministry’s *own words*"
          intro="Each commitment is printed with the passage of Scripture it rests on."
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-2">
          {mission.map((m, i) => (
            <Rise as="li" key={m.id} delay={(i % 2) * 0.06} className="card !flex-row gap-5 p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blush font-serif text-lg text-wine">
                {pad2(i + 1)}
              </span>
              <span className="flex-1">
                <span className="block font-serif text-[1.3rem] font-medium leading-tight">
                  {m.label}
                </span>
                <span className="mt-2 block leading-relaxed text-ink/70">{m.body}</span>
                {m.scripture && <span className="eyebrow mt-3 block text-plum">{m.scripture}</span>}
              </span>
            </Rise>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Visioner() {
  const t = useSiteText();
  const bio = t("leader_bio");
  const leaderPhoto = t("leader_photo");
  const initials = ORG.visioner
    .replace(/^Evang\.\s*/, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("");

  return (
    <section className="section-pad bg-night text-paper">
      <div className="wrap">
        <div className="grid items-center gap-10 overflow-hidden rounded-[var(--r-panel)] bg-paper/5 p-6 ring-1 ring-paper/10 md:p-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            {leaderPhoto ? (
              <RevealImage
                photo={{ src: leaderPhoto, width: 1200, height: 1500, alt: ORG.visioner }}
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="aspect-[4/5] w-full"
              />
            ) : (
              <div
                aria-hidden
                className="flex aspect-[4/5] w-full items-center justify-center rounded-[var(--r-card)] bg-wine"
              >
                <span className="numeral text-[clamp(6rem,12vw,10rem)] text-sky/80">
                  {initials}
                </span>
              </div>
            )}
          </div>
          <div className="lg:col-span-7">
            <p className="pill bg-paper/10 text-sky">{ORG.visionerTitle}</p>
            <SplitText as="h2" text={ORG.visioner} className="display mt-6 max-w-[12ch]" />
            <Rise>
              {bio ? (
                <div className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-paper/80">
                  {bio.split(/\n{2,}/).map((para, i) => (
                    <p key={i} className="whitespace-pre-line">
                      {para}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="mt-8 max-w-md leading-relaxed text-paper/65">
                  A biography and photograph of the Visioner will be published here once the
                  ministry supplies them.
                </p>
              )}
            </Rise>
          </div>
        </div>
      </div>
    </section>
  );
}

function People() {
  const { data = [] } = usePublished<PersonRow>("people");
  if (data.length === 0) return null;
  return (
    <section className="section-pad bg-paper">
      <div className="wrap">
        <SectionHead eyebrow="Our team" title="The people serving with *YOKM*" />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((p, i) => (
            <Rise as="li" key={p.id} delay={(i % 4) * 0.06} className="card">
              {p.photo_url && (
                <div className="card-media aspect-[4/5]">
                  <img src={p.photo_url} alt={p.name} loading="lazy" />
                </div>
              )}
              <div className="p-6">
                <h3 className="h-sub">{p.name}</h3>
                {p.role && <p className="eyebrow mt-2 text-plum">{p.role}</p>}
                {p.bio && (
                  <p className="mt-3 whitespace-pre-line text-[0.95rem] leading-relaxed text-ink/70">
                    {p.bio}
                  </p>
                )}
              </div>
            </Rise>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Record() {
  const t = useSiteText();
  const items = [
    { icon: Building2, k: "Registered as", v: ORG.registration },
    {
      icon: CalendarDays,
      k: "Registration",
      v: `${ORG.registrationNumber} · ${ORG.registrationDate}`,
    },
    { icon: MapPin, k: "Where we work", v: t("contact_address") },
  ];
  return (
    <section className="section-pad bg-blush">
      <div className="wrap">
        <SectionHead
          eyebrow="The record"
          title="Registration and *address*"
          action={{ to: "/contact", label: "Contact the ministry" }}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map(({ icon: Icon, k, v }, i) => (
            <Rise key={k} delay={i * 0.08} className="card p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-wine text-paper">
                <Icon aria-hidden className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <p className="eyebrow mt-6 text-plum">{k}</p>
              <p className="mt-2 whitespace-pre-line leading-relaxed">{v}</p>
            </Rise>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Cta to="/get-involved" variant="solid">
            Get involved
          </Cta>
        </div>
      </div>
    </section>
  );
}
