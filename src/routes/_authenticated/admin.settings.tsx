import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { SETTING_FIELDS } from "@/lib/cms";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: Settings,
});

function Settings() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("key,value");
      return Object.fromEntries((data ?? []).map((r) => [r.key, r.value])) as Record<string, string>;
    },
  });
  const [vals, setVals] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (data) setVals(data);
  }, [data]);

  async function save() {
    setSaving(true);
    const rows = SETTING_FIELDS.map((f) => ({ key: f.key, value: (vals[f.key] ?? "").trim() }));
    const { error } = await supabase.from("site_settings").upsert(rows);
    setSaving(false);
    if (error) return void toast.error(error.message);
    toast.success("Settings saved");
    qc.invalidateQueries({ queryKey: ["site_settings"] });
  }

  const groups = [...new Set(SETTING_FIELDS.map((f) => f.group))];
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl">Site Settings</h1>
      <p className="mt-2 text-sm text-muted-foreground">Anything left empty stays hidden on the website.</p>
      {groups.map((g) => (
        <section key={g} className="mt-8 space-y-5 border border-border bg-card p-6">
          <h2 className="text-2xl">{g}</h2>
          {SETTING_FIELDS.filter((f) => f.group === g).map((f) => (
            <div key={f.key} className="space-y-2">
              <Label htmlFor={f.key}>{f.label}</Label>
              {f.multiline ? (
                <Textarea id={f.key} rows={3} value={vals[f.key] ?? ""} onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })} />
              ) : (
                <Input id={f.key} value={vals[f.key] ?? ""} onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })} />
              )}
            </div>
          ))}
        </section>
      ))}
      <Button className="mt-6" disabled={saving} onClick={save}>
        {saving ? "Saving…" : "Save settings"}
      </Button>
    </div>
  );
}
