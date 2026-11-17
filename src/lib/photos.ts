/**
 * The ministry's own photographs, bundled as responsive WebP files. Alt text describes
 * only what is visible; nobody pictured is named. Every page slot that uses one can be
 * replaced from the CMS (Page Text).
 */
export type Photo = {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  alt: string;
  /** Where to anchor the crop in wide frames (CSS object-position); defaults to the top. */
  position?: string;
};

const files = import.meta.glob<string>("../assets/photos/yokm/*.webp", {
  eager: true,
  import: "default",
});

function build(key: string, width: number, height: number, alt: string): Photo {
  const variants = Object.entries(files)
    .map(([path, url]) => {
      const m = path.match(new RegExp(`/${key}-(\\d+)\\.webp$`));
      return m ? { w: Number(m[1]), url } : null;
    })
    .filter((v): v is { w: number; url: string } => v !== null)
    .sort((a, b) => a.w - b.w);
  const largest = variants.find((v) => v.w === 1600) ?? variants[variants.length - 1]!;
  return {
    src: largest.url,
    srcSet: variants.map((v) => `${v.url} ${v.w}w`).join(", "),
    width,
    height,
    alt,
  };
}

export const PHOTOS = {
  giftSmiles: build(
    "gift-smiles",
    3000,
    2143,
    "Two smiling women in blue and gold wrappers hold a gift parcel together beside a car",
  ),
  seatedRow: build(
    "seated-row",
    3000,
    2003,
    "A row of women sit together in bright wrappers, hands folded in their laps",
  ),
  seatedDrums: build(
    "seated-drums",
    3000,
    2003,
    "Women seated close together in a crowded hall, with drums in front of them",
  ),
  handingGift: build(
    "handing-gift",
    3000,
    2003,
    "A young woman hands a parcel to an older woman as a crowd in matching wrappers looks on",
  ),
  crowdTrees: build(
    "crowd-trees",
    3000,
    2003,
    "A large gathering of women stands together under trees in the afternoon sun",
  ),
  teachingCircle: {
    ...build(
      "teaching-circle",
      4160,
      3120,
      "A woman stands to speak in a courtyard while women sit around her in a wide circle",
    ),
    position: "50% 50%",
  },
  biblesRaised: {
    ...build("bibles-raised", 4160, 3120, "Women stand together holding up new Bibles"),
    position: "50% 50%",
  },
  worship: build("worship", 1920, 1080, "Women raise their hands in worship under a tree"),
  giftGiven: build(
    "gift-given",
    3000,
    2003,
    "A woman receives a parcel among a group in matching blue and gold wrappers",
  ),
  addressing: build(
    "addressing",
    3000,
    2003,
    "A woman in a blue gown speaks to a group of women gathered around her",
  ),
  seatedHall: build(
    "seated-hall",
    3000,
    2003,
    "Women in matching wrappers sit on chairs in a hall, parcels at their feet",
  ),
  twoWomen: build("two-women", 3000, 2143, "An older woman holds a parcel beside a younger woman"),
  standingPortrait: {
    ...build(
      "standing-portrait",
      3000,
      4200,
      "Women stand outdoors beside a car with parcels at their feet",
    ),
    position: "50% 18%",
  },
  groupTrees: build(
    "group-trees",
    3000,
    2003,
    "Women in matching blue and gold wrappers stand together under trees",
  ),
} satisfies Record<string, Photo>;

/** A CMS image (a plain URL) takes the place of the bundled photograph when set. */
export function pick(cmsUrl: string | undefined, fallback: Photo, alt?: string): Photo {
  if (cmsUrl) return { src: cmsUrl, width: 1600, height: 1200, alt: alt ?? "" };
  return alt !== undefined ? { ...fallback, alt } : fallback;
}
