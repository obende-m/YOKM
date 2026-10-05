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

const NAV = [
  { to: "/admin", label: "Dashboard" },
  ...SECTIONS.map((s) => ({ to: `/admin/${s.key}`, label: s.title })),
  { to: "/admin/submissions", label: "Messages" },
  { to: "/admin/settings", label: "Site Settings" },
  { to: "/admin/users", label: "Administrators" },
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
            You are signed in as {user.email}, but this account is not an administrator. Ask an existing administrator to add
            you under Administrators.
          </p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">No administrator has been set up yet. Make {user.email} the main administrator?</p>
            <Button
              onClick={async () => {
                await supabase.rpc("claim_first_admin");
                role.refetch();
              }}
            >
              Become administrator
            </Button>
          </>
        )}
        <Button variant="outline" onClick={signOut}>
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 font-sans md:flex">
      <aside className="border-b border-border bg-card md:sticky md:top-0 md:h-screen md:w-60 md:shrink-0 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between px-5 py-4">
          <Link to="/admin" className="font-serif text-xl">
            YOKM Admin
          </Link>
          <button className="text-sm md:hidden" onClick={() => setOpen(!open)}>
            {open ? "Close" : "Menu"}
          </button>
        </div>
        <nav className={`${open ? "block" : "hidden"} px-3 pb-4 md:block`}>
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: n.to === "/admin" }}
              className="block rounded px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground font-medium" }}
            >
              {n.label}
            </Link>
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
