import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';
import { WearWipeTear } from '@/components/sections/WearWipeTear';
import { ChooseWipeband } from '@/components/sections/ChooseWipeband';
import { CleanerSleevesCTA } from '@/components/sections/CleanerSleevesCTA';
import { STARTER_KIT_PRODUCT } from '@/lib/products';
import { SITE_CONFIG } from '@/lib/site';

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
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs sm:text-sm font-heading font-bold text-green-700">
                {badge} · Designed for kids ages 2–6
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-teal-900 tracking-tight leading-[1.08] text-balance">
                {headline} <br />
                <span className="text-green-600">{highlightedText}</span>
              </h1>
              <p className="text-lg sm:text-xl text-ink/80 max-w-xl leading-relaxed">
                {subheading}
              </p>

              <div className="space-y-2 pt-2">
                {contextPoints.map((pt, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 text-sm text-ink/85 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Button href="#starter-kit" variant="primary" size="lg">
                  Shop Starter Kit — ${STARTER_KIT_PRODUCT.price.toFixed(2)}
                </Button>
                <a
                  href={SITE_CONFIG.amazonStarterKitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-medium text-muted hover:text-teal-800 underline underline-offset-4 transition-colors"
                >
                  Prefer Amazon? Buy here →
                </a>
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
