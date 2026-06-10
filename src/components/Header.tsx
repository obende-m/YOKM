"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, Lock } from "lucide-react";
import { Button } from "./Button";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Gallery", href: "/gallery" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/10 shadow-sm transition-all duration-300">
      <nav className="flex justify-between items-center w-full px-4 md:px-margin-desktop py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-full border border-primary/20 bg-white p-1 flex items-center justify-center">
            {/* Styled Cross/Dove Emoji or Placeholder text since it is a premium fallback */}
            <span className="text-primary text-xl font-bold">🕊️</span>
          </div>
          <div>
            <div className="font-headline text-lg md:text-xl font-extrabold text-primary group-hover:text-surface-tint transition-colors tracking-tight leading-none">
              YOKM Ministry
            </div>
            <div className="text-[10px] uppercase tracking-widest text-on-surface-variant/70 mt-0.5">
              Awake Oh Ye Widows
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-label-md text-label-md transition-colors relative py-1 hover:text-primary ${
                isActive(link.href)
                  ? "text-primary font-bold border-b-2 border-primary"
                  : "text-on-surface-variant"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/admin"
            className="text-primary font-bold hover:text-surface-tint transition-all px-3 py-2 flex items-center gap-1.5 text-label-md"
          >
            <Lock className="w-4 h-4" />
            Admin Login
          </Link>
          <Button
            variant="support"
            href="/donate"
            icon={<Heart className="w-4 h-4 fill-current" />}
          >
            Donate Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <Button
            variant="support"
            size="sm"
            href="/donate"
            icon={<Heart className="w-3.5 h-3.5 fill-current" />}
          >
            Donate
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-on-surface hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[73px] z-40 bg-background/95 backdrop-blur-md flex flex-col p-6 border-t border-outline-variant/10 shadow-xl animate-fade-in">
          <nav className="flex flex-col gap-4 mb-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg py-2 border-b border-outline-variant/10 hover:text-primary transition-colors ${
                  isActive(link.href) ? "text-primary font-bold" : "text-on-surface-variant"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4 mt-auto">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 bg-surface-container hover:bg-surface-container-high rounded-default text-on-surface font-bold text-center flex items-center justify-center gap-2 border border-outline-variant/20"
            >
              <Lock className="w-4 h-4" />
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
