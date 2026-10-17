'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowDown, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';
import { useCart } from '@/lib/cart';
import { STARTER_KIT_PRODUCT } from '@/lib/products';
import { SITE_CONFIG } from '@/lib/site';

export function HeroSplit() {
  const { selectedPattern, setSelectedPattern, addStarterKit } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const variants = STARTER_KIT_PRODUCT.variants || [];
  const activeVariant = variants.find((v) => v.id === selectedPattern) || variants[0];

  const handleHeroAddToCart = () => {
    addStarterKit(selectedPattern, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 lg:pt-12 lg:pb-16 bg-white border-b border-border/60">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text & Direct Purchase Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-5"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-heading font-bold text-teal-800">
              <span>Wear → Wipe → Tear</span>
              <span aria-hidden="true" className="text-teal-700/40">·</span>
              <span className="text-green-700">Designed for kids ages 2–6.</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.4rem] font-black text-teal-900 tracking-tight leading-[1.08] text-balance">
              No more wiping runny noses on sleeves.
            </h1>

            <div className="space-y-2 max-w-xl">
              <p className="font-heading text-xl sm:text-2xl font-extrabold text-teal-800 leading-snug">
                Meet Wipeband, the wearable tissue for little ones.
              </p>
              <p className="text-base sm:text-lg text-ink/80 leading-relaxed">
                Soft, refillable tissues worn right on their wrist, so kids can wipe their nose wherever they are.
              </p>
            </div>

            {/* Inline Pattern Selector */}
            <div className="pt-2 space-y-2.5">
              <div className="flex items-center justify-between max-w-md">
                <span className="text-xs font-heading font-bold text-teal-900">
                  Choose Starter Kit pattern ({STARTER_KIT_PRODUCT.tagline}):
                </span>
                <span className="text-xs font-semibold text-green-700">
                  {activeVariant?.name}
                </span>
              </div>

              <div className="inline-flex flex-wrap items-center gap-2 p-1.5 bg-[#F4F8F6] rounded-2xl border border-teal-700/10">
                {variants.map((v) => {
                  const isSelected = selectedPattern === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedPattern(v.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        isSelected
                          ? 'bg-white text-teal-900 shadow-sm border border-teal-700/20'
                          : 'text-ink/70 hover:text-teal-900'
                      }`}
                    >
                      {v.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary CTA + Secondary How It Works Anchor */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Button
                onClick={handleHeroAddToCart}
                variant="primary"
                size="lg"
                className="whitespace-nowrap shrink-0 shadow-md"
              >
                {justAdded ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> Added to Cart — ${STARTER_KIT_PRODUCT.price.toFixed(2)}
                  </span>
                ) : (
                  `Add to Cart — $${STARTER_KIT_PRODUCT.price.toFixed(2)}`
                )}
              </Button>

              <Link
                href="#how-it-works"
                className="inline-flex items-center text-teal-800 font-heading font-bold hover:text-green-600 transition-colors text-sm sm:text-base px-3 py-2 whitespace-nowrap shrink-0 group"
              >
                See how it works
                <ArrowDown className="w-4 h-4 ml-1.5 transform group-hover:translate-y-0.5 transition-transform duration-150" />
              </Link>
            </div>

            {/* Tertiary Amazon link */}
            <div className="pt-1">
              <a
                href={SITE_CONFIG.amazonStarterKitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs sm:text-sm font-medium text-muted hover:text-teal-800 underline underline-offset-4 transition-colors"
              >
                Prefer Amazon? Buy here →
              </a>
            </div>
          </motion.div>

          {/* Right Visual Column: Hero Silent Loop Video Slot with Poster Fallback */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <PlaceholderMedia
                assetId="home_hero_usage_loop.mp4"
                alt="Child wearing Wipeband on wrist and wiping nose on the top soft tissue layer"
                aspectRatio="16:10"
                category="video"
                className="shadow-hover rounded-3xl"
              />
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-ink/70">
                <span>1 reusable Wipeband + 5 soft tissue packs (30 wipes)</span>
                <span className="font-heading font-bold text-teal-800 tabular-nums">
                  ${STARTER_KIT_PRODUCT.price.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
