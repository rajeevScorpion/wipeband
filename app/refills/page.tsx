import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, RefreshCw, Layers, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';
import { CleanerSleevesCTA } from '@/components/sections/CleanerSleevesCTA';

export const metadata: Metadata = {
  title: 'Wipeband Refills — Keep the Band, Refresh the Tissues',
  description: 'Keep the band and refresh the tissues with replacement Wipeband tissue packs. 10 packs per box.',
};

export default function RefillsPage() {
  const steps = [
    {
      num: '1',
      title: 'Remove',
      desc: 'Take off the finished tissue pack from your Wipeband.',
    },
    {
      num: '2',
      title: 'Replace',
      desc: 'Attach a fresh Wipeband multi-layer refill pack into the band cradle.',
    },
    {
      num: '3',
      title: 'Wear',
      desc: 'Put Wipeband back on and it is ready again for everyday moments.',
    },
  ];

  return (
    <div className="bg-white">
      {/* 01. Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#EEF7EA] to-white border-b border-border/60">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-heading font-black tracking-wider uppercase text-green-700 bg-green-100/60 px-3.5 py-1.5 rounded-full border border-green-300">
                Eco-Conscious Reusable System
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-teal-900 tracking-tight leading-[1.08]">
                Keep the band. <br />
                <span className="text-green-600">Refresh the tissues.</span>
              </h1>
              <p className="text-lg sm:text-xl text-ink/80 max-w-xl leading-relaxed">
                Wipeband is designed to be reused. When the tissue pack is finished, replace it with a fresh refill and keep going.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button href="/products/tissue-refills" variant="primary" size="lg">
                  Shop Refills
                </Button>
                <Button
                  href="https://www.amazon.com/dp/placeholder-refills"
                  external
                  variant="amazon"
                  size="lg"
                >
                  Buy on Amazon
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <PlaceholderMedia
                assetId="refills_hero_box_and_stack.webp"
                alt="Wipeband refills box with clean tissue pad stacks"
                aspectRatio="1:1"
                category="product"
                className="shadow-hover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 02. Overview */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-teal-900 tracking-tight">
            Fresh tissues for the Wipeband you already own.
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed">
            Wipeband refill packs make it simple to keep your band ready for everyday use. Use them at home, pack extras for school bags or keep a few ready in the car.
          </p>
        </div>
      </section>

      {/* 03. How Refilling Works */}
      <section className="py-16 sm:py-20 bg-[#FAFCFA] border-y border-border">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-teal-900 tracking-tight">
              Three simple steps
            </h2>
            <p className="mt-2 text-base text-ink/75">
              Refreshing your Wipeband takes just seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div
                key={s.title}
                className="bg-white p-8 rounded-3xl border border-border shadow-sm text-center relative"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-700 text-white font-heading font-black text-lg flex items-center justify-center mx-auto mb-4">
                  {s.num}
                </div>
                <h3 className="font-heading font-black text-2xl text-teal-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-ink/75 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. Refill Product Feature Card */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto rounded-3xl p-8 sm:p-10 bg-[#FFFBF4] border border-amber-200/60 shadow-sm text-center">
            <h3 className="font-heading font-black text-3xl text-teal-900">
              Tissue Refills (10-Pack Box)
            </h3>
            <p className="mt-2 text-sm font-bold text-green-700">
              60 total soft, absorbent tissue wipes
            </p>
            <div className="my-6">
              <span className="text-xs uppercase tracking-wider font-bold text-muted block">
                Website Direct Price
              </span>
              <span className="font-heading font-black text-4xl text-teal-900">
                $5.99
              </span>
            </div>
            <p className="text-sm text-ink/80 max-w-md mx-auto mb-8">
              Engineered specifically for all Wipeband versions. Compact box fits easily in school backpacks or medicine cabinets.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/products/tissue-refills" variant="primary" size="lg">
                Buy Refill Box
              </Button>
              <Button
                href="https://www.amazon.com/dp/placeholder-refills"
                external
                variant="amazon"
                size="lg"
              >
                View on Amazon
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 05. Why Refill? */}
      <section className="py-16 sm:py-20 bg-[#EEF7EA] border-t border-teal-700/10">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-3xl border border-teal-700/10 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 mb-4">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-xl text-teal-900 mb-2">
                Reuse the band
              </h3>
              <p className="text-sm text-ink/75">
                The durable, skin-friendly wristband stays with you season after season.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-teal-700/10 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-xl text-teal-900 mb-2">
                Replace only tissues
              </h3>
              <p className="text-sm text-ink/75">
                Refresh only what gets used up. Less waste, lower recurring cost.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-teal-700/10 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500 mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-xl text-teal-900 mb-2">
                Keep extras ready
              </h3>
              <p className="text-sm text-ink/75">
                Ideal for school cubbies, car consoles, diaper bags and camping gear.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CleanerSleevesCTA />
    </div>
  );
}
