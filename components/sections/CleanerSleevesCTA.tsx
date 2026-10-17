'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/cart';
import { STARTER_KIT_PRODUCT } from '@/lib/products';

const PATTERN_SWATCHES: Record<string, string> = {
  dinosaur: '#62B44A',
  unicorn: '#F36F6B',
  'wonder-wings': '#3BA59B',
};

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
    <section className="bg-gradient-to-br from-[#0A4D57] via-[#0D5B66] to-[#156C73] py-16 sm:py-22 text-white overflow-hidden relative">
      <div className="pointer-events-none absolute -top-24 right-10 w-80 h-80 rounded-full bg-[#F57642]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-10 w-80 h-80 rounded-full bg-[#62B44A]/20 blur-3xl" />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl mx-auto space-y-4"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.025em] text-white text-balance">
            The tissue little noses can actually reach.
          </h2>
          <p className="text-white/80 text-base sm:text-lg max-w-lg mx-auto">
            Cleaner sleeves start here — 1 reusable Wipeband + 30 fresh wipes for kids ages 2–6.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-8 flex flex-col items-center space-y-5"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
            {variants.map((v) => {
              const isSelected = selectedPattern === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedPattern(v.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-white text-teal-950 shadow-xs'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: PATTERN_SWATCHES[v.id] || '#62B44A' }}
                  />
                  <span>{v.name}</span>
                </button>
              );
            })}
          </div>

          <Button
            onClick={handleFinalAddToCart}
            variant="primary"
            size="lg"
            className="bg-[#F57642] hover:bg-[#E0632F] text-white border-0 shadow-lg px-8 whitespace-nowrap shrink-0"
          >
            {justAdded ? (
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-5 h-5" /> Added — ${STARTER_KIT_PRODUCT.price.toFixed(2)}
              </span>
            ) : (
              `Add to Cart — $${STARTER_KIT_PRODUCT.price.toFixed(2)}`
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
