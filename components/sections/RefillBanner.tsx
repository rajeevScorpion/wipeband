'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function RefillBanner() {
  return (
    <section className="py-8 bg-white overflow-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -3 }}
          className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#EEF7EA] via-[#F5FAF2] to-[#EEF7EA] border border-teal-700/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-300 hover:shadow-md"
        >
          {/* Visual element */}
          <div className="relative flex items-center justify-center shrink-0">
            <div className="relative flex flex-col items-center">
              <span className="absolute -top-3 -left-3 text-green-600 font-bold text-sm">
                \ \ \
              </span>
              <motion.div
                whileHover={{ rotate: [-1, 1, -1, 0] }}
                transition={{ duration: 0.4 }}
                className="w-36 h-20 bg-white rounded-2xl shadow-md border border-teal-700/15 flex flex-col items-center justify-center p-2.5"
              >
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-24 h-2 bg-teal-50 border border-teal-700/20 rounded shadow-sm my-0.5"
                  />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Copy & Link */}
          <div className="text-center md:text-left flex-1 max-w-xl">
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-teal-900 tracking-tight">
              Keep the band. Refresh the tissues.
            </h3>
            <p className="mt-2 text-ink/80 text-base">
              When the pack is used up, replace it with a fresh Wipeband tissue pack.
            </p>
            <div className="mt-4">
              <Link
                href="/refills"
                className="inline-flex items-center text-teal-800 font-heading font-extrabold hover:text-green-600 transition-colors text-base group"
              >
                Shop refills
                <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1.5 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
