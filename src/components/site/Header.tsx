import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import logo from "@/assets/yokm-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { NAV, ORG } from "@/lib/yokm";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const onHome = pathname === "/";
  const transparent = onHome && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        open
          ? "bg-primary text-primary-foreground"
          : transparent
            ? "bg-transparent text-ink-foreground"
            : "bg-background/95 text-foreground border-b border-border"
      }`}
    >
      <div className="relative z-50 mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 md:px-10 lg:py-4">
        <Link to="/" className="flex items-center gap-3" aria-label={`${ORG.name} home`}>
          <img
            src={logo.url}
            alt={`${ORG.abbr} logo`}
            width={44}
            height={44}
            className="no-photo h-10 w-10 md:h-11 md:w-11"
          />
          <span className="hidden leading-tight sm:block">
            <span className="block font-serif text-sm tracking-tight">{ORG.abbr}</span>
            <span className="eyebrow block opacity-70">{ORG.focus}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rule-link text-sm"
              data-active={pathname === item.to}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/donate"
            className={`border px-5 py-2.5 text-xs uppercase tracking-[0.18em] transition-colors ${
              transparent
                ? "border-ink-foreground/50 hover:bg-ink-foreground hover:text-ink"
                : "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            Support YOKM
          </Link>
        </nav>

        <Button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          variant="ghost"
          size="icon"
          className="menu-trigger relative z-50 h-11 w-11 shrink-0 rounded-none border border-current/45 bg-transparent text-current hover:bg-current/10 hover:text-current lg:hidden"
        >
          <span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden="true">
            <span /><span /><span />
          </span>
        </Button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-x-0 top-0 z-40 h-[100dvh] overflow-hidden bg-primary text-primary-foreground lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="mx-auto flex h-full max-w-[1400px] flex-col overflow-y-auto px-6 pb-8 pt-24 md:px-10">
              <p className="eyebrow mb-5 border-b border-primary-foreground/30 pb-4 text-primary-foreground/70">Explore YOKM</p>
              <ul className="flex-1">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + 0.055 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-primary-foreground/25"
                  >
                    <Link to={item.to} onClick={() => setOpen(false)} className="block py-3 font-serif text-[clamp(1.75rem,5vh,2.8rem)] leading-none transition-colors hover:text-accent">
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="space-y-4 pt-6">
                <Link
                  to="/donate"
                  onClick={() => setOpen(false)}
                  className="block bg-accent px-6 py-4 text-center text-xs uppercase tracking-[0.16em] text-accent-foreground"
                >
                  Support YOKM
                </Link>
                <p className="text-xs text-primary-foreground/70">{ORG.shortLocation}</p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
