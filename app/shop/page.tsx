import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Star, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import { Button } from '@/components/ui/Button';
import { CleanerSleevesCTA } from '@/components/sections/CleanerSleevesCTA';

export const metadata: Metadata = {
  title: 'Shop Wipeband — Starter Kit, Family Bundle & Tissue Refills',
  description: 'Shop the Wipeband Starter Kit, Family Bundle and replacement tissue refills. Soft, wearable, and ready for school, travel and play.',
};

export default function ShopPage() {
  const comparison = [
    {
      option: 'Starter Kit',
      bestFor: 'First-time families wanting to try Wipeband',
      bands: '1 Wipeband',
      refills: '5 tissue packs (30 wipes)',
      price: '$19.95',
      href: '/products/wipeband-starter-kit',
    },
    {
      option: 'Family Bundle',
      bestFor: 'Siblings, multiple school bags, or stocking up',
      bands: '3 Wipebands',
      refills: '15 tissue packs (90 wipes)',
      price: '$44.95',
      href: '/products/family-bundle',
    },
    {
      option: 'Tissue Refills',
      bestFor: 'Existing Wipeband owners replenishing tissues',
      bands: 'No (refills only)',
      refills: '10 tissue packs (60 wipes)',
      price: '$5.99',
      href: '/products/tissue-refills',
    },
  ];

  return (
    <div className="bg-white">
      {/* 01. Hero */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#F2FBF9] to-white border-b border-border/60">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-heading font-black tracking-wider uppercase text-green-600 bg-green-50 px-3.5 py-1.5 rounded-full border border-green-200">
            Wipeband Collection
          </span>
          <h1 className="mt-4 font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-teal-900 tracking-tight">
            Find the Wipeband setup that fits your family.
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-ink/80 max-w-2xl mx-auto">
            Start with your first Wipeband, add more for the family, or stock up on replacement tissues.
          </p>
        </div>
      </section>

      {/* 02. Products Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="rounded-3xl p-6 sm:p-8 bg-[#FFFBF4] border border-amber-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
              >
                {prod.badge && (
                  <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-teal-700 text-white font-heading font-black text-xs tracking-wider uppercase shadow-sm">
                    {prod.badge}
                  </span>
                )}

                <div>
                  <h3 className="font-heading font-black text-2xl text-teal-900">
                    {prod.name}
                  </h3>
                  <p className="text-xs font-bold text-green-700 mt-1">
                    {prod.tagline}
                  </p>

                  <div className="mt-4">
                    <span className="text-xs uppercase tracking-wider font-bold text-muted block">
                      Website price
                    </span>
                    <span className="font-heading font-black text-3xl sm:text-4xl text-teal-900">
                      ${prod.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-ink/80 leading-relaxed">
                    {prod.shortDescription}
                  </p>

                  {/* Includes list */}
                  <div className="mt-6 pt-4 border-t border-amber-200/50 space-y-2">
                    <span className="text-xs font-bold text-teal-900 block">
                      What&apos;s included:
                    </span>
                    {prod.includes.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-ink/75">
                        <Check className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <Button
                    href={`/products/${prod.slug}`}
                    variant="primary"
                    size="md"
                    fullWidth
                  >
                    View Details & Buy
                  </Button>
                  {prod.defaultAmazonUrl && (
                    <Button
                      href={prod.defaultAmazonUrl}
                      external
                      variant="amazon"
                      size="sm"
                      fullWidth
                    >
                      Shop on Amazon
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. Comparison Table */}
      <section className="py-16 sm:py-20 bg-[#FAFCFA] border-y border-border">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-teal-900 tracking-tight">
              Compare your options
            </h2>
            <p className="mt-2 text-base text-ink/75">
              Choose the package that aligns with your family routine.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-3xl border border-border shadow-sm overflow-hidden text-left">
              <thead>
                <tr className="bg-teal-50 border-b border-border text-teal-900 font-heading font-extrabold text-sm sm:text-base">
                  <th className="py-4 px-6">Option</th>
                  <th className="py-4 px-6">Best for</th>
                  <th className="py-4 px-6">Wipeband included</th>
                  <th className="py-4 px-6">Refills included</th>
                  <th className="py-4 px-6">Direct Price</th>
                  <th className="py-4 px-6 text-right">Action</th>
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
                    <td className="py-4 px-6 font-bold text-teal-900">{c.price}</td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={c.href}
                        className="inline-flex items-center text-teal-700 hover:text-green-600 font-bold text-xs"
                      >
                        Select <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 04. Parent Reviews */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-teal-900 tracking-tight">
              What families are saying
            </h2>
            <p className="mt-2 text-base text-ink/75">
              Real feedback from parents simplifying their kids&apos; everyday routines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-3xl bg-[#EEF9FA] border border-teal-700/10 shadow-sm">
              <div className="flex gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-base text-teal-950 italic leading-relaxed">
                &ldquo;My 2 yr old literally adores his pretend watch (aka Wipeband). He proudly uses it himself at preschool!&rdquo;
              </p>
              <p className="mt-4 text-xs font-heading font-bold text-muted">
                Henry M. · Verified Customer
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#FFF9EE] border border-amber-200/50 shadow-sm">
              <div className="flex gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-base text-teal-950 italic leading-relaxed">
                &ldquo;Game changer for school and sports. No more gross sleeves after soccer practice or dusty playgrounds.&rdquo;
              </p>
              <p className="mt-4 text-xs font-heading font-bold text-muted">
                Sarah K. · Verified Family Buyer
              </p>
            </div>
          </div>
        </div>
      </section>

      <CleanerSleevesCTA />
    </div>
  );
}
