import React from 'react';
import Link from 'next/link';
import { WipebandLogo } from '@/components/ui/WipebandLogo';
import { SITE_CONFIG } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-border pt-12 pb-14 text-ink">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pb-10 border-b border-border/60">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <WipebandLogo size="md" />
            <p className="mt-2 text-xs font-medium text-muted">
              {SITE_CONFIG.legalEntity}
            </p>
            <p className="mt-3 text-xs text-muted max-w-xs">
              {SITE_CONFIG.tagline}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3 text-sm font-medium text-ink/80">
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
          </div>

          {/* Contact & Copyright */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right text-xs text-muted">
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
    </footer>
  );
}
