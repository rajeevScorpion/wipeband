'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/cart';
import { STARTER_KIT_PRODUCT } from '@/lib/products';
import { SITE_CONFIG } from '@/lib/site';

export function CleanerSleevesCTA() {
  const { selectedPattern, setSelectedPattern, addStarterKit } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const variants = STARTER_KIT_PRODUCT.variants || [];

  const handleFinalAddToCart = () => {
    addStarterKit(selectedPattern, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <section className="bg-teal-700 py-16 sm:py-20 lg:py-24 text-white overflow-hidden relative">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl mx-auto space-y-3"
        >
          <p className="text-sm sm:text-base font-heading font-bold text-green-300 tracking-wide">
            Cleaner sleeves start here.
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white text-balance">
            The tissue little noses can actually reach.
          </h2>
          <p className="text-white/85 text-base sm:text-lg max-w-lg mx-auto pt-1">
            Designed for kids ages 2–6. Includes 1 reusable Wipeband + 5 soft tissue packs (30 fresh layers).
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-8 flex flex-col items-center space-y-4"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-teal-800/80 rounded-2xl border border-white/15">
            {variants.map((v) => {
              const isSelected = selectedPattern === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedPattern(v.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-white text-teal-900 shadow-xs'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {v.name}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={handleFinalAddToCart}
              variant="white"
              size="lg"
              className="shadow-lg hover:shadow-xl whitespace-nowrap shrink-0"
            >
              {justAdded ? (
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-5 h-5 text-green-600" /> Added to Cart — ${STARTER_KIT_PRODUCT.price.toFixed(2)}
                </span>
              ) : (
                `Add to Cart — $${STARTER_KIT_PRODUCT.price.toFixed(2)}`
              )}
            </Button>
          </div>

          <a
            href={SITE_CONFIG.amazonStarterKitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-white/75 hover:text-white underline underline-offset-4 transition-colors pt-1"
          >
            Prefer Amazon? Buy here →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
