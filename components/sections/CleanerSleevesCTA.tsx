'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';

export function CleanerSleevesCTA() {
  return (
    <section className="bg-teal-700 py-16 sm:py-20 lg:py-24 text-white overflow-hidden relative">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Burst decorative marks */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-4 sm:gap-8 mb-6 select-none"
        >
          <motion.div
            animate={{ rotate: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-green-400 font-bold text-2xl sm:text-3xl tracking-widest"
          >
            \ | /
          </motion.div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Cleaner sleeves start here.
          </h2>
          <motion.div
            animate={{ rotate: [4, -4, 4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-green-400 font-bold text-2xl sm:text-3xl tracking-widest"
          >
            \ | /
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-white/85 text-base sm:text-lg max-w-md mx-auto mb-8 font-normal"
        >
          Give kids a tissue that is already right where they naturally reach.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            href="/shop"
            variant="white"
            size="lg"
            className="shadow-lg hover:shadow-2xl"
          >
            Shop Wipeband
          </Button>
          <Button
            href="https://www.amazon.com/dp/placeholder-starter-kit"
            external
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10"
          >
            Shop on Amazon
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
