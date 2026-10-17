import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { RefreshCw, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';
import { CleanerSleevesCTA } from '@/components/sections/CleanerSleevesCTA';
import { REFILLS_PRODUCT } from '@/lib/products';
import { SITE_CONFIG } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Wipeband Tissue Refills — Made to Fit Every Wipeband',
  description:
    'Keep the band and refresh the soft tissues with replacement Wipeband tissue packs. Made to fit every Wipeband. 10 packs per box (60 fresh wipes).',
};

export default function RefillsPage() {
  const steps = [
    {
      num: '1',
      title: 'Remove',
      desc: 'Take off the finished tissue pack from your child’s Wipeband.',
    },
    {
      num: '2',
      title: 'Replace',
      desc: 'Click a fresh 6-layer soft tissue pack right into the band.',
    },
    {
      num: '3',
      title: 'Wear',
      desc: 'Put Wipeband back on their wrist — ready again for school, playdates, and travel.',
    },
  ];

  return (
    <div className="bg-white">
      {/* 01. Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#EEF7EA] to-white border-b border-border/60">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs sm:text-sm font-heading font-bold text-green-700">
                Made to fit every Wipeband · 10 packs per box (60 fresh wipes)
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-teal-900 tracking-tight leading-[1.08] text-balance">
                Keep the band.{' '}
                <span className="text-green-600">Refresh the soft tissues.</span>
              </h1>
              <p className="text-lg sm:text-xl text-ink/80 max-w-xl leading-relaxed">
                Wipeband is designed to be reused. When all six soft tissue layers in a pack are used up, pop in a fresh refill pack and keep going.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button href="/products/tissue-refills" variant="primary" size="lg">
                  Shop Refills — ${REFILLS_PRODUCT.price.toFixed(2)}
                </Button>
                <Link
                  href="/products/wipeband-starter-kit"
                  className="inline-flex items-center text-teal-800 font-heading font-bold hover:text-green-600 transition-colors text-sm sm:text-base px-2"
                >
                  Need a band first? See Starter Kit <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
              <div className="pt-1">
                <a
                  href={SITE_CONFIG.amazonRefillsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-medium text-muted hover:text-teal-800 underline underline-offset-4 transition-colors"
                >
                  Prefer Amazon? Buy refills here →
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <PlaceholderMedia
                assetId="refills_hero_box_and_stack.webp"
                alt="Wipeband refills box with 10 soft tissue packs"
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
            Made to fit every Wipeband.
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed">
            Whether your child wears Dinosaur, Unicorn, or Wonder Wings, every Wipeband refill pack clicks right in. Keep a box at home and tuck spare soft tissue packs into school backpacks or the car.
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
                className="bg-white p-8 rounded-3xl border border-border shadow-xs text-center relative"
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
          <div className="max-w-2xl mx-auto rounded-3xl p-8 sm:p-10 bg-[#FFFBF4] border border-amber-200/60 shadow-xs text-center">
            <h3 className="font-heading font-black text-3xl text-teal-900">
              Wipeband Tissue Refills (10-Pack Box)
            </h3>
            <p className="mt-2 text-sm font-bold text-green-700">
              10 soft tissue packs · 6 layers each (60 fresh wipes total)
            </p>
            <div className="my-6">
              <span className="text-xs font-heading font-bold text-muted block">
                Direct Price
              </span>
              <span className="font-heading font-black text-4xl text-teal-900 tabular-nums">
                ${REFILLS_PRODUCT.price.toFixed(2)}
              </span>
            </div>
            <p className="text-sm sm:text-base text-ink/80 max-w-md mx-auto mb-8">
              Made to fit every Wipeband. Each compact pack holds 6 soft tissues that peel away one after another as they are used.
            </p>
            <div className="flex flex-col items-center gap-3 justify-center">
              <Button href="/products/tissue-refills" variant="primary" size="lg">
                Buy Refill Box — ${REFILLS_PRODUCT.price.toFixed(2)}
              </Button>
              <a
                href={SITE_CONFIG.amazonRefillsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-muted hover:text-teal-800 underline underline-offset-4 transition-colors pt-1"
              >
                Prefer Amazon? Buy here →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 05. Why Refill? */}
      <section className="py-16 sm:py-20 bg-[#EEF7EA] border-t border-teal-700/10">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-3xl border border-teal-700/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 mb-4">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-xl text-teal-900 mb-2">
                Reuse the band
              </h3>
              <p className="text-sm text-ink/75">
                The soft, kid-friendly silicone wristband stays with your child season after season.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-teal-700/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-xl text-teal-900 mb-2">
                Replace only the soft tissues
              </h3>
              <p className="text-sm text-ink/75">
                Refresh only what gets used up — 6 fresh wipes per pack, 10 packs per refill box.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-teal-700/10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500 mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-xl text-teal-900 mb-2">
                Made to fit every Wipeband
              </h3>
              <p className="text-sm text-ink/75">
                Universal fit across Dinosaur, Unicorn, and Wonder Wings wristbands.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CleanerSleevesCTA />
    </div>
  );
}
