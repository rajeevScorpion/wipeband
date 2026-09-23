import React from 'react';
import { HeroSplit } from '@/components/sections/HeroSplit';
import { BenefitRibbon } from '@/components/sections/BenefitRibbon';
import { WearWipeTear } from '@/components/sections/WearWipeTear';
import { ProductEngineering } from '@/components/sections/ProductEngineering';
import { EverydayAdventures } from '@/components/sections/EverydayAdventures';
import { ChooseWipeband } from '@/components/sections/ChooseWipeband';
import { RefillBanner } from '@/components/sections/RefillBanner';
import { ProofStorySplit } from '@/components/sections/ProofStorySplit';
import { FaqSection } from '@/components/sections/FaqSection';
import { CleanerSleevesCTA } from '@/components/sections/CleanerSleevesCTA';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSplit />
      <BenefitRibbon />
      <WearWipeTear />
      <ProductEngineering />
      <EverydayAdventures />
      <ChooseWipeband />
      <RefillBanner />
      <ProofStorySplit />
      <FaqSection />
      <CleanerSleevesCTA />
    </div>
  );
}
