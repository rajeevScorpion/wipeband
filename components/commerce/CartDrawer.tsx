'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/lib/cart';
import { Button } from '@/components/ui/Button';

export function CartDrawer() {
  const { items, removeItem, updateQuantity, subtotal, totalItems, isCartOpen, setIsCartOpen } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setCheckoutMessage(null);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (data.configured && data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutMessage(
          data.message || 'Stripe payments are in scaffold mode. Set STRIPE_SECRET_KEY in .env.local to activate live Stripe Checkout.'
        );
      }
    } catch {
      setCheckoutMessage('Could not initiate checkout session. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-teal-950/40 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-border flex items-center justify-between bg-teal-50/50">
                <h2 className="font-heading font-black text-xl text-teal-900 flex items-center gap-2">
                  Your Cart
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-xs bg-teal-700 text-white px-2.5 py-0.5 rounded-full font-bold shadow-sm"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-muted hover:text-teal-900 rounded-full hover:bg-teal-100/50 transition-colors active:scale-95"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center text-3xl mb-4">
                      🛍️
                    </div>
                    <h3 className="font-heading font-bold text-lg text-teal-900 mb-1">
                      Your cart is empty
                    </h3>
                    <p className="text-sm text-muted mb-6 max-w-xs">
                      Give kids a tissue that is always within reach for school, travel, and play.
                    </p>
                    <Button
                      onClick={() => setIsCartOpen(false)}
                      href="/shop"
                      variant="primary"
                      size="md"
                    >
                      Shop Wipeband
                    </Button>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={`${item.productId}-${item.variantId || 'default'}`}
                      className="flex gap-4 p-4 rounded-2xl border border-border bg-offwhite/50 hover:bg-white transition-all hover:shadow-sm"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-20 rounded-xl bg-white border border-border/80 flex items-center justify-center shrink-0 text-2xl shadow-inner">
                        {item.slug.includes('refill') ? '📦' : '⌚'}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-heading font-bold text-sm text-teal-900 truncate">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.productId, item.variantId)}
                            className="text-muted hover:text-coral-500 p-1 transition-colors active:scale-90"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {item.variantName && (
                          <p className="text-xs text-muted mt-0.5">Style: {item.variantName}</p>
                        )}

                        <div className="flex items-center justify-between mt-3">
                          <span className="font-heading font-bold text-sm text-teal-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>

                          {/* Quantity stepper */}
                          <div className="flex items-center border border-border rounded-full bg-white px-2 py-0.5 shadow-sm">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                              className="p-1 text-muted hover:text-teal-900 transition-colors active:scale-90"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-xs font-bold text-teal-900 min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                              className="p-1 text-muted hover:text-teal-900 transition-colors active:scale-90"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Checkout Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-border bg-teal-50/30 space-y-4">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-muted">
                      <span>Subtotal</span>
                      <span className="font-bold text-teal-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted">
                      <span>Shipping & Taxes</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>

                  {checkoutMessage && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p>{checkoutMessage}</p>
                    </div>
                  )}

                  <Button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="gap-2 shadow-md"
                  >
                    {isCheckingOut ? 'Preparing Checkout...' : 'Checkout'}
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted pt-1">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span>Secure direct checkout · 30-day return policy</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
