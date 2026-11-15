import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/submissions")({
  component: Submissions,
});

const KINDS = [
  { value: "", label: "All" },
  { value: "contact", label: "Contact messages" },
  { value: "volunteer", label: "Volunteers" },
  { value: "partner", label: "Partners" },
];
const STATUSES = [
  { value: "new", label: "New" },
  { value: "in_progress", label: "In progress" },
  { value: "handled", label: "Handled" },
  { value: "archived", label: "Archived" },
];
const KIND_LABEL: Record<string, string> = {
  contact: "Contact",
  volunteer: "Volunteer",
  partner: "Partner",
};

type Submission = {
  id: string;
  kind: string;
  name: string;
  email: string;
  phone: string;
  organisation: string;
  subject: string;
  message: string;
  status: string;
  notes: string;
  created_at: string;
};

function Submissions() {
  const qc = useQueryClient();
  const [kind, setKind] = useState("");
  const [status, setStatus] = useState("open");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Submission[];
    },
  });

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["admin-submissions"] });
    qc.invalidateQueries({ queryKey: ["admin-dashboard"] });
  };

  async function update(id: string, patch: Partial<Submission>) {
    const full = patch.status
      ? { ...patch, handled: patch.status === "handled" || patch.status === "archived" }
      : patch;
    const { error } = await supabase.from("submissions").update(full).eq("id", id);
    if (error) return void toast.error(error.message);
    toast.success("Updated");
    refresh();
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this message permanently?")) return;
    const { error } = await supabase.from("submissions").delete().eq("id", id);
    if (error) return void toast.error(error.message);
    toast.success("Deleted");
    refresh();
  }

  const rows = (data ?? []).filter(
    (m) =>
      (!kind || m.kind === kind) &&
      (status === "all"
        ? true
        : status === "open"
          ? m.status === "new" || m.status === "in_progress"
          : m.status === status),
  );

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl">Messages</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Contact messages, volunteer offers and partnership enquiries sent through the website.
      </p>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <select
          className="h-9 border border-input bg-background px-2"
          value={kind}
          onChange={(e) => setKind(e.target.value)}
          aria-label="Type"
        >
          {KINDS.map((k) => (
            <option key={k.value} value={k.value}>
              {k.label}
            </option>
          ))}
        </select>
        <select
          className="h-9 border border-input bg-background px-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Status"
        >
          <option value="open">Needs attention (new & in progress)</option>
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
          <option value="all">All statuses</option>
        </select>
      </div>

      <div className="mt-6 space-y-4">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : isError ? (
          <p className="text-sm text-destructive">
            Messages could not be loaded: {(error as Error).message}
          </p>
        ) : !rows.length ? (
          <p className="text-sm text-muted-foreground">No messages match this view.</p>
        ) : (
          rows.map((m) => (
            <MessageCard
              key={m.id}
              m={m}
              onUpdate={(p) => update(m.id, p)}
              onDelete={() => remove(m.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function MessageCard({
  m,
  onUpdate,
  onDelete,
}: {
  m: Submission;
  onUpdate: (p: Partial<Submission>) => void;
  onDelete: () => void;
}) {
  const [notes, setNotes] = useState(m.notes);
  const open = m.status === "new" || m.status === "in_progress";
  return (
    <article
      className={`border bg-card p-5 ${open ? "border-primary/40" : "border-border opacity-80"}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2 text-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-accent">
            {KIND_LABEL[m.kind] ?? m.kind}
          </p>
          <p className="mt-1 font-medium">
            {m.name}
            {m.organisation ? ` · ${m.organisation}` : ""}
          </p>
          <p className="text-muted-foreground">
            <a className="underline" href={`mailto:${m.email}`}>
              {m.email}
            </a>
            {m.phone ? (
              <>
                {" · "}
                <a className="underline" href={`tel:${m.phone.replace(/[^\d+]/g, "")}`}>
                  {m.phone}
                </a>
              </>
            ) : null}
          </p>
        </div>
        <p className="text-muted-foreground">{new Date(m.created_at).toLocaleString("en-GB")}</p>
      </div>
      {m.subject && <p className="mt-3 text-sm font-medium">{m.subject}</p>}
      <p className="mt-2 whitespace-pre-wrap text-sm">{m.message}</p>

      <div className="mt-4 space-y-1">
        <label htmlFor={`n-${m.id}`} className="text-xs text-muted-foreground">
          Internal notes (not visible to the sender)
        </label>
        <Textarea
          id={`n-${m.id}`}
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={() => notes !== m.notes && onUpdate({ notes })}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <select
          className="h-9 border border-input bg-background px-2 text-sm"
          value={m.status}
          onChange={(e) => onUpdate({ status: e.target.value })}
          aria-label="Status"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <Button size="sm" variant="outline" asChild>
          <a
            href={`mailto:${m.email}?subject=${encodeURIComponent(m.subject ? `Re: ${m.subject}` : "Your message to YOKM")}`}
          >
            Reply by email
          </a>
        </Button>
        <Button size="sm" variant="ghost" className="ml-auto" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </article>
  );
}
