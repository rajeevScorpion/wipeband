'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cart';
import { Button } from '@/components/ui/Button';
import { Plus, Minus, ExternalLink, Truck, RotateCcw, Check } from 'lucide-react';

interface Props {
  product: Product;
}

export function ProductClientView({ product }: Props) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0]?.id || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const activeVariant = product.variants?.find((v) => v.id === selectedVariant);

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
    setTimeout(() => setAddedNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        {product.badge && (
          <span className="inline-block px-3 py-1 rounded-full bg-teal-700 text-white font-heading font-black text-xs tracking-wider uppercase mb-3">
            {product.badge}
          </span>
        )}
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-900 tracking-tight">
          {product.name}
        </h1>
        <p className="mt-2 text-base sm:text-lg text-ink/80 leading-relaxed">
          {product.shortDescription}
        </p>
      </div>

      {/* Price */}
      <div className="p-4 rounded-2xl bg-[#FFFBF4] border border-amber-200/50 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-muted block">
            Direct Store Price
          </span>
          <span className="font-heading font-black text-3xl text-teal-900">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <span className="text-xs font-heading font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
          In Stock & Ready to Ship
        </span>
      </div>

      {/* Variant Selector if available */}
      {product.variants && product.variants.length > 0 && (
        <div>
          <span className="text-sm font-bold text-teal-900 block mb-2">
            Select Style / Pattern:
          </span>
          <div className="grid grid-cols-3 gap-3">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariant(v.id)}
                className={`p-3 rounded-2xl border-2 text-left transition-all ${
                  selectedVariant === v.id
                    ? 'border-teal-700 bg-teal-50/50 text-teal-900 font-bold shadow-sm'
                    : 'border-border bg-white text-ink/75 hover:bg-offwhite'
                }`}
              >
                <span className="text-xs block">{v.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Stepper & Add to Cart */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-border rounded-full bg-offwhite px-3 py-2 shadow-sm">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 text-muted hover:text-teal-900 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 font-bold text-teal-900 min-w-[28px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 text-muted hover:text-teal-900 transition-colors"
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
              {addedNotice ? 'Added to Cart ✓' : 'Add to Cart'}
            </Button>
          </div>
        </div>

        {/* Secondary Amazon Link */}
        {product.defaultAmazonUrl && (
          <div className="pt-2 text-center">
            <a
              href={product.defaultAmazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-teal-800 transition-colors"
            >
              <span>Prefer Amazon? Buy on Amazon</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>

      {/* Guarantees */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border text-xs text-ink/75">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-teal-700 shrink-0" />
          <span>Fast U.S. fulfillment</span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-teal-700 shrink-0" />
          <span>30-day money-back guarantee</span>
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
