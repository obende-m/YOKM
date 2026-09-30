import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Pending } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT_CHANNELS, ORG, SOCIAL_LINKS } from "@/lib/yokm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Yendel Ocha Kpeling Ministry" },
      {
        name: "description",
        content:
          "Reach Yendel Ocha Kpeling Ministry at No. 24 Naraguta Avenue, Jos North L.G.A., Jos, Plateau State, Nigeria.",
      },
      { property: "og:title", content: "Contact Yendel Ocha Kpeling Ministry" },
      {
        property: "og:description",
        content: "Get in touch with YOKM in Jos, Plateau State, Nigeria.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Reach the ministry" />

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <p className="eyebrow text-muted-foreground">Office</p>
            <address className="mt-4 max-w-sm text-xl not-italic leading-relaxed">
              {ORG.address}
            </address>

            {CONTACT_CHANNELS.length > 0 ? (
              <ul className="mt-10 space-y-3">
                {CONTACT_CHANNELS.map((c) => (
                  <li key={c.label} className="text-sm">
                    <span className="eyebrow mr-3 text-muted-foreground">{c.label}</span>
                    {c.href ? (
                      <a href={c.href} className="rule-link">
                        {c.value}
                      </a>
                    ) : (
                      c.value
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-10">
                <Pending label="Email, phone and WhatsApp">
                  These will be shown here once the ministry supplies verified contact details.
                </Pending>
              </div>
            )}

            {SOCIAL_LINKS.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-5 text-sm">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} className="rule-link">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow text-muted-foreground">Send a message</p>
            <form className="mt-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <Field label="Full name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="Phone" name="phone" type="tel" />
              <div>
                <label htmlFor="message" className="eyebrow text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  disabled
                  className="mt-2 w-full border border-input bg-card px-4 py-3 text-sm disabled:opacity-60"
                />
              </div>
              <button
                type="submit"
                disabled
                className="w-full bg-primary px-6 py-4 text-xs uppercase tracking-[0.18em] text-primary-foreground disabled:opacity-50"
              >
                Send message
              </button>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Message delivery is not connected yet, so this form cannot send anything. It will be
                switched on once a destination address is confirmed.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        disabled
        className="mt-2 w-full border border-input bg-card px-4 py-3 text-sm disabled:opacity-60"
      />
    </div>
  );
}
