"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import { Card } from "@/components/Card";
import { BLOG_POSTS } from "@/lib/data";

export default function AdminPostsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = BLOG_POSTS.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-headline text-2xl font-bold text-on-surface">Manage Impact Stories & Blog</h1>
          <p className="text-sm text-on-surface-variant">Create, edit, or delete articles and testimonies published on the website.</p>
        </div>
        
        <button className="flex items-center gap-2 py-2.5 px-4 rounded-lg bg-primary text-white hover:bg-surface-tint transition-all active:scale-95 text-xs font-bold shadow-sm">
          <Plus className="w-4 h-4" />
          Create New Article
        </button>
      </div>

      <Card padding="md" className="border border-outline-variant/10 shadow-sm">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant w-4 h-4" />
          <input
            type="text"
            placeholder="Search stories by title or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface-container text-xs rounded-lg border-none focus:ring-1 focus:ring-primary focus:border-primary outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {filteredPosts.map((post) => (
            <Card key={post.id} hoverable={false} className="border border-outline-variant/10 flex flex-col h-full bg-white">
              <div className="relative h-40 w-full overflow-hidden rounded-t-default">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 right-3 bg-primary/95 text-white font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shadow">
                  {post.category}
                </span>
              </div>
              <div className="p-md flex flex-col flex-grow justify-between">
                <div className="space-y-sm">
                  <h3 className="font-headline font-bold text-base line-clamp-1">{post.title}</h3>
                  <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">{post.excerpt}</p>
                </div>
                
                <div className="flex justify-between items-center pt-md mt-md border-t border-outline-variant/10 text-xs">
                  <span className="text-on-surface-variant">Published &bull; {post.publishedAt}</span>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 p-1.5 bg-surface-container text-on-surface hover:text-primary rounded transition-all">
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button className="flex items-center gap-1 p-1.5 bg-surface-container text-on-surface hover:text-error rounded transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
