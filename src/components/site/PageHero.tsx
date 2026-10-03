import type { ReactNode } from "react";

import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-secondary">
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-28 md:px-10 md:pb-16 md:pt-36">
        <Reveal>
          <p className="eyebrow text-muted-foreground">{eyebrow}</p>
          <h1 className="mt-4 max-w-[18ch] text-[clamp(2.2rem,5.6vw,4.6rem)] leading-[1.0]">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
              {intro}
            </p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
