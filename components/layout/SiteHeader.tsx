'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { WipebandLogo } from '@/components/ui/WipebandLogo';
import { AnnouncementBar } from './AnnouncementBar';
import { SITE_CONFIG } from '@/lib/site';
import { useCart } from '@/lib/cart';

export function SiteHeader() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <AnnouncementBar />
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <WipebandLogo size="md" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {SITE_CONFIG.primaryNav.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium transition-colors hover:text-teal-700 py-1 ${
                    isActive
                      ? 'text-teal-700 font-bold border-b-2 border-teal-700'
                      : 'text-ink/80'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Cart + Mobile toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-teal-800 hover:text-teal-700 rounded-full hover:bg-teal-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-[#62B44A] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm animate-in zoom-in-75">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-teal-800 rounded-lg hover:bg-teal-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {SITE_CONFIG.primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                pathname === link.href
                  ? 'bg-teal-50 text-teal-800 font-bold'
                  : 'text-ink/80 hover:bg-offwhite hover:text-teal-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 rounded-full bg-teal-700 text-white font-heading font-bold shadow-sm"
            >
              Shop Wipeband
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
