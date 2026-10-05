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
  const [email, setEmail] = useState("");
  const { data, refetch } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => (await supabase.rpc("list_admins")).data ?? [],
  });

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const { data: ok, error } = await supabase.rpc("grant_admin_by_email", { _email: email.trim() });
    if (error) return toast.error(error.message);
    if (!ok) return toast.error("No account with that email. Ask them to create an account on the sign-in page first.");
    toast.success("Administrator added");
    setEmail("");
    refetch();
  }

  async function remove(userId: string) {
    if (!window.confirm("Remove administrator access for this person?")) return;
    const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "admin");
    if (error) return toast.error(error.message);
    refetch();
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl">Administrators</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        To add someone, ask them to create an account on the sign-in page, then enter their email here.
      </p>
      <form onSubmit={add} className="mt-6 flex gap-3">
        <Input type="email" required placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button type="submit">Add administrator</Button>
      </form>
      <ul className="mt-8 divide-y divide-border border border-border bg-card">
        {data?.map((u) => (
          <li key={u.user_id} className="flex items-center justify-between p-4 text-sm">
            <span>{u.email}</span>
            {data.length > 1 && (
              <Button size="sm" variant="ghost" onClick={() => remove(u.user_id)}>
                Remove
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
