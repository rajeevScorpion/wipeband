import React from 'react';
import type { Metadata } from 'next';
import { Lightbulb, Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';
import { CleanerSleevesCTA } from '@/components/sections/CleanerSleevesCTA';
import { SITE_CONFIG } from '@/lib/site';
import { STARTER_KIT_PRODUCT } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Our Story — Why Sachin & Tiana Invented Wipeband',
  description:
    'Learn how co-inventors Sachin Yadav and Tiana created Wipeband so kids ages 2–6 always have a soft tissue right on their wrist.',
};

export default function OurStoryPage() {
  return (
    <div className="bg-white">
      {/* 01. Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FFF9EE] via-[#FFFDF9] to-white border-b border-border/60">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs sm:text-sm font-heading font-bold text-amber-800">
                Why we invented Wipeband · Co-invented by Sachin &amp; Tiana
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-teal-900 tracking-tight leading-[1.08] text-balance">
                The tissue little noses can actually reach.
              </h1>
              <p className="text-lg sm:text-xl text-ink/80 max-w-xl leading-relaxed">
                Wipeband began with an everyday family observation: a tissue only helps when a child can actually reach it in the moment.
              </p>
              <div className="pt-2">
                <Button href="/products/wipeband-starter-kit" variant="primary" size="lg">
                  Shop Starter Kit — ${STARTER_KIT_PRODUCT.price.toFixed(2)}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <PlaceholderMedia
                assetId="ourstory_hero_parent_child.webp"
                alt="Parent and child wearing Wipeband together"
                aspectRatio="4:3"
                category="story"
                className="shadow-hover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 02. Why We Invented Wipeband (Sachin & Tiana Co-Inventors) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-teal-900 tracking-tight">
            Why we invented Wipeband
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed">
            When kids are in the middle of playing, learning at preschool, or riding in the backseat, they don&apos;t pause what they&apos;re doing to go hunt for a tissue box.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
            <div className="p-5 rounded-2xl bg-[#FAFCFA] border border-border">
              <span className="text-xs font-heading font-bold text-muted">Tissue box?</span>
              <p className="mt-1 font-heading font-extrabold text-base text-teal-900">
                Across the room.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#FAFCFA] border border-border">
              <span className="text-xs font-heading font-bold text-muted">Tissue pack?</span>
              <p className="mt-1 font-heading font-extrabold text-base text-teal-900">
                Somewhere in the backpack.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#FAFCFA] border border-border">
              <span className="text-xs font-heading font-bold text-muted">Sleeve?</span>
              <p className="mt-1 font-heading font-extrabold text-base text-teal-900">
                Right there.
              </p>
            </div>
          </div>

          <p className="text-lg text-ink/80 leading-relaxed">
            Seeing how naturally children reach for their own wrist or sleeve when their nose runs inspired co-inventors{' '}
            <strong className="text-teal-900 font-extrabold">Sachin Yadav</strong> and{' '}
            <a
              href={SITE_CONFIG.tianaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading font-extrabold text-teal-800 underline underline-offset-4 hover:text-green-700 inline-flex items-center gap-1"
            >
              <span>Tiana</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>{' '}
            to rethink where the tissue lives. Instead of asking young children (ages 2–6) to stop and search for a tissue, they placed a soft, 6-layer tear-away tissue pad right on a comfortable, watch-like wristband.
          </p>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#FFF9EE] border border-amber-200/70 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-heading font-black text-xl text-teal-900">
                Meet the Co-Inventors: Sachin &amp; Tiana
              </h3>
              <a
                href={SITE_CONFIG.tianaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-teal-800 hover:text-green-700 underline underline-offset-4"
              >
                Visit Tiana&apos;s Website (tianaswebsite.com)
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-sm sm:text-base text-ink/80 leading-relaxed">
              Together, Sachin and Tiana turned a simple family observation into a practical everyday wearable for little ones — helping children wipe their own nose with a soft tissue and tear away the used layer to reveal a fresh one underneath.
            </p>
          </div>
        </div>
      </section>

      {/* 03. The Core Idea */}
      <section className="py-16 sm:py-24 bg-[#EEF9FA] border-y border-teal-700/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-teal-700/15 flex items-center justify-center text-teal-800 mx-auto">
            <Lightbulb className="w-7 h-7 text-amber-500" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-900 tracking-tight text-balance">
            So we put the tissue where kids already reach: their wrist.
          </h2>
          <p className="text-base sm:text-lg text-ink/80 leading-relaxed max-w-xl mx-auto">
            Wear it like a watch. Wipe their nose on the soft tissue. Tear off and dispose of the used layer so a fresh one is ready underneath.
          </p>
        </div>
      </section>

      {/* 04. Why Wipeband Works for Families */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#FAFCFA] border border-border">
              <span className="font-heading font-black text-xl text-green-600 block mb-2">01. Wearable</span>
              <h3 className="font-heading font-black text-lg text-teal-900 mb-1">Right on their wrist</h3>
              <p className="text-sm text-ink/75">Designed for kids ages 2–6 so a soft tissue is always within reach.</p>
            </div>
            <div className="p-6 rounded-3xl bg-[#FAFCFA] border border-border">
              <span className="font-heading font-black text-xl text-green-600 block mb-2">02. Six Layers</span>
              <h3 className="font-heading font-black text-lg text-teal-900 mb-1">Peel &amp; dispose</h3>
              <p className="text-sm text-ink/75">Remove and bin the used tissue layer after wiping to reveal a fresh one underneath.</p>
            </div>
            <div className="p-6 rounded-3xl bg-[#FAFCFA] border border-border">
              <span className="font-heading font-black text-xl text-green-600 block mb-2">03. Refillable</span>
              <h3 className="font-heading font-black text-lg text-teal-900 mb-1">Keep the band</h3>
              <p className="text-sm text-ink/75">Reuse the soft silicone wristband and pop in a fresh 6-layer tissue pack when empty.</p>
            </div>
            <div className="p-6 rounded-3xl bg-[#FAFCFA] border border-border">
              <span className="font-heading font-black text-xl text-green-600 block mb-2">04. Ready</span>
              <h3 className="font-heading font-black text-lg text-teal-900 mb-1">School, play &amp; travel</h3>
              <p className="text-sm text-ink/75">Built for preschool drop-offs, soccer fields, playdates, and family trips.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 05. Calm Patent Note */}
      <section className="py-12 bg-offwhite border-t border-border">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-teal-700/15 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-800 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-black text-lg text-teal-900">
                  Patented Wearable Tissue Design
                </h4>
                <p className="text-sm text-ink/75">
                  Co-invented by Sachin Yadav and Tiana · Protected by {SITE_CONFIG.patentNotice}.
                </p>
              </div>
            </div>
            <span className="text-xs font-heading font-bold text-teal-900 shrink-0">
              {SITE_CONFIG.patentNotice}
            </span>
          </div>
        </div>
      </section>

      <CleanerSleevesCTA />
    </div>
  );
}
