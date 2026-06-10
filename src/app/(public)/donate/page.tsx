"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, Wallet, ShieldCheck, Copy, Check, Users, Sparkles, BookOpen } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { CAMPAIGN_INFO, BANK_DETAILS, RECENT_DONATIONS } from "@/lib/data";

export default function DonatePage() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(5000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const amounts = [1000, 5000, 10000, 25000, 50000];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(BANK_DETAILS.accountNumber).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    });
  };

  const getFinalAmount = () => {
    if (selectedAmount !== null) return selectedAmount;
    const custom = parseFloat(customAmount);
    return isNaN(custom) || custom <= 0 ? 0 : custom;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = getFinalAmount();
    if (finalAmount <= 0) {
      alert("Please select or enter a valid donation amount.");
      return;
    }
    if (!name || !email) {
      alert("Please fill in your name and email address.");
      return;
    }

    setLoading(true);

    // Simulate Paystack script loading / redirection
    setTimeout(() => {
      setLoading(false);
      // Route to success page
      router.push(
        `/donate/success?name=${encodeURIComponent(name)}&amount=${finalAmount}&email=${encodeURIComponent(
          email
        )}`
      );
    }, 2000);
  };

  const finalDonationAmount = getFinalAmount();

  return (
    <div className="flex-grow py-xl px-4 md:px-margin-desktop max-w-7xl mx-auto">
      {/* Hero & Campaign Tracker Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center mb-xl">
        <div className="space-y-md">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm border border-secondary/20">
            Join Our Mission
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight">
            Empower Lives Through Divine Compassion
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-lg leading-relaxed">
            Your contribution helps us provide spiritual guidance, food security, and educational opportunities to the most vulnerable members of our community.
          </p>
          
          {/* Campaign Tracker Card */}
          <div className="p-md rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-4 shadow-sm">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-headline text-lg md:text-xl font-bold text-primary">
                  {CAMPAIGN_INFO.title}
                </h3>
                <p className="text-xs text-on-surface-variant">
                  {CAMPAIGN_INFO.initiative}
                </p>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-on-surface text-lg">
                  {CAMPAIGN_INFO.percentComplete}%
                </span>
                <p className="text-[10px] text-outline uppercase tracking-wider">Complete</p>
              </div>
            </div>
            
            <div className="w-full bg-surface-container-highest rounded-full h-3.5 overflow-hidden">
              <div
                className="bg-primary h-full progress-glow rounded-full transition-all duration-1000"
                style={{ width: `${CAMPAIGN_INFO.percentComplete}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs font-bold text-on-surface-variant">
              <span>
                Raised: <span className="text-on-surface font-extrabold">₦{CAMPAIGN_INFO.raised.toLocaleString()}</span>
              </span>
              <span>
                Goal: <span className="text-on-surface font-extrabold">₦{CAMPAIGN_INFO.goal.toLocaleString()}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Hero image card */}
        <div className="relative group w-full aspect-video md:aspect-square rounded-xl overflow-hidden shadow-xl">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCul8xnJqBNWlldmaqd2ZayKND4q-Fm2Yi6E68SBo2PeiJ51zt5z9xI3a_3YmCUr5BzvvFbi7QIiv7uKYwlELo5Ka_gs1L4j5T0ZO8Nlf9kT_M_6x6uBnW5LIXvf1ttadrrRoQ3S63o4ol2SVxMObeFaYFzjGOxELisfYBNVus4OPjyke912ka1D_Ri1cA1czvoUTVQCen19Qn_lpNMuxZRqt7g1mfGTWO2rn-AuM3HR2ID1ueUXYOQ5_j0quFEytrVzbDeeVi95dM"
            alt="Smiling African woman supported by the ministry"
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-102"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-md">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Heart className="w-5 h-5 fill-current text-white" />
              </div>
              <div>
                <p className="font-bold text-base md:text-lg">Every widow deserves dignity.</p>
                <p className="text-xs opacity-80">Join the movement today.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Donation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Payment Integration Area */}
        <div className="lg:col-span-8 space-y-md">
          <Card padding="lg" className="border border-outline-variant/10 shadow-md">
            <div className="flex items-center gap-4 mb-lg">
              <div className="w-12 h-12 rounded-full faith-gradient flex items-center justify-center text-white shadow">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-headline text-xl md:text-2xl font-bold">Secure Donation</h2>
                <p className="text-sm text-on-surface-variant">Choose an amount to impact a life today.</p>
              </div>
            </div>

            {/* Simulated Paystack Amount Toggles */}
            <form onSubmit={handleSubmit} className="space-y-lg">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleAmountSelect(amt)}
                    className={`border-2 p-4 rounded-lg font-bold transition-all text-sm md:text-base ${
                      selectedAmount === amt
                        ? "border-primary bg-primary-container/10 text-primary"
                        : "border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary"
                    }`}
                  >
                    ₦{amt.toLocaleString()}
                  </button>
                ))}
                
                {/* Custom Amount Field */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant font-bold text-sm">
                    ₦
                  </span>
                  <input
                    type="number"
                    min="100"
                    placeholder="Custom"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="w-full pl-8 border-2 border-outline-variant/30 rounded-lg p-4 focus:ring-primary focus:border-primary font-bold text-sm outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-sm">
                <label className="font-label-md text-sm font-bold block">Personal Details</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-outline-variant/30 rounded-lg p-3 w-full bg-surface-container-low focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-outline-variant/30 rounded-lg p-3 w-full bg-surface-container-low focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                  />
                </div>
                <textarea
                  placeholder="Write a prayer request or optional message for the ministry..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border border-outline-variant/30 rounded-lg p-3 w-full bg-surface-container-low h-24 focus:ring-2 focus:ring-primary/20 outline-none text-sm resize-none"
                ></textarea>
              </div>

              {/* Proceed to checkout */}
              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                disabled={loading}
                icon={<Heart className="w-5 h-5 fill-current" />}
              >
                {loading ? "Connecting to Paystack..." : `Proceed to Paystack (₦${finalDonationAmount.toLocaleString()})`}
              </Button>

              <div className="flex items-center justify-center gap-4 mt-sm opacity-60 text-xs">
                <span>Secured by Paystack</span>
                <div className="h-4 w-px bg-outline-variant/30"></div>
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>256-bit SSL Encryption</span>
              </div>
            </form>
          </Card>

          {/* Recent Donation Summary */}
          <div className="bg-surface-container-high/30 p-md rounded-xl space-y-3">
            <h3 className="font-label-md uppercase tracking-wider text-outline text-xs font-bold">
              Recent Kind Hearts
            </h3>
            <div className="space-y-3">
              {RECENT_DONATIONS.slice(0, 3).map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-outline-variant/10 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-sm">
                      {donation.donorName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-on-surface text-sm">{donation.donorName}</p>
                      <p className="text-[10px] text-on-surface-variant">
                        {donation.timestamp} &bull; Campaign: {donation.campaign}
                      </p>
                    </div>
                  </div>
                  <span className="font-extrabold text-primary">
                    {donation.currency}
                    {donation.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Bank Info & Partner Cards */}
        <aside className="lg:col-span-4 space-y-gutter">
          {/* Bank Info Card */}
          <div className="bg-brand-navy text-white p-lg rounded-xl shadow-xl space-y-md relative overflow-hidden border border-white/5">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="text-6xl">🏦</span>
            </div>
            
            <div>
              <h3 className="font-headline text-xl md:text-2xl font-bold text-primary-fixed">
                Bank Transfer
              </h3>
              <p className="text-xs text-surface-variant opacity-80 mt-1">
                Direct bank deposit or local transfer
              </p>
            </div>
            
            <div className="space-y-4 pt-2 text-sm">
              <div onClick={handleCopyAccount} className="group cursor-pointer select-none">
                <p className="text-xs text-outline-variant font-bold">Account Number</p>
                <div className="flex justify-between items-center bg-white/5 p-2.5 rounded border border-white/10 mt-1 hover:bg-white/10 transition-colors">
                  <p className="text-xl font-bold tracking-widest text-primary-fixed-dim">
                    {BANK_DETAILS.accountNumber}
                  </p>
                  {copySuccess ? (
                    <span className="text-xs text-secondary-fixed flex items-center gap-1">
                      <Check className="w-4 h-4 text-green-400" />
                    </span>
                  ) : (
                    <Copy className="w-4 h-4 text-white opacity-60 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-xs text-outline-variant font-bold">Bank Name</p>
                <p className="text-base font-bold mt-0.5">{BANK_DETAILS.bankName}</p>
              </div>
              
              <div>
                <p className="text-xs text-outline-variant font-bold">Account Name</p>
                <p className="text-base font-bold mt-0.5">{BANK_DETAILS.accountName}</p>
              </div>
            </div>
            
            <div className="bg-white/10 p-3 rounded-lg text-xs italic opacity-90 border border-white/5">
              &ldquo;{BANK_DETAILS.referenceNote}&rdquo;
            </div>
          </div>

          {/* Become a Monthly Partner Card */}
          <div className="p-md rounded-xl border-2 border-dashed border-secondary/35 bg-secondary/5 space-y-4">
            <div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow">
              <Heart className="w-6 h-6 fill-current text-white" />
            </div>
            <h3 className="font-headline text-lg md:text-xl font-bold text-on-surface">
              Become a Monthly Partner
            </h3>
            <p className="text-on-surface-variant text-xs leading-relaxed">
              Consistency creates sustainable change. Join our circle of monthly supporters and help us plan long-term impact programs.
            </p>
            <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white" href="/contact">
              Partner With Us
            </Button>
          </div>

          {/* Featured Image */}
          <div className="rounded-xl overflow-hidden shadow-lg border border-outline-variant/10 relative h-48 group">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3qVzAqxVRaAbJyJ2mPW95JstJOsbdG0gM0siUPgkwZrvuK8MXm7bNymG_IX3_Z1Sn6a4PmEIzv_Tof4mFQYu1nF7OAQ1NLT6-BQ4zw1BmF6qeOjpK0euZXFkYBwWwXxHb_zFs8aWKJ52kMN9MTEUsQqhGVjPJY8FDRXLG0zYUYKk3iRvq1lx50GNgxGFHBGmLcL-HeAx1z7EssvSpXrJONhzi2un2gSFDX6lwWxd4K40qesySnWUQ0OoLHTE2jA7atnUWEAHRwRI"
              alt="Act of giving community kitchen"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-102"
              sizes="(max-width: 1024px) 100vw, 25vw"
            />
          </div>
        </aside>
      </div>

      {/* Toast popup */}
      {copySuccess && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-brand-navy text-white px-6 py-3 rounded-full shadow-2xl z-[100] border border-white/10 flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-green-400" />
          <span className="text-sm font-bold">Account Number Copied!</span>
        </div>
      )}
    </div>
  );
}
