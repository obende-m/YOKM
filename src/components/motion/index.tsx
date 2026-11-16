import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Fragment, useRef, type CSSProperties, type ReactNode } from "react";

import type { Photo } from "@/lib/photos";

export const EASE = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------- */
/* Text                                                                       */
/* -------------------------------------------------------------------------- */

type Word = { text: string; accent: boolean };

/**
 * Splits a headline into words. Words wrapped in *asterisks* are set as the italic
 * accent; `accentLast` does the same for the final word when none are marked.
 */
function parseWords(text: string, accentLast: boolean): Word[] {
  const marked = /\*[^*]+\*/.test(text);
  const out: Word[] = [];
  let inAccent = false;
  for (const raw of text.trim().split(/\s+/)) {
    let w = raw;
    let accent = inAccent;
    if (w.startsWith("*")) {
      accent = true;
      inAccent = true;
      w = w.slice(1);
    }
    if (w.endsWith("*") || w.replace(/[.,;:!?’'"”]+$/, "").endsWith("*")) {
      w = w.replace(/\*([.,;:!?’'"”]*)$/, "$1");
      inAccent = false;
    }
    out.push({ text: w, accent });
  }
  if (!marked && accentLast && out.length > 1) out[out.length - 1]!.accent = true;
  return out;
}

const plainText = (text: string) => text.replace(/\*/g, "");

type Tag = "h1" | "h2" | "h3" | "p" | "blockquote" | "div";

/**
 * A headline whose words rise from behind a mask, one after another.
 * `trigger="mount"` uses CSS so the hero animates before hydration; `"view"` waits
 * until the line scrolls into view. Screen readers get the plain sentence once.
 */
export function SplitText({
  text,
  as: As = "h2",
  className,
  accentClass = "accent-word",
  accentLast = false,
  trigger = "view",
  delay = 0,
  stagger = 0.06,
  id,
}: {
  text: string;
  as?: Tag;
  className?: string;
  accentClass?: string;
  accentLast?: boolean;
  trigger?: "mount" | "view";
  delay?: number;
  stagger?: number;
  id?: string;
}) {
  const reduced = useReducedMotion();
  const words = parseWords(text, accentLast);
  const mask = "inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom";

  const render = (w: Word, i: number, inner: ReactNode) => (
    <Fragment key={i}>
      <span className={mask}>{inner}</span>
      {i < words.length - 1 ? " " : ""}
    </Fragment>
  );

  if (reduced) {
    return (
      <As className={className} id={id}>
        {words.map((w, i) => (
          <span key={i} className={w.accent ? accentClass : undefined}>
            {w.text}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </As>
    );
  }

  if (trigger === "mount") {
    return (
      <As className={className} id={id}>
        <span>
          {words.map((w, i) =>
            render(
              w,
              i,
              <span
                className={`word-rise inline-block ${w.accent ? accentClass : ""}`}
                style={{ animationDelay: `${delay + i * stagger}s` } as CSSProperties}
              >
                {w.text}
              </span>,
            ),
          )}
        </span>
      </As>
    );
  }

  return (
    <As className={className} id={id}>
      <motion.span
        className="block"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {words.map((w, i) =>
          render(
            w,
            i,
            <motion.span
              className={`inline-block ${w.accent ? accentClass : ""}`}
              variants={{ hidden: { y: "108%" }, show: { y: "0%" } }}
              transition={{ duration: 1.1, ease: EASE }}
            >
              {w.text}
            </motion.span>,
          ),
        )}
      </motion.span>
    </As>
  );
}

/**
 * A statement that lights up word by word as it scrolls through the screen.
 */
export function WordHighlight({
  text,
  className,
  as: As = "p",
  dim = 0.16,
}: {
  text: string;
  className?: string;
  as?: Tag;
  dim?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.82", "end 0.4"] });
  const words = parseWords(text, false);
  if (reduced) {
    return <As className={className}>{plainText(text)}</As>;
  }
  return (
    <div ref={ref}>
      <As className={className}>
        <span>
          {words.map((w, i) => (
            <HighlightWord
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
              dim={dim}
              accent={w.accent}
            >
              {w.text}
              {i < words.length - 1 ? " " : ""}
            </HighlightWord>
          ))}
        </span>
      </As>
    </div>
  );
}

function HighlightWord({
  progress,
  range,
  dim,
  accent,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  dim: number;
  accent: boolean;
  children: ReactNode;
}) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "accent-word" : undefined}>
      {children}
    </motion.span>
  );
}

/** A small fade-and-rise for supporting copy. Used sparingly, never on every block. */
export function Rise({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "p";
}) {
  const reduced = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/** A rule that draws itself from left to right. */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={`block h-px origin-left bg-current ${className ?? ""}`}
      initial={reduced ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, delay, ease: EASE }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Images                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * A photograph that opens with a clip-path wipe and settles from a slight zoom.
 * `parallax` lets it drift a few percent inside its frame while the page scrolls.
 */
export function RevealImage({
  photo,
  sizes = "100vw",
  className,
  imgClassName = "",
  parallax = false,
  priority = false,
  delay = 0,
  from = "bottom",
  zoom = true,
  square = false,
}: {
  photo: Photo;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  parallax?: boolean;
  priority?: boolean;
  delay?: number;
  from?: "bottom" | "left" | "right" | "top";
  zoom?: boolean;
  /** Photographs have soft corners by default; `square` opts out (e.g. inside a rounded card). */
  square?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const hidden = {
    bottom: "inset(100% 0% 0% 0%)",
    top: "inset(0% 0% 100% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
  }[from];
  const usesParallax = parallax && !reduced;

  const img = (
    <motion.img
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={photo.srcSet ? sizes : undefined}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      style={usesParallax ? { y } : undefined}
      initial={reduced || !zoom ? false : { scale: 1.22 }}
      {...(priority
        ? { animate: { scale: 1 } }
        : { whileInView: { scale: 1 }, viewport: { once: true } })}
      transition={{ duration: 1.8, delay, ease: EASE }}
      className={`absolute left-0 h-full w-full object-cover ${
        usesParallax ? "-top-[7%] !h-[114%]" : "top-0"
      } ${imgClassName}`}
    />
  );

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden [transform:translateZ(0)] ${
        square ? "" : "rounded-[var(--r-card)]"
      } ${className ?? ""}`}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { clipPath: hidden }}
        {...(priority
          ? { animate: { clipPath: "inset(0% 0% 0% 0%)" } }
          : {
              whileInView: { clipPath: "inset(0% 0% 0% 0%)" },
              viewport: { once: true, margin: "0px 0px -10% 0px" },
            })}
        transition={{ duration: 1.4, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        {img}
      </motion.div>
    </div>
  );
}

/** Scroll-linked drift for decorative layers (never for text). */
export function useDrift(distance = 60) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [distance, -distance]);
  return { ref, y };
}
