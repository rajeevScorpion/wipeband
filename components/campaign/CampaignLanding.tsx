import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';
import { WearWipeTear } from '@/components/sections/WearWipeTear';
import { ChooseWipeband } from '@/components/sections/ChooseWipeband';
import { CleanerSleevesCTA } from '@/components/sections/CleanerSleevesCTA';

interface CampaignProps {
  badge: string;
  headline: string;
  highlightedText: string;
  subheading: string;
  contextPoints: string[];
  heroAssetId: string;
  heroAssetAlt: string;
}

export function CampaignLanding({
  badge,
  headline,
  highlightedText,
  subheading,
  contextPoints,
  heroAssetId,
  heroAssetAlt,
}: CampaignProps) {
  return (
    <div className="bg-white">
      {/* Campaign Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#F2FBF9] to-white border-b border-border/60">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-heading font-black tracking-wider uppercase text-green-700 bg-green-100/70 px-3.5 py-1.5 rounded-full border border-green-300">
                {badge}
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-teal-900 tracking-tight leading-[1.08]">
                {headline} <br />
                <span className="text-green-600">{highlightedText}</span>
              </h1>
              <p className="text-lg sm:text-xl text-ink/80 max-w-xl leading-relaxed">
                {subheading}
              </p>

              <div className="space-y-2 pt-2">
                {contextPoints.map((pt, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-ink/85 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button href="/shop" variant="primary" size="lg">
                  Shop Wipeband Starter Kit
                </Button>
                <Button
                  href="https://www.amazon.com/dp/placeholder-starter-kit"
                  external
                  variant="amazon"
                  size="lg"
                >
                  Shop on Amazon
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <PlaceholderMedia
                assetId={heroAssetId}
                alt={heroAssetAlt}
                aspectRatio="4:3"
                category="lifestyle"
                className="shadow-hover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Routine */}
      <WearWipeTear />

      {/* Product Selection */}
      <ChooseWipeband />

      {/* Final Banner */}
      <CleanerSleevesCTA />
    </div>
  );
}
