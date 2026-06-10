import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Sparkles, Heart } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/Button";
import { PROGRAMS } from "@/lib/data";

export default function ProgramsPage() {
  return (
    <div className="flex-grow">
      {/* Page Hero */}
      <PageHero
        title="Our Empowerment Programs"
        description="We believe in structured, holistic support that covers spiritual alignment, economic vocational skills, healthcare support, and legal protection."
        imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCG6UbAQA1KC4UVjYUEkQiitVckrOi1QJ1sGYB_FdV2WZUAj7CwkOr9KROsjppbzzgA1sh6wLJRTgMs-FPG2-6W6cqgynXEMyhSxJopPBQn3NmeMHeL56LdEkfs7_hH5ktSATbqmgPCbQnu8i6AuccgvumS745vtEH4y-jotnwtlOTHB8Opp4Yx7vEojKYUoPveCRKn9PYJgXdP4Wnn70yj4ylgPnzymFcB4u_zXqDrwBgEPow9tsXjBBpq3IOWkBnmi7qDoK46K94"
        imageAlt="Community training support session group portrait"
      />

      {/* Detail list of programs */}
      <section className="py-xl px-4 md:px-margin-desktop max-w-7xl mx-auto space-y-20">
        <SectionHeader
          title="Holistic Outreach Pillars"
          subtitle="Our programs are designed to address the unique spiritual, physical, and legal needs of widows and orphans, providing them with a platform for independent dignity."
          centered
        />

        <div className="space-y-20">
          {PROGRAMS.map((program, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={program.id}
                id={program.id}
                className={`flex flex-col lg:flex-row items-center gap-xl ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image panel */}
                <div className="lg:w-1/2 relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-outline-variant/10 group">
                  <Image
                    src={program.imageUrl}
                    alt={program.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-102"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white p-2.5 rounded-lg shadow font-bold flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>

                {/* Text panel */}
                <div className="lg:w-1/2 space-y-md">
                  <h3 className="font-headline text-2xl md:text-3xl font-extrabold text-on-surface">
                    {program.title}
                  </h3>
                  <p className="text-on-surface-variant font-body-lg leading-relaxed">
                    {program.longDescription}
                  </p>
                  
                  {/* Achievements Checklist */}
                  <div className="space-y-sm pt-2">
                    <h4 className="font-label-md text-xs uppercase tracking-wider text-outline font-bold">
                      Key Highlights & Achievements
                    </h4>
                    <ul className="space-y-2">
                      {program.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-on-surface-variant">
                          <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Program Call to Action */}
      <section className="py-xl bg-surface-container border-t border-outline-variant/10">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-md">
          <div className="flex justify-center">
            <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-full flex items-center justify-center shadow">
              <Heart className="w-6 h-6 fill-current text-secondary" />
            </div>
          </div>
          <h3 className="font-headline text-2xl font-bold text-on-surface">
            Support Our Work
          </h3>
          <p className="text-on-surface-variant text-sm max-w-xl mx-auto leading-relaxed">
            Every dollar or naira contributed goes directly toward maintaining these pillars, funding starter kits, vocational training materials, healthcare screenings, and legal resources.
          </p>
          <div className="pt-2">
            <Button variant="support" size="lg" href="/donate" icon={<Heart className="w-5 h-5 fill-current" />}>
              Sponsor a Pillar Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
