import { Link, createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
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
  component: GetInvolved;
});

const WAYS = [
  {
    title: "Give",
    text: "Support the ministry's work with widows in Jos.",
  },
  {
    title: "Volunteer",
    text: "Offer time, teaching or practical skill alongside the ministry.",
  },
  {
    title: "Partner",
    text: "Churches and organisations can walk with YOKM in shared work.",
  },
  {
    title: "Pray",
    text: "Stand with the widows and the ministry in prayer.",
  },
  {
    title: "Share",
    text: "Tell others about the ministry and its work.",
  },
];

function GetInvolved() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="There is a place for you in this work"
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
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="border-t border-border bg-cream">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-20 md:px-10 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <h2 className="text-3xl">Volunteer interest</h2>
            <InterestForm
              fields={[
                { label: "Full name", name: "v-name" },
                { label: "Email", name: "v-email", type: "email" },
                { label: "Phone", name: "v-phone", type: "tel" },
                { label: "Area of interest", name: "v-area" },
              ]}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl">Partner enquiry</h2>
            <InterestForm
              fields={[
                { label: "Organisation", name: "p-org" },
                { label: "Contact name", name: "p-name" },
                { label: "Email", name: "p-email", type: "email" },
                { label: "Phone", name: "p-phone", type: "tel" },
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

function InterestForm({
  fields,
}: {
  fields: { label: string; name: string; type?: string }[];
}) {
  return (
    <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="eyebrow text-muted-foreground">
            {f.label}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type ?? "text"}
            disabled
            className="mt-2 w-full border border-input bg-card px-4 py-3 text-sm disabled:opacity-60"
          />
        </div>
      ))}
      <div>
        <label htmlFor={`${fields[0]?.name}-msg`} className="eyebrow text-muted-foreground">
          Message
        </label>
        <textarea
          id={`${fields[0]?.name}-msg`}
          rows={4}
          disabled
          className="mt-2 w-full border border-input bg-card px-4 py-3 text-sm disabled:opacity-60"
        />
      </div>
      <button
        type="submit"
        disabled
        className="w-full border border-primary px-6 py-4 text-xs uppercase tracking-[0.18em] text-primary disabled:opacity-50"
      >
        Submit
      </button>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Submissions are not connected yet — this form cannot send anything until a destination is
        confirmed.
      </p>
    </form>
  );
}
