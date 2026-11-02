'use client';

import React from 'react';
import { motion } from 'motion/react';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';

export function EverydayAdventures() {
  const cards = [
    {
      title: 'School',
      description: 'A tissue right on their wrist during classroom circle time and recess.',
      assetId: '/assets/images/school-classroom.webp',
      alt: 'Children at school wearing Wipeband',
    },
    {
      title: 'Playdates',
      description: 'Ready on the playground or field without pausing the fun.',
      assetId: '/assets/images/playdates-outdoors.webp',
      alt: 'Kids on a playdate outdoors wearing Wipeband',
    },
    {
      title: 'Travel',
      description: 'Easy for car seats, strollers, and flights when bags are stowed away.',
      assetId: '/assets/images/travel-car.webp',
      alt: 'Child traveling with Wipeband on wrist',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FAFCFA] border-b border-border/60 overflow-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-900 tracking-tight text-balance">
              Made for school, playdates, and travel.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-ink/75 leading-relaxed">
              Wipeband in real life: everyday family moments from preschool and sports to road trips and flights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex flex-col rounded-3xl overflow-hidden bg-white border border-border p-4 shadow-xs"
              >
                <PlaceholderMedia
                  assetId={card.assetId}
                  alt={card.alt}
                  aspectRatio="4:3"
                  category="adventure"
                  className="rounded-2xl border border-border/60"
                />

                <div className="pt-4 px-2 pb-1">
                  <h3 className="font-heading font-black text-xl text-teal-900">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink/75 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
