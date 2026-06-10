"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowRight, Quote, BookOpen, Sparkles, Trophy, Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { IMPACT_STATS, PROGRAMS, BLOG_POSTS } from "@/lib/data";

export default function HomePage() {
  const [counts, setCounts] = useState({ widows: 0, food: 0, communities: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const duration = 2000; // 2 seconds
          const steps = 50;
          const stepTime = duration / steps;
          
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            
            setCounts({
              widows: Math.floor(progress * 2000),
              food: Math.floor(progress * 1000),
              communities: Math.floor(progress * 250),
            });
            
            if (step >= steps) {
              clearInterval(timer);
              setCounts({ widows: 2000, food: 1000, communities: 250 });
            }
          }, stepTime);
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  // Extract featured posts or first few posts
  const featuredNews = BLOG_POSTS.slice(0, 3);

  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9nZr5Hxn99z8s2YJYOhHLqUMLpfz30HyFHY9GeW1rk1QpDC-241EBpo400Up3JLszb-CIeJWRhyXnVqni4TBFU8vUjHw8mE0SmVBT0lCeArgOF6TEiKK1FtqLBtf0JJTOTtPd2OlRkPe9V8WvaBiqE60ccjk0XdnFRW7MfX-RVrOGrHGuY7I3tIxdf68CGgOBYoL-NSYk_jdOevcglu28FqhTdYMm_tnT29OSt_rGELtcxBg6fjSyr8KdXA9LChD56AAw2pAjyzg"
            alt="YOKM Community Widow smiling"
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-transparent z-10"></div>
        </div>

        <div className="relative z-20 px-4 md:px-margin-desktop w-full max-w-7xl mx-auto py-xl text-white">
          <div className="max-w-2xl space-y-md">
            <div className="inline-flex items-center gap-2 bg-secondary/15 text-secondary-container px-4 py-1.5 rounded-full font-label-sm text-label-sm border border-secondary/35">
              <Heart className="w-3.5 h-3.5 fill-current animate-pulse text-brand-magenta" />
              Empowering Lives Since 2015
            </div>
            
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg tracking-tight leading-tight">
              Awake Oh Ye <span className="text-primary-fixed">Widows</span>
            </h1>
            
            <p className="font-body-lg text-body-lg opacity-90 max-w-lg leading-relaxed">
              Restoring Hope, Healing Hearts, and Empowering Widows through faith-driven support, advocacy, and community integration.
            </p>
            
            <div className="flex flex-wrap gap-md pt-2">
              <Button variant="support" size="lg" href="/donate" icon={<Heart className="w-5 h-5 fill-current" />}>
                Donate Now
              </Button>
              <Button variant="secondary" size="lg" href="/about">
                Learn More
              </Button>
              <Link
                href="/contact"
                className="flex items-center gap-2 text-primary-fixed font-bold px-4 py-4 group hover:text-white transition-colors text-body-lg"
              >
                Contact Us
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Floating cross/dove watermark decoration */}
        <div className="absolute right-[8%] top-[25%] hidden lg:block animate-float opacity-15">
          <span className="text-[200px] text-primary select-none">🕊️</span>
        </div>
      </section>

      {/* Scripture Section */}
      <section className="scripture-gradient py-xl relative overflow-hidden border-y border-outline-variant/10">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-lg">
          <div className="flex justify-center text-secondary">
            <Quote className="w-12 h-12 opacity-80" />
          </div>
          
          <div className="space-y-lg divide-y divide-outline-variant/20">
            <div className="pb-lg">
              <p className="font-headline-lg text-2xl md:text-3xl italic text-on-surface-variant leading-relaxed mb-4">
                &ldquo;Wherefore he saith, Awake thou that sleepest, and arise from the dead, and Christ shall give thee light.&rdquo;
              </p>
              <cite className="font-label-md text-label-md text-primary font-bold block uppercase tracking-widest">
                &mdash; Ephesians 5:14
              </cite>
            </div>
            
            <div className="pt-lg">
              <p className="font-headline-lg text-2xl md:text-3xl italic text-on-surface-variant leading-relaxed mb-4">
                &ldquo;Awake, awake; put on thy strength, O Zion; put on thy beautiful garments, O Jerusalem, the holy city.&rdquo;
              </p>
              <cite className="font-label-md text-label-md text-primary font-bold block uppercase tracking-widest">
                &mdash; Isaiah 52:1
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section ref={statsRef} className="py-xl px-4 md:px-margin-desktop max-w-7xl mx-auto">
        <SectionHeader
          title="Our Shared Impact"
          subtitle="Through God's grace and your support, we have been able to reach thousands of widows across various communities, providing essential aid and spiritual guidance."
          action={
            <Link href="/programs" className="text-primary font-bold flex items-center gap-2 hover:underline">
              Our Programs
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Stat Card 1 */}
          <Card className="group hover:bg-primary hover:text-white transition-all duration-500 p-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-md group-hover:bg-white/20 transition-colors">
              <Trophy className="w-8 h-8 text-primary group-hover:text-white" />
            </div>
            <div className="font-display-lg text-4xl md:text-5xl text-primary group-hover:text-white mb-xs font-extrabold">
              {counts.widows.toLocaleString()}+
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant group-hover:text-white/80 uppercase tracking-wider font-bold">
              Widows Reached
            </p>
          </Card>

          {/* Stat Card 2 */}
          <Card className="group hover:bg-secondary hover:text-white transition-all duration-500 p-lg">
            <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mb-md group-hover:bg-white/20 transition-colors">
              <Heart className="w-8 h-8 text-secondary group-hover:text-white" />
            </div>
            <div className="font-display-lg text-4xl md:text-5xl text-secondary group-hover:text-white mb-xs font-extrabold">
              {counts.food.toLocaleString()}+
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant group-hover:text-white/80 uppercase tracking-wider font-bold">
              Food Packages Distributed
            </p>
          </Card>

          {/* Stat Card 3 */}
          <Card className="group hover:bg-brand-navy hover:text-white transition-all duration-500 p-lg">
            <div className="w-16 h-16 bg-outline-variant/20 rounded-lg flex items-center justify-center mb-md group-hover:bg-white/20 transition-colors">
              <BookOpen className="w-8 h-8 text-on-surface group-hover:text-white" />
            </div>
            <div className="font-display-lg text-4xl md:text-5xl text-on-surface group-hover:text-white mb-xs font-extrabold">
              {counts.communities.toLocaleString()}+
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant group-hover:text-white/80 uppercase tracking-wider font-bold">
              Communities Impacted
            </p>
          </Card>
        </div>
      </section>

      {/* Mission Pillars */}
      <section className="bg-surface-container py-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-margin-desktop">
          <SectionHeader title="Mission Pillars" centered />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center mt-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] w-full">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG6UbAQA1KC4UVjYUEkQiitVckrOi1QJ1sGYB_FdV2WZUAj7CwkOr9KROsjppbzzgA1sh6wLJRTgMs-FPG2-6W6cqgynXEMyhSxJopPBQn3NmeMHeL56LdEkfs7_hH5ktSATbqmgPCbQnu8i6AuccgvumS745vtEH4y-jotnwtlOTHB8Opp4Yx7vEojKYUoPveCRKn9PYJgXdP4Wnn70yj4ylgPnzymFcB4u_zXqDrwBgEPow9tsXjBBpq3IOWkBnmi7qDoK46K94"
                alt="Widows in a community support group session"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur p-6 rounded-xl border border-white/20 shadow-lg">
                <h4 className="font-headline text-lg md:text-xl font-bold text-primary mb-1">Spiritual Restoration</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Rebuilding faith and providing a safe haven for spiritual growth through weekly fellowship and prayer groups.
                </p>
              </div>
            </div>

            <div className="space-y-lg">
              {PROGRAMS.slice(1).map((program) => (
                <div key={program.id} className="flex gap-md group">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center soft-shadow text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-headline text-lg md:text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News & Upcoming Events */}
      <section className="py-xl max-w-7xl mx-auto px-4 md:px-margin-desktop">
        <SectionHeader
          title="News & Upcoming Events"
          action={
            <Button variant="outline" href="/blog">
              See All Updates
            </Button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {/* Blog card 1 */}
          {featuredNews.map((post) => (
            <Card key={post.id} className="flex flex-col h-full">
              <div className="relative h-48 w-full">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-md flex flex-col flex-grow">
                <span className="font-label-sm text-xs text-secondary uppercase tracking-widest font-bold mb-xs">
                  {post.category} &bull; {post.publishedAt}
                </span>
                <h4 className="font-headline text-lg font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h4>
                <p className="text-on-surface-variant text-sm mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-primary font-bold flex items-center gap-1.5 group hover:text-surface-tint text-sm"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Card>
          ))}

          {/* Event Card (Middle slot static placeholder matching Stitch design) */}
          <div className="bg-primary text-on-primary rounded-default shadow-md flex flex-col h-full border border-primary p-md overflow-hidden relative group">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-36 h-36 bg-white/10 rounded-full group-hover:scale-110 transition-transform"></div>
            <div className="flex flex-col h-full z-10">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-white/20 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest">
                  Upcoming Event
                </span>
                <div className="text-right">
                  <div className="text-3xl font-extrabold">12</div>
                  <div className="text-xs uppercase opacity-80">Nov</div>
                </div>
              </div>
              
              <h4 className="font-headline text-lg md:text-xl font-bold mb-2">
                Annual Thanksgiving & Fellowship
              </h4>
              <p className="text-white/80 text-sm mb-4 line-clamp-3 flex-grow">
                Join us for a day of worship, testimonies, and community dinner celebrating God's faithfulness this year.
              </p>
              
              <div className="space-y-sm mb-6 text-sm">
                <div className="flex items-center gap-2 opacity-90">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  Main Cathedral Hall
                </div>
                <div className="flex items-center gap-2 opacity-90">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  10:00 AM - 4:00 PM
                </div>
              </div>
              
              <Button variant="secondary" className="w-full text-primary hover:bg-white/95" href="/contact">
                Register to Attend
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Partner Section */}
      <section className="py-xl max-w-7xl mx-auto px-4 md:px-margin-desktop mb-xl">
        <div className="bg-brand-navy rounded-[2rem] p-lg md:p-xl flex flex-col lg:flex-row items-center gap-xl relative overflow-hidden text-white shadow-2xl border border-white/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10 lg:w-2/3 space-y-md">
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight">
              Partner with us to create a lasting legacy.
            </h2>
            <p className="text-surface-variant text-body-lg leading-relaxed max-w-xl">
              Your contribution, no matter how small, brings hope and restoration to a widow's life. Join our mission today.
            </p>
            <div className="flex flex-wrap gap-md pt-2">
              <Button variant="primary" size="lg" href="/donate">
                Become a Partner
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/5" href="/contact">
                Sponsor a Child
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/3 flex justify-center z-10 w-full">
            <div className="w-48 h-48 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center p-8 border border-white/10 shadow-lg">
              <span className="text-6xl">🕊️</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
