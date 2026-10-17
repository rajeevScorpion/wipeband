'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cart';
import { SITE_CONFIG } from '@/lib/site';
import { Button } from '@/components/ui/Button';
import {
  Plus,
  Minus,
  RotateCcw,
  Check,
  ShieldCheck,
  RefreshCw,
  Award,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';

interface Props {
  product: Product;
}

export function ProductClientView({ product }: Props) {
  const { addItem, selectedPattern, setSelectedPattern } = useCart();
  const [localVariant, setLocalVariant] = useState(
    product.variants?.[0]?.id || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const effectiveVariantId =
    product.type === 'starter' ? selectedPattern || localVariant : localVariant;
  const activeVariant = product.variants?.find(
    (v) => v.id === effectiveVariantId
  );

  const handleVariantChange = (variantId: string) => {
    setLocalVariant(variantId);
    if (product.type === 'starter') {
      setSelectedPattern(variantId);
    }
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      variantId: activeVariant?.id,
      variantName: activeVariant?.name,
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const trustSignals = [
    { icon: HeartHandshake, label: 'Soft, kid-friendly silicone' },
    { icon: RotateCcw, label: '30-day returns' },
    { icon: ShieldCheck, label: 'Secure checkout' },
    { icon: RefreshCw, label: 'Refillable and reusable' },
    { icon: Award, label: `Patented design (${SITE_CONFIG.patentNotice})` },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs sm:text-sm font-heading font-bold text-green-700 mb-1">
          Designed for kids ages 2–6 · Wear → Wipe → Tear
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-900 tracking-tight">
          {product.name}
        </h1>
        <p className="mt-2 text-base sm:text-lg text-ink/80 leading-relaxed">
          {product.shortDescription}
        </p>
      </div>

      {/* Price */}
      <div className="p-4 rounded-2xl bg-[#FFFBF4] border border-amber-200/60 flex items-center justify-between">
        <div>
          <span className="text-xs font-heading font-bold text-muted block">
            Direct Store Price
          </span>
          <span className="font-heading font-black text-3xl text-teal-900 tabular-nums">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <span className="text-xs font-heading font-bold text-green-700">
          {product.tagline}
        </span>
      </div>

      {/* Variant Selector if available */}
      {product.variants && product.variants.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-heading font-bold text-teal-900">
              Choose a pattern:
            </span>
            <span className="text-xs font-semibold text-green-700">
              {activeVariant?.name}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.variants.map((v) => {
              const isSelected = effectiveVariantId === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => handleVariantChange(v.id)}
                  className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'border-teal-700 bg-teal-50/50 text-teal-900 font-bold shadow-xs'
                      : 'border-border bg-white text-ink/75 hover:bg-offwhite'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-heading font-bold block">
                    {v.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity Stepper & Add to Cart */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-border rounded-full bg-offwhite px-3 py-2 shadow-xs">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 text-muted hover:text-teal-900 transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 font-bold text-teal-900 min-w-[28px] text-center tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 text-muted hover:text-teal-900 transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1">
            <Button
              onClick={handleAddToCart}
              variant="primary"
              size="lg"
              fullWidth
              className="shadow-md"
            >
              {addedNotice
                ? `Added to Cart — $${(product.price * quantity).toFixed(2)}`
                : `Add to Cart — $${(product.price * quantity).toFixed(2)}`}
            </Button>
          </div>
        </div>

        {/* Cross-link & Tertiary Amazon Link */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          {product.type === 'starter' ? (
            <Link
              href="/refills"
              className="inline-flex items-center font-heading font-bold text-teal-800 hover:text-green-600 transition-colors"
            >
              Already have Wipeband? Shop refills <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          ) : (
            <Link
              href="/products/wipeband-starter-kit"
              className="inline-flex items-center font-heading font-bold text-teal-800 hover:text-green-600 transition-colors"
            >
              Need the wristband? Shop Starter Kit <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          )}

          {product.defaultAmazonUrl && (
            <a
              href={product.defaultAmazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-muted hover:text-teal-800 underline underline-offset-4 transition-colors"
            >
              Prefer Amazon? Buy here →
            </a>
          )}
        </div>
      </div>

      {/* All 5 Approved Trust Signals Beside Checkout */}
      <div className="pt-4 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-ink/80">
          {trustSignals.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-teal-700 shrink-0" />
                <span className="font-medium">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* What's Included */}
      <div className="pt-4 border-t border-border">
        <h3 className="font-heading font-black text-base text-teal-900 mb-3">
          What&apos;s Included:
        </h3>
        <ul className="space-y-2">
          {product.includes.map((inc, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-ink/80">
              <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
              <span>{inc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
