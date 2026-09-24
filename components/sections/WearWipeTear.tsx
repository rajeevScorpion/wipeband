'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';

export function WearWipeTear() {
  const steps = [
    {
      num: '01',
      title: 'Wear it like a watch.',
      assetId: 'home_howitworks_wear.webp',
      alt: 'Putting Wipeband on wrist like a watch',
    },
    {
      num: '02',
      title: 'Wipe on the soft tissue.',
      assetId: 'home_howitworks_wipe.webp',
      alt: 'Using soft tissue layer on wrist',
    },
    {
      num: '03',
      title: 'Tear off the used layer and bin it.',
      assetId: 'home_howitworks_tear.webp',
      alt: 'Tearing off used tissue layer',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-900 tracking-tight">
              Wear it. Wipe it. Tear it.
            </h2>
          </div>
          <motion.p
            whileHover={{ scale: 1.03 }}
            className="text-sm font-heading font-medium text-teal-700/80 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-700/10 self-start sm:self-auto cursor-default shadow-sm"
          >
            Refill when the pack is used up.
          </motion.p>
        </motion.div>

        {/* 3 Step Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col group cursor-default"
            >
              {/* Media card */}
              <div className="relative">
                <PlaceholderMedia
                  assetId={step.assetId}
                  alt={step.alt}
                  aspectRatio="4:3"
                  category="step"
                  stepNumber={step.num}
                  className="rounded-3xl border border-border shadow-sm group-hover:shadow-xl transition-all duration-300"
                />

                {/* Connecting arrow for desktop */}
                {idx < 2 && (
                  <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-teal-700/15 shadow-md items-center justify-center text-green-600 transition-transform duration-200 group-hover:translate-x-1">
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </div>
                )}
              </div>

              {/* Title under card */}
              <h3 className="mt-4 font-heading font-bold text-lg sm:text-xl text-teal-900 text-center transition-colors group-hover:text-teal-700">
                {step.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
