import React from 'react';
import type { Metadata } from 'next';
import { CampaignLanding } from '@/components/campaign/CampaignLanding';

export const metadata: Metadata = {
  title: 'Cold & Allergy Season Relief — Wipeband',
  description: 'Gentle, soft wearable tissue pad ready for winter sniffles and spring pollen.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ColdSeasonCampaignPage() {
  return (
    <CampaignLanding
      badge="Cold & Allergy Season"
      headline="Be ready for runny noses"
      highlightedText="before sleeves get messy."
      subheading="When cold weather or allergy season hits, kids need tissues constantly. Wipeband keeps gentle, absorbent tissue layers right on their wrist."
      contextPoints={[
        'Soft, face-gentle tissue paper that will not irritate delicate skin',
        'Tear off and discard immediately for sanitary disposal',
        'Stock up on 10-pack refill boxes to stay prepared all season',
      ]}
      heroAssetId="home_hero_child-using-wipeband_desktop.webp"
      heroAssetAlt="Child using Wipeband during cold season"
    />
  );
}
