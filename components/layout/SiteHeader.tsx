'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WipebandLogo } from '@/components/ui/WipebandLogo';
import { AnnouncementBar } from './AnnouncementBar';
import { SITE_CONFIG } from '@/lib/site';
import { useCart } from '@/lib/cart';

export function SiteHeader() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all">
      <AnnouncementBar />
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 transition-transform duration-200 hover:scale-[1.02]">
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
                  className={`text-base font-medium transition-all duration-200 hover:text-teal-700 py-1 relative ${
                    isActive
                      ? 'text-teal-700 font-bold'
                      : 'text-ink/80 hover:-translate-y-0.5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-700 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Cart + Mobile toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-teal-800 hover:text-teal-700 rounded-full hover:bg-teal-50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 active:scale-95"
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <ShoppingCart className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute top-1 right-1 w-5 h-5 bg-[#62B44A] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-teal-800 rounded-lg hover:bg-teal-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 active:scale-95"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-t border-border bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg overflow-hidden"
          >
            {SITE_CONFIG.primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all ${
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
                className="block w-full text-center py-3 rounded-full bg-teal-700 text-white font-heading font-bold shadow-sm hover:bg-teal-800 transition-colors active:scale-[0.98]"
              >
                Shop Wipeband
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
