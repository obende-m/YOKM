import type { ReactNode } from "react";

/**
 * Clearly marked area awaiting verified YOKM content.
 * Never styled to look like real published information.
 */
export function Pending({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <div className="border border-dashed border-border bg-secondary/40 p-8">
      <p className="eyebrow text-muted-foreground">Awaiting content</p>
      <p className="mt-3 font-serif text-xl text-foreground">{label}</p>
      {children && <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</div>}
    </div>
  );
}
