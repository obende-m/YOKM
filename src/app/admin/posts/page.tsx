"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Search, Edit2, Trash2, X, Save } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { BLOG_POSTS as defaultBlogPosts } from "@/lib/data";
import { BlogPost } from "@/types";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Programs");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Load from localStorage
  useEffect(() => {
    const local = localStorage.getItem("yokm_blog_posts");
    if (local) {
      setPosts(JSON.parse(local));
    } else {
      setPosts(defaultBlogPosts);
      localStorage.setItem("yokm_blog_posts", JSON.stringify(defaultBlogPosts));
    }
  }, []);

  const saveToStorage = (updatedPosts: BlogPost[]) => {
    setPosts(updatedPosts);
    localStorage.setItem("yokm_blog_posts", JSON.stringify(updatedPosts));
  };

  const handleOpenCreate = () => {
    setEditingPost(null);
    setTitle("");
    setCategory("Programs");
    setExcerpt("");
    setContent("");
    setImageUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuAtA2RYx629bqQYoLtp9-uJsp6sQGxfhV0hAebQIKJRHWNGERQzKasKDmIf_ugMKZccaD8_xGCtIlSulSwVsMceGoRzFv8LG6MEdXYxUGle84qvJWVu2WisBcU6hpopNR-lWcZzoeU1IQquzSxUbXqTvAXwbfZtBtgf7Sj9O-aCHW0Dn4ww7eoy6TwN4r1-u56cdf_QaWBCm-8poyLY--zz4ZmS4HE0jFh1MoHV9JEcKJbBlx37ZCN89c2upPKLUotq46G4bG-9Hk4");
    setModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setCategory(post.category);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setImageUrl(post.imageUrl);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this story?")) {
      const updated = posts.filter((p) => p.id !== id);
      saveToStorage(updated);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt || !content) return;

    if (editingPost) {
      // Edit mode
      const updated = posts.map((p) => {
        if (p.id === editingPost.id) {
          return {
            ...p,
            title,
            category,
            excerpt,
            content,
            imageUrl: imageUrl || p.imageUrl,
          };
        }
        return p;
      });
      saveToStorage(updated);
    } else {
      // Create mode
      const newPost: BlogPost = {
        id: `b-${Date.now()}`,
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
        excerpt,
        content: content.startsWith("<") ? content : `<p>${content.replace(/\n/g, "</p><p>")}</p>`,
        category,
        publishedAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        imageUrl: imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuAtA2RYx629bqQYoLtp9-uJsp6sQGxfhV0hAebQIKJRHWNGERQzKasKDmIf_ugMKZccaD8_xGCtIlSulSwVsMceGoRzFv8LG6MEdXYxUGle84qvJWVu2WisBcU6hpopNR-lWcZzoeU1IQquzSxUbXqTvAXwbfZtBtgf7Sj9O-aCHW0Dn4ww7eoy6TwN4r1-u56cdf_QaWBCm-8poyLY--zz4ZmS4HE0jFh1MoHV9JEcKJbBlx37ZCN89c2upPKLUotq46G4bG-9Hk4",
        author: {
          name: "Admin User",
        },
      };
      saveToStorage([newPost, ...posts]);
    }

    setModalOpen(false);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-headline text-2xl font-bold text-on-surface">Manage Impact Stories & Blog</h1>
          <p className="text-sm text-on-surface-variant">Create, edit, or delete articles and testimonies published on the website.</p>
        </div>
        
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 py-2.5 px-4 rounded-lg bg-primary text-white hover:bg-surface-tint transition-all active:scale-95 text-xs font-bold shadow-sm"
        >
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
            <Card key={post.id} hoverable={false} className="border border-outline-variant/10 flex flex-col h-full bg-white shadow-sm">
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
                <div className="space-y-sm mb-4">
                  <h3 className="font-headline font-bold text-base line-clamp-1">{post.title}</h3>
                  <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">{post.excerpt}</p>
                </div>
                
                <div className="flex justify-between items-center pt-md mt-auto border-t border-outline-variant/10 text-xs">
                  <span className="text-on-surface-variant">{post.publishedAt}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenEdit(post)}
                      className="flex items-center gap-1 p-1.5 bg-surface-container text-on-surface hover:text-primary rounded transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="flex items-center gap-1 p-1.5 bg-surface-container text-on-surface hover:text-error rounded transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {filteredPosts.length === 0 && (
            <div className="col-span-2 text-center py-20 text-on-surface-variant">
              No blog posts found. Click &ldquo;Create New Article&rdquo; to add one.
            </div>
          )}
        </div>
      </Card>

      {/* Editor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Card padding="lg" className="w-full max-w-2xl bg-white border border-outline-variant/20 shadow-2xl space-y-md overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center border-b border-outline-variant/15 pb-3">
              <h3 className="font-headline font-bold text-lg text-on-surface">
                {editingPost ? "Edit Story Post" : "Create New Story Post"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-on-surface-variant hover:text-primary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-md text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-on-surface-variant block">Article Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    <option value="Programs">Programs</option>
                    <option value="Success Stories">Success Stories</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant block">Image URL (Optional)</label>
                <input
                  type="text"
                  placeholder="Paste direct image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="border border-outline-variant/30 rounded-lg p-3 w-full bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant block">Short Excerpt</label>
                <input
                  type="text"
                  required
                  placeholder="Summary for blog lists"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="border border-outline-variant/30 rounded-lg p-3 w-full bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant block">Full Article Content</label>
                <textarea
                  required
                  placeholder="Write the full story details here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="border border-outline-variant/30 rounded-lg p-3 w-full bg-surface-container-low h-44 focus:ring-1 focus:ring-primary outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-outline-variant/15 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" icon={<Save className="w-4.5 h-4.5" />}>
                  {editingPost ? "Save Changes" : "Publish Article"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
