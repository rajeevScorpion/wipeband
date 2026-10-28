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
import { Button } from '@/components/ui/Button';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';

export function ChooseWipeband() {
  const { selectedPattern, setSelectedPattern, addStarterKit } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const variants = [
    { id: 'dinosaur', name: 'Dinosaur', swatch: '#62B44A' },
    { id: 'unicorn', name: 'Unicorn', swatch: '#F36F6B' },
    { id: 'wonder-wings', name: 'Wonder Wings', swatch: '#3BA59B' },
  ];

  const trustItems = [
    { icon: HeartHandshake, label: 'Soft silicone' },
    { icon: RotateCcw, label: '30-day returns' },
    { icon: ShieldCheck, label: 'Secure checkout' },
    { icon: RefreshCw, label: 'Refillable' },
    { icon: Award, label: 'Patented design' },
  ];

  const handleAddStarterKit = () => {
    addStarterKit(selectedPattern, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <section
      id="starter-kit"
      className="py-16 sm:py-20 lg:py-24 bg-[#FFFDF9] border-b border-teal-900/8 overflow-hidden scroll-mt-20"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-950 tracking-[-0.025em] text-balance">
            Everything they need to <span className="text-teal-700">start.</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-teal-950/75">
            One reusable Wipeband and five 6-layer soft tissue packs (30 fresh wipes total).
          </p>
        </motion.div>

        <div className="rounded-[2.25rem] p-6 sm:p-10 bg-gradient-to-br from-[#FFF7EC] via-[#FFFDF9] to-[#EEF9F5] border border-teal-900/10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <PlaceholderMedia
                assetId="product_starter-kit_hero.webp"
                alt="Wipeband Starter Kit — 1 reusable Wipeband and 5 soft tissue packs"
                aspectRatio="1:1"
                category="product"
                className="rounded-3xl border border-teal-900/10 shadow-xs"
              />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-teal-900/10 pb-5">
                <div>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-teal-950">
                    {STARTER_KIT_PRODUCT.name}
                  </h3>
                  <p className="mt-1 text-base text-teal-950/70">
                    Designed for kids ages 2–6
                  </p>
                </div>
                <span className="font-heading font-black text-3xl sm:text-4xl text-teal-950 tabular-nums">
                  ${STARTER_KIT_PRODUCT.price.toFixed(2)}
                </span>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {STARTER_KIT_PRODUCT.includes.map((inc) => (
                  <li
                    key={inc}
                    className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-teal-900/8 text-sm font-medium text-teal-950"
                  >
                    <Check className="w-4 h-4 text-[#62B44A] shrink-0" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-3 gap-3">
                {variants.map((v) => {
                  const isSelected = selectedPattern === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedPattern(v.id)}
                      className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl border transition-all cursor-pointer whitespace-nowrap shrink-0 text-sm font-medium ${
                        isSelected
                          ? 'border-teal-950 bg-teal-950 text-white shadow-xs'
                          : 'border-teal-900/12 bg-white hover:bg-teal-900/5 text-teal-950/80'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: v.swatch }}
                      />
                      <span>{v.name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-4 pt-1">
                <Button
                  onClick={handleAddStarterKit}
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  {justAdded ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="w-5 h-5" /> Added to Cart — ${STARTER_KIT_PRODUCT.price.toFixed(2)}
                    </span>
                  ) : (
                    `Add to Cart — $${STARTER_KIT_PRODUCT.price.toFixed(2)}`
                  )}
                </Button>

                <div className="flex items-center justify-center pt-1 text-sm">
                  <Link
                    href="/refills"
                    className="inline-flex items-center font-medium text-teal-950/75 hover:text-teal-950 transition-colors"
                  >
                    Already have Wipeband? Shop refills (${REFILLS_PRODUCT.price.toFixed(2)})
                    <ArrowRight className="w-4 h-4 ml-1.5 text-teal-700" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-teal-900/10">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="inline-flex items-center gap-2 text-sm font-medium text-teal-950/75"
                  >
                    <Icon className="w-4 h-4 text-[#3BA59B] shrink-0" />
                    <span>{item.label}</span>
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
