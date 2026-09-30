import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import community from "@/assets/community-gathering.jpg";
import hero from "@/assets/hero-widow-portrait.jpg";
import skills from "@/assets/skills-hands.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { GALLERY } from "@/lib/yokm";

/** Placeholder imagery, clearly labelled, until real YOKM photographs are supplied. */
const PLACEHOLDERS = [
  { src: hero, caption: "Placeholder photograph — to be replaced with a YOKM image" },
  { src: community, caption: "Placeholder photograph — to be replaced with a YOKM image" },
  { src: skills, caption: "Placeholder photograph — to be replaced with a YOKM image" },
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Yendel Ocha Kpeling Ministry" },
      {
        name: "description",
        content:
          "Photographs from the work of Yendel Ocha Kpeling Ministry among widows in Jos, Plateau State, Nigeria.",
      },
      { property: "og:title", content: "Gallery — Yendel Ocha Kpeling Ministry" },
      {
        property: "og:description",
        content: "Photographs from YOKM's work among widows in Jos, Nigeria.",
      },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const images = GALLERY.length > 0 ? GALLERY : PLACEHOLDERS;
  const isPlaceholder = GALLERY.length === 0;
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The ministry in photographs"
        intro={
          isPlaceholder
            ? "Real YOKM photographs will replace the images below once they are supplied."
            : undefined
        }
      />

      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {images.map((img, i) => (
            <Reveal key={i} delay={Math.min(i * 0.06, 0.3)}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="img-zoom block w-full text-left"
                aria-label={`Open photograph ${i + 1}`}
              >
                <img src={img.src} alt={img.caption} loading="lazy" className="w-full" />
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-5"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-5 top-5 text-xs uppercase tracking-[0.18em] text-ink-foreground"
            >
              Close
            </button>
            <figure className="max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <img
                src={images[active].src}
                alt={images[active].caption}
                className="max-h-[78svh] w-auto object-contain"
              />
              <figcaption className="mt-4 text-sm text-ink-foreground/70">
                {images[active].caption}
              </figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
