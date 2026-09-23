'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/cart';
import { Button } from '@/components/ui/Button';

export function ChooseWipeband() {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState('dinosaur');

  const variants = [
    { id: 'dinosaur', name: 'Dinosaur', icon: '🦕', border: 'border-green-500' },
    { id: 'unicorn', name: 'Unicorn', icon: '🦄', border: 'border-pink-400' },
    { id: 'wonder-wings', name: 'Wonder Wings', icon: '🚀', border: 'border-blue-400' },
  ];

  const handleAddStarterKit = () => {
    const v = variants.find((item) => item.id === selectedVariant);
    addItem({
      productId: 'wipeband-starter-kit',
      slug: 'wipeband-starter-kit',
      name: 'Wipeband Starter Kit',
      price: 19.95,
      image: '/assets/product/product_starter-kit_hero.webp',
      variantId: selectedVariant,
      variantName: v?.name || 'Dinosaur',
    });
  };

  const handleAddRefills = () => {
    addItem({
      productId: 'tissue-refills',
      slug: 'tissue-refills',
      name: 'Wipeband Tissue Refills',
      price: 5.99,
      image: '/assets/product/product_refills_hero.webp',
    });
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-900 tracking-tight text-center mb-12 sm:mb-16">
          Choose your Wipeband
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: Starter Kit */}
          <div className="rounded-3xl p-6 sm:p-8 bg-[#FFFBF4] border border-amber-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-teal-900">
                    Wipeband Starter Kit
                  </h3>
                  <p className="mt-1 text-sm font-medium text-ink/75">
                    1 Wipeband + 5 tissue packs
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="mt-4">
                <span className="text-xs uppercase tracking-wider font-bold text-muted block">
                  Website price
                </span>
                <span className="font-heading font-black text-3xl sm:text-4xl text-teal-900">
                  $19.95
                </span>
              </div>

              {/* Visual Showcase */}
              <div className="my-6 relative py-8 flex items-center justify-center bg-white/70 rounded-2xl border border-amber-200/50">
                <div className="relative flex flex-col items-center">
                  {/* Silicone band with watch pad */}
                  <div className="w-48 h-20 bg-white rounded-2xl shadow-md border-2 border-teal-700/20 flex items-center justify-center p-3">
                    <div className="w-20 h-10 bg-teal-50 rounded-lg border border-teal-700/30 flex items-center justify-center">
                      <span className="text-xs font-heading font-extrabold text-teal-800">WIPEBAND</span>
                    </div>
                  </div>
                  <span className="mt-2 text-[11px] font-mono text-muted">
                    product_starter-kit_hero.webp
                  </span>
                </div>
              </div>

              {/* Pattern Selector */}
              <div className="mb-6">
                <span className="text-xs font-bold text-teal-900 block mb-2.5">
                  Select Strap Pattern:
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {variants.map((v) => {
                    const isSelected = selectedVariant === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v.id)}
                        className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${
                          isSelected
                            ? `${v.border} bg-white shadow-sm ring-1 ring-teal-700/20`
                            : 'border-border/80 bg-white/50 hover:bg-white text-muted'
                        }`}
                      >
                        <span className="text-2xl mb-1">{v.icon}</span>
                        <span className="text-xs font-bold text-teal-900">{v.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Button
                onClick={handleAddStarterKit}
                variant="primary"
                size="md"
                fullWidth
              >
                Buy direct
              </Button>
              <Button
                href="https://www.amazon.com/dp/placeholder-starter-kit"
                external
                variant="amazon"
                size="md"
                fullWidth
              >
                Buy on Amazon
              </Button>
            </div>
          </div>

          {/* Card 2: Tissue Refills */}
          <div className="rounded-3xl p-6 sm:p-8 bg-[#FFFBF4] border border-amber-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-teal-900">
                    Tissue Refills
                  </h3>
                  <p className="mt-1 text-sm font-medium text-ink/75">
                    Box of 10 tissue packs
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="mt-4">
                <span className="text-xs uppercase tracking-wider font-bold text-muted block">
                  Website price
                </span>
                <span className="font-heading font-black text-3xl sm:text-4xl text-teal-900">
                  $5.99
                </span>
              </div>

              {/* Visual Showcase */}
              <div className="my-6 relative py-8 flex items-center justify-center bg-white/70 rounded-2xl border border-amber-200/50">
                <div className="relative flex items-center justify-center gap-4">
                  {/* Green box */}
                  <div className="w-28 h-28 bg-[#18534F] rounded-xl shadow-lg border border-teal-800 p-2.5 flex flex-col justify-between text-white">
                    <span className="text-[10px] font-bold tracking-wider text-green-300">WIPEBAND</span>
                    <span className="text-xs font-extrabold text-center">10 TISSUE PACKS</span>
                    <span className="text-[9px] text-white/70 text-right">REFILLS</span>
                  </div>
                  {/* Tissue stack */}
                  <div className="flex flex-col space-y-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-20 h-2 bg-white rounded border border-teal-700/20 shadow-sm"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6 p-4 rounded-2xl bg-white/60 border border-amber-200/40 text-xs text-ink/75 space-y-1.5">
                <p className="font-bold text-teal-900">What’s in the refill box:</p>
                <p>• 10 pre-folded, multi-layer tissue packs (6 layers each = 60 wipes)</p>
                <p>• Compatible with all Wipeband sizes and editions</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Button
                onClick={handleAddRefills}
                variant="primary"
                size="md"
                fullWidth
              >
                Buy direct
              </Button>
              <Button
                href="https://www.amazon.com/dp/placeholder-refills"
                external
                variant="amazon"
                size="md"
                fullWidth
              >
                Buy on Amazon
              </Button>
            </div>
          </div>
        </div>

        {/* Footnote */}
        <p className="text-center text-xs text-muted mt-6">
          Amazon pricing and availability may differ.
        </p>
      </div>
    </section>
  );
}
