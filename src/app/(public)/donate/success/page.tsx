"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Heart, ArrowRight, BookOpen } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

function SuccessContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Kind Supporter";
  const amount = searchParams.get("amount") || "0";
  const formattedAmount = parseFloat(amount).toLocaleString();

  return (
    <Card
      variant="glass"
      padding="lg"
      className="max-w-2xl mx-auto border-primary/20 shadow-2xl text-center space-y-md relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-36 h-36 bg-secondary/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-36 h-36 bg-primary/5 rounded-full blur-xl"></div>
      
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 shadow-sm">
          <CheckCircle2 className="w-12 h-12" />
        </div>
      </div>

      <div className="space-y-sm">
        <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-on-surface">
          Thank You, {name}!
        </h1>
        <p className="text-primary font-bold uppercase tracking-widest text-xs">
          Donation Successful
        </p>
      </div>

      <div className="p-md bg-surface-container-low rounded-xl border border-outline-variant/10 inline-block">
        <p className="text-xs text-on-surface-variant font-bold uppercase">Amount Gifted</p>
        <p className="text-3xl font-extrabold text-primary-container mt-1">
          ₦{formattedAmount}
        </p>
      </div>

      <div className="space-y-sm max-w-lg mx-auto text-sm md:text-base text-on-surface-variant leading-relaxed">
        <p>
          We have successfully received your payment via Paystack. Your generous gift is a direct answer to prayer, helping us fund the ongoing <strong>&ldquo;Feed 2,000 Widows 2025&rdquo;</strong> initiative.
        </p>
        
        {/* Spiritual Blessing Card */}
        <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 italic text-primary mt-6 text-sm">
          &ldquo;Pure religion and undefiled before God and the Father is this, To visit the fatherless and widows in their affliction, and to keep himself unspotted from the world.&rdquo;
          <span className="block font-bold text-xs uppercase mt-2 tracking-widest">&mdash; James 1:27</span>
        </div>

        <p className="text-xs opacity-80 pt-4">
          A formal tax receipt and donation summary details have been sent to your email.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-md">
        <Button variant="primary" href="/" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
          Return Home
        </Button>
        <Button variant="ghost" href="/blog">
          Read Impact Stories
        </Button>
      </div>
    </Card>
  );
}

export default function DonationSuccessPage() {
  return (
    <div className="flex-grow flex items-center justify-center py-20 px-4 bg-surface-container/10">
      <Suspense fallback={
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-bold text-on-surface-variant text-sm">Loading receipt details...</p>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
