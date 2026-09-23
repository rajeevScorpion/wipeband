import React from 'react';
import type { Metadata } from 'next';
import { CampaignLanding } from '@/components/campaign/CampaignLanding';

export const metadata: Metadata = {
  title: 'School Days Ready — Wipeband',
  description: 'Keep tissues on hand for cleaner, happier days at school and preschool.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SchoolCampaignPage() {
  return (
    <CampaignLanding
      badge="Classroom & School Ready"
      headline="Cleaner days at school"
      highlightedText="start right on their wrist."
      subheading="No more interrupting circle time, digging into backpacks, or wiping sniffles on uniform sleeves."
      contextPoints={[
        'Teacher-approved independent routine for ages 2+',
        '6 soft tissue layers ready for everyday sniffles',
        'Reusable silicone band withstands playground play and recess',
      ]}
      heroAssetId="home_usecase_school.webp"
      heroAssetAlt="Child using Wipeband at classroom desk"
    />
  );
}
