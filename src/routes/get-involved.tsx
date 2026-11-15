import { Link, createFileRoute } from "@tanstack/react-router";

import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { useSiteText } from "@/lib/cms";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Get Involved — Yendel Ocha Kpeling Ministry" },
      {
        name: "description",
        content:
          "Ways to participate in the work of Yendel Ocha Kpeling Ministry among widows in Jos, Nigeria: give, volunteer, partner, pray and share.",
      },
      { property: "og:title", content: "Get Involved — Yendel Ocha Kpeling Ministry" },
      {
        property: "og:description",
        content: "Give, volunteer, partner, pray or share the work of YOKM in Jos, Nigeria.",
      },
    ],
  }),
  component: GetInvolved,
});

const WAYS: { title: string; text: string; action?: { label: string; to: string } }[] = [
  {
    title: "Give",
    text: "Support the ministry's work with widows in Jos.",
    action: { label: "Ways to give", to: "/donate" },
  },
  {
    title: "Volunteer",
    text: "Offer time, teaching or practical skill alongside the ministry.",
    action: { label: "Offer to volunteer", to: "#forms" },
  },
  {
    title: "Partner",
    text: "Churches and organisations can walk with YOKM in shared work.",
    action: { label: "Partnership enquiry", to: "#forms" },
  },
  {
    title: "Pray",
    text: "Stand with the widows and the ministry in prayer.",
    action: { label: "Send a prayer request", to: "/contact" },
  },
  {
    title: "Share",
    text: "Tell others about the ministry and its work.",
  },
];

function GetInvolved() {
  const t = useSiteText();
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="There is a place for you in this work"
        intro={t("involved_intro")}
      />

      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <ul className="divide-y divide-border border-y border-border">
          {WAYS.map((w, i) => (
            <Reveal as="li" key={w.title} delay={i * 0.06}>
              <div className="grid grid-cols-[auto_1fr] gap-6 py-8 md:gap-12">
                <span className="eyebrow pt-2 text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-2xl md:text-3xl">{w.title}</h2>
                  <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{w.text}</p>
                  {w.action &&
                    (w.action.to.startsWith("#") ? (
                      <a href={w.action.to} className="rule-link mt-4 inline-block eyebrow">
                        {w.action.label} →
                      </a>
                    ) : (
                      <Link to={w.action.to} className="rule-link mt-4 inline-block eyebrow">
                        {w.action.label} →
                      </Link>
                    ))}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="border-t border-border bg-cream">
        <div
          id="forms"
          className="mx-auto grid max-w-[1400px] scroll-mt-24 gap-14 px-5 py-20 md:px-10 lg:grid-cols-2 lg:gap-24"
        >
          <Reveal>
            <h2 className="text-3xl">Volunteer</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Tell us how you would like to help — teaching, practical skills, prayer or time.
            </p>
            <EnquiryForm
              kind="volunteer"
              submitLabel="Offer to volunteer"
              successText="Thank you for offering to volunteer. The ministry will be in touch."
              variant="outline"
              messageLabel="How would you like to help?"
              fields={[
                { label: "Full name", name: "name", required: true, autoComplete: "name" },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  required: true,
                  autoComplete: "email",
                },
                { label: "Phone", name: "phone", type: "tel", autoComplete: "tel" },
                { label: "Area of interest", name: "subject" },
              ]}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl">Partner enquiry</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Churches and organisations who would like to walk with YOKM in shared work.
            </p>
            <EnquiryForm
              kind="partner"
              submitLabel="Send enquiry"
              successText="Thank you for your enquiry. The ministry will be in touch."
              variant="outline"
              messageLabel="Tell us about the partnership"
              fields={[
                {
                  label: "Organisation",
                  name: "organisation",
                  required: true,
                  autoComplete: "organization",
                },
                { label: "Contact name", name: "name", required: true, autoComplete: "name" },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  required: true,
                  autoComplete: "email",
                },
                { label: "Phone", name: "phone", type: "tel", autoComplete: "tel" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-5 py-20 md:flex-row md:items-center md:justify-between md:px-10">
          <h2 className="max-w-[16ch] text-[clamp(1.7rem,3.4vw,2.8rem)] leading-tight">
            Help carry hope further.
          </h2>
          <Link
            to="/donate"
            className="group inline-flex items-center gap-3 self-start bg-primary-foreground px-7 py-4 text-xs uppercase tracking-[0.18em] text-primary"
          >
            Ways to give
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
