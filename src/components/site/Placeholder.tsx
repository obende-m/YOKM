import { Clock } from "lucide-react";
import type { ReactNode } from "react";

/**
 * A friendly empty state for content the ministry has not published yet.
 * It never imitates real content: it says plainly what will appear here.
 */
export function Pending({
  label,
  children,
  action,
  tone = "light",
}: {
  label: string;
  children?: ReactNode;
  action?: ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`flex flex-col gap-6 rounded-[var(--r-card)] p-8 sm:flex-row sm:items-start md:p-10 ${
        dark ? "bg-paper/6 ring-1 ring-paper/12" : "card"
      }`}
    >
      <span
        className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${
          dark ? "bg-paper/10 text-sky" : "bg-blush text-wine"
        }`}
      >
        <Clock aria-hidden className="h-6 w-6" strokeWidth={1.6} />
      </span>
      <div>
        <p className={`eyebrow ${dark ? "text-sky" : "text-plum"}`}>Coming soon</p>
        <p className="h-sub mt-3 max-w-[30ch]">{label}</p>
        {children && (
          <div
            className={`mt-3 max-w-xl leading-relaxed ${dark ? "text-paper/70" : "text-ink/70"}`}
          >
            {children}
          </div>
        )}
        {action && <div className="mt-7">{action}</div>}
      </div>
    </div>
  );
}
