'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WipebandLogo } from '@/components/ui/WipebandLogo';
import { FooterBrandFinish } from '@/components/sections/FooterBrandFinish';
import { SITE_CONFIG } from '@/lib/site';

export function SiteFooter() {
  const isHome = usePathname() === '/';

  return (
    <footer className={isHome ? 'bg-white text-ink' : 'bg-white border-t border-border pt-12 pb-14 text-ink'}>
      {isHome && <FooterBrandFinish />}
      <div className={isHome ? 'relative z-[2] bg-white border-t border-border pt-12 pb-24 md:pb-14 shadow-[0_-9px_18px_-12px_rgba(5,42,48,0.38)]' : ''}>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 pb-6 border-b border-border/60">
          {/* Brand Info */}
          <div className="flex min-w-0 flex-col items-start text-left">
            {isHome ? (
              <Link href="/" aria-label="Wipeband Home" className="inline-flex rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700">
                <Image src="/assets/branding/footer-insignia.webp" alt="" width={48} height={43} />
              </Link>
            ) : <WipebandLogo size="md" />}
            <p className="mt-2 text-xs font-medium text-muted">
              {SITE_CONFIG.legalEntity}
            </p>
            <p className="mt-1 text-xs text-muted max-w-xs">
              {SITE_CONFIG.tagline}
            </p>

            {/* Navigation Links */}
            <nav aria-label="Footer navigation" className="mt-4 grid grid-cols-[repeat(4,max-content)] gap-x-3 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-6 text-xs sm:text-sm font-medium text-ink/80">
              <Link href="/contact" className="hover:text-teal-700 transition-colors">
                Support
              </Link>
              <Link href="/contact" className="hover:text-teal-700 transition-colors">
                Contact
              </Link>
              <Link href="/track-order" className="hover:text-teal-700 transition-colors">
                Track order
              </Link>
              <Link href="/shipping-returns#returns" className="hover:text-teal-700 transition-colors">
                Returns
              </Link>
              <Link href="/privacy-policy" className="hover:text-teal-700 transition-colors">
                Privacy
              </Link>
              <Link href="/terms-conditions" className="hover:text-teal-700 transition-colors">
                Terms
              </Link>
              <Link href="/schools" className="hover:text-teal-700 transition-colors">
                Wholesale
              </Link>
            </nav>
          </div>

          {/* Contact & Copyright */}
          <div className="flex shrink-0 flex-col items-start md:items-end text-left md:text-right text-xs text-muted">
            <a
              href={`mailto:${SITE_CONFIG.supportEmail}`}
              className="text-teal-800 hover:text-teal-700 font-medium hover:underline mb-1"
            >
              {SITE_CONFIG.supportEmail}
            </a>
            <p>© {new Date().getFullYear()} Wipeband. All rights reserved.</p>
            <p className="mt-1 text-[11px] text-muted/70">{SITE_CONFIG.patentNotice}</p>
          </div>
        </div>

        {/* Amazon secondary note as per guidelines */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted/70 gap-2">
          <p>Wipeband direct purchase is our primary store. Amazon orders are fulfilled via Amazon.</p>
          <div className="flex items-center gap-4">
            <Link href="/shop" className="hover:underline">Shop All</Link>
            <Link href="/refills" className="hover:underline">Refills</Link>
            <Link href="/our-story" className="hover:underline">Our Story</Link>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
