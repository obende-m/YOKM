import type { ErrorComponentProps } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { useRouterState } from "@tanstack/react-router";

function NotFoundComponent() {
  return (
    <section className="flex min-h-[100svh] items-end bg-paper text-ink">
      <div className="wrap pb-20 pt-40 md:pb-28">
        <p className="eyebrow text-plum">Error 404</p>
        <h1 className="display mt-8 max-w-[12ch]">
          This page could not be <span className="accent-word">found</span>
        </h1>
        <p className="lede mt-8 max-w-lg text-ink/70">
          The address may have changed, or the page may no longer be published.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/" data-variant="solid" className="btn">
            <span>Go to the home page</span>
          </Link>
          <Link to="/contact" data-variant="outline" className="btn">
            <span>Contact the ministry</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <section className="flex min-h-[100svh] items-end bg-paper text-ink">
      <div className="wrap pb-20 pt-40 md:pb-28">
        <p className="eyebrow text-plum">Something went wrong</p>
        <h1 className="display mt-8 max-w-[12ch]">
          This page did not <span className="accent-word">load</span>
        </h1>
        <p className="lede mt-8 max-w-lg text-ink/70">
          Please try again in a moment. If it keeps happening, the home page is a good place to
          start again.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            data-variant="solid"
            className="btn"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            <span>Try again</span>
          </button>
          <a href="/" data-variant="outline" className="btn">
            <span>Go to the home page</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#6a1b45" },
      { title: "Yendel Ocha Kpeling Ministry (YOKM) — Awake Oh Ye Widows" },
      {
        name: "description",
        content:
          "A Christian ministry in Jos, Plateau State, Nigeria, reaching, equipping and strengthening widows to discover purpose, develop their gifts and become independent.",
      },
      { name: "author", content: "Yendel Ocha Kpeling Ministry" },
      { property: "og:title", content: "Yendel Ocha Kpeling Ministry (YOKM)" },
      {
        property: "og:description",
        content:
          "Awake Oh Ye Widows — a Christian ministry in Jos, Nigeria, equipping widows to discover purpose and become independent.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..700,0..100,0..1;1,9..144,300..700,0..100,0..1&family=Instrument+Sans:wght@400..700&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => data.subscription.unsubscribe();
  }, [router, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        {!isAdmin && <RouteProgress />}
        {!isAdmin && <Header />}
        <main id="main" tabIndex={-1} className="outline-none">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          {isAdmin ? (
            <Outlet />
          ) : (
            <motion.div
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          )}
        </main>
        {!isAdmin && <Footer />}
        <Toaster richColors position="top-center" />
      </MotionConfig>
    </QueryClientProvider>
  );
}

/** A thin blue line along the top edge while the next page loads. */
function RouteProgress() {
  const pending = useRouterState({ select: (s) => s.status === "pending" });
  return (
    <AnimatePresence>
      {pending && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-sky"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0.85, transition: { duration: 2.4, ease: [0.16, 1, 0.3, 1] } }}
          exit={{ scaleX: 1, opacity: 0, transition: { duration: 0.35 } }}
        />
      )}
    </AnimatePresence>
  );
}
