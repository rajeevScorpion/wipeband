export const SITE_CONFIG = {
  name: 'Wipeband',
  legalEntity: 'Atah Life LLC',
  tagline: 'The tissue little noses can actually reach.',
  announcement: 'Meet Wipeband, the wearable tissue for little ones (ages 2–6).',
  supportEmail: 'support@wipeband.com',
  patentNotice: 'U.S. Patent 12,383,048',
  tianaUrl: 'https://tianaswebsite.com/',
  amazonStarterKitUrl:
    process.env.NEXT_PUBLIC_AMAZON_STARTER_KIT_URL ||
    'https://www.amazon.com/dp/B0WIPEBAND1',
  amazonRefillsUrl:
    process.env.NEXT_PUBLIC_AMAZON_REFILLS_URL ||
    'https://www.amazon.com/dp/B0WIPEREFILL10',
  trustSignals: [
    'Soft, kid-friendly silicone',
    '30-day returns',
    'Secure checkout',
    'Refillable and reusable',
    'Patented design',
  ],
  primaryNav: [
    { label: 'How it works', href: '/how-it-works' },
    { label: 'Shop', href: '/shop' },
    { label: 'Refills', href: '/refills' },
    { label: 'Our story', href: '/our-story' },
    { label: 'FAQ', href: '/faq' },
  ],
  footerNav: {
    shop: [
      { label: 'Wipeband Starter Kit', href: '/products/wipeband-starter-kit' },
      { label: 'Tissue Refills', href: '/products/tissue-refills' },
      { label: 'Shop All', href: '/shop' },
      {
        label: 'Prefer Amazon? Buy here →',
        href: 'https://www.amazon.com/dp/B0WIPEBAND1',
        isExternal: true,
      },
    ],
    help: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Support', href: '/contact' },
      { label: 'Track order', href: '/track-order' },
      { label: 'Shipping & Returns', href: '/shipping-returns' },
    ],
    about: [
      { label: 'Our Story', href: '/our-story' },
      { label: 'Schools & Wholesale', href: '/schools' },
      { label: 'Feedback', href: '/feedback' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-conditions' },
      { label: 'Returns', href: '/shipping-returns#returns' },
    ],
  },
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/wipeband' },
    { label: 'Facebook', href: 'https://facebook.com/wipeband' },
    { label: 'YouTube', href: 'https://youtube.com/@wipeband' },
  ],
};
