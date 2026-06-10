import React from "react";
import Image from "next/image";

interface PageHeroProps {
  title: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  description,
  imageUrl,
  imageAlt = "YOKM Ministry background",
  children,
}) => {
  return (
    <section className="relative min-h-[350px] md:min-h-[450px] flex items-center overflow-hidden bg-brand-navy">
      {imageUrl ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-transparent"></div>
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-brand-navy via-primary/30 to-secondary/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
        </div>
      )}
      <div className="relative z-10 px-4 md:px-margin-desktop max-w-7xl mx-auto w-full py-xl text-white">
        <div className="max-w-2xl space-y-md">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg tracking-tight leading-tight">
            {title}
          </h1>
          {description && (
            <p className="font-body-lg text-body-lg opacity-90 max-w-lg leading-relaxed">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
};
