'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Check,
  ShieldCheck,
  RotateCcw,
  RefreshCw,
  Award,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';
import { useCart } from '@/lib/cart';
import { STARTER_KIT_PRODUCT, REFILLS_PRODUCT } from '@/lib/products';
import { SITE_CONFIG } from '@/lib/site';
import { Button } from '@/components/ui/Button';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';

export function ChooseWipeband() {
  const { selectedPattern, setSelectedPattern, addStarterKit } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const variants = [
    { id: 'dinosaur', name: 'Dinosaur', swatch: '#62B44A' },
    { id: 'unicorn', name: 'Unicorn', swatch: '#F36F6B' },
    { id: 'wonder-wings', name: 'Wonder Wings', swatch: '#66C5CD' },
  ];

  const trustItems = [
    {
      icon: HeartHandshake,
      label: 'Soft, kid-friendly silicone',
      detail: 'Gentle, adjustable watch-like strap for ages 2–6',
    },
    {
      icon: RotateCcw,
      label: '30-day returns',
      detail: 'Easy returns on direct Wipeband.com orders',
    },
    {
      icon: ShieldCheck,
      label: 'Secure checkout',
      detail: 'Encrypted Stripe payment processing',
    },
    {
      icon: RefreshCw,
      label: 'Refillable and reusable',
      detail: 'Keep the band and pop in fresh 6-layer tissue packs',
    },
    {
      icon: Award,
      label: 'Patented design',
      detail: SITE_CONFIG.patentNotice,
    },
  ];

  const handleAddStarterKit = () => {
    addStarterKit(selectedPattern, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <section
      id="starter-kit"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-border/60 overflow-hidden scroll-mt-20"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-900 tracking-tight text-balance">
            Everything they need to start.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-ink/80">
            Start with one reusable Wipeband and five 6-layer soft tissue packs (30 fresh wipes total).
          </p>
        </motion.div>

        <div className="rounded-3xl p-6 sm:p-10 bg-[#FFFBF4] border border-amber-200/80 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <PlaceholderMedia
                assetId="product_starter-kit_hero.webp"
                alt="Wipeband Starter Kit — 1 reusable Wipeband and 5 soft tissue packs"
                aspectRatio="1:1"
                category="product"
                className="rounded-3xl border border-amber-200/60"
              />
              <div className="flex items-center justify-between px-2 text-xs text-ink/70">
                <span>Designed for kids ages 2–6</span>
                <span>
                  Selected:{' '}
                  <strong className="text-teal-900">
                    {variants.find((v) => v.id === selectedPattern)?.name}
                  </strong>
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-amber-200/60 pb-5">
                <div>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-teal-900">
                    {STARTER_KIT_PRODUCT.name}
                  </h3>
                  <p className="mt-1 text-sm text-ink/75">
                    Designed for kids ages 2–6 · Ready for preschool, playdates, and travel
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs font-heading font-bold text-muted block">
                    Direct Price
                  </span>
                  <span className="font-heading font-black text-3xl sm:text-4xl text-teal-900 tabular-nums">
                    ${STARTER_KIT_PRODUCT.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-heading font-bold text-teal-900 block mb-2.5">
                  What&apos;s in the Starter Kit:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {STARTER_KIT_PRODUCT.includes.map((inc) => (
                    <li
                      key={inc}
                      className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-amber-200/60 text-xs sm:text-sm font-heading font-bold text-teal-900"
                    >
                      <Check className="w-4 h-4 text-green-600 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-heading font-bold text-teal-900">
                    Choose a pattern:
                  </span>
                  <span className="text-xs font-semibold text-green-700">
                    {variants.find((v) => v.id === selectedPattern)?.name}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {variants.map((v) => {
                    const isSelected = selectedPattern === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedPattern(v.id)}
                        className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl border-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                          isSelected
                            ? 'border-teal-700 bg-white shadow-sm text-teal-900 font-bold'
                            : 'border-amber-200/70 bg-white/60 hover:bg-white text-ink/75'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: v.swatch }}
                        />
                        <span className="text-xs sm:text-sm font-heading font-bold">
                          {v.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <Button
                  onClick={handleAddStarterKit}
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="shadow-md"
                >
                  {justAdded ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="w-5 h-5" /> Added to Cart — ${STARTER_KIT_PRODUCT.price.toFixed(2)}
                    </span>
                  ) : (
                    `Add to Cart — $${STARTER_KIT_PRODUCT.price.toFixed(2)}`
                  )}
                </Button>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 text-xs sm:text-sm">
                  <Link
                    href="/refills"
                    className="inline-flex items-center font-heading font-bold text-teal-800 hover:text-green-600 transition-colors"
                  >
                    Already have Wipeband? Shop refills (${REFILLS_PRODUCT.price.toFixed(2)})
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>

                  <a
                    href={SITE_CONFIG.amazonStarterKitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-muted hover:text-teal-800 underline underline-offset-4 transition-colors"
                  >
                    Prefer Amazon? Buy here →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-amber-200/70">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/90 border border-amber-200/50"
                  >
                    <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-teal-800 shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-heading font-bold text-xs text-teal-900 block">
                        {item.label}
                      </span>
                      <span className="text-[11px] text-ink/70 leading-snug block mt-0.5">
                        {item.detail}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
