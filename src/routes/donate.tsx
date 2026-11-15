import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { PageHero } from "@/components/site/PageHero";
import { Pending } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";
import { isHttpUrl, useSettings, useSiteText } from "@/lib/cms";
import { ORG } from "@/lib/yokm";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Support YOKM — Yendel Ocha Kpeling Ministry" },
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
      <PageHero eyebrow="Support YOKM" title="Help carry hope further" intro={t("donate_intro")} />

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-24">
          <Reveal className="space-y-10">
            {isLoading ? (
              <div className="h-40" aria-busy="true" />
            ) : configured ? (
              <>
                {url && (
                  <div>
                    <p className="eyebrow text-muted-foreground">Give online</p>
                    <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                      You will be taken to the ministry&rsquo;s secure giving page to complete your
                      gift.
                    </p>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-6 inline-flex items-center gap-3 bg-primary px-7 py-5 text-xs uppercase tracking-[0.18em] text-primary-foreground"
                    >
                      Give online
                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        ↗
                      </span>
                    </a>
                  </div>
                )}
                {bank && <BankDetails text={bank} />}
                {instructions && (
                  <div>
                    <p className="eyebrow text-muted-foreground">How to give</p>
                    <p className="mt-3 max-w-xl whitespace-pre-line leading-relaxed">
                      {instructions}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <Pending label="Giving details">
                Bank account details or an online giving link will be published here once the
                ministry provides them. In the meantime, please{" "}
                <Link to="/contact" className="underline">
                  contact the ministry
                </Link>{" "}
                to arrange a gift.
              </Pending>
            )}
          </Reveal>

          <Reveal delay={0.1} className="space-y-8">
            <div>
              <p className="eyebrow text-muted-foreground">Give in person</p>
              <address className="mt-3 not-italic leading-relaxed">{t("contact_address")}</address>
            </div>
            <div>
              <p className="eyebrow text-muted-foreground">Other ways to help</p>
              <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                Volunteer your time, partner with the ministry, or stand with the widows in prayer.
              </p>
              <Link to="/get-involved" className="rule-link mt-4 inline-block eyebrow">
                Get involved →
              </Link>
            </div>
            <p className="font-serif text-xl">&ldquo;{ORG.motto}&rdquo;</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function BankDetails({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="border border-border bg-cream p-6 md:p-8">
      <p className="eyebrow text-muted-foreground">Bank transfer</p>
      <p className="mt-4 whitespace-pre-line font-serif text-xl leading-relaxed">{text}</p>
      <button
        type="button"
        className="mt-5 text-xs uppercase tracking-[0.16em] text-primary underline-offset-4 hover:underline"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            toast.error("Could not copy — please select the details instead.");
          }
        }}
      >
        {copied ? "Copied" : "Copy details"}
      </button>
    </div>
  );
}
