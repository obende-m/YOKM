import { createFileRoute } from "@tanstack/react-router";

import community from "@/assets/community-gathering.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Pending } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";
import { usePageItems, usePublished, useSiteText, type PersonRow } from "@/lib/cms";
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

function About() {
  const t = useSiteText();
  const vision = usePageItems("vision");
  const mission = usePageItems("mission");
  const bio = t("leader_bio");
  const leaderPhoto = t("leader_photo");

  return (
    <>
      <PageHero eyebrow="About" title="Who we are" intro={t("about_intro")} />

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal className="img-zoom self-start">
            <img
              src={t("about_image") || community}
              alt="Widows gathered together in Jos"
              width={1280}
              height={1600}
              loading="lazy"
              className="w-full object-cover"
            />
          </Reveal>
          <div className="space-y-14">
            <Reveal>
              <p className="eyebrow text-muted-foreground">Ministry focus</p>
              <h2 className="mt-4 text-3xl md:text-4xl">&ldquo;{ORG.focus}&rdquo;</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">{t("about_focus_text")}</p>
            </Reveal>

            <Reveal>
              <p className="eyebrow text-muted-foreground">Christian foundation</p>
              <p className="mt-4 font-serif text-2xl leading-snug">&ldquo;{ORG.motto}&rdquo;</p>
              <p className="mt-4 text-sm text-muted-foreground">
                The ministry&rsquo;s cover materials reference {ORG.coverScriptures.join(" and ")}.
              </p>
            </Reveal>

            <Reveal>
              <p className="eyebrow text-muted-foreground">Where we work</p>
              <address className="mt-4 not-italic leading-relaxed">{t("contact_address")}</address>
            </Reveal>

            <Reveal>
              <p className="eyebrow text-muted-foreground">Registration</p>
              <ul className="mt-4 space-y-1 text-sm leading-relaxed text-muted-foreground">
                <li>{ORG.registration}</li>
                <li>{ORG.registrationNumber}</li>
                <li>{ORG.registrationDate}</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {vision.length > 0 && (
        <section id="vision" className="scroll-mt-24 border-y border-border bg-cream">
          <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
            <Reveal>
              <p className="eyebrow text-muted-foreground">Our vision</p>
            </Reveal>
            <ol className="mt-10 divide-y divide-border">
              {vision.map((v, i) => (
                <Reveal as="li" key={v.id} delay={i * 0.06}>
                  <div className="grid grid-cols-[auto_1fr] gap-6 py-7 md:gap-10">
                    <span className="eyebrow pt-2 text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-2xl">{v.label}</h3>
                      <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                        {v.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {mission.length > 0 && (
        <section
          id="mission"
          className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-20 md:px-10 md:py-32"
        >
          <Reveal>
            <p className="eyebrow text-muted-foreground">Our mission</p>
            <h2 className="mt-4 max-w-2xl text-3xl md:text-4xl">
              In the ministry&rsquo;s own words.
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-px bg-border md:grid-cols-2">
            {mission.map((m, i) => (
              <Reveal as="li" key={m.id} delay={Math.min(i * 0.04, 0.2)} className="bg-background">
                <div className="flex h-full flex-col p-8">
                  <span className="eyebrow text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 font-serif text-xl">{m.label}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {m.body}
                  </p>
                  {m.scripture && (
                    <p className="mt-5 eyebrow text-muted-foreground">{m.scripture}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </section>
      )}

      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <p className="eyebrow text-muted-foreground">Leadership</p>
              {leaderPhoto && (
                <img
                  src={leaderPhoto}
                  alt={ORG.visioner}
                  loading="lazy"
                  className="mt-6 aspect-[4/5] w-full max-w-xs object-cover"
                />
              )}
              <h2 className="mt-6 text-3xl md:text-4xl">{ORG.visioner}</h2>
              <p className="mt-3 eyebrow text-accent">{ORG.visionerTitle}</p>
            </Reveal>
            <Reveal delay={0.1}>
              {bio ? (
                <div className="space-y-5 leading-relaxed text-muted-foreground md:text-lg">
                  {bio.split(/\n{2,}/).map((para, i) => (
                    <p key={i} className="whitespace-pre-line">
                      {para}
                    </p>
                  ))}
                </div>
              ) : (
                <Pending label="Biography, photograph and ministry journey">
                  A biography will be published once verified information and a photograph are
                  supplied by the ministry.
                </Pending>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <People />
    </>
  );
}

function People() {
  const { data = [] } = usePublished<PersonRow>("people");
  if (data.length === 0) return null;
  return (
    <section className="border-t border-border bg-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <p className="eyebrow text-muted-foreground">Our team</p>
        <h2 className="mt-4 text-3xl md:text-4xl">The people serving with YOKM</h2>
        <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((p, i) => (
            <Reveal as="li" key={p.id} delay={Math.min(i * 0.06, 0.3)}>
              {p.photo_url && (
                <img
                  src={p.photo_url}
                  alt={p.name}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              )}
              <h3 className="mt-5 font-serif text-2xl">{p.name}</h3>
              {p.role && <p className="mt-1 eyebrow text-accent">{p.role}</p>}
              {p.bio && (
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {p.bio}
                </p>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
