'use client';

import React from 'react';
import { Shirt, Hand, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export function BenefitRibbon() {
  const comparisons = [
    { item: 'Tissue box?', status: 'Across the room.', tint: 'bg-[#FFF5EC] border-[#F57642]/20' },
    { item: 'Tissue pack?', status: 'In the backpack.', tint: 'bg-[#EEF9F7] border-[#3BA59B]/20' },
    { item: 'Their wrist?', status: 'Always right there.', tint: 'bg-[#EEF9EA] border-[#62B44A]/30' },
  ];

  const benefits = [
    {
      icon: Shirt,
      title: 'Cleaner sleeves',
      description: 'Less wiping runny noses on shirts and jackets.',
      iconBg: 'bg-[#F57642]/12 text-[#F57642]',
    },
    {
      icon: Hand,
      title: 'Kid-independent',
      description: 'A soft tissue little ones can reach all by themselves.',
      iconBg: 'bg-[#3BA59B]/15 text-[#3BA59B]',
    },
    {
      icon: Compass,
      title: 'Ready anywhere',
      description: 'Preschool, playground, car seats, and flights.',
      iconBg: 'bg-[#62B44A]/15 text-[#62B44A]',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#F4FBF8] to-[#FFFDF9] border-y border-teal-900/8 py-16 sm:py-22 overflow-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-6 space-y-3"
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-950 tracking-[-0.025em] text-balance">
              The tissue is far away.{' '}
              <span className="text-[#F57642]">The sleeve isn&apos;t.</span>
            </h2>
            <p className="text-base sm:text-lg text-teal-950/75 leading-relaxed max-w-lg">
              Kids don&apos;t stop playing to hunt for a tissue box — so we put the tissue where they already reach.
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
                className={`p-5 rounded-3xl border ${row.tint} flex flex-col justify-between`}
              >
                <span className="text-sm font-medium text-teal-950/65">
                  {row.item}
                </span>
                <p className="mt-2 font-heading font-bold text-lg text-teal-950">
                  {row.status}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-3xl bg-white border border-teal-900/8 shadow-xs flex items-start gap-4"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${b.iconBg}`}>
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-teal-950">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-base text-teal-950/70 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
