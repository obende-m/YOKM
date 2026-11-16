import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import { Rise } from "@/components/motion";
import CircularGallery from "@/components/reactbits/CircularGallery.jsx";
import Masonry from "@/components/reactbits/Masonry.jsx";
import { PageBanner, SectionHead } from "@/components/site/Blocks";
import { formatDate, usePublished, type AlbumRow, type MediaRow } from "@/lib/cms";
import { FALLBACK_ALBUMS, FALLBACK_PHOTOS } from "@/lib/gallery-fallback";
import { PHOTOS } from "@/lib/photos";
import { useMedia } from "@/lib/use-media";

export const Route = createFileRoute("/gallery")({
  validateSearch: (s) => z.object({ album: z.string().max(200).optional() }).parse(s),
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Gallery | Yendel Ocha Kpeling Ministry" },
      {
        name: "description",
        content:
          "Photographs from the work of Yendel Ocha Kpeling Ministry among widows in Jos, Plateau State, Nigeria.",
      },
      { property: "og:title", content: "Gallery | Yendel Ocha Kpeling Ministry" },
      {
        property: "og:description",
        content: "Photographs from YOKM's work among widows in Jos, Nigeria.",
      },
    ],
  }),
  component: Gallery,
});

type Album = { id: string; slug: string; title: string; description: string; date: string | null };
type Photo = {
  id: string;
  url: string;
  album_id: string | null;
  alt: string;
  caption: string;
  featured: boolean;
  width?: number;
  height?: number;
};

/** True when the browser can draw the curved carousel (WebGL 2). */
function useWebGL2() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    try {
      setOk(!!document.createElement("canvas").getContext("webgl2"));
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}

function Gallery() {
  const { album: albumSlug } = Route.useSearch();
  const media = usePublished<MediaRow>("media");
  const albumsQuery = usePublished<AlbumRow>("albums");
  const webgl = useWebGL2();
  const narrow = useMedia("(max-width: 639px)");

  const cmsPhotos = useMemo(() => (media.data ?? []).filter((r) => r.url), [media.data]);
  const usingCms = cmsPhotos.length > 0;

  const albums: Album[] = useMemo(
    () =>
      usingCms
        ? (albumsQuery.data ?? [])
            .filter((a) => cmsPhotos.some((p) => p.album_id === a.id))
            .map((a) => ({
              id: a.id,
              slug: a.slug || a.id,
              title: a.title,
              description: a.description,
              date: a.album_date,
            }))
        : FALLBACK_ALBUMS.map((a) => ({ ...a, date: null })),
    [usingCms, albumsQuery.data, cmsPhotos],
  );

  const photos: Photo[] = useMemo(
    () =>
      usingCms
        ? cmsPhotos.map((p) => ({
            id: p.id,
            url: p.url,
            album_id: p.album_id,
            alt: p.alt || p.caption || "Photograph from the ministry",
            caption: p.caption,
            featured: p.featured,
          }))
        : FALLBACK_PHOTOS.map((p) => ({
            id: p.id,
            url: p.url,
            album_id: p.album_id,
            alt: p.alt,
            caption: "",
            featured: false,
            width: p.width,
            height: p.height,
          })),
    [usingCms, cmsPhotos],
  );

  const albumTitle = (id: string | null) => albums.find((a) => a.id === id)?.title ?? "";
  const current = albums.find((a) => a.slug === albumSlug);
  const shown = current ? photos.filter((p) => p.album_id === current.id) : photos;

  const carousel = useMemo(() => {
    const featured = photos.filter((p) => p.featured);
    // One photograph from each album first, then the rest, for variety.
    const pool = featured.length >= 5 ? featured : photos;
    const firsts = albums
      .map((a) => pool.find((p) => p.album_id === a.id))
      .filter((p): p is Photo => !!p);
    const rest = pool.filter((p) => !firsts.includes(p));
    return [...firsts, ...rest].slice(0, 12).map((p) => ({
      image: p.url,
      text: p.caption || albumTitle(p.album_id),
      alt: p.alt,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos, albums]);

  return (
    <>
      <PageBanner
        eyebrow="Gallery"
        title="The ministry in *photographs*"
        intro="Gatherings, teaching, Bible distribution and outreach, as the ministry records them."
        photo={PHOTOS.crowdTrees}
      />

      {webgl && carousel.length >= 4 && !current && (
        <section className="bg-paper pt-16 md:pt-20">
          <div className="wrap">
            <div className="overflow-hidden rounded-[var(--r-panel)] bg-night text-paper">
              <div className="flex flex-col gap-2 px-7 pt-8 md:flex-row md:items-end md:justify-between md:px-12 md:pt-10">
                <div>
                  <p className="pill bg-paper/10 text-sky">Featured</p>
                  <h2 className="h-sub mt-4">
                    Drag or swipe to turn, select a photograph to open it
                  </h2>
                </div>
              </div>
              <div className="h-[420px] md:h-[560px]">
                <CircularGallery
                  items={carousel}
                  bend={2.6}
                  textColor="#f6eef2"
                  borderRadius={0.06}
                  font="500 26px 'Instrument Sans'"
                  scrollEase={0.06}
                  itemAspect={0.8}
                  fadeEdges={0.1}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section-pad bg-paper">
        <div className="wrap">
          {current ? (
            <div className="mb-10">
              <Link
                to="/gallery"
                search={{}}
                className="text-sm font-semibold text-wine hover:underline"
              >
                ← All photographs
              </Link>
              <SectionHead
                className="mt-6"
                eyebrow={[formatDate(current.date), `${shown.length} photographs`]
                  .filter(Boolean)
                  .join(" · ")}
                title={current.title}
                intro={current.description || undefined}
              />
            </div>
          ) : (
            <SectionHead
              eyebrow="All photographs"
              title="Browse by *album*"
              intro="Select a photograph to see it larger. Use the arrow keys to move between them."
              className="mb-10"
            />
          )}

          {albums.length > 1 && (
            <div className="mb-10 flex flex-wrap gap-2" aria-label="Albums">
              <Link
                to="/gallery"
                search={{}}
                aria-current={!current ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full px-5 text-sm font-medium transition-colors ${
                  !current
                    ? "bg-wine text-paper"
                    : "bg-blush text-ink/75 hover:bg-wine/15 hover:text-wine"
                }`}
              >
                All
              </Link>
              {albums.map((a) => (
                <Link
                  key={a.id}
                  to="/gallery"
                  search={{ album: a.slug }}
                  aria-current={current?.id === a.id ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-full px-5 text-sm font-medium transition-colors ${
                    current?.id === a.id
                      ? "bg-wine text-paper"
                      : "bg-blush text-ink/75 hover:bg-wine/15 hover:text-wine"
                  }`}
                >
                  {a.title}
                </Link>
              ))}
            </div>
          )}

          {media.isLoading ? (
            <div
              className="grid grid-cols-2 gap-3 md:grid-cols-4"
              aria-busy="true"
              aria-label="Loading"
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/5] animate-pulse rounded-[var(--r-card)] bg-blush"
                />
              ))}
            </div>
          ) : (
            <Rise>
              <Masonry
                key={current?.id ?? "all"}
                items={shown.map((p) => ({
                  id: p.id,
                  img: p.url,
                  width: p.width,
                  height: p.height,
                  title: p.caption || albumTitle(p.album_id),
                  alt: p.alt,
                }))}
                columns={narrow ? 2 : "auto"}
                columnWidth={280}
                gap={narrow ? 10 : 14}
                radius={18}
                animateFrom="bottom"
                hoverEffect="zoom"
                captions="hover"
                lightbox
                draggable={false}
              />
            </Rise>
          )}
        </div>
      </section>
    </>
  );
}
