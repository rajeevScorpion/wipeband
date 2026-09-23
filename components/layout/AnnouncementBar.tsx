import React from 'react';
import { SITE_CONFIG } from '@/lib/site';

export function AnnouncementBar() {
  return (
    <div className="bg-teal-700 text-white text-xs sm:text-sm font-heading font-medium tracking-wide py-2 px-4 text-center select-none">
      <p>{SITE_CONFIG.announcement}</p>
    </div>
  );
}
