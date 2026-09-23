export interface ProductVariant {
  id: string;
  name: string;
  color?: string;
  patternPreview?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  type: 'starter' | 'bundle' | 'refill';
  badge?: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string[];
  price: number;
  currency: string;
  includes: string[];
  features: { title: string; description: string }[];
  variants?: ProductVariant[];
  image: string;
  aspectRatio?: string;
  amazonUrlEnvKey?: string;
  stripePriceEnvKey?: string;
  defaultAmazonUrl?: string;
  status: 'active' | 'commercial-details-required' | 'commercial-configuration-required';
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variantId?: string;
  variantName?: string;
}
