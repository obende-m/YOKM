import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/users")({
  component: Users,
});

function Users() {
  const { user } = Route.useRouteContext();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("list_admins");
      if (error) throw error;
      return data ?? [];
    },
  });

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { data: ok, error } = await supabase.rpc("grant_admin_by_email", {
      _email: email.trim(),
    });
    setBusy(false);
    if (error) return void toast.error(error.message);
    if (!ok)
      return void toast.error(
        "No account with that email yet. Ask them to create an account on the sign-in page first.",
      );
    toast.success("Administrator added");
    setEmail("");
    refetch();
  }

  async function remove(userId: string) {
    if (!window.confirm("Remove administrator access for this person?")) return;
    const { error } = await supabase.rpc("revoke_admin", { _user_id: userId });
    if (error) return void toast.error(error.message);
    toast.success("Access removed");
    refetch();
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl">Administrators</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        To add someone: ask them to create an account at <span className="font-medium">/auth</span>{" "}
        on the website (and confirm their email), then enter their email here. Accounts that are not
        administrators cannot see or change anything in the CMS.
      </p>
      <form onSubmit={add} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Input
          type="email"
          required
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" disabled={busy}>
          {busy ? "Adding…" : "Add administrator"}
        </Button>
      </form>
      {isLoading ? (
        <p className="mt-8 text-sm text-muted-foreground">Loading…</p>
      ) : isError ? (
        <p className="mt-8 text-sm text-destructive">{(error as Error).message}</p>
      ) : (
        <ul className="mt-8 divide-y divide-border border border-border bg-card">
          {data?.map((u) => (
            <li key={u.user_id} className="flex items-center justify-between p-4 text-sm">
              <span>
                {u.email}
                {u.user_id === user.id ? (
                  <span className="ml-2 text-xs text-muted-foreground">(you)</span>
                ) : null}
              </span>
              {data.length > 1 && u.user_id !== user.id && (
                <Button size="sm" variant="ghost" onClick={() => remove(u.user_id)}>
                  Remove
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
