import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Rise } from "@/components/motion";
import { PageBanner } from "@/components/site/Blocks";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { contactChannels, socialLinks, useSettings, useSiteText } from "@/lib/cms";
import { PHOTOS } from "@/lib/photos";
import { ORG } from "@/lib/yokm";

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

const ICONS: Record<string, typeof Mail> = { Email: Mail, Phone: Phone, WhatsApp: MessageCircle };

function Contact() {
  const { data: settings = {} } = useSettings();
  const t = useSiteText();
  const channels = contactChannels(settings);
  const socials = socialLinks(settings);

  return (
    <>
      <PageBanner
        eyebrow="Contact"
        title="Write to the *ministry*"
        intro="Questions, prayer requests and enquiries are all welcome."
        photo={PHOTOS.addressing}
      />

      <section className="section-pad bg-paper">
        <div className="wrap">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <Rise className="card p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-wine text-paper">
                <MapPin aria-hidden className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <p className="eyebrow mt-6 text-plum">Office</p>
              <address className="mt-2 whitespace-pre-line not-italic leading-relaxed">
                {t("contact_address")}
              </address>
            </Rise>
            {channels.map((c, i) => {
              const Icon = ICONS[c.label] ?? Mail;
              return (
                <Rise key={c.label} delay={(i + 1) * 0.06}>
                  <a
                    href={c.href}
                    className="card group h-full p-7"
                    {...(c.href?.startsWith("https")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-wine text-paper transition-colors group-hover:bg-sky-deep">
                      <Icon aria-hidden className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <p className="eyebrow mt-6 text-plum">{c.label}</p>
                    <p className="mt-2 break-words leading-relaxed group-hover:text-wine">
                      {c.value}
                    </p>
                  </a>
                </Rise>
              );
            })}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            <div className="rounded-[var(--r-panel)] bg-wine p-8 text-paper md:p-10 lg:col-span-4">
              <p className="pill bg-paper/10 text-sky">Before you write</p>
              <h2 className="h-sub mt-5">What to include</h2>
              <ul className="mt-5 space-y-3 leading-relaxed text-paper/80">
                <li>Your name and a way to reach you.</li>
                <li>What your message is about: a question, a prayer request or an enquiry.</li>
                <li>Anything the ministry should know before replying.</li>
              </ul>
              {socials.length > 0 && (
                <>
                  <p className="eyebrow mt-10 text-sky">Follow the ministry</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {socials.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center rounded-full bg-paper/10 px-4 text-sm hover:bg-paper/20"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <p className="mt-10 font-serif text-xl italic text-paper/75">{ORG.motto}</p>
            </div>

            <div className="card p-7 md:p-10 lg:col-span-8">
              <p className="pill self-start bg-plum/10 text-plum">Send a message</p>
              <h2 className="h-section mt-5">How can we help?</h2>
              <EnquiryForm
                kind="contact"
                submitLabel="Send the message"
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
