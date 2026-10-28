import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { ACTIVE_PRODUCTS } from '@/lib/products';
import { SITE_CONFIG } from '@/lib/site';
import { Button } from '@/components/ui/Button';
import { CleanerSleevesCTA } from '@/components/sections/CleanerSleevesCTA';

export const metadata: Metadata = {
  title: 'Shop Wipeband — Starter Kit & Soft Tissue Refills',
  description:
    'Shop the Wipeband Starter Kit ($19.95) for kids ages 2–6 and replacement soft tissue refills. Soft, wearable, and ready for school, playdates, and travel.',
};

export default function ShopPage() {
  const comparison = [
    {
      option: 'Wipeband Starter Kit',
      bestFor: 'First-time families starting with Wipeband (ages 2–6)',
      bands: '1 reusable Wipeband',
      refills: '5 tissue packs (30 fresh layers)',
      price: '$19.95',
      href: '/products/wipeband-starter-kit',
    },
    {
      option: 'Wipeband Tissue Refills',
      bestFor: 'Existing Wipeband families refreshing their soft tissues',
      bands: 'Refills only (made to fit every Wipeband)',
      refills: '10 tissue packs (60 fresh layers)',
      price: '$5.99',
      href: '/products/tissue-refills',
    },
  ];

  return (
    <div className="bg-white">
      {/* 01. Hero */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-[#F2FBF9] to-white border-b border-border/60">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs sm:text-sm font-heading font-bold text-green-700">
            Designed for kids ages 2–6 · Wear → Wipe → Tear
          </p>
          <h1 className="mt-2 font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-teal-900 tracking-tight text-balance">
            Everything they need to start.
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-ink/80 max-w-2xl mx-auto">
            Start with the Wipeband Starter Kit or pick up replacement soft tissue packs for the band you already own.
          </p>
        </div>
      </section>

      {/* 02. Active Products Grid (Starter Kit Dominant + Refills Secondary) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            {ACTIVE_PRODUCTS.map((prod) => {
              const isStarter = prod.type === 'starter';
              return (
                <div
                  key={prod.id}
                  className={`rounded-3xl p-6 sm:p-8 border shadow-xs flex flex-col justify-between ${
                    isStarter
                      ? 'md:col-span-7 bg-[#FFFBF4] border-amber-200/80'
                      : 'md:col-span-5 bg-[#FAFCFA] border-border'
                  }`}
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <div>
                        <span className="text-xs font-heading font-bold text-green-700">
                          {isStarter ? 'Primary Starter Setup' : 'For Existing Owners'}
                        </span>
                        <h2 className="mt-1 font-heading font-black text-2xl sm:text-3xl text-teal-900">
                          {prod.name}
                        </h2>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-heading font-bold text-muted block">
                          Direct Price
                        </span>
                        <span className="font-heading font-black text-3xl text-teal-900 tabular-nums">
                          ${prod.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs font-heading font-bold text-teal-800 mt-2">
                      {prod.tagline}
                    </p>

                    <p className="mt-4 text-sm sm:text-base text-ink/80 leading-relaxed">
                      {prod.shortDescription}
                    </p>

                    {/* Includes list */}
                    <div className="mt-6 pt-4 border-t border-border/70 space-y-2">
                      <span className="text-xs font-heading font-bold text-teal-900 block">
                        What&apos;s included:
                      </span>
                      {prod.includes.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-ink/80">
                          <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    <Button
                      href={`/products/${prod.slug}`}
                      variant={isStarter ? 'primary' : 'secondary'}
                      size="lg"
                      fullWidth
                    >
                      {isStarter
                        ? `Choose Pattern — $${prod.price.toFixed(2)}`
                        : `Shop Refills — $${prod.price.toFixed(2)}`}
                    </Button>
                    {prod.defaultAmazonUrl && (
                      <div className="text-center pt-1">
                        <a
                          href={prod.defaultAmazonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-muted hover:text-teal-800 underline underline-offset-4 transition-colors"
                        >
                          Prefer Amazon? Buy here →
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 5 Trust Signals Strip */}
          <div className="mt-10 p-5 rounded-2xl bg-[#F4FAF6] border border-teal-700/10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-heading font-bold text-teal-900">
            {SITE_CONFIG.trustSignals.map((sig, idx) => (
              <React.Fragment key={sig}>
                <span>{sig}</span>
                {idx < SITE_CONFIG.trustSignals.length - 1 && (
                  <span aria-hidden="true" className="text-teal-700/30">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 03. Comparison Table */}
      <section className="py-16 sm:py-20 bg-[#FAFCFA] border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-teal-900 tracking-tight">
              Starter Kit vs. Tissue Refills
            </h2>
            <p className="mt-2 text-base text-ink/75">
              Start with the band and 5 packs, then refresh the soft tissues whenever needed.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-3xl border border-border shadow-xs overflow-hidden text-left">
              <thead>
                <tr className="bg-teal-50/70 border-b border-border text-teal-900 font-heading font-extrabold text-sm">
                  <th className="py-4 px-6">Option</th>
                  <th className="py-4 px-6">Best for</th>
                  <th className="py-4 px-6">Band included</th>
                  <th className="py-4 px-6">Soft tissues</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6 text-right">Select</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm text-ink/80">
                {comparison.map((c) => (
                  <tr key={c.option} className="hover:bg-offwhite transition-colors">
                    <td className="py-4 px-6 font-heading font-bold text-teal-900">
                      {c.option}
                    </td>
                    <td className="py-4 px-6">{c.bestFor}</td>
                    <td className="py-4 px-6">{c.bands}</td>
                    <td className="py-4 px-6">{c.refills}</td>
                    <td className="py-4 px-6 font-bold text-teal-900 tabular-nums">{c.price}</td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={c.href}
                        className="inline-flex items-center text-teal-700 hover:text-green-600 font-bold text-xs whitespace-nowrap"
                      >
                        View <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 04. Parent Reviews (without unverified badges) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-teal-900 tracking-tight">
              Parents get it. Kids love wearing it.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-[#EEF9FA] border border-teal-700/10 shadow-xs">
              <p className="text-base sm:text-lg text-teal-950 font-serif italic leading-relaxed">
                &ldquo;My 2 yr old literally adores his pretend watch (aka Wipeband).&rdquo;
              </p>
              <p className="mt-4 text-xs font-heading font-bold text-teal-900">
                Henry M. · Parent review on Wipeband.com
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#FFF9EE] border border-amber-200/50 shadow-xs">
              <p className="text-base sm:text-lg text-teal-950 font-serif italic leading-relaxed">
                &ldquo;Game changer for school and sports. No more messy sleeves after soccer practice or playground time.&rdquo;
              </p>
              <p className="mt-4 text-xs font-heading font-bold text-teal-900">
                Sarah K. · Parent review on Wipeband.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <CleanerSleevesCTA />
    </div>
  );
}
