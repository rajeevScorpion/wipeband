import type { Metadata } from 'next';
import { Nunito, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { CartDrawer } from '@/components/commerce/CartDrawer';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
  weight: ['400', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Wipeband — Meet Wipeband, the wearable tissue for little ones (ages 2–6)',
  description:
    'No more wiping runny noses on sleeves. Soft, refillable tissues worn right on their wrist, so kids ages 2–6 can wipe their nose wherever they are.',
  openGraph: {
    title: 'Wipeband — No more wiping runny noses on sleeves',
    description:
      'Meet Wipeband, the wearable tissue for little ones. Soft, refillable tissues worn right on their wrist (ages 2–6).',
    siteName: 'Wipeband',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-white text-ink antialiased">
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
