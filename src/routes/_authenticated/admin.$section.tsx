/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { ImageField } from "@/components/admin/ImageField";
import { RichTextField } from "@/components/admin/RichTextField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { getSection, type Field, type Section } from "@/lib/admin-sections";
import { slugify } from "@/lib/cms";

export const Route = createFileRoute("/_authenticated/admin/$section")({
  beforeLoad: ({ params }) => {
    if (!getSection(params.section)) throw notFound();
  },
  component: SectionPage,
  notFoundComponent: () => <p className="text-sm">This section does not exist.</p>,
});

type Row = any;
const db = (t: string) => (supabase as any).from(t);
const hasPublished = (s: Section) => s.fields.some((f) => f.name === "published");

function SectionPage() {
  const { section: key } = Route.useParams();
  const section = getSection(key)!;
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Row | null>(null);
  const [busy, setBusy] = useState(false);

  const list = useQuery({
    queryKey: ["admin", section.key],
    queryFn: async () => {
      let q = db(section.table).select("*");
      for (const [k, v] of Object.entries(section.filter ?? {})) q = q.eq(k, v);
      q = q.order(section.order.column, { ascending: section.order.ascending, nullsFirst: false });
      if (section.order.column !== "created_at") q = q.order("created_at", { ascending: true });
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["admin", section.key] });
    qc.invalidateQueries({ queryKey: ["admin-dashboard"] });
    qc.invalidateQueries({ queryKey: ["public"] });
    qc.invalidateQueries({ queryKey: ["posts"] });
  };

  async function remove(row: Row) {
    if (!window.confirm(`Delete this ${section.singular}? This cannot be undone.`)) return;
    const { error } = await db(section.table).delete().eq("id", row.id);
    if (error) return void toast.error(error.message);
    toast.success("Deleted");
    refresh();
  }

  async function togglePublish(row: Row) {
    if (section.key === "stories" && !row.published && !row.consent_given) {
      return void toast.error(
        "Record the person’s permission (edit the story) before publishing it.",
      );
    }
    const patch: Row = { published: !row.published };
    if (section.table === "posts" && !row.published && !row.published_at)
      patch.published_at = new Date().toISOString();
    const { error } = await db(section.table).update(patch).eq("id", row.id);
    if (error) return void toast.error(error.message);
    toast.success(row.published ? "Unpublished" : "Published");
    refresh();
  }

  /** Swap a row with its neighbour and renumber the list so the order is stable. */
  async function move(index: number, dir: -1 | 1) {
    const rows = [...(list.data ?? [])];
    const target = index + dir;
    if (target < 0 || target >= rows.length) return;
    [rows[index], rows[target]] = [rows[target], rows[index]];
    setBusy(true);
    const updates = rows
      .map((r, i) => ({
        id: r.id,
        sort_order: (i + 1) * 10,
        changed: r.sort_order !== (i + 1) * 10,
      }))
      .filter((u) => u.changed);
    const results = await Promise.all(
      updates.map((u) => db(section.table).update({ sort_order: u.sort_order }).eq("id", u.id)),
    );
    setBusy(false);
    const failed = results.find((r: any) => r.error);
    if (failed) toast.error(failed.error.message);
    refresh();
  }

  if (editing) {
    return (
      <Editor
        key={editing.id ?? "new"}
        section={section}
        initial={editing}
        nextOrder={
          ((list.data ?? []).reduce(
            (m: number, r: Row) => Math.max(m, Number(r.sort_order) || 0),
            0,
          ) as number) + 10
        }
        onDone={(saved) => {
          setEditing(null);
          if (saved) refresh();
        }}
      />
    );
  }

  const sortable = section.order.column === "sort_order";

  return (
    <div className="max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl">{section.title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{section.intro}</p>
        </div>
        <Button
          onClick={() =>
            setEditing({ ...(section.defaults ?? {}), published: section.table === "page_items" })
          }
        >
          Add {section.singular}
        </Button>
      </div>

      <div className="mt-8 border border-border bg-card">
        {list.isLoading ? (
          <p className="p-6 text-sm text-muted-foreground">Loading…</p>
        ) : list.isError ? (
          <div className="p-6 text-sm">
            <p className="text-destructive">
              This list could not be loaded: {(list.error as Error).message}
            </p>
            <Button className="mt-3" size="sm" variant="outline" onClick={() => list.refetch()}>
              Try again
            </Button>
          </div>
        ) : !list.data?.length ? (
          <p className="p-6 text-sm text-muted-foreground">
            Nothing here yet. Use “Add {section.singular}” to create the first one.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {list.data.map((row, i) => {
              const img = row.cover_url ?? row.photo_url;
              const showImg = section.fields.some((f) => f.type === "image");
              return (
                <li key={row.id} className="flex flex-wrap items-center gap-4 p-4">
                  {sortable && (
                    <div className="flex flex-col">
                      <button
                        type="button"
                        aria-label="Move up"
                        disabled={busy || i === 0}
                        onClick={() => move(i, -1)}
                        className="px-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        aria-label="Move down"
                        disabled={busy || i === list.data.length - 1}
                        onClick={() => move(i, 1)}
                        className="px-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                      >
                        ▼
                      </button>
                    </div>
                  )}
                  {showImg &&
                    (img ? (
                      <img src={img} alt="" className="h-14 w-20 object-cover" />
                    ) : (
                      <div className="h-14 w-20 bg-muted" />
                    ))}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">
                      {row[section.titleField] || "(untitled)"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {hasPublished(section) ? (row.published ? "Published" : "Draft") : ""}
                      {section.key === "stories" && !row.consent_given
                        ? " · permission not recorded"
                        : ""}
                      {section.key === "events" && row.event_date ? ` · ${row.event_date}` : ""}
                      {section.table === "posts" && row.category ? ` · ${row.category}` : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {section.previewPath && row.slug && row.published && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={section.previewPath(row)} target="_blank" rel="noreferrer">
                          View
                        </a>
                      </Button>
                    )}
                    {hasPublished(section) && (
                      <Button variant="outline" size="sm" onClick={() => togglePublish(row)}>
                        {row.published ? "Unpublish" : "Publish"}
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => setEditing(row)}>
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => remove(row)}>
                      Delete
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function toInputDate(v: unknown, withTime: boolean) {
  if (!v) return "";
  const s = String(v);
  if (!withTime && /^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return "";
  const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString();
  return withTime ? iso.slice(0, 16) : iso.slice(0, 10);
}

function Editor({
  section,
  initial,
  nextOrder,
  onDone,
}: {
  section: Section;
  initial: Row;
  nextOrder: number;
  onDone: (saved: boolean) => void;
}) {
  const [row, setRow] = useState<Row>(initial);
  const [saving, setSaving] = useState(false);
  const set = (k: string, v: unknown) => setRow((r: Row) => ({ ...r, [k]: v }));

  async function save(publish?: boolean) {
    if (saving) return;
    for (const f of section.fields) {
      if (f.required && !String(row[f.name] ?? "").trim())
        return void toast.error(`${f.label} is required`);
    }
    const willPublish = publish ?? !!row.published;
    if (section.key === "stories" && willPublish && !row.consent_given) {
      return void toast.error("Tick the permission box before publishing a story.");
    }
    setSaving(true);
    const payload: Row = {};
    for (const f of section.fields) {
      let v = row[f.name];
      if (f.type === "number") {
        if (v === "" || v == null)
          v = f.name === "year" ? null : f.name === "sort_order" && !row.id ? nextOrder : 0;
        else v = Number(v);
        if (typeof v === "number" && Number.isNaN(v)) v = 0;
      }
      if ((f.type === "date" || f.type === "datetime") && !v) v = null;
      if (f.type === "image") v = v || null;
      if (f.type === "bool") v = !!v;
      if (typeof v === "string") v = v.trim();
      if (v !== undefined) payload[f.name] = v;
    }
    Object.assign(payload, section.defaults ?? {});
    if (publish !== undefined) payload.published = publish;
    if (section.table === "posts" && payload.published && !payload.published_at)
      payload.published_at = new Date().toISOString();
    if (section.slugFrom && !row.slug)
      payload.slug = `${slugify(String(row[section.slugFrom] ?? ""))}-${Date.now().toString(36)}`;

    const q = row.id
      ? db(section.table).update(payload).eq("id", row.id)
      : db(section.table).insert(payload);
    const { error } = await q;
    setSaving(false);
    if (error) {
      return void toast.error(
        error.code === "23505"
          ? `A ${section.singular} with that name already exists.`
          : error.message,
      );
    }
    toast.success(payload.published === false && publish === false ? "Saved as draft" : "Saved");
    onDone(true);
  }

  const canPublish = hasPublished(section);

  return (
    <div className="max-w-3xl">
      <button
        className="text-sm text-muted-foreground hover:text-foreground"
        onClick={() => onDone(false)}
      >
        ← Back to {section.title}
      </button>
      <h1 className="mt-3 text-4xl">
        {row.id ? `Edit ${section.singular}` : `New ${section.singular}`}
      </h1>
      <form
        className="mt-8 space-y-6 border border-border bg-card p-6"
        onSubmit={(e) => {
          e.preventDefault();
          void save();
        }}
      >
        {section.fields.map((f) => (
          <FieldInput key={f.name} field={f} value={row[f.name]} onChange={(v) => set(f.name, v)} />
        ))}
        <button type="submit" className="hidden" />
      </form>
      <div className="sticky bottom-0 mt-6 flex flex-wrap gap-3 border-t border-border bg-muted/80 py-4 backdrop-blur">
        <Button disabled={saving} onClick={() => save()}>
          {saving ? "Saving…" : "Save"}
        </Button>
        {canPublish && (
          <>
            <Button variant="outline" disabled={saving} onClick={() => save(false)}>
              Save as draft
            </Button>
            <Button variant="outline" disabled={saving} onClick={() => save(true)}>
              Save and publish
            </Button>
          </>
        )}
        <Button variant="ghost" onClick={() => onDone(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

function useOptions(field: Field) {
  return useQuery({
    queryKey: ["admin-options", field.optionsFrom?.table],
    enabled: !!field.optionsFrom,
    queryFn: async () => {
      const src = field.optionsFrom!;
      const { data, error } = await db(src.table)
        .select(src.column)
        .order("sort_order")
        .order(src.column);
      if (error) throw error;
      return (data ?? []).map((r: Row) => String(r[src.column]));
    },
  });
}

function FieldInput({
  field: f,
  value,
  onChange,
}: {
  field: Field;
  value: any;
  onChange: (v: unknown) => void;
}) {
  const id = `f-${f.name}`;
  const dyn = useOptions(f);
  if (f.type === "bool") {
    return (
      <div className="flex items-center gap-3">
        <Switch id={id} checked={!!value} onCheckedChange={onChange} />
        <Label htmlFor={id}>{f.label}</Label>
      </div>
    );
  }
  let options: string[] = f.optionsFrom
    ? ((dyn.data as string[] | undefined) ?? [])
    : (f.options ?? []);
  if (value && !options.includes(value)) options = [String(value), ...options];
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {f.label}
        {f.required ? " *" : ""}
      </Label>
      {f.type === "text" && (
        <Input id={id} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      )}
      {f.type === "number" && (
        <Input
          id={id}
          type="number"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {f.type === "date" && (
        <Input
          id={id}
          type="date"
          value={toInputDate(value, false)}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {f.type === "datetime" && (
        <Input
          id={id}
          type="datetime-local"
          value={toInputDate(value, true)}
          onChange={(e) => onChange(e.target.value ? new Date(e.target.value).toISOString() : null)}
        />
      )}
      {f.type === "textarea" && (
        <Textarea id={id} rows={3} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      )}
      {f.type === "rich" && <RichTextField value={value ?? ""} onChange={onChange} />}
      {f.type === "image" && <ImageField value={value ?? ""} onChange={onChange} />}
      {f.type === "select" && (
        <select
          id={id}
          className="h-10 w-full border border-input bg-background px-3 text-sm"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">None</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}
      {f.optionsFrom?.manage && (
        <p className="text-xs text-muted-foreground">
          <a href={f.optionsFrom.manage} target="_blank" rel="noreferrer" className="underline">
            Manage categories (opens in a new tab)
          </a>
        </p>
      )}
      {f.help && <p className="text-xs text-muted-foreground">{f.help}</p>}
    </div>
  );
}
