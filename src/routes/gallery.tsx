import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { CircularCarousel } from "@/components/site/CircularCarousel";
import { PageHero } from "@/components/site/PageHero";
import { Pending } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";
import { formatDate, usePublished, type AlbumRow, type MediaRow } from "@/lib/cms";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Gallery — Yendel Ocha Kpeling Ministry" },
      {
        name: "description",
        content:
          "Photographs from the work of Yendel Ocha Kpeling Ministry among widows in Jos, Plateau State, Nigeria.",
      },
      { property: "og:title", content: "Gallery — Yendel Ocha Kpeling Ministry" },
      {
        property: "og:description",
        content: "Photographs from YOKM's work among widows in Jos, Nigeria.",
      },
    ],
  }),
  component: Gallery,
});

type Img = { id: string; src: string; caption: string; alt: string; date: string | null };

function Gallery() {
  const media = usePublished<MediaRow>("media");
  const albums = usePublished<AlbumRow>("albums");
  const [album, setAlbum] = useState<string>("all");
  const [active, setActive] = useState<number | null>(null);

  const photos = useMemo(() => (media.data ?? []).filter((r) => r.url), [media.data]);
  const visibleAlbums = useMemo(
    () => (albums.data ?? []).filter((a) => photos.some((p) => p.album_id === a.id)),
    [albums.data, photos],
  );
  const current = visibleAlbums.find((a) => a.id === album);

  const images: Img[] = useMemo(
    () =>
      photos
        .filter((p) => album === "all" || p.album_id === album)
        .map((p) => ({
          id: p.id,
          src: p.url,
          caption: p.caption,
          alt: p.alt || p.caption || "Photograph from YOKM",
          date: p.taken_on,
        })),
    [photos, album],
  );

  const featured = useMemo(() => {
    const f = photos.filter((p) => p.featured);
    return (f.length >= 3 ? f : photos)
      .slice(0, 12)
      .map((p) => ({ src: p.url, caption: p.caption || p.alt }));
  }, [photos]);

  const loading = media.isLoading;
  const empty = !loading && photos.length === 0;

  return (
    <>
      <PageHero eyebrow="Gallery" title="The ministry in photographs" />

      {loading ? (
        <div className="h-[40vh]" aria-busy="true" />
      ) : media.isError ? (
        <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10">
          <p className="text-muted-foreground">
            The gallery could not be loaded. Please refresh the page to try again.
          </p>
        </section>
      ) : empty ? (
        <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
          <Reveal className="max-w-2xl">
            <Pending label="No photographs have been published yet">
              Photographs from the ministry&rsquo;s gatherings, training and outreach will appear
              here as they are added.
            </Pending>
          </Reveal>
        </section>
      ) : (
        <>
          {featured.length >= 3 && (
            <section className="border-b border-border bg-cream py-10">
              <CircularCarousel
                items={featured}
                onOpen={(i) => {
                  setAlbum("all");
                  const id = (
                    photos.filter((p) => p.featured).length >= 3
                      ? photos.filter((p) => p.featured)
                      : photos
                  )[i]?.id;
                  setActive(
                    Math.max(
                      0,
                      photos.findIndex((p) => p.id === id),
                    ),
                  );
                }}
              />
              <p className="mt-2 text-center eyebrow text-muted-foreground">
                Drag to turn · select to open
              </p>
            </section>
          )}

          <section className="mx-auto max-w-[1400px] px-5 py-12 md:px-10 md:py-20">
            {visibleAlbums.length > 0 && (
              <div className="mb-10">
                <p className="eyebrow text-muted-foreground">Albums</p>
                <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Albums">
                  <AlbumTab active={album === "all"} onClick={() => setAlbum("all")}>
                    All photographs
                  </AlbumTab>
                  {visibleAlbums.map((a) => (
                    <AlbumTab key={a.id} active={album === a.id} onClick={() => setAlbum(a.id)}>
                      {a.title}
                    </AlbumTab>
                  ))}
                </div>
                {current && (
                  <div className="mt-6 max-w-2xl">
                    <h2 className="text-3xl">{current.title}</h2>
                    {current.album_date && (
                      <p className="mt-2 eyebrow text-accent">{formatDate(current.album_date)}</p>
                    )}
                    {current.description && (
                      <p className="mt-3 leading-relaxed text-muted-foreground">
                        {current.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
              {images.map((img, i) => (
                <Reveal key={img.id} delay={Math.min(i * 0.05, 0.3)} className="break-inside-avoid">
                  <figure>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className="img-zoom block w-full text-left"
                      aria-label={`Open photograph: ${img.caption || img.alt}`}
                    >
                      <img src={img.src} alt={img.alt} loading="lazy" className="w-full" />
                    </button>
                    {(img.caption || img.date) && (
                      <figcaption className="mt-2 text-sm text-muted-foreground">
                        {img.caption}
                        {img.date && (
                          <span className="eyebrow ml-2 text-xs">{formatDate(img.date)}</span>
                        )}
                      </figcaption>
                    )}
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>
        </>
      )}

      <Lightbox
        images={
          album === "all"
            ? photos.map((p) => ({
                id: p.id,
                src: p.url,
                caption: p.caption,
                alt: p.alt || p.caption,
                date: p.taken_on,
              }))
            : images
        }
        index={active}
        onChange={setActive}
      />
    </>
  );
}

function AlbumTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`border px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border hover:border-primary"
      }`}
    >
      {children}
    </button>
  );
}

function Lightbox({
  images,
  index,
  onChange,
}: {
  images: Img[];
  index: number | null;
  onChange: (i: number | null) => void;
}) {
  const go = useCallback(
    (d: number) => {
      if (index === null || images.length === 0) return;
      onChange((index + d + images.length) % images.length);
    },
    [index, images.length, onChange],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, go, onChange]);

  const img = index !== null ? images[index] : undefined;

  return (
    <AnimatePresence>
      {img && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-5"
          onClick={() => onChange(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photograph viewer"
        >
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute right-5 top-5 text-xs uppercase tracking-[0.18em] text-ink-foreground"
          >
            Close
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photograph"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-3xl text-ink-foreground/80 hover:text-ink-foreground md:left-6"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next photograph"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-3xl text-ink-foreground/80 hover:text-ink-foreground md:right-6"
              >
                ›
              </button>
            </>
          )}
          <figure className="max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img src={img.src} alt={img.alt} className="max-h-[78svh] w-auto object-contain" />
            <figcaption className="mt-4 flex justify-between gap-4 text-sm text-ink-foreground/70">
              <span>
                {img.caption}
                {img.date ? ` · ${formatDate(img.date)}` : ""}
              </span>
              <span className="eyebrow shrink-0">
                {index! + 1} / {images.length}
              </span>
            </figcaption>
          </figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
