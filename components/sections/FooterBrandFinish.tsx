'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './FooterBrandFinish.module.css';

export function FooterBrandFinish() {
  const stageRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const wordmark = wordmarkRef.current;
    if (!stage || !wordmark) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = stage.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height * 0.3)));
      const maxLift = Math.min(28, window.innerWidth * (window.innerWidth < 640 ? 0.02 : 0.027));
      const lift = reducedMotion.matches ? 0 : progress * maxLift;
      stage.style.setProperty('--footer-edge-adjust', '0px');
      stage.style.setProperty('--footer-lift', `${-lift}px`);
      const image = wordmark.getBoundingClientRect();
      if (image.height > 0) {
        // The W's lower edge in the original SVG viewBox must stay beneath the footer.
        const wBottom = image.top + image.height * 205.52 / 265.91;
        stage.style.setProperty('--footer-edge-adjust', `${Math.max(0, bounds.bottom - wBottom + 1)}px`);
      }
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reducedMotion.addEventListener('change', schedule);
    wordmark.addEventListener('load', schedule);
    schedule();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reducedMotion.removeEventListener('change', schedule);
      wordmark.removeEventListener('load', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={stageRef} className={styles.finish} aria-hidden="true">
      <div className={styles.pattern} />
      <Image ref={wordmarkRef} src="/assets/branding/wipeband_logo.svg" alt="" width={824} height={266} className={styles.wordmark} />
    </div>
  );
}
