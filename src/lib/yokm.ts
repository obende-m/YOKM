/**
 * Verified YOKM content, supplied by the organization.
 * Nothing here is invented. Anything not supplied is left out rather than filled in.
 */

export const ORG = {
  name: "Yendel Ocha Kpeling Ministry",
  abbr: "YOKM",
  focus: "Awake Oh Ye Widows",
  motto: "Not Me But Thee, Oh Lord.",
  visioner: "Evang. Sally Alice Miner",
  visionerTitle: "Visioner",
  address: "No. 24 Naraguta Avenue, Jos North L.G.A., Jos, Plateau State, Nigeria.",
  shortLocation: "Jos, Plateau State, Nigeria",
  registration: "Incorporated Trustee, Corporate Affairs Commission (CAC), Nigeria",
  registrationNumber: "RC 75860 / IT-75860",
  registrationDate: "Registered in March 2015",
  coverScriptures: ["Ephesians 5:14–15", "Isaiah 52:1"],
  positioning:
    "A Christian ministry dedicated to reaching, equipping and strengthening widows — helping them discover their God-given purpose, develop their abilities, become independent and become a positive influence in their homes, churches and society.",
};

export const VISION = [
  {
    key: "Purpose",
    text: "To fulfil the plans and purpose of God in the life of widows.",
  },
  {
    key: "Independence",
    text: "To make them independent.",
  },
  {
    key: "Discovery",
    text: "To train and equip widows with the undiluted Word of God, and make them discover their talents and gifts.",
  },
];

export const MISSION = [
  {
    no: "01",
    label: "Reaching Out",
    text: "Total reaching out to widows in all aspects of life.",
    scripture: "Matthew 28:19–20",
  },
  {
    no: "02",
    label: "The Gospel",
    text: "To present the Gospel of Jesus to the widows.",
    scripture: "John 4:17",
  },
  {
    no: "03",
    label: "Independence",
    text: "To make them independent, and not dependent on people.",
    scripture: "1 Thessalonians 4:11–12",
  },
  {
    no: "04",
    label: "Community",
    text: "To teach them how to edify one another.",
    scripture: "Romans 14:19",
  },
  {
    no: "05",
    label: "Stewardship",
    text: "To make them faithful stewards for Jesus.",
    scripture: "1 Corinthians 4:2",
  },
  {
    no: "06",
    label: "Good Works",
    text: "To provoke one another to good works.",
    scripture: "Hebrews 10:24",
  },
  {
    no: "07",
    label: "Skills & Resources",
    text: "To teach them to be skillful and manage resources.",
    scripture: "Proverbs 18:16, 20:13, 22:29",
  },
  {
    no: "08",
    label: "Family, Church & Society",
    text: "To build the widows to be pillars at home, in the Church and in society.",
    scripture: "Proverbs 31:15–30",
  },
  {
    no: "09",
    label: "Giving",
    text: "To teach them how to be givers and not only receivers, especially in the area of building the Kingdom of God.",
    scripture: "Acts 20:35; Luke 6:38",
  },
  {
    no: "10",
    label: "Standing in the Gap",
    text: "To teach them how to stand in the gap for the nation and others.",
    scripture: "Ezekiel 22:30",
  },
];

/** Thematic areas derived from the supplied mission — not official programme names. */
export const WORK_AREAS = [
  {
    slug: "spiritual-growth",
    title: "Spiritual Growth",
    text: "Presenting the Gospel and helping widows grow in their faith.",
    scripture: "John 4:17",
  },
  {
    slug: "independence",
    title: "Independence",
    text: "Helping widows become less dependent on others and develop sustainable independence.",
    scripture: "1 Thessalonians 4:11–12",
  },
  {
    slug: "skills-and-talents",
    title: "Skills & Talents",
    text: "Helping widows discover and develop their talents and practical skills.",
    scripture: "Proverbs 22:29",
  },
  {
    slug: "resource-management",
    title: "Resource Management",
    text: "Teaching practical resource and stewardship principles.",
    scripture: "1 Corinthians 4:2",
  },
  {
    slug: "community-and-mutual-support",
    title: "Community & Mutual Support",
    text: "Encouraging widows to support and edify one another.",
    scripture: "Romans 14:19",
  },
  {
    slug: "family-church-society",
    title: "Family, Church & Society",
    text: "Helping widows become pillars within their homes, churches and communities.",
    scripture: "Proverbs 31:15–30",
  },
];

export const NAV = [
  { to: "/about", label: "About" },
  { to: "/our-work", label: "Our Work" },
  { to: "/stories", label: "Stories" },
  { to: "/gallery", label: "Gallery" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/contact", label: "Contact" },
] as const;

/**
 * Contact channels and social accounts are intentionally empty until YOKM
 * supplies verified details. Nothing is displayed while these are empty.
 */
export const CONTACT_CHANNELS: { label: string; value: string; href?: string }[] = [];
export const SOCIAL_LINKS: { label: string; href: string }[] = [];

/** No verified impact numbers supplied — the section stays hidden while empty. */
export const IMPACT_METRICS: { value: string; label: string; note?: string }[] = [];

/** No verified stories supplied — the section stays hidden while empty. */
export const STORIES: {
  slug: string;
  title: string;
  person: string;
  location: string;
  excerpt: string;
}[] = [];

/** No events supplied — the section stays hidden while empty. */
export const EVENTS: { title: string; date: string; location: string }[] = [];

/** No gallery photographs supplied yet. */
export const GALLERY: { src: string; caption: string }[] = [];

/** Donation configuration is supplied by YOKM later; nothing is invented here. */
export const DONATION = {
  configured: false,
  url: "",
  provider: "",
  bankDetails: "",
  instructions: "",
};
