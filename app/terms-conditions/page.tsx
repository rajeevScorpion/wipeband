import React from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Wipeband',
  description: 'Terms of service and sale governing Wipeband and Atah Life LLC website use.',
};

export default function TermsConditionsPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-teal text-ink/80 text-sm sm:text-base leading-relaxed">
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-teal-900 tracking-tight not-prose mb-2">
          Terms & Conditions
        </h1>
        <p className="text-xs text-muted not-prose mb-8">
          Last Updated: January 1, 2026 · {SITE_CONFIG.legalEntity}
        </p>

        <section className="space-y-4">
          <h2 className="text-xl font-heading font-black text-teal-900">1. Acceptance of Terms</h2>
          <p>
            By accessing Wipeband.com or purchasing our products, you agree to be bound by these Terms and Conditions. Wipeband is operated by {SITE_CONFIG.legalEntity}.
          </p>
        </section>

        <section className="space-y-4 mt-8">
          <h2 className="text-xl font-heading font-black text-teal-900">2. Orders and Pricing</h2>
          <p>
            All direct orders are subject to acceptance and availability. We reserve the right to correct pricing errors or cancel orders resulting from inaccurate inventory or pricing displays. Direct website pricing may differ from pricing on third-party channels such as Amazon.
          </p>
        </section>

        <section className="space-y-4 mt-8">
          <h2 className="text-xl font-heading font-black text-teal-900">3. Intellectual Property & Patents</h2>
          <p>
            Wipeband design, branding, website content, trademarks, and wearable tissue dispensing mechanisms are proprietary intellectual property of {SITE_CONFIG.legalEntity}, including {SITE_CONFIG.patentNotice}. Unauthorized copying, duplication, or reproduction is strictly prohibited.
          </p>
        </section>

        <section className="space-y-4 mt-8">
          <h2 className="text-xl font-heading font-black text-teal-900">4. Product Use & Safety</h2>
          <p>
            Wipeband products are intended for children ages 2 and older. Adult supervision is recommended for young children. Wipeband is an everyday convenience product and is not a medical device.
          </p>
        </section>

        <section className="space-y-4 mt-8">
          <h2 className="text-xl font-heading font-black text-teal-900">5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, {SITE_CONFIG.legalEntity} shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use our products or website.
          </p>
        </section>
      </div>
    </div>
  );
}
