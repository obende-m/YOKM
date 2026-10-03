import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const TRANSFORMS = [
  { x: -150, r: 6 },
  { x: -70, r: 1 },
  { x: 0, r: -5 },
  { x: 70, r: 5 },
  { x: 150, r: -4 },
];

/** Fanned photographs that settle with a soft bounce; hover pushes neighbours aside. */
export function BounceCards({ images }: { images: { src: string; alt: string }[] }) {
  const reduced = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const items = images.slice(0, 5);
  const offset = Math.floor(items.length / 2);

  return (
    <div className="relative mx-auto h-[230px] w-full max-w-[520px] sm:h-[300px]">
      {items.map((img, i) => {
        const t = TRANSFORMS[i + 2 - offset] ?? { x: 0, r: 0 };
        const push = hover === null || hover === i ? 0 : i < hover ? -50 : 50;
        return (
          <motion.div
            key={i}
            onHoverStart={() => setHover(i)}
            onHoverEnd={() => setHover(null)}
            initial={reduced ? false : { scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            animate={{ x: t.x + push, rotate: hover === i ? 0 : t.r }}
            transition={{ type: "spring", stiffness: 260, damping: 14, delay: reduced ? 0 : i * 0.08 }}
            className="absolute left-1/2 top-1/2 -ml-[95px] -mt-[95px] h-[190px] w-[190px] scale-[0.68] overflow-hidden rounded-lg border-[6px] border-ink-foreground shadow-[0_10px_30px_oklch(0_0_0/0.35)] sm:scale-100"
            style={{ zIndex: hover === i ? 10 : i }}
          >
            <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
          </motion.div>
        );
      })}
    </div>
  );
}
