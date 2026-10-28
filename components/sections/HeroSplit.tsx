'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowDown, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';
import { useCart } from '@/lib/cart';
import { STARTER_KIT_PRODUCT } from '@/lib/products';

const PATTERN_SWATCHES: Record<string, string> = {
  dinosaur: '#62B44A',
  unicorn: '#F36F6B',
  'wonder-wings': '#3BA59B',
};

export function HeroSplit() {
  const { selectedPattern, setSelectedPattern, addStarterKit } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const variants = STARTER_KIT_PRODUCT.variants || [];

  const handleHeroAddToCart = () => {
    addStarterKit(selectedPattern, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-8 lg:pt-16 lg:pb-10 bg-gradient-to-br from-[#FFFDF9] via-[#FFF6EC] to-[#EDF9F6] border-b border-teal-900/10">
      {/* Warm playful ambient color washes */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#F57642]/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-0 w-96 h-96 rounded-full bg-[#62B44A]/12 blur-3xl" />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Strict 3-Tier Typographic Hierarchy (Headline -> Lead -> Action) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-7"
          >
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.65rem] font-black text-teal-950 tracking-[-0.03em] leading-[1.06] text-balance">
              No more wiping runny noses{' '}
              <span className="text-[#F57642] relative inline-block">
                on sleeves.
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#62B44A]/70"
                  viewBox="0 0 200 10"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 7 Q100 1 197 6"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-teal-950/75 font-normal leading-relaxed max-w-lg">
              Meet Wipeband — soft, refillable tissues worn right on their wrist, so little ones can wipe their nose wherever they are.
            </p>

            {/* Clean Swatch Selector + Primary Purchase Action */}
            <div className="space-y-4 pt-1">
              <div className="inline-flex flex-wrap items-center gap-2 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-teal-900/10 shadow-xs">
                {variants.map((v) => {
                  const isSelected = selectedPattern === v.id;
                  const swatchColor = PATTERN_SWATCHES[v.id] || '#62B44A';
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedPattern(v.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        isSelected
                          ? 'bg-teal-950 text-white shadow-xs'
                          : 'text-teal-950/75 hover:text-teal-950 hover:bg-teal-900/5'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: swatchColor }}
                      />
                      <span>{v.name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <Button
                  onClick={handleHeroAddToCart}
                  variant="primary"
                  size="lg"
                  className="whitespace-nowrap shrink-0 px-8"
                >
                  {justAdded ? (
                    <span className="inline-flex items-center gap-2">
                      <Check className="w-5 h-5" /> Added — ${STARTER_KIT_PRODUCT.price.toFixed(2)}
                    </span>
                  ) : (
                    `Add to Cart — $${STARTER_KIT_PRODUCT.price.toFixed(2)}`
                  )}
                </Button>

                <span className="text-sm text-teal-950/65 font-medium">
                  1 reusable band + 30 fresh wipes
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none p-2.5 rounded-[2rem] bg-white/80 backdrop-blur-sm border border-teal-900/10 shadow-[0_20px_50px_rgba(10,77,87,0.08)]">
              <PlaceholderMedia
                assetId="home_hero_usage_loop.mp4"
                alt="Child wearing Wipeband on wrist and wiping nose on the top soft tissue layer"
                aspectRatio="16:10"
                category="video"
                className="rounded-[1.5rem]"
              />
            </div>
          </motion.div>
        </div>

        {/* Centered "See how it works" Scroll Cue just above the bottom divider line */}
        <div className="mt-10 lg:mt-12 flex justify-center">
          <Link
            href="#how-it-works"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal-950/65 hover:text-teal-950 transition-colors py-1.5 px-4 rounded-full hover:bg-teal-900/5 group"
          >
            <span>See how it works</span>
            <ArrowDown className="w-4 h-4 text-[#F57642] transform group-hover:translate-y-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
}
