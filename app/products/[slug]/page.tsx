import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PRODUCTS, getProductBySlug } from '@/lib/products';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';
import { Accordion } from '@/components/ui/Accordion';
import { ProductClientView } from '@/components/commerce/ProductClientView';

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} — Wipeband`,
    description: product.shortDescription,
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const productFaqs = [
    {
      question: 'How do I use Wipeband?',
      answer: 'Wear it like a watch, wipe using the soft tissue layer when needed, then peel off the used layer to reveal the next fresh one.',
    },
    {
      question: 'Can I reuse the band?',
      answer: 'Yes! The band is completely reusable. When the tissue pack runs out, simply pop on a fresh refill pack.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer hassle-free 30-day returns on website orders. If it is not right for your family, return it for a full refund.',
    },
  ];

  return (
    <div className="bg-white py-10 sm:py-16">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-teal-700">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-teal-700">Shop</Link>
          <span>/</span>
          <span className="text-teal-900 font-bold">{product.name}</span>
        </nav>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Gallery / Image Column */}
          <div className="lg:col-span-6 space-y-4">
            <PlaceholderMedia
              assetId={product.image.replace('/assets/', '')}
              alt={product.name}
              aspectRatio="1:1"
              category="product"
              className="shadow-hover rounded-3xl border border-border"
            />

            {/* Thumbnail previews */}
            <div className="grid grid-cols-3 gap-3">
              <PlaceholderMedia
                assetId="product_wrist-fit.webp"
                alt="Wipeband on child wrist"
                aspectRatio="4:3"
                category="lifestyle"
                className="rounded-2xl border"
              />
              <PlaceholderMedia
                assetId="product_exploded-layers.webp"
                alt="Exploded view of tissue layers"
                aspectRatio="4:3"
                category="explainer"
                className="rounded-2xl border"
              />
              <PlaceholderMedia
                assetId="home_howitworks_tear.webp"
                alt="Tear away tissue mechanism"
                aspectRatio="4:3"
                category="step"
                className="rounded-2xl border"
              />
            </div>
          </div>

          {/* Commerce Column */}
          <div className="lg:col-span-6">
            <ProductClientView product={product} />
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-20 pt-16 border-t border-border">
          <h2 className="font-heading text-3xl font-black text-teal-900 tracking-tight text-center mb-12">
            Engineered for Kids & Everyday Life
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.features.map((feat) => (
              <div
                key={feat.title}
                className="p-6 rounded-3xl bg-[#FAFCFA] border border-border shadow-sm"
              >
                <h3 className="font-heading font-bold text-xl text-teal-900">
                  {feat.title}
                </h3>
                <p className="mt-2 text-sm text-ink/75 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-teal-900 tracking-tight text-center mb-8">
            Questions About {product.name}
          </h2>
          <Accordion items={productFaqs} />
        </div>
      </div>
    </div>
  );
}
