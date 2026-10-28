import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'wipeband-starter-kit',
    slug: 'wipeband-starter-kit',
    name: 'Wipeband Starter Kit',
    type: 'starter',
    tagline: '1 reusable Wipeband + 5 tissue packs (30 fresh layers)',
    shortDescription:
      'Meet Wipeband, the wearable tissue for little ones. Soft, refillable tissues worn right on their wrist, so kids ages 2–6 can wipe their nose wherever they are.',
    fullDescription: [
      'Everything they need to start. Designed for kids ages 2–6 for preschool, playdates, travel, and everyday routines.',
      'Includes 1 reusable Wipeband and 5 soft tissue packs (6 layers each, 30 fresh tissue layers total). After a wipe, remove and dispose of the used layer to reveal a fresh one underneath.',
    ],
    price: 19.95,
    currency: 'USD',
    includes: [
      '1 reusable Wipeband',
      '5 tissue packs',
      '30 fresh tissue layers total',
    ],
    features: [
      {
        title: 'Watch-like fit for ages 2–6',
        description: 'Soft, kid-friendly adjustable silicone strap suited for preschool, playdates, and travel.',
      },
      {
        title: 'One little tissue pack. Six fresh wipes.',
        description: 'Six soft tissue layers, ready one after another. Remove the used layer to reveal a fresh one underneath.',
      },
      {
        title: 'Tear-away disposal',
        description: 'The used tissue is removed and disposed of after wiping; children do not keep wearing the used layer.',
      },
      {
        title: 'Refillable and reusable',
        description: 'Keep the band and pop in a fresh tissue pack whenever all six layers are finished.',
      },
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
    status: 'active',
  },
  {
    id: 'tissue-refills',
    slug: 'tissue-refills',
    name: 'Wipeband Tissue Refills',
    type: 'refill',
    tagline: 'Box of 10 soft tissue packs (60 fresh layers)',
    shortDescription:
      'Made to fit every Wipeband. Keep the band and refresh the soft tissues whenever a pack is finished.',
    fullDescription: [
      'Replacement soft tissue packs for families who already own a Wipeband.',
      'Made to fit every Wipeband. Each box includes 10 soft tissue packs with 6 removable layers per pack (60 fresh wipes total).',
    ],
    price: 5.99,
    currency: 'USD',
    includes: [
      '10 soft tissue packs (6 layers each = 60 fresh wipes)',
      'Made to fit every Wipeband strap pattern',
    ],
    features: [
      {
        title: 'Made to fit every Wipeband',
        description: 'Sized to click right into your child’s Wipeband strap.',
      },
      {
        title: 'Six soft layers per pack',
        description: 'Six gentle tissue layers per pack, ready one after another.',
      },
      {
        title: 'Easy backups for busy days',
        description: 'Keep spare packs in backpacks, coat pockets, and the car.',
      },
    ],
    image: '/assets/product/product_refills_hero.webp',
    aspectRatio: '1:1',
    stripePriceEnvKey: 'STRIPE_PRICE_REFILLS',
    amazonUrlEnvKey: 'NEXT_PUBLIC_AMAZON_REFILLS_URL',
    defaultAmazonUrl: 'https://www.amazon.com/dp/B0WIPEREFILL10',
    status: 'active',
  },
  {
    id: 'family-bundle',
    slug: 'family-bundle',
    name: 'Wipeband Family Bundle',
    type: 'bundle',
    tagline: '3 Wipebands + 15 tissue packs',
    shortDescription:
      'Multi-band family bundle (currently unavailable while bundle selection mechanics are finalized).',
    fullDescription: [
      'Includes 3 adjustable Wipebands plus 15 refill tissue packs.',
    ],
    price: 44.95,
    currency: 'USD',
    includes: [
      '3 reusable Wipebands',
      '15 soft tissue refill packs (90 total fresh tissue layers)',
    ],
    features: [],
    variants: [
      { id: 'trio-pack', name: 'All 3 Patterns (Dino, Unicorn, Wonder Wings)', color: '#0A4D57' },
    ],
    image: '/assets/product/product_family-bundle_hero.webp',
    aspectRatio: '1:1',
    stripePriceEnvKey: 'STRIPE_PRICE_FAMILY_BUNDLE',
    status: 'commercial-configuration-required',
  },
];

export const ACTIVE_PRODUCTS: Product[] = PRODUCTS.filter(
  (product) => product.status === 'active'
);

export const STARTER_KIT_PRODUCT: Product = PRODUCTS[0];
export const REFILLS_PRODUCT: Product = PRODUCTS[1];

export function getProductBySlug(slug: string): Product | undefined {
  return ACTIVE_PRODUCTS.find((p) => p.slug === slug);
}
