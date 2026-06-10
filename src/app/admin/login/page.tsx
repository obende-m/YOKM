"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Invalid username or password.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card padding="lg" className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center mb-md space-y-xs">
          <div className="w-14 h-14 rounded-full border border-primary/20 bg-white flex items-center justify-center p-1 shadow-sm">
            <Image
              src="/logo.png"
              alt="YOKM Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <h1 className="font-headline text-xl font-bold text-on-surface">YOKM Admin</h1>
          <p className="text-xs text-on-surface-variant">
            Sign in to manage the ministry website.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-md">
          <div className="space-y-1">
            <label className="text-xs font-bold text-on-surface-variant block">Username</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                required
                autoFocus
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-outline-variant/30 rounded-lg p-3 pl-9 w-full bg-surface-container-low focus:ring-2 focus:ring-primary/20 outline-none text-sm text-on-surface"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-on-surface-variant block">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-outline-variant/30 rounded-lg p-3 pl-9 pr-10 w-full bg-surface-container-low focus:ring-2 focus:ring-primary/20 outline-none text-sm text-on-surface"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && <p className="text-xs text-error font-bold">{error}</p>}

          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
