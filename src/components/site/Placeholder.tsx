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
      <div>
        <span
          aria-hidden
          className={`block h-1 w-10 rounded-full ${dark ? "bg-sky" : "bg-plum"}`}
        />
        <p className={`eyebrow mt-5 ${dark ? "text-sky" : "text-plum"}`}>Coming soon</p>
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
