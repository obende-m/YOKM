/**
 * Photographs bundled from the ministry's own collection. The gallery shows them only
 * until photographs are published through the CMS; after that, the CMS takes over.
 */
const files = import.meta.glob<string>("../assets/photos/gallery/*.webp", {
  eager: true,
  import: "default",
});

export type FallbackAlbum = { id: string; slug: string; title: string; description: string };

export const FALLBACK_ALBUMS: FallbackAlbum[] = [
  { id: "a1", slug: "christmas-2023", title: "2023 Christmas Giveaway", description: "" },
  { id: "a2", slug: "christmas-2024", title: "2024 Christmas Giveaway", description: "" },
  { id: "a3", slug: "bibles-langtang", title: "Bible Distribution in Langtang", description: "" },
  { id: "a4", slug: "langtang-branch", title: "Langtang Branch", description: "" },
  { id: "a5", slug: "programmes", title: "Photos from Programmes", description: "" },
];

const RAW: [string, string, number, number][] = [
  ["christmas-2023-3", "a1", 1080, 721],
  ["christmas-2023-5", "a1", 1080, 721],
  ["christmas-2023-10", "a1", 1080, 721],
  ["christmas-2023-12", "a1", 1080, 721],
  ["christmas-2023-17", "a1", 1080, 721],
  ["christmas-2023-18", "a1", 1080, 721],
  ["christmas-2023-20", "a1", 1080, 721],
  ["christmas-2023-21", "a1", 1080, 721],
  ["christmas-2023-22", "a1", 1080, 721],
  ["christmas-2023-23", "a1", 1080, 721],
  ["christmas-2023-25", "a1", 1080, 721],
  ["christmas-2023-26", "a1", 1080, 771],
  ["christmas-2023-29", "a1", 1080, 721],
  ["christmas-2024-13", "a2", 607, 1080],
  ["christmas-2024-17", "a2", 607, 1080],
  ["christmas-2024-21", "a2", 1040, 780],
  ["christmas-2024-35", "a2", 607, 1080],
  ["bibles-langtang-3", "a3", 1080, 1440],
  ["bibles-langtang-11", "a3", 1080, 810],
  ["bibles-langtang-13", "a3", 1080, 810],
  ["bibles-langtang-16", "a3", 1080, 810],
  ["bibles-langtang-18", "a3", 1080, 810],
  ["langtang-branch-3", "a4", 1080, 608],
  ["langtang-branch-4", "a4", 1080, 608],
  ["langtang-branch-8", "a4", 1080, 810],
  ["langtang-branch-13", "a4", 1080, 608],
  ["langtang-branch-19", "a4", 1080, 810],
  ["programmes-1", "a5", 1080, 810],
];

export type FallbackPhoto = {
  id: string;
  url: string;
  album_id: string;
  width: number;
  height: number;
  alt: string;
};

export const FALLBACK_PHOTOS: FallbackPhoto[] = RAW.map(([id, album, width, height]) => {
  const title = FALLBACK_ALBUMS.find((a) => a.id === album)?.title ?? "the ministry";
  return {
    id,
    url: files[`../assets/photos/gallery/${id}.webp`] ?? "",
    album_id: album,
    width,
    height,
    alt: `Photograph from ${title}`,
  };
}).filter((p) => p.url);
