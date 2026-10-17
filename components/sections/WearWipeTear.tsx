'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';

export function WearWipeTear() {
  const steps = [
    {
      num: '01',
      label: 'Wear',
      title: 'Put Wipeband on like a watch.',
      assetId: 'home_howitworks_wear.webp',
      alt: 'Putting Wipeband on wrist like a watch',
    },
    {
      num: '02',
      label: 'Wipe',
      title: 'Wipe their nose on the soft tissue.',
      assetId: 'home_howitworks_wipe.webp',
      alt: 'Child wiping nose on the soft tissue pad on wrist',
    },
    {
      num: '03',
      label: 'Tear',
      title: 'Remove the used layer. A fresh one is ready underneath.',
      assetId: 'home_howitworks_tear.webp',
      alt: 'Removing and disposing of the used tissue layer to reveal a fresh layer underneath',
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-14 sm:py-18 lg:py-20 bg-white overflow-hidden scroll-mt-20"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-900 tracking-tight text-balance">
              Wear it. Wipe it. Tear it.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-ink/80 max-w-2xl">
              The used tissue is removed and disposed of after wiping; children do not need to keep wearing the used layer.
            </p>
          </div>
          <p className="text-xs sm:text-sm font-heading font-bold text-teal-800 shrink-0">
            6 fresh layers per pack · Refill in seconds
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative flex flex-col group"
            >
              <div className="relative">
                <PlaceholderMedia
                  assetId={step.assetId}
                  alt={step.alt}
                  aspectRatio="4:3"
                  category="step"
                  stepNumber={step.num}
                  className="rounded-3xl border border-border shadow-sm"
                />

                {idx < 2 && (
                  <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-teal-700/15 shadow-md items-center justify-center text-green-600">
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </div>
                )}
              </div>

              <div className="mt-4 text-center sm:text-left px-1">
                <span className="text-xs font-heading font-bold text-green-700">
                  {step.num}. {step.label}
                </span>
                <h3 className="mt-1 font-heading font-bold text-lg sm:text-xl text-teal-900 leading-snug">
                  {step.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
