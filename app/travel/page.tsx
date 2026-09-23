import React from 'react';
import type { Metadata } from 'next';
import { CampaignLanding } from '@/components/campaign/CampaignLanding';

export const metadata: Metadata = {
  title: 'Travel & Family Outings — Wipeband',
  description: 'Convenient wrist-worn tissue pack for flights, road trips, theme parks and family adventures.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TravelCampaignPage() {
  return (
    <CampaignLanding
      badge="Travel & Adventure"
      headline="Travel days made easier"
      highlightedText="with tissues on hand."
      subheading="Car rides, airplane seats, theme parks and hikes: keep tissues right where your kids are, without rummaging through packed luggage."
      contextPoints={[
        'Hands-free convenience in crowded transit and airports',
        'Lightweight, skin-friendly silicone band kids love wearing',
        'Easy tear-off means clean hands and spotless jackets on the road',
      ]}
      heroAssetId="home_usecase_travel.webp"
      heroAssetAlt="Family traveling with Wipeband"
    />
  );
}
