'use client';

import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { STARTER_KIT_PRODUCT } from '@/lib/products';

export function MobileStickyBar() {
  const { selectedPattern, setSelectedPattern, addStarterKit, isCartOpen } = useCart();
  const [visible, setVisible] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const variants = STARTER_KIT_PRODUCT.variants || [];

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 480);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible || isCartOpen) return null;

  const handleAdd = () => {
    addStarterKit(selectedPattern, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-teal-700/15 px-3 py-2.5 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        <select
          aria-label="Select Wipeband pattern"
          value={selectedPattern}
          onChange={(e) => setSelectedPattern(e.target.value)}
          className="px-2.5 py-2 rounded-xl border border-teal-700/20 bg-[#F4F8F6] text-xs font-heading font-bold text-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-700 shrink-0"
        >
          {variants.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 py-2.5 px-4 rounded-full bg-teal-700 hover:bg-teal-800 active:scale-[0.98] text-white font-heading font-bold text-xs sm:text-sm text-center shadow-sm transition-all whitespace-nowrap"
        >
          {justAdded ? (
            <span className="inline-flex items-center justify-center gap-1">
              <Check className="w-4 h-4" /> Added — ${STARTER_KIT_PRODUCT.price.toFixed(2)}
            </span>
          ) : (
            `Add to Cart — $${STARTER_KIT_PRODUCT.price.toFixed(2)}`
          )}
        </button>
      </div>
    </div>
  );
}
