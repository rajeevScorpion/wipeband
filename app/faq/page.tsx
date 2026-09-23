import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Wipeband FAQ — Frequently Asked Questions',
  description: 'Answers about using Wipeband, refills, fit, orders, shipping, and returns.',
};

export default function FaqPage() {
  const categories = [
    {
      title: 'About Wipeband',
      items: [
        {
          question: 'What is Wipeband?',
          answer: 'Wipeband is a reusable, watch-like band designed to keep a layered tissue pad conveniently on a child’s wrist.',
        },
        {
          question: 'What problem does Wipeband solve?',
          answer: 'It helps keep a tissue within reach during everyday situations such as school, travel, play and time on the go — reducing messy sleeve-wiping and frantic tissue searches.',
        },
        {
          question: 'Is Wipeband a disposable product?',
          answer: 'No. The band itself is completely reusable and built to last. Only the tissue pack is replaceable when depleted.',
        },
      ],
    },
    {
      title: 'Using Wipeband',
      answer: '',
      items: [
        {
          question: 'How do I use Wipeband?',
          answer: 'Use the simple three-step routine: Wear it. Wipe it. Tear it. Put it on like a watch, use the soft tissue layer when needed, then remove the used layer to reveal the next fresh one.',
        },
        {
          question: 'How do I replace the tissue pack?',
          answer: 'When all tissue layers have been used, gently remove the empty plastic base from the wristband holder and click a fresh Wipeband refill pack into place.',
        },
      ],
    },
    {
      title: 'Fit & Age',
      items: [
        {
          question: 'What age is Wipeband designed for?',
          answer: 'Wipeband is designed for children ages 2 and up. The watch-style silicone strap features multiple adjustment notches to comfortably fit toddlers through pre-teens.',
        },
        {
          question: 'Is Wipeband adjustable?',
          answer: 'Yes, the flexible silicone strap adjusts across multiple sizes just like a standard sports watch to ensure a secure, comfortable fit on wrists of varying sizes.',
        },
      ],
    },
    {
      title: 'Tissues & Refills',
      items: [
        {
          question: 'How many tissue layers are in each pad?',
          answer: 'Each tissue pad contains 6 thin, absorbent, skin-friendly tissue layers that are peeled off one by one as they are used.',
        },
        {
          question: 'Can I buy refills separately?',
          answer: 'Yes! Wipeband refill packs are sold separately in boxes of 10 packs (60 total fresh wipes) right here on our website and on Amazon.',
        },
        {
          question: 'Do refills include another Wipeband?',
          answer: 'No. Refills are intended for existing Wipeband owners and contain replacement tissue packs only. To get another wristband, choose the Starter Kit or Family Bundle.',
        },
      ],
    },
    {
      title: 'Cleaning & Care',
      items: [
        {
          question: 'Can I clean the Wipeband?',
          answer: 'Yes. Remove the tissue pack before cleaning. The silicone band can be hand-washed with mild soap and warm water, then thoroughly dried before re-inserting tissues.',
        },
        {
          question: 'Can the band get wet?',
          answer: 'The silicone wristband is water-resistant. However, because the tissue pack contains paper tissues, remove the Wipeband or avoid submerging the tissue pad in water during handwashing or swimming.',
        },
      ],
    },
    {
      title: 'Orders, Shipping & Returns',
      items: [
        {
          question: 'Can I buy Wipeband on Amazon?',
          answer: 'Yes! Wipeband is available directly on Wipeband.com and on Amazon for customers who prefer shopping through their Amazon accounts.',
        },
        {
          question: 'What is your return policy?',
          answer: 'Website orders come with a 30-day return policy. If Wipeband is not right for your family, reach out to our team at support@wipeband.com for return assistance. Orders placed on Amazon follow Amazon’s standard return policy.',
        },
        {
          question: 'How do I track my order?',
          answer: 'You will receive a shipment confirmation email with tracking information as soon as your order ships, or you can use our on-site Track Order tool.',
        },
      ],
    },
  ];

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-700 mx-auto mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-teal-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-ink/80 max-w-xl mx-auto">
            Everything you need to know about Wipeband wear, refills, materials, and ordering.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {categories.map((cat) => (
            <div key={cat.title} className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-sm">
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
            Our family support team is happy to help with product guidance, order inquiries, or school bulk orders.
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
