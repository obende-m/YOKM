import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

/** Editable site settings keys, shown in the admin Site Settings screen. */
export const SETTING_FIELDS: { key: string; label: string; group: string; multiline?: boolean; help?: string }[] = [
  { key: "contact_email", label: "Email", group: "Contact" },
  { key: "contact_phone", label: "Phone", group: "Contact" },
  { key: "contact_whatsapp", label: "WhatsApp number", group: "Contact" },
  { key: "contact_address", label: "Address (leave empty to use the registered office)", group: "Contact", multiline: true },
  { key: "social_facebook", label: "Facebook link", group: "Social media" },
  { key: "social_instagram", label: "Instagram link", group: "Social media" },
  { key: "social_youtube", label: "YouTube link", group: "Social media" },
  { key: "social_x", label: "X / Twitter link", group: "Social media" },
  { key: "social_tiktok", label: "TikTok link", group: "Social media" },
  { key: "donation_url", label: "Online giving link", group: "Giving" },
  { key: "donation_bank", label: "Bank details", group: "Giving", multiline: true },
  { key: "donation_instructions", label: "Giving instructions", group: "Giving", multiline: true },
  { key: "footer_text", label: "Footer text (replaces the default description)", group: "Footer", multiline: true },
];

export const SOCIAL_KEYS: [string, string][] = [
  ["social_facebook", "Facebook"],
  ["social_instagram", "Instagram"],
  ["social_youtube", "YouTube"],
  ["social_x", "X"],
  ["social_tiktok", "TikTok"],
];

export function useSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("key,value");
      const map: Record<string, string> = {};
      for (const r of data ?? []) if (r.value.trim()) map[r.key] = r.value.trim();
      return map;
    },
    staleTime: 60_000,
  });
}

export function contactChannels(s: Record<string, string>) {
  const out: { label: string; value: string; href?: string }[] = [];
  if (s["contact_email"]) out.push({ label: "Email", value: s["contact_email"], href: `mailto:${s["contact_email"]}` });
  if (s["contact_phone"]) out.push({ label: "Phone", value: s["contact_phone"], href: `tel:${s["contact_phone"].replace(/\s/g, "")}` });
  if (s["contact_whatsapp"])
    out.push({ label: "WhatsApp", value: s["contact_whatsapp"], href: `https://wa.me/${s["contact_whatsapp"].replace(/\D/g, "")}` });
  return out;
}

export function socialLinks(s: Record<string, string>) {
  return SOCIAL_KEYS.filter(([k]) => s[k]).map(([k, label]) => ({ label, href: s[k]! }));
}

export type Post = {
  id: string;
  kind: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_url: string | null;
  category: string;
  author: string;
  person: string;
  location: string;
  published_at: string | null;
  seo_title: string;
  seo_description: string;
};

export function usePosts(kind: "journal" | "story") {
  return useQuery({
    queryKey: ["posts", kind],
    queryFn: async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("kind", kind)
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false });
      return (data ?? []) as Post[];
    },
  });
}

export function usePublished<T>(table: "programs" | "events" | "impact_metrics" | "media" | "people", order = "sort_order") {
  return useQuery({
    queryKey: ["public", table],
    queryFn: async () => {
      const { data } = await supabase.from(table).select("*").eq("published", true).order(order, { ascending: true });
      return (data ?? []) as T[];
    },
  });
}

/** Upload an image to the private media bucket; returns a public proxy URL. */
export async function uploadImage(file: File): Promise<string> {
  const safe = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const path = `${Date.now()}-${safe}`;
  const { error } = await supabase.storage.from("media").upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  return `/api/public/media/${path}`;
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function safeUrl(u: string) {
  return /^(https?:\/\/|\/|mailto:)/i.test(u) ? u : "#";
}
function inline(s: string) {
  return s
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, a, u) => `<img src="${safeUrl(u)}" alt="${a}" loading="lazy" />`)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => `<a href="${safeUrl(u)}">${t}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

/** Very small, safe formatter: ## headings, > quotes, - lists, **bold**, *italic*, links, images. */
export function renderRichText(src: string) {
  return esc(src)
    .split(/\n{2,}/)
    .map((block) => {
      const b = block.trim();
      if (!b) return "";
      if (b.startsWith("### ")) return `<h3>${inline(b.slice(4))}</h3>`;
      if (b.startsWith("## ")) return `<h2>${inline(b.slice(3))}</h2>`;
      if (b.startsWith("&gt; ")) return `<blockquote>${inline(b.replace(/^&gt; ?/gm, ""))}</blockquote>`;
      if (/^- /.test(b))
        return `<ul>${b
          .split("\n")
          .map((l) => `<li>${inline(l.replace(/^- /, ""))}</li>`)
          .join("")}</ul>`;
      return `<p>${inline(b).replace(/\n/g, "<br/>")}</p>`;
    })
    .join("");
}

export function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || `item-${Date.now()}`;
}

export function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export type MediaRow = { id: string; url: string; caption: string; alt: string; category: string };
export type EventRow = { id: string; title: string; event_date: string | null; event_time: string; location: string; description: string; cover_url: string | null; link: string };
export type ProgramRow = { id: string; name: string; slug: string; short_description: string; full_description: string; cover_url: string | null; status: string; donation_cta: string };
export type PersonRow = { id: string; name: string; role: string; bio: string; photo_url: string | null };
export type MetricRow = { id: string; title: string; value: string; description: string; year: number | null };

/** Published events dated today or later, soonest first. */
export function useUpcomingEvents() {
  return useQuery({
    queryKey: ["public", "events", "upcoming"],
    queryFn: async () => {
      const today = new Date().toISOString().slice(0, 10);
      const { data } = await supabase.from("events").select("*").eq("published", true).gte("event_date", today).order("event_date", { ascending: true });
      return (data ?? []) as EventRow[];
    },
  });
}
