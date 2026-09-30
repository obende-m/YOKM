import { Link } from "@tanstack/react-router";

import logo from "@/assets/yokm-logo.png.asset.json";
import { CONTACT_CHANNELS, NAV, ORG, SOCIAL_LINKS } from "@/lib/yokm";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <img src={logo.url} alt={`${ORG.abbr} logo`} width={48} height={48} className="h-12 w-12" loading="lazy" />
              <span className="font-serif text-lg">{ORG.abbr}</span>
            </div>
            <p className="mt-6 font-serif text-xl leading-snug">“{ORG.motto}”</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-foreground/65">{ORG.positioning}</p>
          </div>

          <div>
            <p className="eyebrow text-ink-foreground/50">Explore</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="rule-link text-ink-foreground/80 hover:text-ink-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/journal" className="rule-link text-ink-foreground/80 hover:text-ink-foreground">
                  Journal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-ink-foreground/50">Find us</p>
            <address className="mt-5 text-sm not-italic leading-relaxed text-ink-foreground/80">
              {ORG.address}
            </address>
            {CONTACT_CHANNELS.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm text-ink-foreground/80">
                {CONTACT_CHANNELS.map((c) => (
                  <li key={c.label}>
                    {c.href ? (
                      <a href={c.href} className="rule-link">
                        {c.value}
                      </a>
                    ) : (
                      c.value
                    )}
                  </li>
                ))}
              </ul>
            )}
            {SOCIAL_LINKS.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-4 text-sm">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} className="rule-link text-ink-foreground/80">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <Link
              to="/donate"
              className="mt-8 inline-block border border-ink-foreground/40 px-5 py-2.5 text-xs uppercase tracking-[0.18em] transition-colors hover:bg-ink-foreground hover:text-ink"
            >
              Support YOKM
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink-foreground/15 pt-8 text-xs text-ink-foreground/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {ORG.name}. {ORG.registration}. {ORG.registrationNumber}.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="rule-link">
              Privacy Policy
            </Link>
            <Link to="/terms" className="rule-link">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
