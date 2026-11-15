export type FieldType =
  "text" | "textarea" | "rich" | "image" | "bool" | "date" | "datetime" | "number" | "select";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  /** Load select options from a table column (e.g. journal categories). */
  optionsFrom?: { table: "post_categories"; column: "name"; manage?: string };
  help?: string;
  required?: boolean;
};

export type Section = {
  key: string;
  title: string;
  singular: string;
  table:
    | "posts"
    | "programs"
    | "events"
    | "impact_metrics"
    | "people"
    | "post_categories"
    | "page_items";
  /** Admin sidebar group. */
  nav: "Content" | "Website pages";
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
    nav: "Content",
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
      {
        name: "category",
        label: "Category",
        type: "select",
        optionsFrom: { table: "post_categories", column: "name", manage: "/admin/categories" },
      },
      { name: "author", label: "Author", type: "text" },
      { name: "published_at", label: "Publication date", type: "datetime" },
      { name: "published", label: "Published (visible on the website)", type: "bool" },
      ...seo,
    ],
  },
  {
    key: "stories",
    nav: "Content",
    title: "Stories",
    singular: "story",
    table: "posts",
    filter: { kind: "story" },
    defaults: { kind: "story" },
    titleField: "title",
    slugFrom: "title",
    order: { column: "created_at", ascending: false },
    previewPath: (r) => `/post/${r["slug"]}`,
    intro:
      "Real accounts from widows, volunteers and community members — only with their permission.",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "person", label: "Name (or chosen anonymous label)", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "cover_url", label: "Photograph", type: "image" },
      { name: "excerpt", label: "Short quote or summary", type: "textarea" },
      { name: "body", label: "Story", type: "rich" },
      {
        name: "category",
        label: "Type",
        type: "select",
        options: ["Widow", "Beneficiary", "Volunteer", "Partner", "Community member"],
      },
      { name: "published_at", label: "Publication date", type: "datetime" },
      {
        name: "consent_given",
        label: "The person has given permission to publish this",
        type: "bool",
      },
      {
        name: "published",
        label: "Published (visible only when permission is ticked)",
        type: "bool",
      },
      ...seo,
    ],
  },
  {
    key: "programs",
    nav: "Content",
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
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["active", "paused", "completed"],
      },
      { name: "donation_cta", label: "Giving message (optional)", type: "text" },
      { name: "featured", label: "Featured", type: "bool" },
      { name: "sort_order", label: "Order (lower shows first)", type: "number" },
      { name: "published", label: "Published", type: "bool" },
    ],
  },
  {
    key: "events",
    nav: "Content",
    title: "Events",
    singular: "event",
    table: "events",
    titleField: "title",
    order: { column: "event_date", ascending: false },
    intro:
      "Upcoming gatherings. The events section stays hidden when nothing upcoming is published.",
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
    key: "people",
    nav: "Website pages",
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
    nav: "Website pages",
    title: "Impact",
    singular: "number",
    table: "impact_metrics",
    titleField: "title",
    order: { column: "sort_order", ascending: true },
    intro: "Verified numbers only. Published numbers appear on the home page.",
    fields: [
      {
        name: "title",
        label: "What is counted",
        type: "text",
        required: true,
        help: "e.g. Widows trained",
      },
      { name: "value", label: "Number", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "year", label: "Year", type: "number" },
      { name: "category", label: "Category", type: "text" },
      { name: "sort_order", label: "Order", type: "number" },
      { name: "published", label: "Published", type: "bool" },
    ],
  },
  {
    key: "categories",
    nav: "Content",
    title: "Journal Categories",
    singular: "category",
    table: "post_categories",
    titleField: "name",
    order: { column: "sort_order", ascending: true },
    intro:
      "Categories available when writing journal articles. Renaming a category does not change articles already saved.",
    fields: [
      {
        name: "name",
        label: "Category name",
        type: "text",
        required: true,
        help: "e.g. Outreach, Teaching, Announcement",
      },
      { name: "sort_order", label: "Order (lower shows first)", type: "number" },
    ],
  },
  ...(
    [
      [
        "vision",
        "Vision",
        "vision statement",
        "The vision statements on the Home and About pages.",
      ],
      [
        "mission",
        "Mission",
        "mission commitment",
        "The mission commitments on the Home and About pages, each with its Scripture.",
      ],
      [
        "work_area",
        "Areas of Work",
        "area of work",
        "The areas of work on the Home and Our Work pages.",
      ],
    ] as const
  ).map(([group, title, singular, intro]): Section => ({
    key: group.replace("_", "-"),
    nav: "Website pages",
    title,
    singular,
    table: "page_items",
    filter: { item_group: group },
    defaults: { item_group: group },
    titleField: "label",
    order: { column: "sort_order", ascending: true },
    intro,
    fields: [
      { name: "label", label: "Title", type: "text", required: true },
      { name: "body", label: "Text", type: "textarea", required: true },
      { name: "scripture", label: "Scripture reference (optional)", type: "text" },
      { name: "sort_order", label: "Order (lower shows first)", type: "number" },
      { name: "published", label: "Published", type: "bool" },
    ],
  })),
];

export const getSection = (key: string) => SECTIONS.find((s) => s.key === key);
