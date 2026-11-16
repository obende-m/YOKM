import { Link, useRouterState } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import logo from "@/assets/photos/yokm-logo-160.webp";
import { EASE } from "@/components/motion";
import { contactChannels, socialLinks, useSettings } from "@/lib/cms";
import { NAV, ORG } from "@/lib/yokm";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data: settings = {} } = useSettings();
  const channels = contactChannels(settings);
  const email = channels.find((c) => c.label === "Email");
  const phone = channels.find((c) => c.label === "Phone");
  const socials = socialLinks(settings);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-sky-deep focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>

      {/* Utility bar: contact details at a glance; folds away once the page scrolls. */}
      <div
        className={`hidden overflow-hidden bg-wine-deep text-paper/80 transition-[max-height,opacity] duration-500 md:block ${
          scrolled || open ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        }`}
      >
        <div className="wrap flex h-10 items-center justify-between gap-6 text-[0.8rem]">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <MapPin aria-hidden className="h-3.5 w-3.5 text-sky" />
              {ORG.shortLocation}
            </span>
            {email && (
              <a href={email.href} className="inline-flex items-center gap-2 hover:text-paper">
                <Mail aria-hidden className="h-3.5 w-3.5 text-sky" />
                {email.value}
              </a>
            )}
            {phone && (
              <a
                href={phone.href}
                className="hidden items-center gap-2 hover:text-paper lg:inline-flex"
              >
                <Phone aria-hidden className="h-3.5 w-3.5 text-sky" />
                {phone.value}
              </a>
            )}
          </div>
          {socials.length > 0 && (
            <ul className="flex items-center gap-5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-paper"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div
        className={`transition-[background-color,box-shadow] duration-500 ${
          open
            ? "bg-transparent text-paper"
            : scrolled
              ? "bg-paper/95 text-ink shadow-[0_8px_30px_-18px_rgb(59_15_40_/_0.35)] backdrop-blur-md"
              : "bg-paper text-ink"
        }`}
      >
        <div
          className={`wrap relative z-50 flex items-center justify-between gap-6 transition-[padding] duration-500 ${
            scrolled ? "py-2.5" : "py-3.5"
          }`}
        >
          <Link to="/" className="group flex items-center gap-3" aria-label={`${ORG.name}, home`}>
            <img
              src={logo}
              alt=""
              width={52}
              height={52}
              className="h-12 w-12 transition-transform duration-700 group-hover:rotate-[-8deg]"
            />
            <span className="leading-none">
              <span className="block font-serif text-[1.3rem] font-semibold tracking-[0.02em]">
                {ORG.abbr}
              </span>
              <span className="mt-1 hidden text-[0.72rem] font-medium opacity-70 sm:block">
                {ORG.name}
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors xl:px-4 ${
                    active ? "bg-wine/10 text-wine" : "hover:bg-wine/5 hover:text-wine"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link to="/donate" data-variant="solid" className="btn ml-3 !min-h-[2.75rem] !px-6">
              <span>Donate</span>
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`menu-trigger -mr-1 flex h-12 items-center gap-3 rounded-full px-4 lg:hidden ${
              open ? "bg-paper/10" : "bg-wine/8"
            }`}
          >
            <span className="eyebrow">{open ? "Close" : "Menu"}</span>
            <span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 h-[100dvh] bg-wine-deep text-paper lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="wrap flex h-full flex-col overflow-y-auto pb-8 pt-24"
            >
              <ul className="flex-1">
                {[{ to: "/", label: "Home" }, ...NAV].map((item, i) => (
                  <li key={item.to} className="overflow-hidden border-b border-paper/12">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ delay: 0.22 + 0.05 * i, duration: 0.8, ease: EASE }}
                    >
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline gap-4 py-3.5"
                      >
                        <span className="eyebrow w-6 text-sky/80 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-serif text-[clamp(1.9rem,8vw,3rem)] leading-none transition-[transform,color] duration-500 group-hover:translate-x-2 group-hover:text-sky">
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="space-y-5 pt-8"
              >
                <Link
                  to="/donate"
                  onClick={() => setOpen(false)}
                  data-variant="accent"
                  className="btn w-full"
                >
                  <span>Donate to YOKM</span>
                </Link>
                <p className="font-serif text-xl italic text-paper/80">{ORG.motto}</p>
                <p className="meta text-paper/55">{ORG.shortLocation}</p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
