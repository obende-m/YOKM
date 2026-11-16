import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { ImageField } from "@/components/admin/ImageField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { removeStoredImage, slugify, uploadImageWithPath } from "@/lib/cms";

export const Route = createFileRoute("/_authenticated/admin/gallery")({
  component: GalleryAdmin,
});

type Album = {
  id: string;
  title: string;
  slug: string;
  description: string;
  album_date: string | null;
  cover_url: string | null;
  published: boolean;
  sort_order: number;
};
type Photo = {
  id: string;
  url: string;
  caption: string;
  alt: string;
  album_id: string | null;
  featured: boolean;
  published: boolean;
  taken_on: string | null;
  sort_order: number;
  storage_path: string | null;
};

const ALL = "all";
const UNSORTED = "unsorted";

function GalleryAdmin() {
  const qc = useQueryClient();
  const [view, setView] = useState<string>(ALL);
  const [editingAlbum, setEditingAlbum] = useState<Partial<Album> | null>(null);
  const [upload, setUpload] = useState<{ done: number; total: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const albums = useQuery({
    queryKey: ["admin", "albums"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("albums")
        .select("*")
        .order("sort_order")
        .order("created_at");
      if (error) throw error;
      return (data ?? []) as Album[];
    },
  });
  const photos = useQuery({
    queryKey: ["admin", "media"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("media")
        .select("*")
        .order("sort_order")
        .order("created_at");
      if (error) throw error;
      return (data ?? []) as Photo[];
    },
  });

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["admin", "albums"] });
    qc.invalidateQueries({ queryKey: ["admin", "media"] });
    qc.invalidateQueries({ queryKey: ["admin-dashboard"] });
    qc.invalidateQueries({ queryKey: ["public"] });
  };

  const currentAlbum = albums.data?.find((a) => a.id === view);
  const shown = (photos.data ?? []).filter((p) =>
    view === ALL ? true : view === UNSORTED ? !p.album_id : p.album_id === view,
  );

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    const list = Array.from(files);
    let order = (photos.data ?? []).reduce((m, p) => Math.max(m, p.sort_order), 0);
    const albumId = currentAlbum?.id ?? null;
    setUpload({ done: 0, total: list.length });
    const failures: string[] = [];
    for (const [i, file] of list.entries()) {
      try {
        const { url, path } = await uploadImageWithPath(file);
        order += 10;
        const { error } = await supabase.from("media").insert({
          url,
          storage_path: path,
          album_id: albumId,
          sort_order: order,
          published: true,
          caption: "",
          alt: "",
        });
        if (error) {
          await removeStoredImage(path);
          throw error;
        }
      } catch (err) {
        failures.push(err instanceof Error ? err.message : file.name);
      }
      setUpload({ done: i + 1, total: list.length });
    }
    setUpload(null);
    if (fileRef.current) fileRef.current.value = "";
    if (failures.length)
      toast.error(`${failures.length} photo(s) failed: ${failures.slice(0, 3).join("; ")}`);
    if (failures.length < list.length)
      toast.success(`${list.length - failures.length} photo(s) added`);
    refresh();
  }

  async function patchPhoto(id: string, patch: Partial<Photo>, quiet = true) {
    const { error } = await supabase.from("media").update(patch).eq("id", id);
    if (error) return void toast.error(error.message);
    if (!quiet) toast.success("Saved");
    refresh();
  }

  async function deletePhoto(p: Photo) {
    if (!window.confirm("Delete this photograph from the website? This cannot be undone.")) return;
    const { error } = await supabase.from("media").delete().eq("id", p.id);
    if (error) return void toast.error(error.message);
    await removeStoredImage(p.storage_path ?? p.url).catch(() => undefined);
    toast.success("Photograph deleted");
    refresh();
  }

  async function move(index: number, dir: -1 | 1) {
    const rows = [...shown];
    const target = index + dir;
    if (target < 0 || target >= rows.length) return;
    [rows[index], rows[target]] = [rows[target]!, rows[index]!];
    const orders = rows.map((r) => r.sort_order).sort((a, b) => a - b);
    // Reuse the existing order slots so photos outside this view keep their positions.
    const unique = new Set(orders).size === orders.length;
    const slots = unique ? orders : rows.map((_, i) => (orders[0] ?? 0) + (i + 1) * 10);
    setBusy(true);
    await Promise.all(
      rows.map((r, i) =>
        r.sort_order !== slots[i]
          ? supabase.from("media").update({ sort_order: slots[i] }).eq("id", r.id)
          : null,
      ),
    );
    setBusy(false);
    refresh();
  }

  async function deleteAlbum(a: Album) {
    if (
      !window.confirm(
        `Delete the album “${a.title}”? Its photographs are kept and moved to “Not in an album”.`,
      )
    )
      return;
    const { error } = await supabase.from("albums").delete().eq("id", a.id);
    if (error) return void toast.error(error.message);
    setView(ALL);
    toast.success("Album deleted");
    refresh();
  }

  if (editingAlbum) {
    return (
      <AlbumEditor
        album={editingAlbum}
        nextOrder={(albums.data ?? []).reduce((m, a) => Math.max(m, a.sort_order), 0) + 10}
        onDone={(id) => {
          setEditingAlbum(null);
          if (id) {
            setView(id);
            refresh();
          }
        }}
      />
    );
  }

  const error = albums.error ?? photos.error;

  return (
    <div className="max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl">Gallery</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Upload photographs, group them into albums, add captions and choose which appear first.
            Starred photographs are featured at the top of the Gallery page.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setEditingAlbum({ published: true })}>
            New album
          </Button>
          <Button disabled={!!upload} onClick={() => fileRef.current?.click()}>
            {upload
              ? `Uploading ${upload.done} of ${upload.total}…`
              : currentAlbum
                ? `Add photos to “${currentAlbum.title}”`
                : "Add photos"}
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            multiple
            className="hidden"
            onChange={(e) => onFiles(e.target.files)}
          />
        </div>
      </div>

      {error && (
        <p className="mt-6 text-sm text-destructive">
          The gallery could not be loaded: {(error as Error).message}
        </p>
      )}

      <div className="mt-8 flex flex-wrap gap-2 border-b border-border pb-4">
        <Tab active={view === ALL} onClick={() => setView(ALL)}>
          All photos ({photos.data?.length ?? 0})
        </Tab>
        <Tab active={view === UNSORTED} onClick={() => setView(UNSORTED)}>
          Not in an album ({photos.data?.filter((p) => !p.album_id).length ?? 0})
        </Tab>
        {albums.data?.map((a) => (
          <Tab key={a.id} active={view === a.id} onClick={() => setView(a.id)}>
            {a.title || "(untitled album)"} (
            {photos.data?.filter((p) => p.album_id === a.id).length ?? 0})
            {a.published ? "" : " · draft"}
          </Tab>
        ))}
      </div>

      {currentAlbum && (
        <div className="mt-6 flex flex-wrap items-center gap-4 border border-border bg-card p-4 text-sm">
          {currentAlbum.cover_url ? (
            <img src={currentAlbum.cover_url} alt="" className="h-14 w-20 object-cover" />
          ) : (
            <div className="h-14 w-20 bg-muted" />
          )}
          <div className="min-w-0 flex-1">
            <p className="font-medium">{currentAlbum.title}</p>
            <p className="text-xs text-muted-foreground">
              {currentAlbum.published ? "Published album" : "Draft album, hidden on the website"}
              {currentAlbum.album_date ? ` · ${currentAlbum.album_date}` : ""}
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={() => setEditingAlbum(currentAlbum)}>
            Edit album
          </Button>
          <Button size="sm" variant="ghost" onClick={() => deleteAlbum(currentAlbum)}>
            Delete album
          </Button>
        </div>
      )}

      {photos.isLoading ? (
        <p className="mt-8 text-sm text-muted-foreground">Loading…</p>
      ) : shown.length === 0 ? (
        <div className="mt-8 border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No photographs here yet. Use “Add photos”. You can select several at once.
        </div>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <PhotoCard
              key={p.id}
              photo={p}
              albums={albums.data ?? []}
              first={i === 0}
              last={i === shown.length - 1}
              busy={busy}
              isCover={!!currentAlbum && currentAlbum.cover_url === p.url}
              inAlbum={!!currentAlbum}
              onMove={(d) => move(i, d)}
              onPatch={(patch, quiet) => patchPhoto(p.id, patch, quiet)}
              onDelete={() => deletePhoto(p)}
              onCover={async () => {
                if (!currentAlbum) return;
                const { error } = await supabase
                  .from("albums")
                  .update({ cover_url: p.url })
                  .eq("id", currentAlbum.id);
                if (error) return void toast.error(error.message);
                toast.success("Album cover updated");
                refresh();
              }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function Tab({
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
      onClick={onClick}
      className={`rounded border px-3 py-1.5 text-sm ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`}
    >
      {children}
    </button>
  );
}

function PhotoCard({
  photo: p,
  albums,
  first,
  last,
  busy,
  isCover,
  inAlbum,
  onMove,
  onPatch,
  onDelete,
  onCover,
}: {
  photo: Photo;
  albums: Album[];
  first: boolean;
  last: boolean;
  busy: boolean;
  isCover: boolean;
  inAlbum: boolean;
  onMove: (d: -1 | 1) => void;
  onPatch: (patch: Partial<Photo>, quiet?: boolean) => void;
  onDelete: () => void;
  onCover: () => void;
}) {
  const [caption, setCaption] = useState(p.caption);
  const [alt, setAlt] = useState(p.alt);
  const saveText = (k: "caption" | "alt", v: string) => {
    if (v.trim() !== (p[k] ?? "")) onPatch({ [k]: v.trim() }, false);
  };
  return (
    <li
      className={`border bg-card ${p.published ? "border-border" : "border-dashed border-border opacity-80"}`}
    >
      <div className="relative">
        <img
          src={p.url}
          alt={p.alt || p.caption}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
        <button
          type="button"
          onClick={() => onPatch({ featured: !p.featured }, false)}
          aria-label={p.featured ? "Remove from featured" : "Feature this photograph"}
          title={p.featured ? "Featured. Click to remove" : "Feature this photograph"}
          className={`absolute right-2 top-2 rounded-full px-2.5 py-1 text-sm shadow ${p.featured ? "bg-accent text-accent-foreground" : "bg-background/90 text-muted-foreground"}`}
        >
          {p.featured ? "Featured" : "Feature"}
        </button>
        {isCover && (
          <span className="absolute left-2 top-2 rounded bg-background/90 px-2 py-0.5 text-xs">
            Album cover
          </span>
        )}
      </div>
      <div className="space-y-3 p-4 text-sm">
        <div className="space-y-1">
          <Label htmlFor={`c-${p.id}`} className="text-xs">
            Caption
          </Label>
          <Input
            id={`c-${p.id}`}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            onBlur={() => saveText("caption", caption)}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`a-${p.id}`} className="text-xs">
            Description for screen readers
          </Label>
          <Input
            id={`a-${p.id}`}
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            onBlur={() => saveText("alt", alt)}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label htmlFor={`d-${p.id}`} className="text-xs">
              Date taken
            </Label>
            <Input
              id={`d-${p.id}`}
              type="date"
              value={p.taken_on ?? ""}
              onChange={(e) => onPatch({ taken_on: e.target.value || null })}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`al-${p.id}`} className="text-xs">
              Album
            </Label>
            <select
              id={`al-${p.id}`}
              className="h-9 w-full border border-input bg-background px-2 text-sm"
              value={p.album_id ?? ""}
              onChange={(e) => onPatch({ album_id: e.target.value || null }, false)}
            >
              <option value="">Not in an album</option>
              {albums.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title || "(untitled)"}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id={`p-${p.id}`}
            checked={p.published}
            onCheckedChange={(v) => onPatch({ published: v }, false)}
          />
          <Label htmlFor={`p-${p.id}`} className="text-xs">
            {p.published ? "Shown on the website" : "Hidden"}
          </Label>
        </div>
        <div className="flex flex-wrap gap-1 border-t border-border pt-3">
          <Button
            size="sm"
            variant="ghost"
            disabled={busy || first}
            onClick={() => onMove(-1)}
            aria-label="Move earlier"
          >
            ← Earlier
          </Button>
          <Button
            size="sm"
            variant="ghost"
            disabled={busy || last}
            onClick={() => onMove(1)}
            aria-label="Move later"
          >
            Later →
          </Button>
          {inAlbum && !isCover && (
            <Button size="sm" variant="ghost" onClick={onCover}>
              Use as cover
            </Button>
          )}
          <Button size="sm" variant="ghost" className="ml-auto text-destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
}

function AlbumEditor({
  album,
  nextOrder,
  onDone,
}: {
  album: Partial<Album>;
  nextOrder: number;
  onDone: (id?: string) => void;
}) {
  const [a, setA] = useState<Partial<Album>>(album);
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!a.title?.trim()) return void toast.error("Album title is required");
    setSaving(true);
    const payload = {
      title: a.title.trim(),
      description: (a.description ?? "").trim(),
      album_date: a.album_date || null,
      cover_url: a.cover_url || null,
      published: !!a.published,
      sort_order: a.sort_order ?? nextOrder,
    };
    const res = a.id
      ? await supabase.from("albums").update(payload).eq("id", a.id).select("id").single()
      : await supabase
          .from("albums")
          .insert({ ...payload, slug: `${slugify(payload.title)}-${Date.now().toString(36)}` })
          .select("id")
          .single();
    setSaving(false);
    if (res.error) return void toast.error(res.error.message);
    toast.success("Album saved");
    onDone(res.data.id);
  }

  return (
    <div className="max-w-2xl">
      <button
        className="text-sm text-muted-foreground hover:text-foreground"
        onClick={() => onDone()}
      >
        ← Back to Gallery
      </button>
      <h1 className="mt-3 text-4xl">{a.id ? "Edit album" : "New album"}</h1>
      <div className="mt-8 space-y-6 border border-border bg-card p-6">
        <div className="space-y-2">
          <Label htmlFor="al-title">Title *</Label>
          <Input
            id="al-title"
            value={a.title ?? ""}
            onChange={(e) => setA({ ...a, title: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="al-desc">Description</Label>
          <Textarea
            id="al-desc"
            rows={3}
            value={a.description ?? ""}
            onChange={(e) => setA({ ...a, description: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="al-date">Date</Label>
          <Input
            id="al-date"
            type="date"
            value={a.album_date ?? ""}
            onChange={(e) => setA({ ...a, album_date: e.target.value || null })}
          />
        </div>
        <div className="space-y-2">
          <Label>Cover photograph</Label>
          <ImageField
            value={a.cover_url ?? ""}
            onChange={(v) => setA({ ...a, cover_url: v || null })}
          />
          <p className="text-xs text-muted-foreground">
            Optional. You can also choose “Use as cover” on any photograph in the album.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            id="al-pub"
            checked={!!a.published}
            onCheckedChange={(v) => setA({ ...a, published: v })}
          />
          <Label htmlFor="al-pub">Published (album appears on the Gallery page)</Label>
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <Button disabled={saving} onClick={save}>
          {saving ? "Saving…" : "Save album"}
        </Button>
        <Button variant="ghost" onClick={() => onDone()}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
