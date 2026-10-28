'use client';

import React, { useState } from 'react';
import { Watch, Layers, Scissors, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ProductEngineering() {
  const [peeledCount, setPeeledCount] = useState(0);
  const totalLayers = 6;
  const activeLayer = peeledCount + 1;

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

  const handlePeelLayer = () => {
    if (peeledCount < totalLayers - 1) {
      setPeeledCount((prev) => prev + 1);
    } else {
      setPeeledCount(0);
    }
  };

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
            <div className="rounded-[2rem] p-6 sm:p-8 bg-gradient-to-br from-[#FFF6EB] via-[#EFF9F6] to-[#EAF7EA] border border-teal-900/10 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="font-heading font-bold text-lg text-teal-950">
                  Layer {activeLayer} of 6 ready on wrist
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePeelLayer}
                    className="px-5 py-2.5 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-heading font-bold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
                  >
                    {peeledCount < totalLayers - 1
                      ? `Peel Layer ${activeLayer} →`
                      : 'Snap In Fresh Pack'}
                  </button>
                  {peeledCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setPeeledCount(0)}
                      className="p-2.5 rounded-full bg-white text-teal-950 border border-teal-900/10 hover:bg-teal-50 transition-colors cursor-pointer"
                      aria-label="Reset 6 layers"
                      title="Reset 6 layers"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2.5 my-4">
                {[1, 2, 3, 4, 5, 6].map((layerNum) => {
                  const isPeeled = layerNum <= peeledCount;
                  const isCurrentTop = layerNum === activeLayer;

                  return (
                    <AnimatePresence key={layerNum} mode="popLayout">
                      {!isPeeled ? (
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 40, rotate: -3 }}
                          transition={{ duration: 0.2 }}
                          className={`flex items-center justify-between px-4 py-3 rounded-2xl border transition-all ${
                            isCurrentTop
                              ? 'bg-white border-[#62B44A] shadow-sm'
                              : 'bg-white/85 border-teal-900/10'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-7 h-7 rounded-full flex items-center justify-center font-heading font-bold text-xs tabular-nums ${
                                isCurrentTop
                                  ? 'bg-[#62B44A] text-white'
                                  : 'bg-teal-900/8 text-teal-950'
                              }`}
                            >
                              {layerNum}
                            </span>
                            <span className="font-heading font-bold text-base text-teal-950">
                              Soft Tissue Layer {layerNum}
                            </span>
                          </div>

                          <span
                            className={`text-sm font-medium ${
                              isCurrentTop ? 'text-[#62B44A]' : 'text-teal-950/55'
                            }`}
                          >
                            {isCurrentTop ? 'Ready on top' : 'Fresh underneath'}
                          </span>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  );
                })}
              </div>

              <div className="mt-4 py-3 px-4 rounded-2xl bg-teal-950 text-white text-center font-heading font-bold text-sm">
                Reusable Silicone Wristband Base (Ages 2–6)
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
