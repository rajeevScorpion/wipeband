import React from 'react';
import type { Metadata } from 'next';
import { Lightbulb, ShieldCheck, Heart, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';
import { CleanerSleevesCTA } from '@/components/sections/CleanerSleevesCTA';
import { SITE_CONFIG } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Story — Wipeband',
  description: 'Learn how an everyday parent observation led to the idea behind Wipeband.',
};

export default function OurStoryPage() {
  return (
    <div className="bg-white">
      {/* 01. Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FFF9EE] via-[#FFFDF9] to-white border-b border-border/60">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-heading font-black tracking-wider uppercase text-amber-700 bg-amber-100/70 px-3.5 py-1.5 rounded-full border border-amber-300">
                Created by Parents
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-teal-900 tracking-tight leading-[1.08]">
                A simple idea. <br />
                <span className="text-green-600">A big difference.</span>
              </h1>
              <p className="text-lg sm:text-xl text-ink/80 max-w-xl leading-relaxed">
                Wipeband began with an everyday parent observation: a tissue only helps when a child can actually reach it.
              </p>
              <div className="pt-2">
                <Button href="/shop" variant="primary" size="lg">
                  Shop Wipeband
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <PlaceholderMedia
                assetId="ourstory_hero_parent_child.webp"
                alt="Parents and child talking together about Wipeband"
                aspectRatio="4:3"
                category="story"
                className="shadow-hover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 02. The Everyday Problem */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-teal-900 tracking-tight">
            Little noses do not wait for convenient moments.
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed">
            Kids are busy. They are learning, playing, traveling, running between activities and often thinking about everything except where the tissues are.
          </p>
          <div className="p-6 rounded-2xl bg-offwhite border border-border space-y-3 text-base text-ink/80">
            <p>• A tissue box may be across the room.</p>
            <p>• A tissue packet may be buried in a bag.</p>
            <p>• A sleeve is always close.</p>
          </div>
          <p className="text-lg text-ink/80 leading-relaxed">
            That simple mismatch became the starting point for Wipeband.
          </p>
        </div>
      </section>

      {/* 03. The Idea */}
      <section className="py-16 sm:py-24 bg-[#EEF9FA] border-y border-teal-700/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-teal-700/15 flex items-center justify-center text-teal-800 mx-auto">
            <Lightbulb className="w-7 h-7 text-amber-500" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-900 tracking-tight">
            What if the tissue stayed where the child naturally reaches?
          </h2>
          <p className="text-lg sm:text-xl text-ink/85 leading-relaxed">
            Instead of asking children to stop and search for a tissue, the idea was to move the tissue closer to them: <strong className="text-teal-900 font-extrabold">right onto the wrist.</strong>
          </p>
          <p className="text-base text-ink/75 leading-relaxed max-w-xl mx-auto">
            That became Wipeband: a reusable, watch-like band with a refillable layered tissue pad.
          </p>
        </div>
      </section>

      {/* 04. Why Wipeband Is Different */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-teal-900 tracking-tight">
              Not another tissue box.
            </h2>
            <p className="mt-3 text-lg text-ink/75">
              Wipeband changes the location of the tissue so it is always ready.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#FAFCFA] border border-border">
              <span className="font-heading font-black text-2xl text-green-600 block mb-2">01</span>
              <h3 className="font-heading font-black text-xl text-teal-900 mb-1">Wearable</h3>
              <p className="text-sm text-ink/75">It stays on the wrist where kids naturally reach.</p>
            </div>
            <div className="p-6 rounded-3xl bg-[#FAFCFA] border border-border">
              <span className="font-heading font-black text-2xl text-green-600 block mb-2">02</span>
              <h3 className="font-heading font-black text-xl text-teal-900 mb-1">Refillable</h3>
              <p className="text-sm text-ink/75">Keep the band and replace the tissue pack when finished.</p>
            </div>
            <div className="p-6 rounded-3xl bg-[#FAFCFA] border border-border">
              <span className="font-heading font-black text-2xl text-green-600 block mb-2">03</span>
              <h3 className="font-heading font-black text-xl text-teal-900 mb-1">Simple</h3>
              <p className="text-sm text-ink/75">Wear it. Wipe it. Tear it. Easy enough for toddlers to use.</p>
            </div>
            <div className="p-6 rounded-3xl bg-[#FAFCFA] border border-border">
              <span className="font-heading font-black text-2xl text-green-600 block mb-2">04</span>
              <h3 className="font-heading font-black text-xl text-teal-900 mb-1">Everyday Life</h3>
              <p className="text-sm text-ink/75">School, travel, play and all the little moments between.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 05. Patent & Engineering Note */}
      <section className="py-12 bg-offwhite border-y border-border">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-white border border-teal-700/15 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-800 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-black text-lg text-teal-900">
                  Patented Wearable Tissue Technology
                </h4>
                <p className="text-sm text-ink/75">
                  Wipeband&apos;s functional watch-style tissue dispensing mechanism is backed by official intellectual property.
                </p>
              </div>
            </div>
            <span className="px-4 py-2 rounded-full bg-teal-50 text-teal-900 font-heading font-bold text-sm border border-teal-700/20 shrink-0">
              {SITE_CONFIG.patentNotice}
            </span>
          </div>
        </div>
      </section>

      <CleanerSleevesCTA />
    </div>
  );
}
