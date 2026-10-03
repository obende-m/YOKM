import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Item = { src: string; caption: string };

/** A slowly turning 3D ring of photographs. Drag to turn; click a card to open it. */
export function CircularCarousel({ items, onOpen }: { items: Item[]; onOpen?: (i: number) => void }) {
  const reduced = useReducedMotion();
  const [angle, setAngle] = useState(0);
  const drag = useRef<{ x: number; a: number; moved: boolean } | null>(null);
  // Repeat items so the ring always has enough cards.
  const ring = Array.from({ length: Math.max(8, items.length) }, (_, i) => ({
    ...items[i % items.length]!,
    idx: i % items.length,
  }));
  const step = 360 / ring.length;
  const card = 220;
  const radius = Math.round(card / 2 / Math.tan(Math.PI / ring.length)) + 30;

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      if (!drag.current) setAngle((a) => a - ((t - last) / 1000) * 10);
      last = t;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <div
      className="relative h-[420px] w-full cursor-grab select-none overflow-hidden active:cursor-grabbing md:h-[520px]"
      style={{ perspective: 1400 }}
      onPointerDown={(e) => (drag.current = { x: e.clientX, a: angle, moved: false })}
      onPointerMove={(e) => {
        if (!drag.current) return;
        const dx = e.clientX - drag.current.x;
        if (Math.abs(dx) > 4) drag.current.moved = true;
        setAngle(drag.current.a + dx * 0.25);
      }}
      onPointerUp={() => setTimeout(() => (drag.current = null), 0)}
      onPointerLeave={() => (drag.current = null)}
    >
      <div
        className="absolute left-1/2 top-1/2 scale-[0.6] md:scale-100"
        style={{ transformStyle: "preserve-3d", transform: `rotateX(-6deg) rotateY(${angle}deg)` }}
      >
        {ring.map((it, i) => (
          <button
            key={i}
            type="button"
            onClick={() => !drag.current?.moved && onOpen?.(it.idx)}
            className="absolute overflow-hidden"
            style={{
              width: card,
              height: card * 1.25,
              left: -card / 2,
              top: (-card * 1.25) / 2,
              borderRadius: "calc(var(--radius) + 2px)",
              transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
              backfaceVisibility: "hidden",
            }}
            aria-label={`Open photograph ${it.idx + 1}`}
          >
            <img src={it.src} alt={it.caption} draggable={false} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
