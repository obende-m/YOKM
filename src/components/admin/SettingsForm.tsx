import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ImageField } from "@/components/admin/ImageField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { isHttpUrl, type SettingField } from "@/lib/cms";

/** Edits a set of site_settings keys. Empty values fall back to the website's built-in wording. */
export function SettingsForm({
  title,
  intro,
  fields,
}: {
  title: string;
  intro: string;
  fields: SettingField[];
}) {
  const qc = useQueryClient();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("key,value");
      if (error) throw error;
      return Object.fromEntries((data ?? []).map((r) => [r.key, r.value])) as Record<
        string,
        string
      >;
    },
  });
  const [vals, setVals] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setVals(data);
  }, [data]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const update = (k: string, v: string) => {
    setVals((p) => ({ ...p, [k]: v }));
    setDirty(true);
  };

  async function save() {
    for (const f of fields) {
      const v = (vals[f.key] ?? "").trim();
      if (v && (f.key.startsWith("social_") || f.key === "donation_url") && !isHttpUrl(v)) {
        return void toast.error(`${f.label} must be a full web address starting with https://`);
      }
      if (v && f.key === "contact_email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        return void toast.error("Please enter a valid email address.");
      }
    }
    setSaving(true);
    const rows = fields.map((f) => ({ key: f.key, value: (vals[f.key] ?? "").trim() }));
    const { error } = await supabase.from("site_settings").upsert(rows);
    setSaving(false);
    if (error) return void toast.error(error.message);
    setDirty(false);
    toast.success("Saved. The website is updated");
    qc.invalidateQueries({ queryKey: ["site_settings"] });
    qc.invalidateQueries({ queryKey: ["admin-settings"] });
  }

  const groups = [...new Set(fields.map((f) => f.group))];

  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{intro}</p>
      {isLoading ? (
        <p className="mt-8 text-sm text-muted-foreground">Loading…</p>
      ) : isError ? (
        <div className="mt-8 text-sm">
          <p className="text-destructive">
            Settings could not be loaded: {(error as Error).message}
          </p>
          <Button className="mt-3" size="sm" variant="outline" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      ) : (
        <>
          {groups.map((g) => (
            <section key={g} className="mt-8 space-y-5 border border-border bg-card p-6">
              <h2 className="text-2xl">{g}</h2>
              {fields
                .filter((f) => f.group === g)
                .map((f) => (
                  <div key={f.key} className="space-y-2">
                    <Label htmlFor={f.key}>{f.label}</Label>
                    {f.image ? (
                      <ImageField value={vals[f.key] ?? ""} onChange={(v) => update(f.key, v)} />
                    ) : f.multiline ? (
                      <Textarea
                        id={f.key}
                        rows={3}
                        placeholder={f.default}
                        value={vals[f.key] ?? ""}
                        onChange={(e) => update(f.key, e.target.value)}
                      />
                    ) : (
                      <Input
                        id={f.key}
                        placeholder={f.default}
                        value={vals[f.key] ?? ""}
                        onChange={(e) => update(f.key, e.target.value)}
                      />
                    )}
                    {f.help && <p className="text-xs text-muted-foreground">{f.help}</p>}
                    {f.default && !(vals[f.key] ?? "").trim() && (
                      <p className="text-xs text-muted-foreground">
                        Empty: the website shows the standard wording shown in grey.
                      </p>
                    )}
                  </div>
                ))}
            </section>
          ))}
          <div className="sticky bottom-0 mt-6 flex items-center gap-4 border-t border-border bg-muted/80 py-4 backdrop-blur">
            <Button disabled={saving} onClick={save}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
            {dirty && (
              <span className="text-xs text-muted-foreground">You have unsaved changes.</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
