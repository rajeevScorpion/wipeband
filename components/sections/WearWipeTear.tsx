'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';

export function WearWipeTear() {
  const steps = [
    {
      num: '01',
      title: 'Put Wipeband on like a watch.',
      assetId: 'home_howitworks_wear.webp',
      alt: 'Putting Wipeband on wrist like a watch',
      bgTint: 'bg-[#FFF7EE] border-[#F57642]/20',
    },
    {
      num: '02',
      title: 'Wipe their nose on the soft tissue.',
      assetId: 'home_howitworks_wipe.webp',
      alt: 'Child wiping nose on the soft tissue pad on wrist',
      bgTint: 'bg-[#EEF9F7] border-[#3BA59B]/20',
    },
    {
      num: '03',
      title: 'Peel off the used layer. Fresh underneath.',
      assetId: 'home_howitworks_tear.webp',
      alt: 'Removing and disposing of the used tissue layer to reveal a fresh layer underneath',
      bgTint: 'bg-[#F2FAEE] border-[#62B44A]/20',
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-20 lg:py-24 bg-[#FFFDF9] overflow-hidden scroll-mt-20"
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
            Wear it. <span className="text-[#3BA59B]">Wipe it.</span>{' '}
            <span className="text-[#F57642]">Tear it.</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-teal-950/75 leading-relaxed">
            Six soft tissues stacked in one tiny wrist pack. After a wipe, peel and toss the top layer so a fresh one is immediately ready.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`relative flex flex-col p-4 rounded-[2rem] border ${step.bgTint} transition-transform duration-300 hover:-translate-y-1`}
            >
              <div className="relative">
                <PlaceholderMedia
                  assetId={step.assetId}
                  alt={step.alt}
                  aspectRatio="4:3"
                  category="step"
                  stepNumber={step.num}
                  className="rounded-2xl"
                />

                {idx < 2 && (
                  <div className="hidden md:flex absolute -right-7 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-teal-900/10 shadow-sm items-center justify-center text-[#F57642]">
                    <ArrowRight className="w-5 h-5 stroke-[2.25]" />
                  </div>
                )}
              </div>

              <div className="pt-5 pb-2 px-2">
                <h3 className="font-heading font-bold text-xl text-teal-950 leading-snug">
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
