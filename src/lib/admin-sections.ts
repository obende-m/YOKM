export type FieldType = "text" | "textarea" | "rich" | "image" | "bool" | "date" | "datetime" | "number" | "select";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  help?: string;
  required?: boolean;
};

export type Section = {
  key: string;
  title: string;
  singular: string;
  table: "posts" | "programs" | "events" | "impact_metrics" | "media" | "people";
  filter?: Record<string, string>;
  defaults?: Record<string, unknown>;
  titleField: string;
  slugFrom?: string;
  order: { column: string; ascending: boolean };
  previewPath?: (row: Record<string, unknown>) => string;
  fields: Field[];
  intro: string;
};

const seo: Field[] = [
  { name: "seo_title", label: "Search title (optional)", type: "text" },
  { name: "seo_description", label: "Search description (optional)", type: "textarea" },
];

export const SECTIONS: Section[] = [
  {
    key: "journal",
    title: "Journal",
    singular: "article",
    table: "posts",
    filter: { kind: "journal" },
    defaults: { kind: "journal" },
    titleField: "title",
    slugFrom: "title",
    order: { column: "created_at", ascending: false },
    previewPath: (r) => `/post/${r["slug"]}`,
    intro: "Ministry updates, outreach reports, teachings and announcements.",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "cover_url", label: "Cover image", type: "image" },
      { name: "excerpt", label: "Short summary", type: "textarea" },
      { name: "body", label: "Article", type: "rich" },
      { name: "category", label: "Category", type: "text", help: "e.g. Outreach, Teaching, Announcement" },
      { name: "author", label: "Author", type: "text" },
      { name: "published_at", label: "Publication date", type: "datetime" },
      { name: "published", label: "Published (visible on the website)", type: "bool" },
      ...seo,
    ],
  },
  {
    key: "stories",
    title: "Stories",
    singular: "story",
    table: "posts",
    filter: { kind: "story" },
    defaults: { kind: "story" },
    titleField: "title",
    slugFrom: "title",
    order: { column: "created_at", ascending: false },
    previewPath: (r) => `/post/${r["slug"]}`,
    intro: "Real accounts from widows, volunteers and community members — only with their permission.",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "person", label: "Name (or chosen anonymous label)", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "cover_url", label: "Photograph", type: "image" },
      { name: "excerpt", label: "Short quote or summary", type: "textarea" },
      { name: "body", label: "Story", type: "rich" },
      { name: "category", label: "Type", type: "select", options: ["Widow", "Beneficiary", "Volunteer", "Partner", "Community member"] },
      { name: "published_at", label: "Publication date", type: "datetime" },
      { name: "consent_given", label: "The person has given permission to publish this", type: "bool" },
      { name: "published", label: "Published (visible only when permission is ticked)", type: "bool" },
      ...seo,
    ],
  },
  {
    key: "programs",
    title: "Programs",
    singular: "program",
    table: "programs",
    titleField: "name",
    slugFrom: "name",
    order: { column: "sort_order", ascending: true },
    intro: "Verified areas of work. Shown on the Our Work page when published.",
    fields: [
      { name: "name", label: "Program name", type: "text", required: true },
      { name: "short_description", label: "Short description", type: "textarea" },
      { name: "full_description", label: "Full description", type: "rich" },
      { name: "cover_url", label: "Cover image", type: "image" },
      { name: "status", label: "Status", type: "select", options: ["active", "paused", "completed"] },
      { name: "donation_cta", label: "Giving message (optional)", type: "text" },
      { name: "featured", label: "Featured", type: "bool" },
      { name: "sort_order", label: "Order (lower shows first)", type: "number" },
      { name: "published", label: "Published", type: "bool" },
    ],
  },
  {
    key: "events",
    title: "Events",
    singular: "event",
    table: "events",
    titleField: "title",
    order: { column: "event_date", ascending: false },
    intro: "Upcoming gatherings. The events section stays hidden when nothing upcoming is published.",
    fields: [
      { name: "title", label: "Event title", type: "text", required: true },
      { name: "event_date", label: "Date", type: "date" },
      { name: "event_time", label: "Time", type: "text", help: "e.g. 10:00 AM" },
      { name: "location", label: "Location", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "cover_url", label: "Cover image", type: "image" },
      { name: "link", label: "Registration or contact link", type: "text" },
      { name: "published", label: "Published", type: "bool" },
    ],
  },
  {
    key: "gallery",
    title: "Gallery",
    singular: "photograph",
    table: "media",
    titleField: "caption",
    order: { column: "sort_order", ascending: true },
    defaults: { url: "" },
    intro: "Photographs shown on the Gallery page. Lower order numbers appear first.",
    fields: [
      { name: "url", label: "Photograph", type: "image", required: true },
      { name: "caption", label: "Caption", type: "text" },
      { name: "alt", label: "Description for screen readers", type: "text" },
      { name: "category", label: "Category", type: "text" },
      { name: "sort_order", label: "Order", type: "number" },
      { name: "published", label: "Published", type: "bool" },
    ],
  },
  {
    key: "people",
    title: "People",
    singular: "person",
    table: "people",
    titleField: "name",
    order: { column: "sort_order", ascending: true },
    intro: "Leadership and team. Only published people appear on the About page.",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text" },
      { name: "photo_url", label: "Photograph", type: "image" },
      { name: "bio", label: "Biography", type: "textarea" },
      { name: "sort_order", label: "Order", type: "number" },
      { name: "published", label: "Published", type: "bool" },
    ],
  },
  {
    key: "impact",
    title: "Impact",
    singular: "number",
    table: "impact_metrics",
    titleField: "title",
    order: { column: "sort_order", ascending: true },
    intro: "Verified numbers only. Published numbers appear on the home page.",
    fields: [
      { name: "title", label: "What is counted", type: "text", required: true, help: "e.g. Widows trained" },
      { name: "value", label: "Number", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "year", label: "Year", type: "number" },
      { name: "category", label: "Category", type: "text" },
      { name: "sort_order", label: "Order", type: "number" },
      { name: "published", label: "Published", type: "bool" },
    ],
  },
];

export const getSection = (key: string) => SECTIONS.find((s) => s.key === key);
