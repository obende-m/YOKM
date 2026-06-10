"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Bookmark } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { BLOG_POSTS as defaultBlogPosts } from "@/lib/data";
import { BlogPost } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: PageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function resolvePost() {
      const resolvedParams = await params;
      const local = localStorage.getItem("yokm_blog_posts");
      let allPosts = defaultBlogPosts;
      if (local) {
        allPosts = JSON.parse(local);
      }
      
      const foundPost = allPosts.find((p) => p.slug === resolvedParams.slug);
      setPost(foundPost || null);
      setLoading(false);
    }
    
    resolvePost();
  }, [params]);

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center py-20 text-on-surface-variant font-bold text-sm">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
        <span>Loading story...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex-grow py-20 px-4 text-center space-y-md">
        <h1 className="font-headline text-2xl font-bold">Story Not Found</h1>
        <p className="text-on-surface-variant">The requested blog post could not be located.</p>
        <Button variant="primary" href="/blog">
          Back to Blog
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-grow">
      {/* Page Hero */}
      <PageHero
        title={post.title}
        description={post.excerpt}
        imageUrl={post.imageUrl}
        imageAlt={post.title}
      >
        <div className="flex flex-wrap items-center gap-md text-sm mt-md border-t border-white/20 pt-md w-fit">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary-fixed-dim" />
            <span>By {post.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary-fixed-dim" />
            <span>Published {post.publishedAt}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-primary-fixed-dim" />
            <span className="bg-white/15 px-2.5 py-0.5 rounded-full text-xs">
              {post.category}
            </span>
          </div>
        </div>
      </PageHero>

      {/* Main Content Area */}
      <article className="py-xl px-4 md:px-margin-desktop max-w-4xl mx-auto">
        <div className="mb-lg">
          <Button variant="ghost" href="/blog" icon={<ArrowLeft className="w-4 h-4" />}>
            Back to Articles
          </Button>
        </div>

        {/* Blog Post Rich Text content */}
        <div
          className="prose prose-lg max-w-none text-on-surface-variant leading-relaxed space-y-6 text-base md:text-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author Footer Profile block */}
        <div className="mt-xl p-lg bg-surface-container-low rounded-xl border border-outline-variant/20 flex flex-col sm:flex-row items-center gap-lg">
          <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-lg text-primary relative">
            {post.author.avatarUrl ? (
              <Image
                src={post.author.avatarUrl}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            ) : (
              post.author.name.slice(0, 2).toUpperCase()
            )}
          </div>
          
          <div className="text-center sm:text-left space-y-1">
            <h4 className="font-headline font-bold text-on-surface text-lg">
              Published by {post.author.name}
            </h4>
            <p className="text-sm text-on-surface-variant">
              Representative and writer for Yendel Ocha Kpeling Ministry. Supporting our community mission with reports of hope and light.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
