import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageHero } from "@/components/site/PageHero";
import { Pending } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";
import { DONATION, ORG } from "@/lib/yokm";

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

const FREQUENCIES = ["One-time", "Monthly"] as const;
const AMOUNTS = ["5,000", "20,000", "50,000"];

function Donate() {
  const [freq, setFreq] = useState<string>(FREQUENCIES[0]);
  const [amount, setAmount] = useState<string>(AMOUNTS[1] ?? "");
  const [other, setOther] = useState("");

  return (
    <>
      <PageHero
        eyebrow="Support YOKM"
        title="Help carry hope further"
        intro="Giving to YOKM is participation in the mission — standing with widows as they grow in faith, discover their gifts and become independent."
      />

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-24">
          <Reveal>
            <fieldset>
              <legend className="eyebrow text-muted-foreground">Giving</legend>
              <div className="mt-4 flex gap-px bg-border">
                {FREQUENCIES.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFreq(f)}
                    aria-pressed={freq === f}
                    className={`flex-1 px-6 py-4 text-xs uppercase tracking-[0.18em] transition-colors ${
                      freq === f
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-10">
              <legend className="eyebrow text-muted-foreground">Amount (₦)</legend>
              <div className="mt-4 grid gap-px bg-border sm:grid-cols-3">
                {AMOUNTS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => {
                      setAmount(a);
                      setOther("");
                    }}
                    aria-pressed={amount === a && !other}
                    className={`px-6 py-5 font-serif text-xl transition-colors ${
                      amount === a && !other
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-secondary"
                    }`}
                  >
                    ₦{a}
                  </button>
                ))}
              </div>
              <label htmlFor="other" className="eyebrow mt-6 block text-muted-foreground">
                Other amount
              </label>
              <input
                id="other"
                inputMode="numeric"
                value={other}
                onChange={(e) => setOther(e.target.value)}
                className="mt-2 w-full border border-input bg-card px-4 py-3 text-sm"
              />
            </fieldset>

            <button
              type="button"
              disabled={!DONATION.configured}
              className="mt-10 w-full bg-primary px-6 py-5 text-xs uppercase tracking-[0.18em] text-primary-foreground disabled:opacity-50"
            >
              {DONATION.configured ? "Continue to payment" : "Giving not yet available online"}
            </button>
            {!DONATION.configured && (
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Online giving is not connected yet. No payment provider, bank account or giving link
                has been supplied, so none is shown here.
              </p>
            )}
          </Reveal>

          <Reveal delay={0.1} className="space-y-8">
            <Pending label="Giving details">
              Bank account details, a payment provider or a giving link will be published here once
              YOKM supplies them officially.
            </Pending>
            <div>
              <p className="eyebrow text-muted-foreground">Give in person</p>
              <address className="mt-3 not-italic leading-relaxed">{ORG.address}</address>
            </div>
            <p className="font-serif text-xl">&ldquo;{ORG.motto}&rdquo;</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
