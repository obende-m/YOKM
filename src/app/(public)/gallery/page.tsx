"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ZoomIn, Filter } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { GALLERY_IMAGES } from "@/lib/data";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxImage, setLightboxImage] = useState<typeof GALLERY_IMAGES[0] | null>(null);

  const categories = ["All", "Vocational", "Outreach", "Fellowship", "Community"];

  const filteredImages = activeCategory === "All"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  return (
    <div className="flex-grow">
      {/* Hero */}
      <PageHero
        title="Our Ministry Gallery"
        description="A visual journey capturing the smiles, stories, fellowships, and vocational empowerment milestones across the communities we serve."
        imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAQpd5iCYoQSjA20FD1Xhiwfl_z91Y1USLivbCc25bu665Puos705zHvS7DRiVrL_ZuEJqabCk79Hvc3MZEmUKP4QmxPcVJy6lrTq7xkPE-Fd9UEhE1CHUglqKe8znecAYHmIp7VaU0vRs06AjMlAtAfw7haCBjbT6fb-GAy5zMyvRMu5ZSWz19p6ba5LP7mGZvk23_v1JGNknpYJuRzfAcbBdNsayrI_8KmDeBK_kVLqlyEwFTxkG9ytqUkdQs9SSzLL6zd3n71sY"
        imageAlt="Close up hands weaving colorful traditional fabric"
      />

      {/* Filterable Grid */}
      <section className="py-xl px-4 md:px-margin-desktop max-w-7xl mx-auto">
        <SectionHeader
          title="Moments of Hope"
          subtitle="Explore images showing vocational training, community food distribution, and spiritual assemblies."
          centered
        />

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-label-md text-sm transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-on-primary shadow-md"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface border border-outline-variant/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => setLightboxImage(image)}
              className="group cursor-pointer overflow-hidden rounded-default border border-outline-variant/10 bg-white shadow-sm hover:shadow-lg transition-all duration-300 relative aspect-square"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center p-md space-y-xs translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <ZoomIn className="w-8 h-8 mx-auto" />
                  <p className="font-bold text-sm">{image.alt}</p>
                  <span className="inline-block px-3 py-0.5 rounded-full bg-primary/80 text-[10px] uppercase tracking-wider text-white">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20 text-on-surface-variant">
            No images found for this category.
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-fade-in">
          {/* Close button */}
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white hover:text-primary p-2 focus:outline-none transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Modal content */}
          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="relative w-full aspect-video md:aspect-[4/3] max-h-[70vh] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={lightboxImage.url}
                alt={lightboxImage.alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            
            <div className="text-center text-white mt-4 max-w-xl space-y-xs">
              <h4 className="font-headline text-lg font-bold">
                {lightboxImage.alt}
              </h4>
              <p className="text-xs text-white/70">
                Category: {lightboxImage.category}
              </p>
              <p className="text-sm text-white/80 leading-relaxed italic pt-1">
                {lightboxImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
