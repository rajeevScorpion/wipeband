'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import heroScene from '@/public/assets/sections/Hero_option_01-wider.png';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/cart';
import { STARTER_KIT_PRODUCT } from '@/lib/products';
import styles from './HeroSplit.module.css';

const PATTERN_SWATCHES: Record<string, string> = {
  dinosaur: '#62B44A',
  unicorn: '#F36F6B',
  'wonder-wings': '#3BA59B',
};

export function HeroSplit() {
  const { selectedPattern, setSelectedPattern, addStarterKit } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleHeroAddToCart = () => {
    addStarterKit(selectedPattern, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <section
      className={styles.hero}
      aria-labelledby="hero-title"
      onPointerMove={(event) => {
        if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--hero-x', `${((event.clientX - rect.left) / rect.width - 0.5) * 12}px`);
        event.currentTarget.style.setProperty('--hero-y', `${((event.clientY - rect.top) / rect.height - 0.5) * 8}px`);
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty('--hero-x', '0px');
        event.currentTarget.style.setProperty('--hero-y', '0px');
      }}
    >
      <div className={styles.scene}>
        <Image
          src={heroScene}
          alt="Child wearing Wipeband on his wrist in a classroom"
          fill
          priority
          sizes="(max-width: 700px) 100vw, (max-width: 1440px) 100vw, 1440px"
          quality={90}
          className={styles.sceneImage}
        />
      </div>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 id="hero-title" className="font-heading">
            No more wiping runny noses{' '}
            <span>on sleeves.</span>
          </h1>
          <p>Meet Wipeband — soft, refillable tissues worn right on their wrist, so little ones can wipe their nose wherever they are.</p>
          <div className={styles.selector} role="group" aria-label="Choose your Wipeband pattern">
            {(STARTER_KIT_PRODUCT.variants || []).map((variant) => (
              <button
                key={variant.id}
                type="button"
                aria-pressed={selectedPattern === variant.id}
                onClick={() => setSelectedPattern(variant.id)}
              >
                <span className={styles.swatch} style={{ backgroundColor: PATTERN_SWATCHES[variant.id] || '#62B44A' }} />
                {variant.name}
              </button>
            ))}
          </div>
          <div className={styles.purchase}>
            <Button onClick={handleHeroAddToCart} variant="primary" size="lg">
              <span className="inline-flex items-center gap-2">
                {justAdded && <Check className="w-5 h-5" />}
                {`${justAdded ? 'Added' : 'Add to Cart'} $${STARTER_KIT_PRODUCT.price.toFixed(2)}`}
              </span>
            </Button>
            <span className="sr-only" role="status">{justAdded ? 'Wipeband added to your bag.' : ''}</span>
          </div>
        </div>
      </div>
      <svg className={styles.wave} viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 70 C280 180 530 120 760 66 S1150 165 1310 80 Q1390 35 1440 48 L1440 200 L0 200 Z" fill="#EEF7EA" />
        <path d="M0 168 Q420 205 760 165 T1440 172 L1440 200 L0 200 Z" fill="#F3FAF0" />
      </svg>
      <div className={styles.productWrap} aria-hidden="true">
        <Image src="/assets/sections/wipeband-transparent.png" alt="" width={440} height={440} sizes="(max-width: 700px) 270px, 440px" className={styles.product} />
      </div>
    </section>
  );
}
