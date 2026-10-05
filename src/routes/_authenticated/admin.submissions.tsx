import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/submissions")({
  component: Submissions,
});

function Submissions() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-submissions"],
    queryFn: async () => (await supabase.from("submissions").select("*").order("created_at", { ascending: false })).data ?? [],
  });
  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["admin-submissions"] });
    qc.invalidateQueries({ queryKey: ["admin-dashboard"] });
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl">Messages</h1>
      <p className="mt-2 text-sm text-muted-foreground">Messages sent through the website contact form.</p>
      <div className="mt-8 space-y-4">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : !data?.length ? (
          <p className="text-sm text-muted-foreground">No messages yet.</p>
        ) : (
          data.map((m) => (
            <article key={m.id} className={`border bg-card p-5 ${m.handled ? "border-border opacity-70" : "border-primary/40"}`}>
              <div className="flex flex-wrap justify-between gap-2 text-sm">
                <p className="font-medium">
                  {m.name} · <a className="underline" href={`mailto:${m.email}`}>{m.email}</a>
                  {m.phone ? ` · ${m.phone}` : ""}
                </p>
                <p className="text-muted-foreground">{new Date(m.created_at).toLocaleString("en-GB")}</p>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm">{m.message}</p>
              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={async () => {
                    await supabase.from("submissions").update({ handled: !m.handled }).eq("id", m.id);
                    refresh();
                  }}
                >
                  {m.handled ? "Mark as unread" : "Mark as handled"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={async () => {
                    if (!window.confirm("Delete this message?")) return;
                    await supabase.from("submissions").delete().eq("id", m.id);
                    refresh();
                  }}
                >
                  Delete
                </Button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
