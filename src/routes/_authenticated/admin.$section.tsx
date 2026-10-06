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

function SectionPage() {
  const { section: key } = Route.useParams();
  const section = getSection(key)!;
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Row | null>(null);

  const list = useQuery({
    queryKey: ["admin", section.key],
    queryFn: async () => {
      let q = db(section.table).select("*");
      for (const [k, v] of Object.entries(section.filter ?? {})) q = q.eq(k, v);
      const { data, error } = await q.order(section.order.column, { ascending: section.order.ascending, nullsFirst: false });
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });

  async function remove(row: Row) {
    if (!window.confirm(`Delete this ${section.singular}? This cannot be undone.`)) return;
    const { error } = await db(section.table).delete().eq("id", row.id);
    if (error) return void toast.error(error.message);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["admin", section.key] });
  }

  async function togglePublish(row: Row) {
    const patch: Row = { published: !row.published };
    if (section.table === "posts" && !row.published && !row.published_at) patch.published_at = new Date().toISOString();
    const { error } = await db(section.table).update(patch).eq("id", row.id);
    if (error) return void toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin", section.key] });
  }

  if (editing) {
    return (
      <Editor
        key={editing.id ?? "new"}
        section={section}
        initial={editing}
        onDone={() => {
          setEditing(null);
          qc.invalidateQueries({ queryKey: ["admin", section.key] });
          qc.invalidateQueries({ queryKey: ["admin-dashboard"] });
        }}
      />
    );
  }

  return (
    <div className="max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl">{section.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{section.intro}</p>
        </div>
        <Button onClick={() => setEditing({ ...(section.defaults ?? {}), published: section.table === "media" })}>
          Add {section.singular}
        </Button>
      </div>

      <div className="mt-8 border border-border bg-card">
        {list.isLoading ? (
          <p className="p-6 text-sm text-muted-foreground">Loading…</p>
        ) : !list.data?.length ? (
          <p className="p-6 text-sm text-muted-foreground">Nothing here yet. Use “Add {section.singular}” to create the first one.</p>
        ) : (
          <ul className="divide-y divide-border">
            {list.data.map((row) => {
              const img = row.cover_url ?? row.photo_url ?? row.url;
              return (
                <li key={row.id} className="flex flex-wrap items-center gap-4 p-4">
                  {img ? <img src={img} alt="" className="h-14 w-20 object-cover" /> : <div className="h-14 w-20 bg-muted" />}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{row[section.titleField] || "(untitled)"}</p>
                    <p className="text-xs text-muted-foreground">
                      {row.published ? "Published" : "Draft"}
                      {section.key === "stories" && !row.consent_given ? " · permission not recorded" : ""}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {section.previewPath && row.slug && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={section.previewPath(row)} target="_blank" rel="noreferrer">
                          View
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => togglePublish(row)}>
                      {row.published ? "Unpublish" : "Publish"}
                    </Button>
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
  const d = new Date(String(v));
  if (Number.isNaN(d.getTime())) return "";
  const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString();
  return withTime ? iso.slice(0, 16) : iso.slice(0, 10);
}

function Editor({ section, initial, onDone }: { section: Section; initial: Row; onDone: () => void }) {
  const [row, setRow] = useState<Row>(initial);
  const [saving, setSaving] = useState(false);
  const set = (k: string, v: unknown) => setRow((r) => ({ ...r, [k]: v }));

  async function save(publish?: boolean) {
    for (const f of section.fields) {
      if (f.required && !String(row[f.name] ?? "").trim()) return void toast.error(`${f.label} is required`);
    }
    setSaving(true);
    const payload: Row = {};
    for (const f of section.fields) {
      let v = row[f.name];
      if (f.type === "number") v = v === "" || v == null ? (f.name === "year" ? null : 0) : Number(v);
      if ((f.type === "date" || f.type === "datetime") && !v) v = null;
      if (f.type === "image") v = v || (f.name === "url" ? "" : null);
      if (f.type === "bool") v = !!v;
      if (v !== undefined) payload[f.name] = v;
    }
    Object.assign(payload, section.defaults ?? {});
    if (publish !== undefined) payload.published = publish;
    if (section.table === "posts" && payload.published && !payload.published_at) payload.published_at = new Date().toISOString();
    if (section.slugFrom && !row.slug) payload.slug = `${slugify(String(row[section.slugFrom] ?? ""))}-${Date.now().toString(36)}`;

    const q = row.id ? db(section.table).update(payload).eq("id", row.id) : db(section.table).insert(payload);
    const { error } = await q;
    setSaving(false);
    if (error) return void toast.error(error.message);
    toast.success("Saved");
    onDone();
  }

  return (
    <div className="max-w-3xl">
      <button className="text-sm text-muted-foreground hover:text-foreground" onClick={onDone}>
        ← Back to {section.title}
      </button>
      <h1 className="mt-3 text-4xl">{row.id ? `Edit ${section.singular}` : `New ${section.singular}`}</h1>
      <div className="mt-8 space-y-6 border border-border bg-card p-6">
        {section.fields.map((f) => (
          <FieldInput key={f.name} field={f} value={row[f.name]} onChange={(v) => set(f.name, v)} />
        ))}
      </div>
      <div className="sticky bottom-0 mt-6 flex flex-wrap gap-3 border-t border-border bg-muted/80 py-4 backdrop-blur">
        <Button disabled={saving} onClick={() => save()}>
          {saving ? "Saving…" : "Save"}
        </Button>
        {"published" in row || section.fields.some((f) => f.name === "published") ? (
          <>
            <Button variant="outline" disabled={saving} onClick={() => save(false)}>
              Save as draft
            </Button>
            <Button variant="outline" disabled={saving} onClick={() => save(true)}>
              Save and publish
            </Button>
          </>
        ) : null}
        <Button variant="ghost" onClick={onDone}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

function FieldInput({ field: f, value, onChange }: { field: Field; value: any; onChange: (v: unknown) => void }) {
  const id = `f-${f.name}`;
  if (f.type === "bool") {
    return (
      <div className="flex items-center gap-3">
        <Switch id={id} checked={!!value} onCheckedChange={onChange} />
        <Label htmlFor={id}>{f.label}</Label>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {f.label}
        {f.required ? " *" : ""}
      </Label>
      {f.type === "text" && <Input id={id} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />}
      {f.type === "number" && <Input id={id} type="number" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />}
      {f.type === "date" && <Input id={id} type="date" value={toInputDate(value, false)} onChange={(e) => onChange(e.target.value)} />}
      {f.type === "datetime" && (
        <Input
          id={id}
          type="datetime-local"
          value={toInputDate(value, true)}
          onChange={(e) => onChange(e.target.value ? new Date(e.target.value).toISOString() : null)}
        />
      )}
      {f.type === "textarea" && <Textarea id={id} rows={3} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />}
      {f.type === "rich" && <RichTextField value={value ?? ""} onChange={onChange} />}
      {f.type === "image" && <ImageField value={value ?? ""} onChange={onChange} />}
      {f.type === "select" && (
        <select id={id} className="h-10 w-full border border-input bg-background px-3 text-sm" value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
          <option value="">—</option>
          {f.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}
      {f.help && <p className="text-xs text-muted-foreground">{f.help}</p>}
    </div>
  );
}
