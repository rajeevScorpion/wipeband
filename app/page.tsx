import React from 'react';
import { HeroSplit } from '@/components/sections/HeroSplit';
import { WearWipeTear } from '@/components/sections/WearWipeTear';
import { BenefitRibbon } from '@/components/sections/BenefitRibbon';
import { ProductEngineering } from '@/components/sections/ProductEngineering';
import { EverydayAdventures } from '@/components/sections/EverydayAdventures';
import { ProofStorySplit } from '@/components/sections/ProofStorySplit';
import { ChooseWipeband } from '@/components/sections/ChooseWipeband';
import { FaqSection } from '@/components/sections/FaqSection';
import { CleanerSleevesCTA } from '@/components/sections/CleanerSleevesCTA';
import { MobileStickyBar } from '@/components/commerce/MobileStickyBar';

export default function HomePage() {
  return (
    <div className="flex flex-col pb-14 md:pb-0">
      {/* 1. H01 — Hero with silent usage loop slot, ages 2–6, Wear → Wipe → Tear cue, direct pattern & Add to Cart */}
      <HeroSplit />
      {/* 2. H02 — Immediate 3-step explanation (Wear it. Wipe it. Tear it.) */}
      <WearWipeTear />
      {/* 3 & 4. H03 Problem insight + H04 Three consumer benefits (Cleaner / Independent / Ready) */}
      <BenefitRibbon />
      {/* 5. H05 — Six-layer demonstration (One little tissue pack. Six fresh wipes.) */}
      <ProductEngineering />
      {/* 6. H06 — School / Playdates / Travel use cases + Real-life UGC slots */}
      <EverydayAdventures />
      {/* 7. H06 & C23 — Customer reviews + Co-inventor story preview (Sachin & Tiana) */}
      <ProofStorySplit />
      {/* 8 & 9. H07 Dominant Starter Kit purchase module + H08 All 5 approved trust signals */}
      <ChooseWipeband />
      {/* 10. H09 — Objection-driven FAQ */}
      <FaqSection />
      {/* 11. H10 — Final CTA and brand payoff */}
      <CleanerSleevesCTA />
      {/* C18 — Mobile sticky purchase bar */}
      <MobileStickyBar />
    </div>
  );
}
