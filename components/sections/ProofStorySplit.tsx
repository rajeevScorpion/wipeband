'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';
import { SITE_CONFIG } from '@/lib/site';

export function ProofStorySplit() {
  const reviews = [
    {
      quote: 'My 2 yr old literally adores his pretend watch (aka Wipeband).',
      author: 'Henry M.',
      context: 'Parent review on Wipeband.com',
      sourceHref: null as string | null,
    },
    {
      quote: 'Game changer for school and sports. No more messy sleeves after soccer practice or playground time.',
      author: 'Sarah K.',
      context: 'Parent review on Wipeband.com',
      sourceHref: null as string | null,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-border/60 overflow-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-[#EEF9FA] border border-teal-700/10 shadow-xs flex flex-col justify-between"
          >
            <div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-teal-900 mb-6">
                Parents get it. Kids love wearing it.
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.author}
                    className="p-5 bg-white rounded-2xl border border-teal-700/10 shadow-xs flex flex-col justify-between"
                  >
                    <p className="font-serif italic text-base sm:text-lg text-teal-950 leading-snug">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted">
                      <span className="font-heading font-bold text-teal-900">
                        {rev.author} · {rev.context}
                      </span>
                      {rev.sourceHref && (
                        <a
                          href={rev.sourceHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-teal-700 hover:underline"
                        >
                          Source <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-teal-700/10 flex flex-wrap items-center justify-between gap-2 text-xs text-ink/75">
              <span>Have a Wipeband story from school, sports, or travel?</span>
              <Link
                href="/feedback"
                className="font-heading font-bold text-teal-800 hover:text-green-600 transition-colors"
              >
                Share your family feedback →
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-[#FFF9EE] border border-amber-200/60 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-heading font-bold text-amber-800">
                    Why we invented Wipeband
                  </span>
                  <h3 className="mt-1 font-heading font-black text-2xl sm:text-3xl text-teal-900 tracking-tight">
                    Co-invented by Sachin &amp; Tiana.
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100/80 border border-amber-300/40 flex items-center justify-center text-amber-600 shrink-0">
                  <Lightbulb className="w-6 h-6" />
                </div>
              </div>

              <p className="mt-4 text-sm sm:text-base text-ink/80 leading-relaxed">
                Wipeband started from a simple family observation: when kids are busy playing or learning, a tissue across the room is too far away — so sleeves take the hit. Co-inventors{' '}
                <strong className="text-teal-900">Sachin Yadav</strong> and{' '}
                <a
                  href={SITE_CONFIG.tianaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-teal-800 underline underline-offset-2 hover:text-green-700"
                >
                  Tiana
                </a>{' '}
                created a wearable tissue band that stays right on a child&apos;s wrist.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <Link
                  href="/our-story"
                  className="inline-flex items-center text-teal-800 font-heading font-extrabold hover:text-green-600 transition-colors text-sm sm:text-base group"
                >
                  Read our story
                  <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-150" />
                </Link>
                <a
                  href={SITE_CONFIG.tianaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-heading font-bold text-ink/70 hover:text-teal-800 transition-colors"
                >
                  Visit Tiana&apos;s website <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-200/50 flex items-center justify-between text-xs text-ink/70">
              <span>Patented wearable tissue design</span>
              <span className="font-heading font-bold text-teal-900">
                {SITE_CONFIG.patentNotice}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
