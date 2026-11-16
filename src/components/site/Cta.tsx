import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "solid" | "accent" | "light" | "outline" | "outline-light";

type Target = { to: string; hash?: string; href?: never } | { href: string; to?: never };

/**
 * The site's one button. Internal destinations use the router; `href` is for
 * external pages and mail/phone links, which open in a new tab when they are web pages.
 */
export function Cta({
  children,
  variant = "solid",
  className = "",
  arrow = true,
  orb = false,
  ...target
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  /** Puts the arrow inside a small circle at the end of the button. */
  orb?: boolean;
} & Target) {
  const external = "href" in target && target.href && /^https?:/i.test(target.href);
  const icon = orb ? (
    <span className="btn-orb" aria-hidden>
      <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={2} />
    </span>
  ) : arrow ? (
    external ? (
      <ArrowUpRight aria-hidden className="btn-arrow h-4 w-4" strokeWidth={1.6} />
    ) : (
      <ArrowRight aria-hidden className="btn-arrow h-4 w-4" strokeWidth={1.6} />
    )
  ) : null;

  if ("href" in target && target.href) {
    return (
      <a
        href={target.href}
        data-variant={variant}
        data-orb={orb || undefined}
        className={`btn ${className}`}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span>{children}</span>
        {icon}
      </a>
    );
  }
  return (
    <Link
      to={target.to as "/"}
      hash={"hash" in target ? target.hash : undefined}
      data-variant={variant}
      data-orb={orb || undefined}
      className={`btn ${className}`}
    >
      <span>{children}</span>
      {icon}
    </Link>
  );
}

/** An understated text link with a drawn underline and a travelling arrow. */
export function TextLink({
  children,
  to,
  hash,
  className = "",
}: {
  children: ReactNode;
  to: string;
  hash?: string;
  className?: string;
}) {
  return (
    <Link to={to as "/"} hash={hash} className={`text-link ${className}`}>
      <span>{children}</span>
      <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.6} />
    </Link>
  );
}
