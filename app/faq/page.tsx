import React from 'react';
import type { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { OBJECTION_FAQS } from '@/components/sections/FaqSection';

export const metadata: Metadata = {
  title: 'Wipeband FAQ — Frequently Asked Questions',
  description:
    'Answers about Wipeband for kids ages 2–6: how the 6-layer soft tissue pack works, tearing and disposing of used layers, washing the silicone band, refills, and 30-day returns.',
};

export default function FaqPage() {
  const categories = [
    {
      title: 'Top Parent Questions',
      items: OBJECTION_FAQS,
    },
    {
      title: 'Refills & Ordering',
      items: [
        {
          question: 'What comes in the Wipeband Starter Kit?',
          answer:
            'Each Starter Kit ($19.95) includes 1 reusable Wipeband in your choice of pattern (Dinosaur, Unicorn, or Wonder Wings) and 5 soft tissue packs (6 layers each, 30 fresh tissue layers total).',
        },
        {
          question: 'Do tissue refills fit every Wipeband?',
          answer:
            'Yes — Wipeband Tissue Refills ($5.99 for a box of 10 packs / 60 fresh wipes) are made to fit every Wipeband strap.',
        },
        {
          question: 'How do direct website returns compare to Amazon orders?',
          answer:
            'Orders placed directly on Wipeband.com are covered by our 30-day return policy (email support@wipeband.com with your order number). Orders placed on Amazon are handled directly through your Amazon account under Amazon’s return policy.',
        },
      ],
    },
  ];

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-700 mx-auto mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-teal-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-ink/80 max-w-xl mx-auto">
            Everything parents ask about wearing Wipeband (ages 2–6), tearing off used tissue layers, washing, refills, and returns.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-10">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-xs"
            >
              <h2 className="font-heading font-black text-2xl text-teal-900 mb-6 pb-3 border-b border-teal-700/10">
                {cat.title}
              </h2>
              <Accordion items={cat.items} defaultOpenIndex={0} />
            </div>
          ))}
        </div>

        {/* Still have questions banner */}
        <div className="mt-16 p-8 rounded-3xl bg-teal-50/70 border border-teal-700/10 text-center space-y-4">
          <h3 className="font-heading font-black text-2xl text-teal-900">
            Still have questions?
          </h3>
          <p className="text-sm text-ink/80 max-w-md mx-auto">
            Our family support team is happy to help with product guidance, order inquiries, or school requests.
          </p>
          <div className="pt-2">
            <Button href="/contact" variant="primary" size="md">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
