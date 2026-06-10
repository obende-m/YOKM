"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  HeartHandshake,
  Image as ImageIcon,
  Settings,
  Bell,
  Plus,
  Globe,
  Menu,
  X
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarLinks = [
    { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: "Impact Stories", href: "/admin/posts", icon: <HeartHandshake className="w-5 h-5" /> },
    { label: "Donations", href: "/admin/donations", icon: <HeartHandshake className="w-5 h-5" /> },
    { label: "Gallery Manager", href: "/admin/gallery", icon: <ImageIcon className="w-5 h-5" /> },
    { label: "Settings", href: "/admin/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div className="min-h-screen flex bg-background text-on-surface">
      {/* Mobile Sidebar Overlay Backdrop */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`bg-surface-container w-64 fixed left-0 top-0 bottom-0 h-screen flex flex-col p-4 gap-2 border-r border-outline-variant/10 shadow-md z-40 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between lg:justify-start gap-3 px-2 py-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 overflow-hidden rounded-full border border-primary/20 bg-white flex items-center justify-center p-0.5">
              <Image
                src="/logo.png"
                alt="YOKM Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="font-headline text-lg font-bold text-on-surface leading-none">YOKM Admin</h1>
              <p className="text-[10px] uppercase tracking-wider text-on-surface-variant/70 mt-1">Control Panel</p>
            </div>
          </div>
          
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-grow space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className={`rounded-lg flex items-center gap-3 px-4 py-3 transition-all hover:translate-x-1 duration-150 text-sm font-bold ${
                isActive(link.href)
                  ? "bg-primary-container text-on-primary-container"
                  : "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Block in Sidebar */}
        <div className="mt-auto pt-4 border-t border-outline-variant/20 px-2 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
              AD
            </div>
            <div>
              <p className="text-sm font-bold text-on-surface leading-none">Admin User</p>
              <p className="text-[9px] uppercase tracking-wider text-on-surface-variant/70 mt-1">Super Admin</p>
            </div>
          </div>
          <Link
            href="/"
            className="w-full py-2 px-4 bg-outline-variant/20 hover:bg-outline-variant/30 text-on-surface rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all"
          >
            <Globe className="w-3.5 h-3.5" />
            View Website
          </Link>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col w-full">
        {/* Top Header Bar */}
        <header className="h-20 px-4 md:px-8 flex items-center justify-between sticky top-0 bg-surface/75 backdrop-blur-md z-30 border-b border-outline-variant/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="font-headline text-base md:text-xl font-bold text-on-surface leading-none">Welcome back, Admin</h2>
              <p className="text-[10px] md:text-xs text-on-surface-variant/85 mt-1">Here&apos;s what&apos;s happening with YOKM today.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Notification Icon */}
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors relative">
              <Bell className="w-5 h-5 text-on-surface-variant" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full animate-pulse"></span>
            </button>
            <div className="h-8 w-[1px] bg-outline-variant/30"></div>
            {/* Quick Action Button */}
            <Link
              href="/admin/posts"
              className="flex items-center gap-2 py-2.5 px-4 rounded-lg bg-primary text-white hover:bg-surface-tint hover:shadow transition-all active:scale-95 text-xs font-bold shadow-sm"
            >
              <Plus className="w-4 h-4" />
              New Post
            </Link>
          </div>
        </header>

        {/* Content container */}
        <main className="p-4 md:p-8 flex-grow bg-surface-container/20">
          {children}
        </main>
      </div>
    </div>
  );
}
