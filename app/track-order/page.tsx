'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, Search, ExternalLink, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/site';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [searched, setSearched] = useState(false);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-800 mx-auto mb-4">
            <Package className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-teal-900 tracking-tight">
            Track Your Wipeband Order
          </h1>
          <p className="mt-3 text-base sm:text-lg text-ink/80 max-w-lg mx-auto">
            Check shipping progress for orders placed directly on Wipeband.com.
          </p>
        </div>

        {/* Order Lookup Form */}
        <div className="p-8 sm:p-10 rounded-3xl bg-offwhite border border-border shadow-sm mb-12">
          <form onSubmit={handleLookup} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-teal-900 mb-1">
                  Order Number *
                </label>
                <input
                  type="text"
                  required
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g. WB-94821"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-teal-900 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email used at checkout"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth className="gap-2">
              <Search className="w-4 h-4" />
              Check Status
            </Button>
          </form>

          {searched && (
            <div className="mt-6 p-4 rounded-2xl bg-[#EEF7EA] border border-teal-700/10 text-xs text-ink/80 space-y-1 animate-in fade-in">
              <div className="flex items-center gap-1.5 font-bold text-teal-900">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Order Located</span>
              </div>
              <p>Order #{orderNumber || 'WB-DEMO'} is confirmed and being prepared by our fulfillment center. You will receive an automated tracking link once USPS/carrier scans the parcel.</p>
            </div>
          )}
        </div>

        {/* Amazon Orders Notice */}
        <div className="p-6 rounded-3xl bg-amber-50/60 border border-amber-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-heading font-bold text-base text-amber-950">
              Did you order on Amazon?
            </h2>
            <p className="text-xs text-amber-900/80 max-w-md">
              Orders placed on Amazon are processed and shipped through Amazon’s fulfillment network. Please check your Amazon account order history for real-time tracking.
            </p>
          </div>
          <a
            href="https://www.amazon.com/gp/css/order-history"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-amber-300 text-xs font-heading font-bold text-amber-950 hover:bg-amber-100/50 transition-colors shrink-0"
          >
            <span>Amazon Orders</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <p className="text-center text-xs text-muted mt-8">
          Questions regarding your shipment? Email us anytime at{' '}
          <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-teal-700 underline">
            {SITE_CONFIG.supportEmail}
          </a>
        </p>
      </div>
    </div>
  );
}
