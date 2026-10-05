import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

async function count(q: PromiseLike<{ count: number | null }>) {
  return (await q).count ?? 0;
}

function Dashboard() {
  const { data } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const today = new Date().toISOString().slice(0, 10);
      const h = { count: "exact" as const, head: true };
      const [pub, draft, journal, images, programs, events, unread] = await Promise.all([
        count(supabase.from("posts").select("id", h).eq("kind", "story").eq("published", true)),
        count(supabase.from("posts").select("id", h).eq("published", false)),
        count(supabase.from("posts").select("id", h).eq("kind", "journal").eq("published", true)),
        count(supabase.from("media").select("id", h)),
        count(supabase.from("programs").select("id", h)),
        count(supabase.from("events").select("id", h).gte("event_date", today)),
        count(supabase.from("submissions").select("id", h).eq("handled", false)),
      ]);
      const { data: recent } = await supabase.from("submissions").select("id,name,message,created_at").order("created_at", { ascending: false }).limit(5);
      return { pub, draft, journal, images, programs, events, unread, recent: recent ?? [] };
    },
  });

  const cards = [
    { label: "Published stories", value: data?.pub, to: "/admin/stories" },
    { label: "Drafts (stories & articles)", value: data?.draft, to: "/admin/journal" },
    { label: "Published articles", value: data?.journal, to: "/admin/journal" },
    { label: "Gallery photographs", value: data?.images, to: "/admin/gallery" },
    { label: "Programs", value: data?.programs, to: "/admin/programs" },
    { label: "Upcoming events", value: data?.events, to: "/admin/events" },
    { label: "Unread messages", value: data?.unread, to: "/admin/submissions" },
  ];

  return (
    <div className="max-w-5xl">
      <h1 className="text-4xl">Dashboard</h1>
      <p className="mt-2 text-sm text-muted-foreground">Everything you add here appears on the website once it is published.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className="border border-border bg-card p-5 hover:border-primary">
            <p className="text-3xl font-semibold">{c.value ?? "–"}</p>
            <p className="mt-1 text-sm text-muted-foreground">{c.label}</p>
          </Link>
        ))}
      </div>
      <h2 className="mt-12 text-2xl">Recent messages</h2>
      {data?.recent.length ? (
        <ul className="mt-4 divide-y divide-border border border-border bg-card">
          {data.recent.map((r) => (
            <li key={r.id} className="p-4 text-sm">
              <p className="font-medium">{r.name}</p>
              <p className="line-clamp-1 text-muted-foreground">{r.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">No messages yet.</p>
      )}
    </div>
  );
}
