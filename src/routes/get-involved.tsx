import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Gift, Handshake, HeartHandshake, Share2, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

import { EASE, Rise } from "@/components/motion";
import { PageBanner, SectionHead } from "@/components/site/Blocks";
import { Cta } from "@/components/site/Cta";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { useSiteText } from "@/lib/cms";
import { PHOTOS, pick } from "@/lib/photos";

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

type FormKind = "volunteer" | "partner";

function GetInvolved() {
  const t = useSiteText();
  const [form, setForm] = useState<FormKind>("volunteer");

  const openForm = (f: FormKind) => {
    setForm(f);
    document.getElementById("forms")?.scrollIntoView({ behavior: "smooth" });
  };

  const share = async () => {
    const url = window.location.origin;
    try {
      if (navigator.share) await navigator.share({ title: "Yendel Ocha Kpeling Ministry", url });
      else {
        await navigator.clipboard.writeText(url);
        toast.success("Website link copied.");
      }
    } catch {
      /* the visitor closed the share sheet */
    }
  };

  const ways = [
    {
      icon: Gift,
      title: "Give",
      text: "Support the ministry’s work with widows in Jos.",
      label: "See ways to give",
      to: "/donate",
    },
    {
      icon: Sparkles,
      title: "Volunteer",
      text: "Offer time, teaching or a practical skill alongside the ministry.",
      label: "Offer to volunteer",
      onClick: () => openForm("volunteer"),
    },
    {
      icon: Handshake,
      title: "Partner",
      text: "Churches and organisations can walk with YOKM in shared work.",
      label: "Send a partnership enquiry",
      onClick: () => openForm("partner"),
    },
    {
      icon: HeartHandshake,
      title: "Pray",
      text: "Stand with the widows and the ministry in prayer.",
      label: "Send a prayer request",
      to: "/contact",
    },
    {
      icon: Share2,
      title: "Share",
      text: "Tell others about the ministry and its work.",
      label: "Copy the website link",
      onClick: share,
    },
  ];

  return (
    <>
      <PageBanner
        eyebrow="Get involved"
        title="There is a place for *you* in this work"
        intro={t("involved_intro")}
        photo={pick(t("involved_image"), PHOTOS.standingPortrait)}
      >
        <Cta to="/get-involved" hash="forms" variant="accent">
          Offer to volunteer
        </Cta>
      </PageBanner>

      <section className="section-pad bg-paper">
        <div className="wrap">
          <SectionHead
            eyebrow="Five ways to help"
            title="Choose how you would like to *serve*"
            center
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {ways.map((w, i) => {
              const inner = (
                <>
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-wine text-paper">
                    <w.icon aria-hidden className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <h3 className="h-sub mt-6">{w.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink/70">{w.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-wine">
                    {w.label}
                    <ArrowRight
                      aria-hidden
                      className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                    />
                  </span>
                </>
              );
              const span = i < 3 ? "lg:col-span-2" : "lg:col-span-3";
              return (
                <Rise key={w.title} delay={(i % 3) * 0.08} className={`h-full ${span}`}>
                  {w.to ? (
                    <Link to={w.to as "/"} className="card group h-full p-8">
                      {inner}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={w.onClick}
                      data-link
                      className="card group h-full w-full p-8 text-left"
                    >
                      {inner}
                    </button>
                  )}
                </Rise>
              );
            })}
          </div>
        </div>
      </section>

      <section id="forms" className="section-pad scroll-mt-24 bg-blush">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="pill bg-plum/10 text-plum">Write to the ministry</p>
            <h2 className="h-section mt-5">
              {form === "volunteer" ? "Offer your time" : "Walk with us as a partner"}
            </h2>
            <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-ink/70">
              {form === "volunteer"
                ? "Tell us how you would like to help: teaching, practical skills, prayer or time."
                : "For churches and organisations who would like to share in the ministry’s work."}
            </p>
            <div className="mt-8 hidden overflow-hidden rounded-[var(--r-card)] lg:block">
              <img
                src={PHOTOS.teachingCircle.src}
                srcSet={PHOTOS.teachingCircle.srcSet}
                sizes="35vw"
                alt={PHOTOS.teachingCircle.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>

          <div className="card p-7 md:p-10 lg:col-span-7">
            <div
              role="tablist"
              aria-label="Choose a form"
              className="inline-flex self-start rounded-full bg-blush p-1"
            >
              {(["volunteer", "partner"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={form === f}
                  aria-controls="involved-form"
                  onClick={() => setForm(f)}
                  className="relative min-h-11 rounded-full px-6 text-sm font-semibold"
                >
                  {form === f && (
                    <motion.span
                      layoutId="form-tab"
                      transition={{ duration: 0.45, ease: EASE }}
                      className="absolute inset-0 rounded-full bg-wine"
                    />
                  )}
                  <span className={`relative ${form === f ? "text-paper" : "text-ink/70"}`}>
                    {f === "volunteer" ? "Volunteer" : "Partner"}
                  </span>
                </button>
              ))}
            </div>

            <div id="involved-form" role="tabpanel">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={form}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {form === "volunteer" ? (
                    <EnquiryForm
                      kind="volunteer"
                      submitLabel="Offer to volunteer"
                      successText="Thank you for offering to volunteer. The ministry will be in touch."
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
                  ) : (
                    <EnquiryForm
                      kind="partner"
                      submitLabel="Send the enquiry"
                      successText="Thank you for your enquiry. The ministry will be in touch."
                      messageLabel="Tell us about the partnership"
                      fields={[
                        {
                          label: "Organisation",
                          name: "organisation",
                          required: true,
                          autoComplete: "organization",
                        },
                        {
                          label: "Contact name",
                          name: "name",
                          required: true,
                          autoComplete: "name",
                        },
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
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
