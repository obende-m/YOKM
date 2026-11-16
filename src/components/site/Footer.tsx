import { Link } from "@tanstack/react-router";

import logo from "@/assets/photos/yokm-logo-160.webp";
import { Cta } from "@/components/site/Cta";
import { contactChannels, socialLinks, useSettings, useSiteText } from "@/lib/cms";
import { NAV, ORG } from "@/lib/yokm";

export function Footer() {
  const { data: settings = {} } = useSettings();
  const t = useSiteText();
  const channels = contactChannels(settings);
  const socials = socialLinks(settings);

  return (
    <footer className="relative overflow-hidden bg-wine-deep text-paper">
      <div className="wrap pt-16 md:pt-20">
        <div className="grid gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link to="/" className="group inline-flex items-center gap-4" aria-label="Home">
              <img
                src={logo}
                alt=""
                width={56}
                height={56}
                loading="lazy"
                className="logo-spin h-14 w-14"
              />
              <span className="font-serif text-2xl tracking-[0.04em]">{ORG.abbr}</span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/65">
              {t("footer_text")}
            </p>
            <p className="mt-6 font-serif text-xl italic text-paper/85">{ORG.motto}</p>
            <div className="mt-7">
              <Cta to="/donate" variant="accent">
                Donate to YOKM
              </Cta>
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-5">
            <p className="eyebrow text-paper/45">Pages</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 text-[0.95rem]">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex min-h-11 items-center text-paper/80 transition-colors hover:text-sky"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/donate"
                  className="inline-flex min-h-11 items-center text-paper/80 transition-colors hover:text-sky"
                >
                  Give
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-paper/45">Visit</p>
            <address className="mt-5 whitespace-pre-line text-[0.95rem] not-italic leading-relaxed text-paper/80">
              {t("contact_address")}
            </address>
            {channels.length > 0 && (
              <ul className="mt-5 text-[0.95rem]">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      className="inline-flex min-h-11 items-center gap-3 text-paper/80 transition-colors hover:text-sky"
                      {...(c.href?.startsWith("https")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <span className="eyebrow w-20 text-paper/40">{c.label}</span>
                      {c.value}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:col-span-2">
            {socials.length > 0 && (
              <>
                <p className="eyebrow text-paper/45">Follow</p>
                <ul className="mt-5 text-[0.95rem]">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center text-paper/80 transition-colors hover:text-sky"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-paper/15 py-8 text-xs leading-relaxed text-paper/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {ORG.name}. {ORG.registration}, {ORG.registrationNumber}.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="inline-flex min-h-11 items-center hover:text-paper">
              Privacy
            </Link>
            <Link to="/terms" className="inline-flex min-h-11 items-center hover:text-paper">
              Terms
            </Link>
          </div>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap px-4 pb-2 text-center font-serif text-[clamp(2rem,8.2vw,10rem)] font-light italic leading-[0.8] tracking-[-0.03em] text-paper/[0.07]"
      >
        Awake, oh ye widows
      </p>
    </footer>
  );
}
