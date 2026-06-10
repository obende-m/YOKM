"use client";

import React, { useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { BANK_DETAILS } from "@/lib/data";

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("Yendel Ocha Kpeling Ministry (YOKM)");
  const [regNo, setRegNo] = useState("CAC/NGO/78291");
  const [bankName, setBankName] = useState(BANK_DETAILS.bankName);
  const [accountNo, setAccountNo] = useState(BANK_DETAILS.accountNumber);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-md">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">Site Settings</h1>
        <p className="text-sm text-on-surface-variant">Update primary metadata details, donation account details, and NGO registration keys.</p>
      </div>

      <Card padding="lg" className="border border-outline-variant/10 shadow-sm max-w-3xl">
        {saved && (
          <div className="p-3 bg-green-50 text-green-800 rounded-lg border border-green-200 flex items-center gap-2 text-sm mb-6 animate-pulse">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-lg text-sm">
          {/* General Metadata */}
          <div className="space-y-sm">
            <h3 className="font-headline font-bold text-base border-b border-outline-variant/10 pb-2">General Metadata</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant block">Organization Name</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="border border-outline-variant/30 rounded-lg p-3 w-full bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant block">CAC Registration Number</label>
                <input
                  type="text"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  className="border border-outline-variant/30 rounded-lg p-3 w-full bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>
          </div>

          {/* Donation Bank Account Details */}
          <div className="space-y-sm">
            <h3 className="font-headline font-bold text-base border-b border-outline-variant/10 pb-2">Bank Transfer Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant block">FCMB Bank Name</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="border border-outline-variant/30 rounded-lg p-3 w-full bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant block">Account Number</label>
                <input
                  type="text"
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                  className="border border-outline-variant/30 rounded-lg p-3 w-full bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end">
            <Button type="submit" variant="primary" icon={<Save className="w-4 h-4" />}>
              Save Settings
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
