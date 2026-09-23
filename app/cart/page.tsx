'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag, AlertCircle } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, totalItems } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutNotice, setCheckoutNotice] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setCheckoutNotice(null);

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
        setCheckoutNotice(
          data.message || 'Stripe payments are in scaffold mode. Set STRIPE_SECRET_KEY in environment variables to enable live card checkout.'
        );
      }
    } catch {
      setCheckoutNotice('An error occurred during checkout setup. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-20 sm:py-32 bg-white">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center text-4xl mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-teal-700" />
          </div>
          <h1 className="font-heading text-3xl font-black text-teal-900 mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-base text-ink/75 mb-8">
            Explore Wipeband wearable bands and refill packs for cleaner sleeves and happier routines.
          </p>
          <Button href="/shop" variant="primary" size="lg">
            Shop Wipeband
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-teal-900 tracking-tight mb-8">
          Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="divide-y divide-border border-y border-border">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId || 'default'}`}
                  className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-teal-50 border border-teal-700/10 flex items-center justify-center text-3xl shrink-0">
                      {item.slug.includes('refill') ? '📦' : '⌚'}
                    </div>
                    <div>
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-heading font-black text-lg text-teal-900 hover:text-teal-700 transition-colors"
                      >
                        {item.name}
                      </Link>
                      {item.variantName && (
                        <p className="text-xs text-muted mt-0.5">Style: {item.variantName}</p>
                      )}
                      <p className="text-xs font-mono text-muted mt-1">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Stepper */}
                    <div className="flex items-center border border-border rounded-full bg-offwhite px-3 py-1 shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                        className="p-1 text-muted hover:text-teal-900"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 text-sm font-bold text-teal-900 min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                        className="p-1 text-muted hover:text-teal-900"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Total Price */}
                    <span className="font-heading font-black text-lg text-teal-900 min-w-[70px] text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="text-muted hover:text-coral-500 p-2 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <Button href="/shop" variant="ghost" size="sm">
                ← Continue Shopping
              </Button>
              <button
                onClick={clearCart}
                className="text-xs text-muted hover:text-coral-500 transition-colors font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 bg-[#FAFCFA] p-6 sm:p-8 rounded-3xl border border-border space-y-6">
            <h2 className="font-heading font-black text-xl text-teal-900">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-ink/80">
                <span>Subtotal</span>
                <span className="font-bold text-teal-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted text-xs">
                <span>Shipping estimate</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="pt-3 border-t border-border flex justify-between font-heading font-black text-lg text-teal-900">
                <span>Estimated Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            {checkoutNotice && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>{checkoutNotice}</p>
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
              {isCheckingOut ? 'Setting up Checkout...' : 'Proceed to Checkout'}
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="pt-4 border-t border-border space-y-2 text-xs text-ink/75">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                <span>Encrypted checkout powered by Stripe</span>
              </div>
              <p className="text-muted">
                Free standard returns within 30 days of direct purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
