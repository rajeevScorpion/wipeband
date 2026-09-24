'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, Smile, Shirt } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';

export function HeroSplit() {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-20 bg-white">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-teal-900 tracking-tight leading-[1.08]">
              No more <br />
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-green-500 inline-block"
              >
                messy sleeves.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-lg sm:text-xl text-ink/80 max-w-lg leading-relaxed font-normal"
            >
              A soft, refillable tissue pad worn like a watch. Ready for school, travel and play.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Button href="/shop" variant="primary" size="md">
                Shop Wipeband
              </Button>
              <Button
                href="https://www.amazon.com/dp/placeholder-starter-kit"
                external
                variant="amazon"
                size="md"
              >
                Shop on Amazon
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <Link
                href="/how-it-works"
                className="inline-flex items-center text-teal-800 font-heading font-bold hover:text-green-600 transition-colors text-sm sm:text-base group"
              >
                See how it works
                <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1.5 transition-transform duration-200" />
              </Link>
            </motion.div>

            {/* 3 Quick Value Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="pt-6 border-t border-border/80 flex items-center gap-6 sm:gap-8"
            >
              <div className="flex items-center gap-2.5 group cursor-default">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 transition-transform duration-200 group-hover:scale-110 shadow-sm">
                  <Shirt className="w-5 h-5" />
                </div>
                <div className="text-xs font-heading font-bold text-teal-900 leading-tight">
                  Cleaner<br />kids
                </div>
              </div>

              <div className="flex items-center gap-2.5 group cursor-default">
                <div className="w-10 h-10 rounded-full bg-coral-50 flex items-center justify-center text-coral-500 transition-transform duration-200 group-hover:scale-110 shadow-sm">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="text-xs font-heading font-bold text-teal-900 leading-tight">
                  Happier<br />parents
                </div>
              </div>

              <div className="flex items-center gap-2.5 group cursor-default">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 transition-transform duration-200 group-hover:scale-110 shadow-sm">
                  <Smile className="w-5 h-5" />
                </div>
                <div className="text-xs font-heading font-bold text-teal-900 leading-tight">
                  Anytime<br />anywhere
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Child Image Placeholder */}
              <PlaceholderMedia
                assetId="home_hero_child-using-wipeband_desktop.webp"
                alt="Child using Wipeband in classroom"
                aspectRatio="16:10"
                category="lifestyle"
                className="shadow-hover rounded-3xl"
              />

              {/* Floating Product Callout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-4 sm:-mt-8 sm:ml-auto max-w-xs relative z-10 bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl border border-teal-700/15 shadow-xl flex items-center gap-3 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="w-16 h-16 rounded-xl bg-teal-50 flex items-center justify-center text-2xl border border-teal-700/10 shrink-0 shadow-inner">
                  ⌚
                </div>
                <div>
                  <div className="flex items-center gap-1 text-green-600 text-xs font-bold">
                    <span>{'///'}</span>
                    <span>A little band for big moments.</span>
                  </div>
                  <p className="text-xs text-ink/75 mt-0.5">
                    Soft, skin-safe silicone strap with quick tear-off tissue pad.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
