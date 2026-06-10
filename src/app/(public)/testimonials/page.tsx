import React from "react";
import Image from "next/image";
import { Quote, Sparkles, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/Button";
import { TESTIMONIALS } from "@/lib/data";

export default function TestimonialsPage() {
  return (
    <div className="flex-grow">
      {/* Hero */}
      <PageHero
        title="Stories of Healing and Triumph"
        description="Hear directly from the courageous widows whose lives, families, and businesses have been restored through the grace of God and our ministry programs."
        imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuBmUTpG6diNK9zffZUuW0pImJ7um-Jj0Uj26iZCnXNmi7JFlEBh1o-FnllraAeENiInyWtyQD_LTH2xLcmHSRW0J1AVyvfxZNx04RNe0bF9cxrUtBQMnC6o0YRA69kGapYUcpzcmKPnPrCRpnOWah8qHs3fEdQcnxEfjRGNrJvYQYweayWJV5cYVZSgCbk1fhDBf5EncRXoOSGrFFr8ArEwY7VHgOFqoBcSpFRH_-wZqifUMAMmIb7fEywDsnDHXqiJ-i5vV3TtU1A"
        imageAlt="Evangelist Alice Mama Alice portrait"
      />

      {/* Testimonials List */}
      <section className="py-xl px-4 md:px-margin-desktop max-w-7xl mx-auto">
        <SectionHeader
          title="Voices of Empowered Dignity"
          subtitle="Real testimonies of widows who transitioned from grief and financial hardship to self-sustenance and spiritual peace."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mt-6">
          {TESTIMONIALS.map((testimonial) => (
            <Card
              key={testimonial.id}
              variant="default"
              padding="lg"
              className="flex flex-col justify-between h-full relative"
            >
              <Quote className="w-10 h-10 text-secondary/15 absolute top-4 right-4" />
              
              <div className="space-y-md flex-grow">
                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-outline-variant/10 mt-6">
                {testimonial.avatarUrl ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-primary/20">
                    <Image
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-sm">
                    {testimonial.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <h4 className="font-headline font-bold text-on-surface text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-[11px] text-outline uppercase tracking-wider">
                    {testimonial.role} &bull; {testimonial.location || "Nigeria"}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Partnership Quote */}
      <section className="py-xl bg-brand-navy text-white border-t border-outline-variant/10">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-md">
          <MessageCircle className="w-10 h-10 text-primary-fixed mx-auto" />
          <h3 className="font-headline text-2xl font-bold">
            Are you a beneficiary wanting to share your testimony?
          </h3>
          <p className="text-surface-variant text-sm max-w-xl mx-auto leading-relaxed">
            Your story of triumph can encourage other widows in distress and inspire partners to continue supporting this divine mission. Reach out to our centers today.
          </p>
          <div className="pt-2">
            <Button variant="outline" className="text-white border-white/30 hover:bg-white/5" href="/contact">
              Submit Your Story
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
