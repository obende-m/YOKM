import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { MISSION, ORG, VISION, WORK_AREAS } from "@/lib/yokm";

/* -------------------------------------------------------------------------- */
/* Site settings & editable page text                                          */
/* -------------------------------------------------------------------------- */

export type SettingField = {
  key: string;
  label: string;
  group: string;
  multiline?: boolean;
  image?: boolean;
  help?: string;
  /** Shown on the website while the setting is empty. */
  default?: string;
};

/** Editable site settings, shown in the admin Site Settings and Page Text screens. */
export const SETTING_FIELDS: SettingField[] = [
  { key: "contact_email", label: "Email", group: "Contact" },
  { key: "contact_phone", label: "Phone", group: "Contact" },
  {
    key: "contact_whatsapp",
    label: "WhatsApp number",
    group: "Contact",
    help: "Include the country code, e.g. +234…",
  },
  {
    key: "contact_address",
    label: "Address",
    group: "Contact",
    multiline: true,
    default: ORG.address,
  },
  { key: "social_facebook", label: "Facebook link", group: "Social media" },
  { key: "social_instagram", label: "Instagram link", group: "Social media" },
  { key: "social_youtube", label: "YouTube link", group: "Social media" },
  { key: "social_x", label: "X / Twitter link", group: "Social media" },
  { key: "social_tiktok", label: "TikTok link", group: "Social media" },
  {
    key: "donation_url",
    label: "Online giving link",
    group: "Giving",
    help: "A secure payment page from your bank or payment provider (https://…).",
  },
  {
    key: "donation_bank",
    label: "Bank details",
    group: "Giving",
    multiline: true,
    help: "Account name, bank and account number — one per line.",
  },
  { key: "donation_instructions", label: "Giving instructions", group: "Giving", multiline: true },
  {
    key: "footer_text",
    label: "Footer text",
    group: "Footer",
    multiline: true,
    default: ORG.positioning,
  },
];

/** Website wording that administrators can change without touching code. */
export const PAGE_TEXT_FIELDS: SettingField[] = [
  { key: "home_hero_image", label: "Main photograph", group: "Home page", image: true },
  {
    key: "home_vision_image",
    label: "Vision photograph",
    group: "Home page",
    image: true,
  },
  { key: "home_work_image", label: "Our work photograph", group: "Home page", image: true },
  { key: "home_give_image", label: "Giving photograph", group: "Home page", image: true },
  {
    key: "home_hero_title",
    label: "Main heading",
    group: "Home page",
    default: "Awake, Oh Ye Widows",
  },
  {
    key: "home_hero_intro",
    label: "Introduction",
    group: "Home page",
    multiline: true,
    default:
      "A Christian ministry in Jos, Plateau State, reaching widows in every aspect of life — so that they discover God’s purpose, develop their gifts and stand independent.",
  },
  {
    key: "home_heart_tagline",
    label: "“Heart of YOKM” tagline",
    group: "Home page",
    default: "Awake. Discover. Become.",
  },
  {
    key: "home_heart_heading",
    label: "“Heart of YOKM” statement",
    group: "Home page",
    multiline: true,
    default:
      "No woman should have to carry loss alone, and no widow should live below the purpose God placed in her.",
  },
  {
    key: "home_stories_heading",
    label: "Stories heading",
    group: "Home page",
    default: "Behind every widow is a woman, a family, a story.",
  },
  {
    key: "home_stories_intro",
    label: "Stories introduction",
    group: "Home page",
    multiline: true,
    default:
      "YOKM tells stories only as the women themselves choose to share them. As accounts are gathered and approved, they are published here in the widows’ own words.",
  },
  {
    key: "home_work_heading",
    label: "Our work heading",
    group: "Home page",
    default: "Six areas drawn directly from the ministry’s mission.",
  },
  {
    key: "home_give_heading",
    label: "Giving heading",
    group: "Home page",
    default: "Help carry hope further.",
  },
  {
    key: "home_give_text",
    label: "Giving text",
    group: "Home page",
    multiline: true,
    default:
      "Giving to YOKM is participation in the mission — standing with widows as they grow in faith, discover their gifts and become independent.",
  },

  { key: "about_image", label: "Photograph", group: "About page", image: true },
  {
    key: "about_intro",
    label: "Introduction",
    group: "About page",
    multiline: true,
    default: ORG.positioning,
  },
  {
    key: "about_focus_text",
    label: "Ministry focus text",
    group: "About page",
    multiline: true,
    default:
      "YOKM exists for widows — reaching them in all aspects of life, presenting the Gospel of Jesus, and building them into pillars at home, in the Church and in society.",
  },
  { key: "leader_photo", label: "Visioner photograph", group: "About page", image: true },
  {
    key: "leader_bio",
    label: "Visioner biography",
    group: "About page",
    multiline: true,
    help: "Leave empty until a verified biography is supplied. Leave an empty line between paragraphs.",
  },

  { key: "work_image", label: "Our Work photograph", group: "Other pages", image: true },
  {
    key: "involved_image",
    label: "Get Involved photograph",
    group: "Other pages",
    image: true,
  },
  {
    key: "work_intro",
    label: "Our Work introduction",
    group: "Other pages",
    multiline: true,
    default:
      "The areas below are drawn directly from YOKM’s mission. They describe the ministry’s thematic focus.",
  },
  {
    key: "involved_intro",
    label: "Get Involved introduction",
    group: "Other pages",
    multiline: true,
    default:
      "Give, volunteer, partner, pray or share — every kind of help strengthens the work among widows in Jos.",
  },
  {
    key: "donate_intro",
    label: "Support page introduction",
    group: "Other pages",
    multiline: true,
    default:
      "Giving to YOKM is participation in the mission — standing with widows as they grow in faith, discover their gifts and become independent.",
  },
  {
    key: "stories_intro",
    label: "Stories page introduction",
    group: "Other pages",
    multiline: true,
    default:
      "YOKM publishes stories only as the widows and community members choose to share them. Nothing here is written on their behalf.",
  },
  {
    key: "journal_intro",
    label: "Journal page introduction",
    group: "Other pages",
    multiline: true,
    default: "Outreach reports, teachings, announcements and community updates from the ministry.",
  },
];

const ALL_SETTING_FIELDS = [...SETTING_FIELDS, ...PAGE_TEXT_FIELDS];

export const SOCIAL_KEYS: [string, string][] = [
  ["social_facebook", "Facebook"],
  ["social_instagram", "Instagram"],
  ["social_youtube", "YouTube"],
  ["social_x", "X"],
  ["social_tiktok", "TikTok"],
];

/** Raw settings that have a non-empty value. */
export function useSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("key,value");
      if (error) throw error;
      const map: Record<string, string> = {};
      for (const r of data ?? []) if (r.value.trim()) map[r.key] = r.value.trim();
      return map;
    },
    staleTime: 60_000,
  });
}

/** Returns a lookup that falls back to the built-in default wording. */
export function useSiteText() {
  const { data = {} } = useSettings();
  return (key: string) => data[key] ?? ALL_SETTING_FIELDS.find((f) => f.key === key)?.default ?? "";
}

export function contactChannels(s: Record<string, string>) {
  const out: { label: string; value: string; href?: string }[] = [];
  if (s["contact_email"])
    out.push({ label: "Email", value: s["contact_email"], href: `mailto:${s["contact_email"]}` });
  if (s["contact_phone"])
    out.push({
      label: "Phone",
      value: s["contact_phone"],
      href: `tel:${s["contact_phone"].replace(/[^\d+]/g, "")}`,
    });
  if (s["contact_whatsapp"])
    out.push({
      label: "WhatsApp",
      value: s["contact_whatsapp"],
      href: `https://wa.me/${s["contact_whatsapp"].replace(/\D/g, "")}`,
    });
  return out;
}

export function socialLinks(s: Record<string, string>) {
  return SOCIAL_KEYS.filter(([k]) => s[k] && isHttpUrl(s[k]!)).map(([k, label]) => ({
    label,
    href: s[k]!,
  }));
}

export function isHttpUrl(u: string) {
  return /^https?:\/\/[^\s]+$/i.test(u.trim());
}

/* -------------------------------------------------------------------------- */
/* Posts                                                                      */
/* -------------------------------------------------------------------------- */

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

export function usePosts(kind: "journal" | "story", limit?: number) {
  return useQuery({
    queryKey: ["posts", kind, limit ?? "all"],
    queryFn: async () => {
      let q = supabase
        .from("posts")
        .select("*")
        .eq("kind", kind)
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false });
      if (limit) q = q.limit(limit);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Post[];
    },
  });
}

export function usePostCategories() {
  return useQuery({
    queryKey: ["public", "post_categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("post_categories")
        .select("id,name")
        .order("sort_order")
        .order("name");
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 60_000,
  });
}

/* -------------------------------------------------------------------------- */
/* Generic published content                                                  */
/* -------------------------------------------------------------------------- */

type PublicTable = "programs" | "events" | "impact_metrics" | "media" | "people" | "albums";

export function usePublished<T>(table: PublicTable, order = "sort_order") {
  return useQuery({
    queryKey: ["public", table],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("published", true)
        .order(order, { ascending: true });
      if (error) throw error;
      return (data ?? []) as T[];
    },
  });
}

export type PageItem = { id: string; label: string; body: string; scripture: string };
type ItemGroup = "vision" | "mission" | "work_area";

const PAGE_ITEM_FALLBACK: Record<ItemGroup, PageItem[]> = {
  vision: VISION.map((v, i) => ({ id: `v${i}`, label: v.key, body: v.text, scripture: "" })),
  mission: MISSION.map((m) => ({
    id: `m${m.no}`,
    label: m.label,
    body: m.text,
    scripture: m.scripture,
  })),
  work_area: WORK_AREAS.map((w) => ({
    id: w.slug,
    label: w.title,
    body: w.text,
    scripture: w.scripture,
  })),
};

/**
 * Vision statements, mission commitments and areas of work, editable in the CMS.
 * Until the database answers (or if it cannot be reached) the ministry's supplied
 * wording is shown, so these sections are never blank.
 */
export function usePageItems(group: ItemGroup): PageItem[] {
  const { data } = useQuery({
    queryKey: ["public", "page_items", group],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_items")
        .select("id,label,body,scripture")
        .eq("item_group", group)
        .eq("published", true)
        .order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
    retry: 1,
    staleTime: 60_000,
  });
  return data ?? PAGE_ITEM_FALLBACK[group];
}

/* -------------------------------------------------------------------------- */
/* Submissions                                                                */
/* -------------------------------------------------------------------------- */

export type SubmissionInput = {
  kind: "contact" | "volunteer" | "partner";
  name: string;
  email: string;
  phone?: string;
  organisation?: string;
  subject?: string;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validates and stores a website form submission. Returns an error message, or null on success. */
export async function sendSubmission(input: SubmissionInput): Promise<string | null> {
  const row = {
    kind: input.kind,
    name: input.name.trim().slice(0, 200),
    email: input.email.trim().slice(0, 255),
    phone: (input.phone ?? "").trim().slice(0, 50),
    organisation: (input.organisation ?? "").trim().slice(0, 200),
    subject: (input.subject ?? "").trim().slice(0, 200),
    message: input.message.trim().slice(0, 5000),
  };
  if (!row.name) return "Please add your name.";
  if (!EMAIL_RE.test(row.email)) return "Please add a valid email address.";
  if (!row.message) return "Please add a message.";
  const { error } = await supabase.from("submissions").insert(row);
  if (error) return "Your message could not be sent. Please try again in a moment.";
  return null;
}

/* -------------------------------------------------------------------------- */
/* Media                                                                      */
/* -------------------------------------------------------------------------- */

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

/** Upload an image to the public "media" bucket; returns its public URL and storage path. */
export async function uploadImageWithPath(file: File): Promise<{ url: string; path: string }> {
  if (!ALLOWED_TYPES.includes(file.type))
    throw new Error(`${file.name}: please use a JPG, PNG, WebP, GIF or AVIF image.`);
  if (file.size > MAX_UPLOAD_BYTES)
    throw new Error(`${file.name} is larger than 10 MB. Please resize it first.`);
  const safe = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+/, "");
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${safe}`;
  const { error } = await supabase.storage
    .from("media")
    .upload(path, file, { contentType: file.type, upsert: false, cacheControl: "31536000" });
  if (error) throw error;
  return { url: supabase.storage.from("media").getPublicUrl(path).data.publicUrl, path };
}

export async function uploadImage(file: File): Promise<string> {
  return (await uploadImageWithPath(file)).url;
}

/** Best-effort removal of an uploaded file from storage, given its stored URL or path. */
export async function removeStoredImage(urlOrPath: string | null | undefined) {
  if (!urlOrPath) return;
  const m = urlOrPath.match(
    /(?:\/storage\/v1\/object\/public\/media\/|\/api\/public\/media\/)([^?#]+)$/,
  );
  const path = m ? decodeURIComponent(m[1]!) : /^[a-z0-9.-]+$/.test(urlOrPath) ? urlOrPath : null;
  if (path) await supabase.storage.from("media").remove([path]);
}

/* -------------------------------------------------------------------------- */
/* Rich text                                                                  */
/* -------------------------------------------------------------------------- */

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function safeUrl(u: string) {
  return /^(https?:\/\/|\/(?!\/)|mailto:)/i.test(u) ? u : "#";
}
function inline(s: string) {
  return s
    .replace(
      /!\[([^\]]*)\]\(([^)\s]+)\)/g,
      (_, a, u) => `<img src="${safeUrl(u)}" alt="${a}" loading="lazy" />`,
    )
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => {
      const href = safeUrl(u);
      const ext = /^https?:\/\//i.test(href) ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${href}"${ext}>${t}</a>`;
    })
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
      if (b.startsWith("&gt; "))
        return `<blockquote>${inline(b.replace(/^&gt; ?/gm, ""))}</blockquote>`;
      if (/^- /.test(b))
        return `<ul>${b
          .split("\n")
          .map((l) => `<li>${inline(l.replace(/^- /, ""))}</li>`)
          .join("")}</ul>`;
      if (/^!\[[^\]]*\]\([^)\s]+\)$/.test(b)) return `<figure>${inline(b)}</figure>`;
      return `<p>${inline(b).replace(/\n/g, "<br/>")}</p>`;
    })
    .join("");
}

/* -------------------------------------------------------------------------- */
/* Helpers & row types                                                        */
/* -------------------------------------------------------------------------- */

export function slugify(s: string) {
  return (
    s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || `item-${Date.now()}`
  );
}

export function formatDate(d: string | null) {
  if (!d) return "";
  // Date-only values (YYYY-MM-DD) are parsed as UTC; format them in UTC so the day never shifts.
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(d);
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(dateOnly ? { timeZone: "UTC" } : {}),
  });
}

export type MediaRow = {
  id: string;
  url: string;
  caption: string;
  alt: string;
  category: string;
  album_id: string | null;
  featured: boolean;
  taken_on: string | null;
  sort_order: number;
};
export type AlbumRow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  album_date: string | null;
  cover_url: string | null;
  sort_order: number;
};
export type EventRow = {
  id: string;
  title: string;
  event_date: string | null;
  event_time: string;
  location: string;
  description: string;
  cover_url: string | null;
  link: string;
};
export type ProgramRow = {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  cover_url: string | null;
  status: string;
  donation_cta: string;
  featured: boolean;
};
export type PersonRow = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string | null;
};
export type MetricRow = {
  id: string;
  title: string;
  value: string;
  description: string;
  year: number | null;
};

/** Published events dated today or later, soonest first. */
export function useUpcomingEvents(limit?: number) {
  return useQuery({
    queryKey: ["public", "events", "upcoming", limit ?? "all"],
    queryFn: async () => {
      const today = new Date().toISOString().slice(0, 10);
      let q = supabase
        .from("events")
        .select("*")
        .eq("published", true)
        .gte("event_date", today)
        .order("event_date", { ascending: true });
      if (limit) q = q.limit(limit);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as EventRow[];
    },
  });
}
