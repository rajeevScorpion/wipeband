import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Accordion } from '@/components/ui/Accordion';

export const OBJECTION_FAQS = [
  {
    question: 'Will my child actually wear Wipeband?',
    answer:
      'Wipeband is shaped like a lightweight, playful watch in patterns kids enjoy (Dinosaur, Unicorn, and Wonder Wings). Because it sits gently on the wrist like a pretend watch, most little ones enjoy putting it on as part of getting ready.',
  },
  {
    question: 'What happens after they wipe?',
    answer:
      'After wiping their nose on the top soft tissue layer, you or your child simply peel off the used top sheet and throw it in the trash. A fresh, clean tissue layer is ready right underneath.',
  },
  {
    question: 'Does the used tissue stay on their wrist?',
    answer:
      'No. Each tissue pack has 6 individual tear-away layers. The used layer is removed and disposed of right after wiping so children never keep wearing a used tissue.',
  },
  {
    question: 'Is it comfortable?',
    answer:
      'Yes. The band is made of soft, kid-friendly silicone with multiple adjustment notches so it fits comfortably without pinching during play, school, or travel.',
  },
  {
    question: 'What ages does it fit?',
    answer:
      'Wipeband is designed for kids ages 2–6, with an adjustable watch-style silicone strap sized for toddler and young child wrists.',
  },
  {
    question: 'How many wipes are in each pack?',
    answer:
      'Each compact tissue pack contains 6 soft tissue layers ready one after another. The Starter Kit comes with 5 tissue packs (30 fresh tissue layers total).',
  },
  {
    question: 'Can it be used at preschool or school?',
    answer:
      'Yes. Many families send Wipeband for preschool drop-offs, recess, and classroom activities so a tissue is always within reach. Check with your teacher if your classroom has specific wearable rules.',
  },
  {
    question: 'Can I wash the band?',
    answer:
      'Yes. Remove the tissue pack first, then hand-wash the reusable silicone wristband with mild soap and warm water and let it dry completely before popping in a fresh tissue pack.',
  },
  {
    question: "What if my child doesn't like it?",
    answer:
      'Direct orders placed on Wipeband.com are covered by our 30-day return policy — simply email support@wipeband.com for return instructions. Orders placed on Amazon follow Amazon’s return terms.',
  },
];

export function FaqSection() {
  const homepageFaqs = OBJECTION_FAQS.slice(0, 6);

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-border/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-teal-900 tracking-tight">
              Questions parents ask first
            </h2>
            <p className="mt-2 text-sm sm:text-base text-ink/75">
              Straightforward answers on comfort, tearing off used layers, ages 2–6 fit, and returns.
            </p>
          </div>
          <Link
            href="/faq"
            className="inline-flex items-center text-teal-800 font-heading font-bold hover:text-green-600 transition-colors text-sm sm:text-base whitespace-nowrap shrink-0 group"
          >
            See all 9 FAQs
            <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="bg-[#FAFCFA] rounded-3xl p-6 sm:p-8 border border-border">
          <Accordion items={homepageFaqs} defaultOpenIndex={0} />
        </div>
      </div>
    </section>
  );
}
