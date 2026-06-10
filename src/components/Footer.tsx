"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Globe, Send, ShieldCheck } from "lucide-react";
import { Button } from "./Button";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-brand-navy text-surface-variant border-t border-outline-variant/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-margin-desktop py-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-xl">
          {/* Brand Info Column */}
          <div className="space-y-md">
            <div>
              <h3 className="font-headline text-2xl font-extrabold text-primary-fixed leading-none">
                YOKM Ministry
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-outline-variant mt-1.5">
                Awake Oh Ye Widows
              </p>
            </div>
            <p className="text-body-md opacity-80 leading-relaxed text-sm">
              Yendel Ocha Kpeling Ministry is a registered faith-based NGO dedicated to the physical, emotional, and spiritual restoration and empowerment of widows and vulnerable children.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all text-surface-bright"
                aria-label="Website"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@yokm.org"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all text-surface-bright"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-md lg:pl-8">
            <h4 className="font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider text-white">
              Quick Resources
            </h4>
            <ul className="space-y-sm text-sm">
              <li>
                <Link href="/about" className="hover:text-primary-fixed transition-colors">
                  About Our Ministry
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-primary-fixed transition-colors">
                  Empowerment Programs
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-primary-fixed transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-primary-fixed transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary-fixed transition-colors">
                  News & Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-md lg:pl-4">
            <h4 className="font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider text-white">
              Contact Details
            </h4>
            <ul className="space-y-sm text-sm">
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-primary-fixed flex-shrink-0" />
                <a href="tel:08033173193" className="hover:text-primary-fixed transition-colors">
                  08033173193
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-primary-fixed flex-shrink-0" />
                <a href="mailto:contact@yokm.org" className="hover:text-primary-fixed transition-colors">
                  contact@yokm.org
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary-fixed flex-shrink-0" />
                <span>Ministry Center, Abuja, Nigeria</span>
              </li>
            </ul>
          </div>

          {/* Legal / Newsletter Column */}
          <div className="space-y-md">
            <h4 className="font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider text-white">
              Legal Status
            </h4>
            <div className="p-md bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-primary-fixed flex-shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-60">
                  Registration Number
                </p>
                <p className="font-bold text-white tracking-wide">CAC/NGO/78291</p>
              </div>
            </div>
            
            {/* Newsletter form */}
            <div className="pt-2">
              <h5 className="text-white text-xs font-bold uppercase tracking-wide mb-2">Newsletter Subscription</h5>
              {subscribed ? (
                <p className="text-xs text-primary-fixed bg-primary/10 p-2.5 rounded border border-primary/20">
                  Thank you! You have successfully subscribed to updates.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary-fixed text-xs flex-1"
                  />
                  <button
                    type="submit"
                    className="bg-primary hover:bg-surface-tint text-white px-3 py-2 rounded font-bold text-xs flex items-center justify-center transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="border-t border-outline-variant/10 mt-xl pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs opacity-75">
          <p>© {new Date().getFullYear()} Yendel Ocha Kpeling Ministry (YOKM). Registered NGO. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary-fixed">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary-fixed">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
