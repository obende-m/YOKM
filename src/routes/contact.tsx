import { createFileRoute } from "@tanstack/react-router";

import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PageHero } from "@/components/site/PageHero";
import { Pending } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";
import { contactChannels, socialLinks, useSettings, useSiteText } from "@/lib/cms";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
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
  const { data: settings = {} } = useSettings();
  const t = useSiteText();
  const channels = contactChannels(settings);
  const socials = socialLinks(settings);

  return (
    <>
      <PageHero eyebrow="Contact" title="Reach the ministry" />

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <p className="eyebrow text-muted-foreground">Office</p>
            <address className="mt-4 max-w-sm whitespace-pre-line text-xl not-italic leading-relaxed">
              {t("contact_address")}
            </address>

            {channels.length > 0 ? (
              <ul className="mt-10 space-y-3">
                {channels.map((c) => (
                  <li key={c.label} className="text-sm">
                    <span className="eyebrow mr-3 text-muted-foreground">{c.label}</span>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="rule-link"
                        {...(c.href.startsWith("https")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
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
                  These will be shown here once the ministry supplies verified contact details. You
                  can still send a message using the form.
                </Pending>
              </div>
            )}

            {socials.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-5 text-sm">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rule-link"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow text-muted-foreground">Send a message</p>
            <EnquiryForm
              kind="contact"
              submitLabel="Send message"
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
                { label: "Subject", name: "subject" },
              ]}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
