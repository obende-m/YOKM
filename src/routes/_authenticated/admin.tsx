import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { SECTIONS } from "@/lib/admin-sections";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — YOKM" },
      { name: "description", content: "Manage the Yendel Ocha Kpeling Ministry website." },
      { property: "og:title", content: "Admin — YOKM" },
      { property: "og:description", content: "Manage the YOKM website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

const sectionLinks = (nav: "Content" | "Website pages") =>
  SECTIONS.filter((s) => s.nav === nav).map((s) => ({ to: `/admin/${s.key}`, label: s.title }));

const NAV: { heading?: string; links: { to: string; label: string }[] }[] = [
  {
    links: [
      { to: "/admin", label: "Dashboard" },
      { to: "/admin/submissions", label: "Messages" },
    ],
  },
  {
    heading: "Content",
    links: [...sectionLinks("Content"), { to: "/admin/gallery", label: "Gallery" }],
  },
  {
    heading: "Website pages",
    links: [{ to: "/admin/page-text", label: "Page Text" }, ...sectionLinks("Website pages")],
  },
  {
    heading: "Settings",
    links: [
      { to: "/admin/settings", label: "Site Settings" },
      { to: "/admin/users", label: "Administrators" },
    ],
  },
];

function AdminLayout() {
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const role = useQuery({
    queryKey: ["is-admin", user.id],
    queryFn: async () => {
      const [{ data: isAdmin }, { data: exists }] = await Promise.all([
        supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }),
        supabase.rpc("admin_exists"),
      ]);
      return { isAdmin: !!isAdmin, exists: !!exists };
    },
  });

  async function signOut() {
    await supabase.auth.signOut();
    qc.clear();
    navigate({ to: "/auth" });
  }

  if (role.isLoading) return <div className="p-10 text-sm text-muted-foreground">Loading…</div>;

  if (!role.data?.isAdmin) {
    return (
      <div className="mx-auto max-w-md space-y-4 px-5 py-24">
        <h1 className="text-3xl">Administrator access</h1>
        {role.data?.exists ? (
          <p className="text-sm text-muted-foreground">
            You are signed in as {user.email}, but this account is not an administrator. Ask an
            existing administrator to add you under Administrators.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            You are signed in as {user.email}. No administrator has been set up yet. The person
            responsible for the website&rsquo;s Supabase project must grant the first administrator
            once (see the setup guide). After that, administrators can add each other here.
          </p>
        )}
        <Button variant="outline" onClick={() => role.refetch()}>
          Check again
        </Button>
        <Button variant="outline" onClick={signOut}>
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 font-sans md:flex">
      <aside className="border-b border-border bg-card md:sticky md:top-0 md:h-screen md:w-60 md:shrink-0 md:overflow-y-auto md:border-b-0 md:border-r">
        <div className="flex items-center justify-between px-5 py-4">
          <Link to="/admin" className="font-serif text-xl">
            YOKM Admin
          </Link>
          <button className="text-sm md:hidden" onClick={() => setOpen(!open)}>
            {open ? "Close" : "Menu"}
          </button>
        </div>
        <nav className={`${open ? "block" : "hidden"} px-3 pb-4 md:block`}>
          {NAV.map((group, gi) => (
            <div key={gi} className={gi ? "mt-4" : ""}>
              {group.heading && (
                <p className="px-3 pb-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground/80">
                  {group.heading}
                </p>
              )}
              {group.links.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: n.to === "/admin" }}
                  className="block rounded px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  activeProps={{ className: "bg-secondary text-foreground font-medium" }}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="mt-4 space-y-1 border-t border-border px-3 pt-4 text-sm">
            <Link to="/" className="block text-muted-foreground hover:text-foreground">
              View website
            </Link>
            <button onClick={signOut} className="text-muted-foreground hover:text-foreground">
              Sign out
            </button>
          </div>
        </nav>
      </aside>
      <div className="min-w-0 flex-1 px-5 py-8 md:px-10">
        <Outlet />
      </div>
    </div>
  );
}
