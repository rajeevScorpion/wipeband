'use client';

import React from 'react';
import { motion } from 'motion/react';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';

export function EverydayAdventures() {
  const cards = [
    {
      title: 'School',
      description: 'A tissue right on their wrist during classroom circle time and recess.',
      assetId: 'home_usecase_school.webp',
      alt: 'Children at school wearing Wipeband',
    },
    {
      title: 'Playdates',
      description: 'Ready on the playground or field without pausing the fun.',
      assetId: 'home_usecase_playdate.webp',
      alt: 'Kids on a playdate outdoors wearing Wipeband',
    },
    {
      title: 'Travel',
      description: 'Easy for car seats, strollers, and flights when bags are stowed away.',
      assetId: 'home_usecase_travel.webp',
      alt: 'Child traveling with Wipeband on wrist',
    },
  ];

  const ugcSlots = [
    {
      label: 'Preschool',
      caption: 'Morning drop-off & classroom routine',
      assetId: 'ugc_preschool_slot.webp',
    },
    {
      label: 'Soccer',
      caption: 'Sideline & weekend practice moments',
      assetId: 'ugc_soccer_slot.webp',
    },
    {
      label: 'Road trip',
      caption: 'Backseat reach without digging in bags',
      assetId: 'ugc_roadtrip_slot.webp',
    },
    {
      label: 'Airplane',
      caption: 'Carry-on free convenience in the cabin',
      assetId: 'ugc_airplane_slot.webp',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FAFCFA] border-b border-border/60 overflow-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
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

        <div className="pt-10 border-t border-border/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h3 className="font-heading text-2xl sm:text-3xl font-black text-teal-900 tracking-tight">
                Wipeband in real life.
              </h3>
              <p className="mt-1 text-sm sm:text-base text-ink/75">
                Everyday family moments across preschool, sports, road trips, and flights.
              </p>
            </div>
            <span className="text-xs font-medium text-muted">
              Community clips &amp; parent snapshots
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {ugcSlots.map((slot) => (
              <div
                key={slot.label}
                className="rounded-2xl bg-white border border-border p-3 shadow-xs flex flex-col justify-between"
              >
                <PlaceholderMedia
                  assetId={slot.assetId}
                  alt={`${slot.label} — ${slot.caption}`}
                  aspectRatio="4:5"
                  category="ugc"
                  className="rounded-xl"
                />
                <div className="pt-3 px-1">
                  <h4 className="font-heading font-bold text-sm text-teal-900">
                    {slot.label}
                  </h4>
                  <p className="text-xs text-ink/70 mt-0.5">{slot.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
