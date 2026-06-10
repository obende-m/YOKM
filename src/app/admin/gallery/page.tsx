"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Search, Trash2, X, Save } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { GALLERY_IMAGES as defaultGalleryImages } from "@/lib/data";
import { GalleryImage } from "@/types";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);

  // Form states
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState("Vocational");
  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState("");

  const categories = ["All", "Vocational", "Outreach", "Fellowship", "Community"];

  // Load from localStorage
  useEffect(() => {
    const local = localStorage.getItem("yokm_gallery_images");
    if (local) {
      setImages(JSON.parse(local));
    } else {
      setImages(defaultGalleryImages);
      localStorage.setItem("yokm_gallery_images", JSON.stringify(defaultGalleryImages));
    }
  }, []);

  const saveToStorage = (updatedImages: GalleryImage[]) => {
    setImages(updatedImages);
    localStorage.setItem("yokm_gallery_images", JSON.stringify(updatedImages));
  };

  const handleOpenCreate = () => {
    setAlt("");
    setCategory("Vocational");
    setCaption("");
    setUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuAQpd5iCYoQSjA20FD1Xhiwfl_z91Y1USLivbCc25bu665Puos705zHvS7DRiVrL_ZuEJqabCk79Hvc3MZEmUKP4QmxPcVJy6lrTq7xkPE-Fd9UEhE1CHUglqKe8znecAYHmIp7VaU0vRs06AjMlAtAfw7haCBjbT6fb-GAy5zMyvRMu5ZSWz19p6ba5LP7mGZvk23_v1JGNknpYJuRzfAcbBdNsayrI_8KmDeBK_kVLqlyEwFTxkG9ytqUkdQs9SSzLL6zd3n71sY");
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this photo from the gallery?")) {
      const updated = images.filter((img) => img.id !== id);
      saveToStorage(updated);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alt || !caption || !url) return;

    const newImage: GalleryImage = {
      id: `g-${Date.now()}`,
      url,
      alt,
      category,
      caption,
    };

    saveToStorage([newImage, ...images]);
    setModalOpen(false);
  };

  const filteredImages = activeCategory === "All"
    ? images
    : images.filter((img) => img.category === activeCategory);

  return (
    <div className="space-y-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-headline text-2xl font-bold text-on-surface">Gallery Manager</h1>
          <p className="text-sm text-on-surface-variant">Upload photos and manage categories for the public gallery page.</p>
        </div>
        
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 py-2.5 px-4 rounded-lg bg-primary text-white hover:bg-surface-tint transition-all active:scale-95 text-xs font-bold shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Upload New Photo
        </button>
      </div>

      {/* Category filters */}
      <div className="flex gap-1.5 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeCategory === cat
                ? "bg-primary text-on-primary"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <Card padding="md" className="border border-outline-variant/10 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="border border-outline-variant/10 rounded-lg overflow-hidden group bg-white shadow-sm hover:shadow relative aspect-square"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
                <span className="self-start px-2.5 py-0.5 rounded-full bg-primary/85 text-[9px] uppercase font-bold tracking-wider">
                  {image.category}
                </span>
                
                <div className="flex justify-between items-center gap-2">
                  <p className="text-[10px] font-bold truncate flex-1">{image.alt}</p>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="p-1.5 bg-red-650 hover:bg-red-500 rounded text-white transition-colors"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredImages.length === 0 && (
            <div className="col-span-4 text-center py-20 text-on-surface-variant">
              No gallery images found. Click &ldquo;Upload New Photo&rdquo; to add one.
            </div>
          )}
        </div>
      </Card>

      {/* Editor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Card padding="lg" className="w-full max-w-md bg-white border border-outline-variant/20 shadow-2xl space-y-md">
            <div className="flex justify-between items-center border-b border-outline-variant/15 pb-3">
              <h3 className="font-headline font-bold text-lg text-on-surface">
                Upload New Image
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-on-surface-variant hover:text-primary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-md text-xs">
              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant block">Image URL</label>
                <input
                  type="text"
                  required
                  placeholder="Paste direct URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="border border-outline-variant/30 rounded-lg p-3 w-full bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-on-surface-variant block">Alt Description</label>
                  <input
                    type="text"
                    required
                    placeholder="Short description"
                    value={alt}
                    onChange={(e) => setAlt(e.target.value)}
                    className="border border-outline-variant/30 rounded-lg p-3 w-full bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-on-surface-variant block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-outline-variant/30 rounded-lg p-3 w-full bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
                  >
                    <option value="Vocational">Vocational</option>
                    <option value="Outreach">Outreach</option>
                    <option value="Fellowship">Fellowship</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant block">Image Caption</label>
                <input
                  type="text"
                  required
                  placeholder="Long caption explaining the photo details"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="border border-outline-variant/30 rounded-lg p-3 w-full bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div className="pt-4 border-t border-outline-variant/15 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" icon={<Save className="w-4.5 h-4.5" />}>
                  Upload Image
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
