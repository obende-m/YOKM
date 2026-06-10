import React from "react";
import Image from "next/image";
import Link from "next/link";
import { History, Heart, Award, ShieldCheck, Flame, BookOpen, Quote } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { IMPACT_STATS } from "@/lib/data";

export default function AboutPage() {
  const coreValues = [
    {
      icon: <Heart className="w-8 h-8 text-secondary" />,
      title: "Compassion",
      description: "Empathizing deeply and acting decisively to alleviate suffering.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-secondary" />,
      title: "Integrity",
      description: "Maintaining absolute transparency and trust in all ministry actions.",
    },
    {
      icon: <Award className="w-8 h-8 text-secondary" />,
      title: "Dignity",
      description: "Treating every human being as a sacred creation with inherent worth.",
    },
    {
      icon: <Flame className="w-8 h-8 text-secondary" />,
      title: "Hope",
      description: "Anchoring our service in the unwavering hope of a brighter future.",
    },
  ];

  return (
    <div className="flex-grow">
      {/* Hero */}
      <PageHero
        title="Empowering the Forgotten with Hope and Grace"
        description="Rooted in faith, Yendel Ocha Kpeling Ministry (YOKM) is dedicated to restoring dignity to widows and vulnerable children since 2015."
        imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuArpq6VrI1PCClIofan5sPM-ukvtNPwOtd5uDA1LA85JPrwXe3-FtXnKnPYJFbZn2-tQW6UQZ08PEB3u9KSHUi2w05cTjjvIukalsOrD-6PZXRkIEZatdcBhrbYuiLyCgfP12V_LnwFK8cCm96nVfXdJXmsvEEVYpRiZytx9fAFX55FivAPS1jbIWXToWMGG3xRmLSH3BamK1T3atubpMRCz6tEMbZvYqOeCYiDK_9us6FV_BgJYsFKw-gzhJB70smjcLn2-53sKPM"
        imageAlt="Sunset over rural African landscape"
      />

      {/* Story Bento Grid */}
      <section className="py-xl px-4 md:px-margin-desktop max-w-7xl mx-auto">
        <SectionHeader
          title="Our Story"
          subtitle="How a simple calling became a community-wide lifeline of hope and sustainable restoration."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mt-6">
          {/* A Call to Compassion */}
          <div className="lg:col-span-7 bg-surface-container-low p-lg rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div className="space-y-sm">
              <span className="text-secondary font-bold font-label-md block uppercase tracking-widest text-xs">
                Established 2015
              </span>
              <h3 className="font-headline text-2xl font-bold mb-4">A Call to Compassion</h3>
              <p className="text-on-surface-variant font-body-md leading-relaxed">
                Yendel Ocha Kpeling Ministry was born from a profound realization that spiritual support alone cannot sustain a family in crisis. In 2015, observing the plight of widows in rural communities—women who were often stripped of their property, inheritance, and social status—the foundation was laid to provide both a spiritual home and tangible economic relief.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-md border-t border-outline-variant/20 pt-md mt-6">
              <div className="text-center">
                <div className="font-headline text-2xl md:text-3xl font-extrabold text-primary">500+</div>
                <div className="text-xs uppercase tracking-wider text-on-surface-variant mt-1">Widows Served</div>
              </div>
              <div className="text-center">
                <div className="font-headline text-2xl md:text-3xl font-extrabold text-primary">120+</div>
                <div className="text-xs uppercase tracking-wider text-on-surface-variant mt-1">Scholarships</div>
              </div>
              <div className="text-center">
                <div className="font-headline text-2xl md:text-3xl font-extrabold text-primary">{IMPACT_STATS.yearsOfImpact}th</div>
                <div className="text-xs uppercase tracking-wider text-on-surface-variant mt-1">Year of Impact</div>
              </div>
            </div>
          </div>

          {/* Bento Item: Right Image */}
          <div className="lg:col-span-5 rounded-xl overflow-hidden relative min-h-[300px] group shadow-md">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWhYz-5oDXQDIXYlsbFRqEsBTCCtu8u183gsMuimvQ0qt5Ccp6Ybqd3YP_Ov2OHdPLpGSkF4nE-UT229grwyHNF9IbKPpWB0Po1oUfuEok_uoPmgBDiMKYM4Ylz7I_guc7IWB6Ivw7bySfEkhoScMDbhPdGfmXy_JDlQVxIQyc1pgdz_OUeEUVnuE0lFI51WnoFUna6vuK4zsczNA_vQP7S3yrdfZpvPgwsGKAhpqywZAIHCwnjpTtfSOSIeVjTBKQ8Jpzzhhifso"
              alt="Hands sharing basket of food"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-md text-white">
              <p className="font-bold text-sm">Building self-sustenance through community outreach.</p>
            </div>
          </div>

          {/* Expanding Reach */}
          <div className="lg:col-span-4 bg-primary text-on-primary p-lg rounded-xl flex flex-col justify-center items-start shadow-md">
            <History className="w-12 h-12 mb-4 opacity-90" />
            <h3 className="font-headline text-xl font-bold mb-2">Expanding the Reach</h3>
            <p className="opacity-85 text-sm leading-relaxed">
              What started as a small prayer group in a local living room has evolved into a registered NGO serving five regional districts with holistic, structured aid programs.
            </p>
          </div>

          {/* Sustainable Impact */}
          <div className="lg:col-span-8 bg-surface-container-high p-lg rounded-xl flex flex-col md:flex-row gap-lg items-center shadow-md">
            <div className="flex-1 space-y-2">
              <h3 className="font-headline text-xl font-bold">Sustainable Impact</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                We believe in hand-ups, not just hand-outs. Our strategy focuses on vocational training and micro-loans to ensure that every beneficiary finds a viable path to independence and long-term security.
              </p>
            </div>
            <div className="flex-shrink-0 bg-white p-2 rounded-xl shadow-sm border border-outline-variant/10 relative w-32 h-32 overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXSR3c_YGp7XGGWfk7kMUJnMmtaE5K8AHpeWRRqAWokjaWkdXBJxg2ss6f6-o0pW23_rawJtm6vb6RfzhvIyu5OFxMWshHcbz5gOduESRcyF1qsGgSVY5RabxMdxkhDmsMaF22NuQcxh4FUVCBK16nsUWM5Rw2APYLcx6uzTr2er3KyEnHwTOt-SHYCg97jzL2YhJRhtBf2-bkrj3kVmk0JxejMtmDRFHexGMjMf4Rgpg-yFlQeVt6GXE5J8MnLVvBTvQsMTMWr0c"
                alt="Sewing workshop training session"
                fill
                className="object-cover p-2 rounded-xl"
                sizes="128px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Spiritual Divider */}
      <div className="spiritual-accent max-w-4xl mx-auto px-4">
        <span className="dove-icon text-2xl">🕊️</span>
      </div>

      {/* Founder Profile */}
      <section className="py-xl bg-surface-container-lowest">
        <div className="px-4 md:px-margin-desktop max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-xl">
            <div className="lg:w-1/2 relative w-full flex justify-center">
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl rotate-1 aspect-[4/5] w-full max-w-md">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmUTpG6diNK9zffZUuW0pImJ7um-Jj0Uj26iZCnXNmi7JFlEBh1o-FnllraAeENiInyWtyQD_LTH2xLcmHSRW0J1AVyvfxZNx04RNe0bF9cxrUtBQMnC6o0YRA69kGapYUcpzcmKPnPrCRpnOWah8qHs3fEdQcnxEfjRGNrJvYQYweayWJV5cYVZSgCbk1fhDBf5EncRXoOSGrFFr8ArEwY7VHgOFqoBcSpFRH_-wZqifUMAMmIb7fEywDsnDHXqiJ-i5vV3TtU1A"
                  alt="Evangelist Alice Mama Alice Profile portrait"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>
            
            <div className="lg:w-1/2 space-y-md">
              <h2 className="text-primary font-label-md text-xs uppercase tracking-widest font-bold">
                The Heart Behind the Mission
              </h2>
              <h3 className="font-headline text-3xl font-bold text-on-surface leading-tight">
                Evangelist Alice (&ldquo;Mama Alice&rdquo;)
              </h3>
              
              <div className="relative p-6 bg-surface-container/30 rounded-xl border-l-4 border-secondary/50">
                <Quote className="w-8 h-8 text-secondary/30 absolute -top-3 left-2" />
                <blockquote className="font-headline text-lg italic text-on-surface leading-relaxed relative z-10 pl-4">
                  &ldquo;Jesus is their husband, but they also need hope, healing and food.&rdquo;
                </blockquote>
              </div>
              
              <p className="text-on-surface-variant font-body-lg leading-relaxed">
                Known affectionately by the community as &lsquo;Mama Alice,&rsquo; Evangelist Alice founded YOKM with a vision to be the physical hands and feet of Christ. Having seen the struggles of marginalized women firsthand, she has dedicated her life to ensuring no widow feels abandoned and no child goes to bed hungry.
              </p>
              
              <div className="flex gap-4 pt-2">
                <div className="flex flex-col items-center p-4 bg-surface rounded-lg border border-outline-variant/30 w-32 shadow-sm">
                  <Award className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xs font-bold text-center">Visionary Leader</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-surface rounded-lg border border-outline-variant/30 w-32 shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xs font-bold text-center">Community Pillar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Card Row */}
      <section className="py-xl px-4 md:px-margin-desktop max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {/* Mission Card */}
          <Card variant="glass" className="relative group p-lg">
            <div className="relative z-10 space-y-md">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-md">
                <Flame className="w-6 h-6" />
              </div>
              <h2 className="font-headline text-2xl font-bold text-primary">Our Mission</h2>
              <p className="font-body-lg text-sm text-on-surface-variant leading-relaxed">
                To manifest the love of Christ by providing sustainable physical, emotional, and spiritual support to widows and vulnerable children, fostering an environment where every individual can thrive in dignity and hope.
              </p>
            </div>
          </Card>

          {/* Vision Card */}
          <Card variant="glass" className="relative group p-lg">
            <div className="relative z-10 space-y-md">
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mb-md">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="font-headline text-2xl font-bold text-secondary">Our Vision</h2>
              <p className="font-body-lg text-sm text-on-surface-variant leading-relaxed">
                A world where no widow is neglected and every vulnerable child is empowered with the education, care, and practical mentorship necessary to become a leader of tomorrow.
              </p>
            </div>
          </Card>
        </div>

        {/* Core Values grid */}
        <div className="mt-xl">
          <h3 className="text-center font-headline text-2xl font-bold mb-lg text-on-surface">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
            {coreValues.map((val, idx) => (
              <div key={idx} className="text-center p-md bg-surface rounded-xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-3">
                  {val.icon}
                </div>
                <h4 className="font-headline text-lg font-bold mb-2 text-on-surface">
                  {val.title}
                </h4>
                <p className="text-on-surface-variant text-xs leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
