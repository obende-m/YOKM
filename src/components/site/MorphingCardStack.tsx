import { LayoutGroup, motion, type PanInfo } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type Mode = "stack" | "grid" | "list";
export type StackCard = { id: string; no: string; title: string; text: string; meta?: string };

/** Cards that morph between a swipeable stack, a grid and a list. */
export function MorphingCardStack({ cards }: { cards: StackCard[] }) {
  const [mode, setMode] = useState<Mode>("stack");
  const [active, setActive] = useState(0);
  if (cards.length === 0) return null;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) setActive((a) => (a + 1) % cards.length);
    else if (info.offset.x > 60) setActive((a) => (a - 1 + cards.length) % cards.length);
  };

  const ordered =
    mode === "stack"
      ? cards.map((_, i) => ({ ...cards[(active + i) % cards.length]!, pos: i })).reverse()
      : cards.map((c, i) => ({ ...c, pos: i }));

  return (
    <div>
      <div className="mb-10 flex gap-6" role="tablist" aria-label="Layout">
        {(["stack", "grid", "list"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            data-active={mode === m}
            className={cn(
              "rule-link eyebrow",
              mode === m ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {m}
          </button>
        ))}
      </div>

      <LayoutGroup>
        <motion.div
          layout
          className={cn(
            mode === "stack" && "relative h-[360px] max-w-md",
            mode === "grid" && "grid gap-px bg-border sm:grid-cols-2",
            mode === "list" && "border-t border-border",
          )}
        >
          {ordered.map((c) => {
            const top = mode === "stack" && c.pos === 0;
            return (
              <motion.article
                key={c.id}
                layoutId={c.id}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 32 }}
                drag={top ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={onDragEnd}
                style={
                  mode === "stack"
                    ? {
                        position: "absolute",
                        inset: 0,
                        zIndex: cards.length - c.pos,
                        top: c.pos * 10,
                        left: c.pos * 10,
                        rotate: c.pos === 0 ? 0 : (c.pos % 2 ? 1.5 : -1.5),
                      }
                    : undefined
                }
                className={cn(
                  "flex flex-col bg-background p-8 md:p-10",
                  mode === "stack" && "border border-border bg-card shadow-[0_8px_30px_oklch(0_0_0/0.06)]",
                  top && "cursor-grab active:cursor-grabbing",
                  mode === "list" && "border-b border-border px-0 py-7 md:px-0 md:py-8",
                )}
              >
                <span className="eyebrow text-accent">{c.no}</span>
                <h3 className="mt-4 text-3xl">{c.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                {c.meta && <span className="mt-6 eyebrow text-muted-foreground">{c.meta}</span>}
              </motion.article>
            );
          })}
        </motion.div>
      </LayoutGroup>
      {mode === "stack" && (
        <p className="mt-16 eyebrow text-muted-foreground">
          Swipe or drag the top card · {active + 1} / {cards.length}
        </p>
      )}
    </div>
  );
}
