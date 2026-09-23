import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FaqSection() {
  const faqs = [
    {
      q: 'How do I get a fresh layer?',
      a: 'Tear off the used layer and dispose of it.',
    },
    {
      q: 'What comes in the starter kit?',
      a: 'One Wipeband and five tissue packs.',
    },
    {
      q: 'Can I reuse the band?',
      a: 'Yes. Replace the tissue pack when it is used up.',
    },
    {
      q: "What if it isn't right for us?",
      a: "Website orders have free returns within 30 days. Amazon orders follow Amazon's return terms.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-border/60">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-teal-900 tracking-tight">
            Frequently asked questions
          </h2>
          <Link
            href="/faq"
            className="inline-flex items-center text-teal-800 font-heading font-bold hover:text-green-600 transition-colors text-sm sm:text-base group"
          >
            View all FAQs
            <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {faqs.map((faq) => (
            <div key={faq.q} className="space-y-2">
              <h3 className="font-heading font-bold text-lg sm:text-xl text-teal-900">
                {faq.q}
              </h3>
              <p className="text-ink/80 text-base leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
