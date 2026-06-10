"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Search, Trash2, ShieldAlert } from "lucide-react";
import { Card } from "@/components/Card";
import { GALLERY_IMAGES } from "@/lib/data";

export default function AdminGalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Vocational", "Outreach", "Fellowship", "Community"];

  const filteredImages = activeCategory === "All"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  return (
    <div className="space-y-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-headline text-2xl font-bold text-on-surface">Gallery Manager</h1>
          <p className="text-sm text-on-surface-variant">Upload photos and manage categories for the public gallery page.</p>
        </div>
        
        <button className="flex items-center gap-2 py-2.5 px-4 rounded-lg bg-primary text-white hover:bg-surface-tint transition-all active:scale-95 text-xs font-bold shadow-sm">
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
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
                <span className="self-start px-2 py-0.5 rounded-full bg-primary/80 text-[9px] uppercase font-bold tracking-wider">
                  {image.category}
                </span>
                
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-bold truncate max-w-[70%]">{image.alt}</p>
                  <button className="p-1 bg-red-600 hover:bg-red-500 rounded text-white transition-colors" title="Delete Image">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
