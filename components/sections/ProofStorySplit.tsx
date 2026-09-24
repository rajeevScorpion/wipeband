'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';
import { SITE_CONFIG } from '@/lib/site';

export function ProofStorySplit() {
  return (
    <section className="py-12 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Parent Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="rounded-3xl p-8 sm:p-10 bg-[#EEF9FA] border border-teal-700/10 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg"
          >
            <div>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-teal-900 mb-6">
                Small steps toward independence.
              </h3>
              <div className="p-6 bg-white rounded-2xl border border-teal-700/10 shadow-sm transition-transform duration-200 hover:scale-[1.01]">
                <p className="font-serif italic text-lg sm:text-xl text-teal-950 leading-snug">
                  &ldquo;My 2 yr old literally adores his pretend watch (aka Wipeband).&rdquo;
                </p>
                <p className="mt-3 text-xs sm:text-sm font-heading font-bold text-muted">
                  Henry M. · Parent testimonial on Wipeband.com
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-sm">★</span>
              ))}
              <span className="text-xs font-bold text-teal-900 ml-1">Verified Family</span>
            </div>
          </motion.div>

          {/* Card 2: Our Story & Patent */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -4 }}
            className="rounded-3xl p-8 sm:p-10 bg-[#FFF9EE] border border-amber-200/50 shadow-sm flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-teal-900 tracking-tight">
                    A simple idea. A big difference.
                  </h3>
                  <p className="mt-2 text-ink/80 text-base">
                    Created by parents for everyday family life.
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/our-story"
                      className="inline-flex items-center text-teal-800 font-heading font-extrabold hover:text-green-600 transition-colors text-base group"
                    >
                      Our story
                      <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1.5 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>

                {/* Lightbulb Icon Badge */}
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-14 h-14 rounded-2xl bg-amber-100/80 border border-amber-300/40 flex items-center justify-center text-amber-500 shrink-0 shadow-sm"
                >
                  <Lightbulb className="w-7 h-7" />
                </motion.div>
              </div>
            </div>

            {/* Patent Pill */}
            <div className="mt-8 pt-4 border-t border-amber-200/40">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-amber-200 text-xs font-heading font-bold text-teal-900 shadow-sm">
                {SITE_CONFIG.patentNotice}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
