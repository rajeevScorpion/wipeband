import React from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy — Wipeband',
  description: 'How Wipeband and Atah Life LLC collect, protect, and respect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-teal text-ink/80 text-sm sm:text-base leading-relaxed">
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-teal-900 tracking-tight not-prose mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-muted not-prose mb-8">
          Last Updated: January 1, 2026 · {SITE_CONFIG.legalEntity}
        </p>

        <section className="space-y-4">
          <h2 className="text-xl font-heading font-black text-teal-900">1. Information We Collect</h2>
          <p>
            When you visit Wipeband.com or make a direct purchase, we collect information you provide directly to us, including your name, shipping address, billing address, email address, and order selections.
          </p>
          <p>
            Payment card information is processed securely by our third-party payment partner (Stripe). Wipeband does not store your full payment card details or security codes on our servers.
          </p>
        </section>

        <section className="space-y-4 mt-8">
          <h2 className="text-xl font-heading font-black text-teal-900">2. How We Use Information</h2>
          <p>
            We use your personal information solely to fulfill and ship your orders, communicate transaction confirmations and tracking numbers, respond to customer inquiries, and ensure the security of our store.
          </p>
        </section>

        <section className="space-y-4 mt-8">
          <h2 className="text-xl font-heading font-black text-teal-900">3. Information Sharing</h2>
          <p>
            We do not sell, rent, or trade your personal information. We share minimal order details only with trusted service partners essential to completing your order (e.g., payment processing via Stripe, postal carriers like USPS/UPS for delivery).
          </p>
        </section>

        <section className="space-y-4 mt-8">
          <h2 className="text-xl font-heading font-black text-teal-900">4. Amazon Purchases</h2>
          <p>
            If you choose to purchase Wipeband products through Amazon.com, your transaction and account data are governed exclusively by Amazon’s Privacy Notice.
          </p>
        </section>

        <section className="space-y-4 mt-8">
          <h2 className="text-xl font-heading font-black text-teal-900">5. Contact Us</h2>
          <p>
            If you have questions about our privacy practices, please contact us at{' '}
            <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-teal-700 font-bold underline">
              {SITE_CONFIG.supportEmail}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
