import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'wipeband-starter-kit',
    slug: 'wipeband-starter-kit',
    name: 'Wipeband Starter Kit',
    type: 'starter',
    badge: 'BESTSELLER',
    tagline: '1 Wipeband + 5 tissue packs',
    shortDescription: 'A reusable, watch-like band with a layered tissue pad that keeps a tissue right where kids can reach it.',
    fullDescription: [
      'Everything you need to get started with Wipeband. Designed for school, travel, play and everyday routines.',
      'Includes one durable, skin-friendly Wipeband and 5 replaceable 6-layer tissue packs.'
    ],
    price: 19.95,
    currency: 'USD',
    includes: [
      '1 × Reusable Wipeband watch-style wristband',
      '5 × Multi-layer absorbent tissue packs (6 layers each)',
      'Quick-start guide for easy everyday wear and refill'
    ],
    features: [
      { title: 'Watch-like fit', description: 'Comfortable, adjustable strap suited for school, play and travel.' },
      { title: '6-layer absorbent pad', description: 'Six thin layers for everyday wipes. Remove one layer at a time.' },
      { title: 'Tear-away design', description: 'Easy to remove the used layer and reveal the next fresh tissue.' },
      { title: 'Refillable design', description: 'Keep the band forever; pop on a fresh tissue pack when empty.' }
    ],
    variants: [
      { id: 'dinosaur', name: 'Dinosaur', color: '#62B44A' },
      { id: 'unicorn', name: 'Unicorn', color: '#F36F6B' },
      { id: 'wonder-wings', name: 'Wonder Wings', color: '#66C5CD' },
    ],
    image: '/assets/product/product_starter-kit_hero.webp',
    aspectRatio: '1:1',
    stripePriceEnvKey: 'STRIPE_PRICE_STARTER_KIT',
    amazonUrlEnvKey: 'NEXT_PUBLIC_AMAZON_STARTER_KIT_URL',
    defaultAmazonUrl: 'https://www.amazon.com/dp/B0WIPEBAND1',
    status: 'active'
  },
  {
    id: 'tissue-refills',
    slug: 'tissue-refills',
    name: 'Wipeband Tissue Refills',
    type: 'refill',
    tagline: 'Box of 10 tissue packs',
    shortDescription: 'Fresh replacement tissue packs for the Wipeband you already own. Keep the band, refresh the tissues.',
    fullDescription: [
      'Replacement tissue packs for Wipeband families who already own the band.',
      'Each box contains 10 fresh, multi-layer tissue packs engineered to securely snap into your Wipeband.'
    ],
    price: 5.99,
    currency: 'USD',
    includes: [
      '10 × Replacement tissue packs (6 layers each = 60 fresh wipes)',
      'Hygienic storage box to keep packs clean in school bags or glove compartments'
    ],
    features: [
      { title: 'Exact Wipeband fit', description: 'Pre-cut and folded to fit seamlessly into any Wipeband model.' },
      { title: 'Gentle on skin', description: 'Soft, absorbent tissue layers crafted for little faces and sensitive noses.' },
      { title: 'Convenient multi-pack', description: 'Keep backups in classroom backpacks, cars, and bedside tables.' }
    ],
    image: '/assets/product/product_refills_hero.webp',
    aspectRatio: '1:1',
    stripePriceEnvKey: 'STRIPE_PRICE_REFILLS',
    amazonUrlEnvKey: 'NEXT_PUBLIC_AMAZON_REFILLS_URL',
    defaultAmazonUrl: 'https://www.amazon.com/dp/B0WIPEREFILL10',
    status: 'active'
  },
  {
    id: 'family-bundle',
    slug: 'family-bundle',
    name: 'Wipeband Family Bundle',
    type: 'bundle',
    badge: 'FAMILY FAVORITE',
    tagline: '3 Wipebands + 15 tissue packs',
    shortDescription: 'More Wipeband for busy family routines — multiple bands and extra refill tissues in one convenient bundle.',
    fullDescription: [
      'The complete family setup. Perfect for siblings or keeping a spare band in the school bag and the family car.',
      'Includes 3 adjustable Wipebands in choice of patterns plus 15 refill tissue packs.'
    ],
    price: 44.95,
    currency: 'USD',
    includes: [
      '3 × Reusable Wipeband watch-style wristbands (Mix & match patterns)',
      '15 × Multi-layer tissue refill packs (90 total fresh tissue layers)',
      'Special family savings compared to purchasing items separately'
    ],
    features: [
      { title: 'Sibling-ready', description: 'Give each child their own colorful Wipeband to avoid mix-ups.' },
      { title: 'Multiple routines', description: 'Keep one for school, one for weekend sports, and one in the car.' },
      { title: 'Best value', description: 'Stock up on refills from day one with built-in bundle savings.' }
    ],
    variants: [
      { id: 'trio-pack', name: 'All 3 Patterns (Dino, Unicorn, Wonder Wings)', color: '#0A4D57' },
      { id: 'custom-pack', name: 'Custom Mix & Match', color: '#62B44A' }
    ],
    image: '/assets/product/product_family-bundle_hero.webp',
    aspectRatio: '1:1',
    stripePriceEnvKey: 'STRIPE_PRICE_FAMILY_BUNDLE',
    defaultAmazonUrl: 'https://www.amazon.com/dp/B0WIPEBAND3',
    status: 'active'
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}
