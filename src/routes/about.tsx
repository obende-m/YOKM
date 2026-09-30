import { createFileRoute } from "@tanstack/react-router";

import community from "@/assets/community-gathering.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Pending } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";
import { MISSION, ORG, VISION } from "@/lib/yokm";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
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
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Who we are"
        intro={ORG.positioning}
      />

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal className="img-zoom self-start">
            <img
              src={community}
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
              <p className="mt-5 leading-relaxed text-muted-foreground">
                YOKM exists for widows — reaching them in all aspects of life, presenting the Gospel
                of Jesus, and building them into pillars at home, in the Church and in society.
              </p>
            </Reveal>

            <Reveal>
              <p className="eyebrow text-muted-foreground">Christian foundation</p>
              <p className="mt-4 font-serif text-2xl leading-snug">
                &ldquo;{ORG.motto}&rdquo;
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                The ministry&rsquo;s cover materials reference {ORG.coverScriptures.join(" and ")}.
              </p>
            </Reveal>

            <Reveal>
              <p className="eyebrow text-muted-foreground">Where we work</p>
              <address className="mt-4 not-italic leading-relaxed">{ORG.address}</address>
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

      <section className="border-y border-border bg-cream">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <p className="eyebrow text-muted-foreground">Our vision</p>
          </Reveal>
          <ol className="mt-10 divide-y divide-border">
            {VISION.map((v, i) => (
              <Reveal as="li" key={v.key} delay={i * 0.06}>
                <div className="grid grid-cols-[auto_1fr] gap-6 py-7 md:gap-10">
                  <span className="eyebrow pt-2 text-accent">0{i + 1}</span>
                  <div>
                    <h3 className="text-2xl">{v.key}</h3>
                    <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">{v.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-32">
        <Reveal>
          <p className="eyebrow text-muted-foreground">Our mission</p>
          <h2 className="mt-4 max-w-2xl text-3xl md:text-4xl">
            In the ministry&rsquo;s own words.
          </h2>
        </Reveal>
        <ol className="mt-12 grid gap-px bg-border md:grid-cols-2">
          {MISSION.map((m, i) => (
            <Reveal as="li" key={m.no} delay={Math.min(i * 0.04, 0.2)} className="bg-background">
              <div className="flex h-full flex-col p-8">
                <span className="eyebrow text-accent">{m.no}</span>
                <h3 className="mt-4 font-serif text-xl">{m.label}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
                <p className="mt-5 eyebrow text-muted-foreground">{m.scripture}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <p className="eyebrow text-muted-foreground">Leadership</p>
              <h2 className="mt-4 text-3xl md:text-4xl">{ORG.visioner}</h2>
              <p className="mt-3 eyebrow text-accent">{ORG.visionerTitle}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <Pending label="Biography, photograph and ministry journey">
                A biography will be published once verified information and a photograph are
                supplied by the ministry.
              </Pending>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
