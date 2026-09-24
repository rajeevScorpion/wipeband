'use client';

import React from 'react';
import { motion } from 'motion/react';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';

export function EverydayAdventures() {
  const cards = [
    {
      title: 'School days',
      description: 'Tissues on hand for brighter days at school.',
      assetId: 'home_usecase_school.webp',
      alt: 'Children in classroom with Wipeband',
    },
    {
      title: 'Playdates',
      description: 'Ready for all the fun (and sniffles).',
      assetId: 'home_usecase_playdate.webp',
      alt: 'Kids playing soccer outdoors with Wipeband',
    },
    {
      title: 'Travel days',
      description: 'Convenient for car rides, trips and new places.',
      assetId: 'home_usecase_travel.webp',
      alt: 'Child traveling in car seat with Wipeband',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-900 tracking-tight text-center mb-12 sm:mb-16"
        >
          Made for their everyday adventures.
        </motion.h2>

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
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-3xl overflow-hidden group bg-white cursor-default"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-sm group-hover:shadow-xl transition-shadow duration-300">
                <PlaceholderMedia
                  assetId={card.assetId}
                  alt={card.alt}
                  aspectRatio="4:3"
                  category="adventure"
                  className="rounded-3xl border border-border group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="pt-5 px-1">
                <h3 className="font-heading font-black text-xl text-teal-900 transition-colors group-hover:text-teal-700">
                  {card.title}
                </h3>
                <p className="mt-1 text-sm text-ink/75 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
