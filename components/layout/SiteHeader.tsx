'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WipebandLogo } from '@/components/ui/WipebandLogo';
import { SITE_CONFIG } from '@/lib/site';
import { useCart } from '@/lib/cart';

export function SiteHeader() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/65 backdrop-blur-2xl backdrop-saturate-150 border-b border-teal-900/10 shadow-[0_8px_30px_rgba(10,77,87,0.06)]'
          : 'bg-[#FFFDF9]/80 backdrop-blur-xl border-b border-teal-900/5'
      }`}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Scaled-up Brand Logo */}
          <div className="flex-shrink-0 transition-transform duration-200 hover:scale-[1.02]">
            <WipebandLogo size="md" />
          </div>

          {/* Right Cluster: Apple-style Navigation Links right next to Cart */}
          <div className="flex items-center gap-6 lg:gap-8 ml-auto">
            <nav
              className="hidden md:flex items-center gap-6 lg:gap-7"
              aria-label="Main Navigation"
            >
              {SITE_CONFIG.primaryNav.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[15px] tracking-[-0.01em] transition-colors duration-200 py-1 relative ${
                      isActive
                        ? 'text-teal-950 font-semibold'
                        : 'text-teal-950/70 font-medium hover:text-teal-950'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-teal-700 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:block h-4 w-[1px] bg-teal-900/15" />

            {/* Cart Button + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative inline-flex items-center gap-2 px-3.5 py-2 text-teal-950 hover:text-teal-800 rounded-full bg-teal-900/[0.05] hover:bg-teal-900/[0.09] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 active:scale-95"
                aria-label={`Shopping bag with ${totalItems} items`}
              >
                <ShoppingBag className="w-[19px] h-[19px] stroke-[2]" />
                <span className="text-[14px] font-medium tabular-nums">
                  {totalItems > 0 ? totalItems : 'Bag'}
                </span>
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="w-2 h-2 rounded-full bg-teal-700"
                    />
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 text-teal-950 rounded-full hover:bg-teal-900/5 transition-colors focus:outline-none"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer with frosted glass */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="md:hidden border-t border-teal-900/10 bg-white/90 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-1.5 shadow-xl overflow-hidden"
          >
            {SITE_CONFIG.primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-2xl text-base font-medium transition-all ${
                  pathname === link.href
                    ? 'bg-teal-900/5 text-teal-950 font-semibold'
                    : 'text-teal-950/75 hover:bg-teal-900/5 hover:text-teal-950'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
