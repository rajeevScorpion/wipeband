'use client';

import React from 'react';
import { Shirt, Hand, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export function BenefitRibbon() {
  const comparisons = [
    { item: 'Tissue box?', status: 'Across the room.' },
    { item: 'Tissue pack?', status: 'Somewhere in the backpack.' },
    { item: 'Sleeve?', status: 'Right there.' },
  ];

  const benefits = [
    {
      icon: Shirt,
      title: 'Cleaner',
      description: 'Less wiping on sleeves and clothes.',
    },
    {
      icon: Hand,
      title: 'Independent',
      description: 'A tissue kids can reach for themselves.',
    },
    {
      icon: Compass,
      title: 'Ready',
      description: 'School. Playdates. Travel. Anywhere.',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#F4FAF2] to-[#FAFDF9] border-y border-teal-700/10 py-14 sm:py-20 overflow-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-6 space-y-4"
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-900 tracking-tight text-balance">
              The tissue is far away.{' '}
              <span className="text-green-600">The sleeve isn&apos;t.</span>
            </h2>
            <p className="text-lg sm:text-xl text-ink/85 font-medium">
              Kids don&apos;t stop playing to look for a tissue.
            </p>
            <p className="text-base sm:text-lg font-heading font-bold text-teal-900 pt-1">
              So we put the tissue where kids already reach: their wrist.
            </p>
          </motion.div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {comparisons.map((row, idx) => (
              <motion.div
                key={row.item}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-5 rounded-2xl bg-white border border-teal-700/10 shadow-xs flex flex-col justify-between"
              >
                <span className="text-xs font-heading font-bold text-muted">
                  {row.item}
                </span>
                <p className="mt-2 font-heading font-extrabold text-base sm:text-lg text-teal-900">
                  {row.status}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="pt-10 border-t border-teal-700/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-6 rounded-3xl bg-white border border-teal-700/10 shadow-xs flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-700/10 flex items-center justify-center text-teal-800 shrink-0">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-xl text-teal-900">
                      {b.title}
                    </h3>
                    <p className="mt-1 text-sm sm:text-base text-ink/80 leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
