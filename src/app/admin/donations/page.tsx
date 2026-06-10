"use client";

import React, { useState } from "react";
import { DollarSign, Search, Filter, ArrowUpRight, TrendingUp } from "lucide-react";
import { Card } from "@/components/Card";
import { RECENT_DONATIONS } from "@/lib/data";

export default function AdminDonationsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDonations = RECENT_DONATIONS.filter((d) =>
    d.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.campaign.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-md">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">Donations ledger</h1>
        <p className="text-sm text-on-surface-variant">Track secure contributions received via Paystack and direct bank transfers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <Card padding="md" className="flex items-center justify-between">
          <div>
            <p className="text-xs text-outline font-bold uppercase tracking-wider">Paystack Transactions</p>
            <h3 className="text-3xl font-extrabold text-primary mt-1">₦3,250,000</h3>
            <span className="text-[10px] text-green-600 font-bold block mt-1">+15% from last month</span>
          </div>
          <div className="p-3 bg-primary/10 rounded-full text-primary">
            <DollarSign className="w-6 h-6" />
          </div>
        </Card>

        <Card padding="md" className="flex items-center justify-between">
          <div>
            <p className="text-xs text-outline font-bold uppercase tracking-wider">Direct Bank Transfers</p>
            <h3 className="text-3xl font-extrabold text-secondary mt-1">₦1,420,000</h3>
            <span className="text-[10px] text-green-600 font-bold block mt-1">+8% from last month</span>
          </div>
          <div className="p-3 bg-secondary/10 rounded-full text-secondary">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </Card>
      </div>

      <Card padding="md" className="border border-outline-variant/10 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
          <div className="relative flex-grow w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant w-4 h-4" />
            <input
              type="text"
              placeholder="Search donor name or campaign..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface-container text-xs rounded-lg border-none focus:ring-1 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <button className="p-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors">
            <Filter className="w-4 h-4 text-on-surface-variant" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-surface-container/50 font-bold text-xs uppercase text-on-surface-variant">
                <th className="px-md py-3 border-b border-outline-variant/10">Donor</th>
                <th className="px-md py-3 border-b border-outline-variant/10">Campaign</th>
                <th className="px-md py-3 border-b border-outline-variant/10">Method</th>
                <th className="px-md py-3 border-b border-outline-variant/10">Date</th>
                <th className="px-md py-3 border-b border-outline-variant/10 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredDonations.map((don) => (
                <tr key={don.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-md py-4">
                    <span className="font-bold text-on-surface">{don.donorName}</span>
                  </td>
                  <td className="px-md py-4 text-on-surface-variant">{don.campaign}</td>
                  <td className="px-md py-4 text-xs font-bold text-on-surface-variant">
                    {don.currency === "$" ? "PayPal/Card" : "Paystack Checkout"}
                  </td>
                  <td className="px-md py-4 text-on-surface-variant">{don.timestamp}</td>
                  <td className="px-md py-4 text-right font-extrabold text-primary">
                    {don.currency}
                    {don.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
              {filteredDonations.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-md py-8 text-center text-on-surface-variant">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
