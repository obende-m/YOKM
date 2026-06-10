"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, Calendar, User } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { BLOG_POSTS } from "@/lib/data";

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Programs", "Success Stories", "Education"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-grow">
      {/* Hero */}
      <PageHero
        title="News, Stories & Announcements"
        description="Stay updated with our latest community outreach updates, empowerment center launches, success stories, and upcoming events."
        imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAtA2RYx629bqQYoLtp9-uJsp6sQGxfhV0hAebQIKJRHWNGERQzKasKDmIf_ugMKZccaD8_xGCtIlSulSwVsMceGoRzFv8LG6MEdXYxUGle84qvJWVu2WisBcU6hpopNR-lWcZzoeU1IQquzSxUbXqTvAXwbfZtBtgf7Sj9O-aCHW0Dn4ww7eoy6TwN4r1-u56cdf_QaWBCm-8poyLY--zz4ZmS4HE0jFh1MoHV9JEcKJbBlx37ZCN89c2upPKLUotq46G4bG-9Hk4"
        imageAlt="Community outreach program volunteer interaction"
      />

      {/* Listing grid */}
      <section className="py-xl px-4 md:px-margin-desktop max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-gutter justify-between items-center mb-xl">
          <SectionHeader
            title="Stories of Light"
            subtitle="Read reports from our regional coordinators and detailed field work updates."
            titleClassName="lg:text-2xl"
          />
          
          {/* Search and Category filters */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 items-center flex-shrink-0">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-outline-variant/30 rounded-lg text-sm bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            
            {/* Category selection */}
            <div className="flex gap-1.5 flex-wrap w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Listing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="flex flex-col h-full">
              <div className="relative h-48 w-full">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 30vw"
                />
              </div>
              <div className="p-md flex flex-col flex-grow">
                {/* Meta details */}
                <div className="flex items-center gap-4 text-[10px] text-outline uppercase tracking-wider font-bold mb-xs">
                  <span className="text-secondary">{post.category}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.publishedAt}
                  </span>
                </div>
                
                <h4 className="font-headline text-lg font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h4>
                
                <p className="text-on-surface-variant text-sm mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex justify-between items-center pt-2 border-t border-outline-variant/10">
                  <span className="text-xs text-on-surface-variant flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-primary" />
                    By {post.author.name}
                  </span>
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary font-bold flex items-center gap-1.5 group text-xs hover:text-surface-tint"
                  >
                    Read More
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-on-surface-variant">
            No articles found matching your criteria.
          </div>
        )}
      </section>
    </div>
  );
}
