'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Check, ShieldCheck, RotateCcw, RefreshCw, Award, HeartHandshake, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { STARTER_KIT_PRODUCT, REFILLS_PRODUCT } from '@/lib/products';
import { Button } from '@/components/ui/Button';
import styles from './ChooseWipeband.module.css';

export function ChooseWipeband() {
  const { selectedPattern, setSelectedPattern, addStarterKit } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const lensRef = useRef<HTMLSpanElement>(null);
  const point = useRef({ x: 0, y: 0 });
  const activeTouch = useRef(false);
  const variants = STARTER_KIT_PRODUCT.variants || [];
  const selected = variants.find((variant) => variant.id === selectedPattern) || variants[0];
  const trustItems = [
    { icon: HeartHandshake, label: 'Soft silicone' },
    { icon: RotateCcw, label: '30-day returns' },
    { icon: ShieldCheck, label: 'Secure checkout' },
    { icon: RefreshCw, label: 'Refillable' },
    { icon: Award, label: 'Patented design' },
  ];

  const showLens = (px: number, py: number) => {
    const preview = previewRef.current, image = imageRef.current, lens = lensRef.current;
    if (!preview || !image || !lens) return;
    const bounds = preview.getBoundingClientRect();
    const x = Math.max(0, Math.min(bounds.width, px));
    const y = Math.max(0, Math.min(bounds.height, py));
    point.current = { x, y };
    const scale = Math.max(bounds.width / (image.naturalWidth || 1), bounds.height / (image.naturalHeight || 1));
    const width = (image.naturalWidth || 1) * scale, height = (image.naturalHeight || 1) * scale;
    const offsetX = (bounds.width - width) / 2, offsetY = (bounds.height - height) / 2;
    const zoom = 2.3, radius = lens.offsetWidth / 2;
    lens.style.left = `${x}px`;
    lens.style.top = `${y}px`;
    lens.style.backgroundImage = `url("${image.currentSrc || image.src}")`;
    lens.style.backgroundSize = `${width * zoom}px ${height * zoom}px`;
    lens.style.backgroundPosition = `${radius - (x - offsetX) * zoom}px ${radius - (y - offsetY) * zoom}px`;
    lens.style.opacity = '1';
  };
  const hideLens = () => { if (lensRef.current) lensRef.current.style.opacity = '0'; };
  const showPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    showLens(event.clientX - bounds.left, event.clientY - bounds.top);
  };

  return (
    <section id="starter-kit" className="py-16 sm:py-20 lg:py-24 bg-[#FFFDF9] border-b border-teal-900/8 overflow-hidden scroll-mt-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45 }} className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-950 tracking-[-0.025em] text-balance">Everything they need to <span className="text-teal-700">start.</span></h2>
          <p className="mt-3 text-base sm:text-lg text-teal-950/75">One reusable Wipeband and five 6-layer soft tissue packs (30 fresh wipes total).</p>
        </motion.div>
        <div className={styles.card}>
          <div className={styles.layout}>
            <div className={styles.visual}>
              <Image src={STARTER_KIT_PRODUCT.image} alt="Representative rendering of the Wipeband Starter Kit packaging" width={1024} height={1024} sizes="(max-width: 1023px) 460px, 40vw" className={styles.packageImage} />
              <p className={styles.caption}>Kit packaging - representative render</p>
            </div>
            <div>
              <div className={styles.heading}>
                <div><h3 className="font-heading">{STARTER_KIT_PRODUCT.name}</h3><p className={styles.age}>Designed for kids ages 2–6</p></div>
                <div className={`${styles.price} font-heading`}>
                  {STARTER_KIT_PRODUCT.compareAtPrice && STARTER_KIT_PRODUCT.compareAtPrice > STARTER_KIT_PRODUCT.price && <div className={styles.priceTop}><s><span className="sr-only">Regular price </span>${STARTER_KIT_PRODUCT.compareAtPrice.toFixed(2)}</s><span className={styles.saleTag}>Sale</span></div>}
                  <span className="sr-only">Current price </span>${STARTER_KIT_PRODUCT.price.toFixed(2)}
                </div>
              </div>
              <p className={styles.description}>A reusable wristband with soft tissues ready when little noses need them.</p>
              <ul className={styles.includes}><li><Check />1 reusable Wipeband</li><li><Check />5 tissue packs</li><li><Check />6 layers each - 30 fresh wipes total</li></ul>
              <p className={styles.label}>Choose a design</p>
              <div className={styles.picker}>
                <div ref={previewRef} className={styles.preview} tabIndex={0} aria-label="Magnify selected design: hover, touch and hold, or use arrow keys"
                  onPointerMove={(event) => { if (event.pointerType !== 'touch' || activeTouch.current) showPointer(event); }}
                  onPointerDown={(event) => { if (event.pointerType === 'touch') { activeTouch.current = true; showPointer(event); } }}
                  onPointerUp={(event) => { if (event.pointerType === 'touch') { activeTouch.current = false; hideLens(); } }}
                  onPointerCancel={() => { activeTouch.current = false; hideLens(); }}
                  onPointerLeave={() => { activeTouch.current = false; hideLens(); }}
                  onFocus={(event) => { const box = event.currentTarget.getBoundingClientRect(); showLens(box.width / 2, box.height / 2); }}
                  onBlur={hideLens}
                  onKeyDown={(event) => { const moves: Record<string, [number, number]> = { ArrowLeft: [-20, 0], ArrowRight: [20, 0], ArrowUp: [0, -20], ArrowDown: [0, 20] }; const move = moves[event.key]; if (move) { event.preventDefault(); showLens(point.current.x + move[0], point.current.y + move[1]); } }}>
                  {selected?.patternPreview && <Image ref={imageRef} src={selected.patternPreview} alt={`${selected.name} Wipeband design`} width={1200} height={1200} sizes="(max-width: 480px) 40vw, 240px" className={styles.previewImage} />}
                  <span ref={lensRef} className={styles.lens} aria-hidden="true" />
                  <span className={styles.zoomHint} aria-hidden="true"><span className={styles.mouseHint}>Hover to zoom</span><span className={styles.touchHint}>Hold to zoom</span></span>
                </div>
                <div className={styles.variants} role="group" aria-label="Choose a design">
                  {variants.map((variant) => <button key={variant.id} type="button" aria-pressed={selectedPattern === variant.id} onClick={() => { hideLens(); setSelectedPattern(variant.id); }}>{variant.name}</button>)}
                </div>
              </div>
              <div className={styles.purchase}>
                <Button onClick={() => { addStarterKit(selectedPattern, 1); setJustAdded(true); setTimeout(() => setJustAdded(false), 1800); }} variant="primary" size="lg" fullWidth>{justAdded ? `Added to Cart - $${STARTER_KIT_PRODUCT.price.toFixed(2)}` : `Add to Cart - $${STARTER_KIT_PRODUCT.price.toFixed(2)}`}</Button>
                <span className="sr-only" role="status">{justAdded ? 'Wipeband added to your bag.' : ''}</span>
                <div className={styles.refill}><Link href="/refills">Already have Wipeband? Shop refills (${REFILLS_PRODUCT.price.toFixed(2)}) <ArrowRight className="w-4 h-4 inline-block" /></Link></div>
              </div>
            </div>
          </div>
          <div className={styles.trust}>{trustItems.map((item) => { const Icon = item.icon; return <div key={item.label}><Icon /><span>{item.label}</span></div>; })}</div>
        </div>
      </div>
    </section>
  );
}
