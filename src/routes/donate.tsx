import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Rise } from "@/components/motion";
import { PageBanner, SectionHead } from "@/components/site/Blocks";
import { Cta } from "@/components/site/Cta";
import { Pending } from "@/components/site/Placeholder";
import { isHttpUrl, useSettings, useSiteText } from "@/lib/cms";
import { PHOTOS } from "@/lib/photos";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Support YOKM | Yendel Ocha Kpeling Ministry" },
      {
        name: "description",
        content:
          "Give to Yendel Ocha Kpeling Ministry and stand with widows in Jos, Plateau State, Nigeria as they grow in faith and become independent.",
      },
      { property: "og:title", content: "Support Yendel Ocha Kpeling Ministry" },
      {
        property: "og:description",
        content: "Participate in YOKM's work with widows in Jos, Nigeria.",
      },
    ],
  }),
  component: Donate,
});

function Donate() {
  const t = useSiteText();
  const { data: s = {}, isLoading } = useSettings();
  const url = s["donation_url"] && isHttpUrl(s["donation_url"]) ? s["donation_url"] : "";
  const bank = s["donation_bank"] ?? "";
  const instructions = s["donation_instructions"] ?? "";
  const configured = !!(url || bank);

  return (
    <>
      <PageBanner
        eyebrow="Donate"
        title="Help carry hope *further*"
        intro={t("donate_intro")}
        photo={PHOTOS.giftGiven}
      >
        {url && (
          <Cta href={url} variant="accent">
            Give online
          </Cta>
        )}
      </PageBanner>

      <section className="section-pad bg-paper">
        <div className="wrap">
          <SectionHead eyebrow="Ways to give" title="Choose how you would like to *give*" center />
          {isLoading ? (
            <div className="mt-12 h-64 animate-pulse rounded-[var(--r-card)] bg-blush" />
          ) : configured ? (
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {url && (
                <Rise className="card p-8">
                  <span aria-hidden className="block h-1 w-10 rounded-full bg-plum" />
                  <h3 className="h-sub mt-6">Give online</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink/70">
                    The ministry&rsquo;s secure giving page opens in a new tab, where you can
                    complete your gift.
                  </p>
                  <div className="mt-8">
                    <Cta href={url} variant="solid">
                      Give online
                    </Cta>
                  </div>
                </Rise>
              )}
              {bank && (
                <Rise delay={0.08} className="card p-8">
                  <span aria-hidden className="block h-1 w-10 rounded-full bg-plum" />
                  <h3 className="h-sub mt-6">Bank transfer</h3>
                  <BankDetails text={bank} />
                </Rise>
              )}
              <Rise delay={0.16} className="card p-8">
                <span aria-hidden className="block h-1 w-10 rounded-full bg-plum" />
                <h3 className="h-sub mt-6">Give in person</h3>
                <address className="mt-3 flex-1 whitespace-pre-line not-italic leading-relaxed text-ink/75">
                  {t("contact_address")}
                </address>
                <div className="mt-8">
                  <Cta to="/contact" variant="outline">
                    Contact the ministry
                  </Cta>
                </div>
              </Rise>
            </div>
          ) : (
            <div className="mt-12">
              <Pending
                label="Giving details will be published here"
                action={
                  <Cta to="/contact" variant="solid">
                    Contact the ministry
                  </Cta>
                }
              >
                Until then, please contact the ministry to arrange a gift.
              </Pending>
            </div>
          )}

          {instructions && (
            <Rise className="mt-6 rounded-[var(--r-card)] bg-blush p-7 md:p-9">
              <p className="eyebrow text-plum">Please note</p>
              <p className="mt-3 max-w-3xl whitespace-pre-line leading-relaxed">{instructions}</p>
            </Rise>
          )}
        </div>
      </section>

      <section className="bg-paper pb-20 md:pb-28">
        <div className="wrap">
          <div className="flex flex-col items-start gap-8 rounded-[var(--r-panel)] bg-wine p-8 text-paper md:flex-row md:items-center md:justify-between md:p-12">
            <div className="flex gap-5">
              <span aria-hidden className="block h-1 w-10 rounded-full bg-sky" />
              <div>
                <h2 className="h-sub">Other ways to help</h2>
                <p className="mt-2 max-w-lg text-paper/78">
                  Volunteer your time, partner with the ministry, or stand with the widows in
                  prayer.
                </p>
              </div>
            </div>
            <Cta to="/get-involved" variant="accent">
              See other ways to help
            </Cta>
          </div>
        </div>
      </section>
    </>
  );
}

function BankDetails({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const lines = text.split("\n").filter((l) => l.trim());
  return (
    <div className="mt-4 flex flex-1 flex-col">
      <dl className="flex-1 divide-y divide-ink/10 overflow-hidden rounded-2xl bg-blush/60">
        {lines.map((line, i) => {
          const m = line.match(/^([^:]{2,30}):\s*(.+)$/);
          return (
            <div key={i} className="px-4 py-3">
              {m ? (
                <>
                  <dt className="eyebrow text-[0.65rem] text-ink/50">{m[1]}</dt>
                  <dd className="mt-0.5 font-medium">{m[2]}</dd>
                </>
              ) : (
                <dd className="font-semibold">{line}</dd>
              )}
            </div>
          );
        })}
      </dl>
      <button
        type="button"
        className="btn mt-6 self-start"
        data-variant="outline"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
          } catch {
            toast.error("Could not copy. Please select the details instead.");
          }
        }}
      >
        {copied ? (
          <Check aria-hidden className="h-4 w-4" />
        ) : (
          <Copy aria-hidden className="h-4 w-4" strokeWidth={1.6} />
        )}
        <span>{copied ? "Copied" : "Copy the details"}</span>
      </button>
    </div>
  );
}
