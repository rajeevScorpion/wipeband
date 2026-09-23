import React from 'react';
import type { Metadata } from 'next';
import { ArrowRight, Watch, Layers, Scissors, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';
import { CleanerSleevesCTA } from '@/components/sections/CleanerSleevesCTA';

export const metadata: Metadata = {
  title: 'How Wipeband Works — Wear It. Wipe It. Tear It.',
  description: 'See the simple Wear It. Wipe It. Tear It. routine and learn how the reusable Wipeband and replacement tissue packs work.',
};

export default function HowItWorksPage() {
  const threeSteps = [
    {
      num: '01',
      title: 'Wear it.',
      tag: 'Put Wipeband on like a watch.',
      body: 'A comfortable, adjustable fit keeps the tissue pad comfortably within reach wherever kids go.',
      assetId: 'howitworks_step1_wear.webp',
      alt: 'Putting Wipeband on wrist like a watch',
    },
    {
      num: '02',
      title: 'Wipe it.',
      tag: 'Use the soft tissue layer when needed.',
      body: 'No searching through a bag. No leaving the activity or running back to find a tissue box across the room.',
      assetId: 'howitworks_step2_wipe.webp',
      alt: 'Using soft tissue layer on wrist',
    },
    {
      num: '03',
      title: 'Tear it.',
      tag: 'Remove the used layer and reveal a fresh one.',
      body: 'Simple, quick and hygienic. Peel off the used sheet to expose the next soft layer beneath, then keep going.',
      assetId: 'howitworks_step3_tear.webp',
      alt: 'Tearing off used tissue layer',
    },
  ];

  const refillSteps = [
    {
      step: 'Step 1',
      title: 'Remove finished pack',
      desc: 'Take off the depleted tissue pack from the Wipeband cradle.',
    },
    {
      step: 'Step 2',
      title: 'Attach fresh refill',
      desc: 'Click a fresh Wipeband multi-layer refill pack securely into place.',
    },
    {
      step: 'Step 3',
      title: 'Wear and use as usual',
      desc: 'Ready for school, sports, playdates, and everyday adventures.',
    },
  ];

  return (
    <div className="bg-white">
      {/* 01. Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#F2FBF9] to-white border-b border-border/60">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-heading font-black tracking-wider uppercase text-green-600 bg-green-50 px-3.5 py-1.5 rounded-full border border-green-200">
                Simple Wearable Routine
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-teal-900 tracking-tight leading-[1.08]">
                Right where kids need it.
              </h1>
              <p className="text-lg sm:text-xl text-ink/80 max-w-xl leading-relaxed">
                Wipeband is a reusable, watch-like band that keeps a soft layered tissue pad conveniently on the wrist. So when a little nose needs attention, the tissue is already close at hand.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button href="/shop" variant="primary" size="lg">
                  Shop Wipeband
                </Button>
                <Button href="#steps" variant="secondary" size="lg">
                  See the 3 steps ↓
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <PlaceholderMedia
                assetId="howitworks_hero_wrist_closeup.webp"
                alt="Close-up of Wipeband sitting comfortably on child wrist"
                aspectRatio="4:3"
                category="product"
                className="shadow-hover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 02. The Core Idea */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-teal-900 tracking-tight">
            Kids do not always stop to look for a tissue.
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed">
            At school, during play, on a trip or in the middle of a busy day, a tissue box may be somewhere else. Wipeband changes one simple thing: <strong className="text-teal-900 font-extrabold">where the tissue is.</strong>
          </p>
          <p className="text-base text-ink/75 leading-relaxed">
            Instead of expecting kids to remember where to find one, Wipeband keeps it on the wrist — the place they can naturally reach.
          </p>
        </div>
      </section>

      {/* 03. 3 Simple Steps */}
      <section id="steps" className="py-16 sm:py-24 bg-[#FAFCFA] border-y border-border/70 scroll-mt-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-900 tracking-tight">
              Wear it. Wipe it. Tear it.
            </h2>
            <p className="mt-3 text-lg text-ink/75">
              Three simple steps designed for guided independence and cleaner routines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {threeSteps.map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
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

          <div className="text-center mt-12">
            <Button href="/products/wipeband-starter-kit" variant="primary" size="lg">
              Shop the Starter Kit
            </Button>
          </div>
        </div>
      </section>

      {/* 04 & 05. Product Construction & Layers */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-heading text-3xl sm:text-4xl font-black text-teal-900 tracking-tight">
                A tissue system built into the band.
              </h2>
              <p className="text-base sm:text-lg text-ink/80 leading-relaxed">
                The Wipeband tissue pad sits securely on the wearable band so the top layer stays easy to access. The band is reusable. The tissue pack is replaceable.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-teal-50/50 border border-teal-700/10">
                  <div className="p-2.5 rounded-xl bg-teal-700 text-white shrink-0 mt-0.5">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-teal-900">
                      Layered construction
                    </h4>
                    <p className="text-sm text-ink/75 mt-0.5">
                      Multiple tissue layers stacked in one ultra-compact, skin-friendly pad.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-teal-50/50 border border-teal-700/10">
                  <div className="p-2.5 rounded-xl bg-teal-700 text-white shrink-0 mt-0.5">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-teal-900">
                      Tear-away use
                    </h4>
                    <p className="text-sm text-ink/75 mt-0.5">
                      Remove the used layer when finished to reveal fresh tissue beneath.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-teal-50/50 border border-teal-700/10">
                  <div className="p-2.5 rounded-xl bg-teal-700 text-white shrink-0 mt-0.5">
                    <Watch className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-teal-900">
                      Watch-like fit
                    </h4>
                    <p className="text-sm text-ink/75 mt-0.5">
                      Comfortable, adjustable, kid-friendly silicone strap that stays in place.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <PlaceholderMedia
                assetId="howitworks_system_exploded_view.webp"
                alt="Wipeband assembled system showing band and multi-layer tissue pad"
                aspectRatio="4:3"
                category="explainer"
                className="shadow-hover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 06. Replacing the Tissue Pack */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#EEF7EA] to-white border-t border-border">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-teal-900 tracking-tight">
              Refill. Reattach. Ready again.
            </h2>
            <p className="mt-2 text-base sm:text-lg text-ink/80">
              When the tissue pack is finished, keep the Wipeband and replace the tissues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {refillSteps.map((s, idx) => (
              <div
                key={s.step}
                className="bg-white p-6 rounded-3xl border border-teal-700/10 shadow-sm text-center relative"
              >
                <div className="w-12 h-12 rounded-2xl bg-green-500 text-white font-heading font-black text-base flex items-center justify-center mx-auto mb-4 shadow-sm">
                  {idx + 1}
                </div>
                <span className="text-xs uppercase font-mono font-bold text-green-700 block mb-1">
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
              Explore Tissue Refills
            </Button>
          </div>
        </div>
      </section>

      <CleanerSleevesCTA />
    </div>
  );
}
