import React from 'react';
import type { Metadata } from 'next';
import { Truck, RotateCcw, ShieldCheck, Mail } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Shipping & Returns — Wipeband',
  description: 'Shipping details, delivery expectations and our 30-day return policy for Wipeband orders.',
};

export default function ShippingReturnsPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-heading text-4xl sm:text-5xl font-black text-teal-900 tracking-tight text-center mb-12">
          Shipping & Returns
        </h1>

        <div className="space-y-12 text-ink/80 text-base leading-relaxed">
          {/* Shipping Section */}
          <section className="p-8 rounded-3xl bg-[#FAFCFA] border border-border space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700">
                <Truck className="w-5 h-5" />
              </div>
              <h2 className="font-heading font-black text-2xl text-teal-900">
                Shipping Information
              </h2>
            </div>
            <p>
              We process and ship orders directly from our fulfillment partner.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Order Processing:</strong> Most orders are processed within 1 to 2 business days.</li>
              <li>• <strong>Standard Delivery:</strong> Standard shipping typically arrives within 3 to 7 business days depending on location.</li>
              <li>• <strong>Tracking:</strong> You will receive a tracking link via email as soon as your carrier label is generated.</li>
            </ul>
          </section>

          {/* Returns Section */}
          <section id="returns" className="p-8 rounded-3xl bg-white border border-border shadow-sm space-y-4 scroll-mt-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h2 className="font-heading font-black text-2xl text-teal-900">
                30-Day Return Policy
              </h2>
            </div>
            <p>
              We want your family to love Wipeband. If it isn&apos;t right for your routine, website orders are eligible for return within 30 days of delivery.
            </p>
            <div className="p-4 rounded-2xl bg-offwhite border border-border text-xs space-y-2">
              <p className="font-bold text-teal-900">How to request a return:</p>
              <p>
                1. Email our support team at <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-teal-700 underline">{SITE_CONFIG.supportEmail}</a> with your order number.
              </p>
              <p>
                2. Our team will provide return instructions and authorized mailing details.
              </p>
              <p>
                3. Once received and inspected, refunds are credited back to your original payment method.
              </p>
            </div>
          </section>

          {/* Amazon Orders */}
          <section className="p-8 rounded-3xl bg-[#FFFBF4] border border-amber-200/60 space-y-3">
            <h2 className="font-heading font-black text-xl text-teal-900">
              Orders Placed on Amazon
            </h2>
            <p className="text-sm">
              If you purchased your Wipeband or tissue refills through Amazon, your purchase is covered by Amazon’s standard 30-day return policy and customer service. Please initiate returns or tracking inquiries directly through your Amazon account order dashboard.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
