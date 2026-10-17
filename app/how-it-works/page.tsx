import React from 'react';
import type { Metadata } from 'next';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';
import { ProductEngineering } from '@/components/sections/ProductEngineering';
import { CleanerSleevesCTA } from '@/components/sections/CleanerSleevesCTA';
import { STARTER_KIT_PRODUCT } from '@/lib/products';

export const metadata: Metadata = {
  title: 'How Wipeband Works — Wear It. Wipe It. Tear It.',
  description:
    'See how Wipeband works for kids ages 2–6: Wear it like a watch, wipe on the soft tissue, and tear off the used layer to reveal a fresh one underneath.',
};

export default function HowItWorksPage() {
  const threeSteps = [
    {
      num: '01',
      title: 'Wear it.',
      tag: 'Put Wipeband on like a watch.',
      body: 'Designed for kids ages 2–6, the soft, adjustable silicone band keeps a tissue pack right on their wrist wherever they go.',
      assetId: 'howitworks_step1_wear.webp',
      alt: 'Putting Wipeband on wrist like a watch',
    },
    {
      num: '02',
      title: 'Wipe it.',
      tag: 'Wipe their nose on the soft tissue.',
      body: 'When a runny nose happens during play, preschool, or travel, the soft tissue pad on their wrist faces and gently wipes their nose — no searching across the room.',
      assetId: 'howitworks_step2_wipe.webp',
      alt: 'Child wiping nose on the soft tissue pad on wrist',
    },
    {
      num: '03',
      title: 'Tear it.',
      tag: 'Remove the used layer. A fresh one is ready underneath.',
      body: 'The used tissue layer is torn off and disposed of in the trash right after wiping. Children never keep wearing a used tissue layer.',
      assetId: 'howitworks_step3_tear.webp',
      alt: 'Removing and disposing of the used tissue layer',
    },
  ];

  const refillSteps = [
    {
      step: 'Step 1',
      title: 'Remove finished pack',
      desc: 'Once all 6 soft tissue layers have been used and torn away, pop out the empty pack base.',
    },
    {
      step: 'Step 2',
      title: 'Click in a fresh pack',
      desc: 'Snap a fresh 6-layer Wipeband soft tissue pack into the wristband cradle.',
    },
    {
      step: 'Step 3',
      title: 'Ready for the day',
      desc: 'Put Wipeband back on their wrist for school, playdates, and family trips.',
    },
  ];

  return (
    <div className="bg-white">
      {/* 01. Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#F2FBF9] to-white border-b border-border/60">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs sm:text-sm font-heading font-bold text-green-700">
                Wear → Wipe → Tear · Designed for kids ages 2–6
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-teal-900 tracking-tight leading-[1.08] text-balance">
                The tissue little noses can actually reach.
              </h1>
              <p className="text-lg sm:text-xl text-ink/80 max-w-xl leading-relaxed">
                Meet Wipeband, the wearable tissue for little ones. Soft, refillable tissues worn right on their wrist, so kids can wipe their nose wherever they are.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button href="/products/wipeband-starter-kit" variant="primary" size="lg">
                  Shop Starter Kit — ${STARTER_KIT_PRODUCT.price.toFixed(2)}
                </Button>
                <Button href="#steps" variant="secondary" size="lg">
                  See the 3 steps ↓
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <PlaceholderMedia
                assetId="howitworks_hero_wrist_closeup.webp"
                alt="Close-up of Wipeband sitting comfortably on a child's wrist"
                aspectRatio="4:3"
                category="product"
                className="shadow-hover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 02. The Problem Insight */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-teal-900 tracking-tight">
            The tissue is far away. The sleeve isn&apos;t.
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed">
            Kids don&apos;t stop playing to look for a tissue. When a tissue box is across the room or a tissue pack is buried in a backpack, sleeves are right there.
          </p>
          <p className="text-base sm:text-lg font-heading font-bold text-teal-900">
            So we put the tissue where kids already reach: their wrist.
          </p>
        </div>
      </section>

      {/* 03. 3 Simple Steps */}
      <section id="steps" className="py-16 sm:py-24 bg-[#FAFCFA] border-y border-border/70 scroll-mt-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-900 tracking-tight">
              Wear it. Wipe it. Tear it.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-ink/80">
              The used tissue is removed and disposed of after wiping; children do not need to keep wearing the used layer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {threeSteps.map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-xs flex flex-col justify-between"
              >
                <div>
                  <PlaceholderMedia
                    assetId={step.assetId}
                    alt={step.alt}
                    aspectRatio="4:3"
                    category="step"
                    stepNumber={step.num}
                    className="mb-6 rounded-2xl"
                  />
                  <h3 className="font-heading font-black text-2xl text-teal-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 font-heading font-bold text-sm text-green-700">
                    {step.tag}
                  </p>
                  <p className="mt-3 text-sm text-ink/75 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. Interactive 6-Layer Demonstration */}
      <ProductEngineering />

      {/* 05. Replacing the Tissue Pack */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#EEF7EA] to-white border-t border-border">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-teal-900 tracking-tight">
              Keep the band. Refresh the soft tissues.
            </h2>
            <p className="mt-2 text-base sm:text-lg text-ink/80">
              When all 6 layers in a tissue pack are finished, keep the reusable Wipeband and click in a fresh pack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {refillSteps.map((s, idx) => (
              <div
                key={s.step}
                className="bg-white p-6 rounded-3xl border border-teal-700/10 shadow-xs text-center relative"
              >
                <div className="w-12 h-12 rounded-2xl bg-green-500 text-white font-heading font-black text-base flex items-center justify-center mx-auto mb-4 shadow-xs">
                  {idx + 1}
                </div>
                <span className="text-xs font-heading font-bold text-green-700 block mb-1">
                  {s.step}
                </span>
                <h3 className="font-heading font-black text-xl text-teal-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-ink/75">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button href="/refills" variant="primary" size="lg" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Explore Soft Tissue Refills
            </Button>
          </div>
        </div>
      </section>

      <CleanerSleevesCTA />
    </div>
  );
}
