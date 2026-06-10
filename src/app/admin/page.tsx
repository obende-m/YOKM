"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  Mail,
  Search,
  Filter,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Circle,
  HelpCircle,
  HardDrive,
  DollarSign
} from "lucide-react";
import { Card } from "@/components/Card";
import { BLOG_POSTS as defaultBlogPosts, RECENT_DONATIONS } from "@/lib/data";
import { BlogPost } from "@/types";

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const local = localStorage.getItem("yokm_blog_posts");
    if (local) {
      setPosts(JSON.parse(local));
    } else {
      setPosts(defaultBlogPosts);
    }
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this story?")) {
      const updated = posts.filter((p) => p.id !== id);
      setPosts(updated);
      localStorage.setItem("yokm_blog_posts", JSON.stringify(updated));
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-lg">
      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {/* Card 1: Total Donations */}
        <Card variant="default" padding="md" className="relative group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-green-600 flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" /> +12.5%
            </span>
          </div>
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Total Donations</p>
          <h3 className="text-2xl md:text-3xl font-extrabold text-primary mt-1">$45,280.00</h3>
          <div className="mt-4 w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[75%]"></div>
          </div>
        </Card>

        {/* Card 2: Active Subscribers */}
        <Card variant="default" padding="md">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-tertiary/10 text-tertiary">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-xs text-on-surface-variant">Total Growth</span>
          </div>
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Active Subscribers</p>
          <h3 className="text-2xl md:text-3xl font-extrabold text-tertiary mt-1">1,240</h3>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-surface-dim border-2 border-surface-container-lowest"></div>
              <div className="w-6 h-6 rounded-full bg-surface-variant border-2 border-surface-container-lowest"></div>
              <div className="w-6 h-6 rounded-full bg-outline-variant border-2 border-surface-container-lowest"></div>
            </div>
            <span className="text-[10px] text-on-surface-variant">+42 this week</span>
          </div>
        </Card>
      </div>

      {/* Content Management Table */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden">
        <div className="px-md py-4 border-b border-outline-variant/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h4 className="font-headline text-lg font-bold text-on-surface">Recent Blog Posts</h4>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-surface-container text-xs rounded-lg border-none focus:ring-1 focus:ring-primary focus:border-primary outline-none w-full sm:w-64"
              />
            </div>
            <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors">
              <Filter className="w-4 h-4 text-on-surface-variant" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container/50 font-bold text-xs uppercase text-on-surface-variant">
                <th className="px-md py-3 border-b border-outline-variant/10">Post Title</th>
                <th className="px-md py-3 border-b border-outline-variant/10">Author</th>
                <th className="px-md py-3 border-b border-outline-variant/10">Category</th>
                <th className="px-md py-3 border-b border-outline-variant/10">Status</th>
                <th className="px-md py-3 border-b border-outline-variant/10 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-md py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-surface-dim overflow-hidden relative flex-shrink-0">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-on-surface line-clamp-1">{post.title}</p>
                        <p className="text-[10px] text-on-surface-variant">{post.publishedAt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-md py-4 text-on-surface-variant">{post.author.name}</td>
                  <td className="px-md py-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px] uppercase">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-md py-4">
                    <div className="flex items-center gap-1.5 text-green-600 font-bold text-xs">
                      <Circle className="w-2.5 h-2.5 fill-current text-green-500" /> Published
                    </div>
                  </td>
                  <td className="px-md py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href="/admin/posts" className="p-1.5 text-on-surface-variant hover:text-primary transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 text-on-surface-variant hover:text-error transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPosts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-md py-8 text-center text-on-surface-variant">
                    No posts found matching search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="px-md py-3 border-t border-outline-variant/10 flex justify-between items-center bg-surface-container/20">
          <p className="text-xs text-on-surface-variant">
            Showing {filteredPosts.length} of {posts.length} posts
          </p>
          <div className="flex gap-2">
            <button className="p-1.5 rounded border border-outline-variant/20 hover:bg-surface-container transition-colors disabled:opacity-40" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded border border-outline-variant/20 hover:bg-surface-container transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Layout: Donations & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Recent Donations list */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant/10">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-headline text-lg font-bold text-on-surface">Recent Donations</h4>
            <Link href="/admin/donations" className="text-primary font-bold text-xs hover:underline">View All</Link>
          </div>
          
          <div className="space-y-3">
            {RECENT_DONATIONS.map((don) => (
              <div
                key={don.id}
                className="flex items-center justify-between p-3 hover:bg-surface-container-low rounded-lg transition-colors border border-transparent hover:border-outline-variant/10 text-xs md:text-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary">
                    {don.donorName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">{don.donorName}</p>
                    <p className="text-[10px] text-on-surface-variant">
                      Campaign: {don.campaign}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-on-surface">
                    +{don.currency}
                    {don.amount.toLocaleString()}
                  </p>
                  <p className="text-[9px] text-on-surface-variant">
                    {don.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Tools */}
        <div className="space-y-gutter">
          {/* Help box */}
          <div className="bg-primary text-white p-md rounded-xl shadow-lg relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <h4 className="font-headline text-lg font-bold">Need Help?</h4>
              <p className="text-xs opacity-90 leading-relaxed">
                Access the administrator handbook or contact support for technical assistance.
              </p>
              <button className="w-full py-2 bg-white text-primary rounded-lg text-xs font-bold hover:bg-opacity-95 transition-all active:scale-95">
                Open Help Center
              </button>
            </div>
            <HelpCircle className="absolute -right-4 -bottom-4 text-white/10 w-28 h-28" />
          </div>

          {/* Gallery Status */}
          <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant/10 space-y-md">
            <h4 className="font-headline text-sm font-bold text-on-surface flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-secondary" />
              Gallery Storage
            </h4>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">Storage Used</span>
                <span className="font-bold text-on-surface">4.2 / 10 GB</span>
              </div>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full w-[42%]"></div>
              </div>
            </div>

            <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider">
              <Link href="/admin/gallery" className="flex-1 py-2 bg-surface-container hover:bg-surface-container-high rounded transition-colors text-center">
                Clean Up
              </Link>
              <Link href="/admin/gallery" className="flex-1 py-2 bg-surface-container hover:bg-surface-container-high rounded transition-colors text-center">
                Add Storage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
