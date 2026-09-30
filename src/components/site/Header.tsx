import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import logo from "@/assets/yokm-logo.png.asset.json";
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

  const onHome = pathname === "/";
  const transparent = onHome && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        transparent
          ? "bg-transparent text-ink-foreground"
          : "bg-background/92 text-foreground backdrop-blur-sm border-b border-border"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10">
        <Link to="/" className="flex items-center gap-3" aria-label={`${ORG.name} home`}>
          <img
            src={logo.url}
            alt={`${ORG.abbr} logo`}
            width={44}
            height={44}
            className="h-10 w-10 md:h-11 md:w-11"
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

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center lg:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 top-[72px] z-40 bg-background lg:hidden"
          >
            <nav className="flex h-full flex-col justify-between px-6 pb-12 pt-8">
              <ul className="space-y-1">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-border"
                  >
                    <Link to={item.to} className="block py-4 font-serif text-2xl">
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="space-y-4">
                <Link
                  to="/donate"
                  className="block bg-primary px-6 py-4 text-center text-xs uppercase tracking-[0.2em] text-primary-foreground"
                >
                  Support YOKM
                </Link>
                <p className="text-xs text-muted-foreground">{ORG.shortLocation}</p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
