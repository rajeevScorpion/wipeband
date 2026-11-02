'use client';

import React, { useEffect, useRef } from 'react';
import { Watch, Layers, Scissors } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';

export function ProductEngineering() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { margin: '200px' });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!isInView || reducedMotion) {
      video.pause();
      return;
    }
    if (!video.getAttribute('src')) video.src = '/assets/videos/wipeband-loading.mp4';
    video.play().catch(() => {});
  }, [isInView, reducedMotion]);

  const features = [
    {
      icon: Layers,
      title: 'Six soft tissue layers',
      description: 'Stacked in one compact wrist pack, ready one after another.',
      color: 'bg-[#3BA59B]/15 text-[#3BA59B]',
    },
    {
      icon: Scissors,
      title: 'Peel & toss after wiping',
      description: 'Remove the used top sheet to reveal a fresh white tissue underneath.',
      color: 'bg-teal-700/15 text-teal-700',
    },
    {
      icon: Watch,
      title: 'Reusable silicone strap',
      description: 'Gentle watch-style fit for ages 2–6. Pop in a fresh refill pack anytime.',
      color: 'bg-[#62B44A]/15 text-[#62B44A]',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FFFDF9] border-b border-teal-900/8 overflow-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5 space-y-6"
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-950 tracking-[-0.025em] leading-tight text-balance">
              One little pack.{' '}
              <span className="text-[#62B44A]">Six fresh wipes.</span>
            </h2>
            <p className="text-base sm:text-lg text-teal-950/75 leading-relaxed">
              Every cartridge holds six soft tissues. After a wipe, peel off the top sheet and a clean layer is waiting underneath.
            </p>

            <div className="space-y-5 pt-1">
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div key={feat.title} className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${feat.color}`}>
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-teal-950">
                        {feat.title}
                      </h3>
                      <p className="mt-0.5 text-base text-teal-950/70 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="flex justify-center">
              <div className="w-full max-w-[440px] aspect-[4/5] overflow-hidden rounded-2xl sm:rounded-[20px] bg-[#e7f4ef] shadow-[0_10px_28px_rgba(5,42,48,0.13),0_2px_6px_rgba(5,42,48,0.08)]">
                <video
                  ref={videoRef}
                  className="block h-full w-full object-contain"
                  poster="/assets/images/wipeband-loading-poster.webp"
                  aria-label="Wipeband tissue pack animation"
                  muted
                  loop
                  playsInline
                  preload="none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
