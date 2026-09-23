import React from 'react';
import type { Metadata } from 'next';
import { CampaignLanding } from '@/components/campaign/CampaignLanding';

export const metadata: Metadata = {
  title: 'Back to School Essential — Wipeband',
  description: 'The smart school supply upgrade: keep tissues right where little students can reach them.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BackToSchoolCampaignPage() {
  return (
    <CampaignLanding
      badge="Back to School Essential"
      headline="The back-to-school essential"
      highlightedText="for cleaner sleeves."
      subheading="Add Wipeband to your school supply list. Help children build independent hygiene habits from day one."
      contextPoints={[
        'Fits comfortably alongside watches and friendship bracelets',
        'Tear-away layers make cleanliness simple and intuitive',
        'Direct website bundles include plenty of classroom refills',
      ]}
      heroAssetId="home_usecase_school.webp"
      heroAssetAlt="Back to school child equipped with Wipeband"
    />
  );
}
