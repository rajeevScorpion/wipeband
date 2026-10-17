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
      description: 'Six soft tissue layers stacked in one compact pack, ready one after another.',
    },
    {
      icon: Scissors,
      title: 'Peel & dispose after wiping',
      description: 'After a wipe, remove and dispose of the used top layer to reveal a fresh one underneath.',
    },
    {
      icon: Watch,
      title: 'Soft, reusable wrist strap',
      description: 'Comfortable watch-style silicone strap designed for kids ages 2–6. Keep the band and pop in a refill pack when empty.',
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
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-border/60 overflow-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5 space-y-5"
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-900 tracking-tight leading-tight text-balance">
              One little tissue pack.{' '}
              <span className="text-green-600">Six fresh wipes.</span>
            </h2>
            <p className="text-base sm:text-lg text-ink/80 leading-relaxed">
              Six soft tissue layers, ready one after another. After a wipe, remove the used layer to reveal a fresh one underneath.
            </p>

            <div className="space-y-5 pt-2">
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div key={feat.title} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-700/10 flex items-center justify-center text-teal-800 shrink-0">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-extrabold text-base sm:text-lg text-teal-900">
                        {feat.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-ink/75 leading-relaxed">
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
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#F4FAF6] to-[#EBF5F5] border border-teal-700/15 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <span className="text-xs font-heading font-bold text-teal-800">
                    Interactive 6-Layer Pad Demonstration
                  </span>
                  <p className="text-xs text-ink/70 mt-0.5">
                    Currently ready on top: <strong>Layer {activeLayer} of 6</strong> ({totalLayers - peeledCount} fresh {totalLayers - peeledCount === 1 ? 'wipe' : 'wipes'} remaining)
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePeelLayer}
                    className="px-4 py-2 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-heading font-bold text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
                  >
                    {peeledCount < totalLayers - 1
                      ? `Peel & Dispose Layer ${activeLayer} →`
                      : 'Insert Fresh 6-Layer Pack'}
                  </button>
                  {peeledCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setPeeledCount(0)}
                      className="p-2 rounded-full bg-white text-teal-800 border border-teal-700/15 hover:bg-teal-50 transition-colors cursor-pointer"
                      aria-label="Reset 6 layers"
                      title="Reset 6 layers"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
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
                              ? 'bg-white border-teal-700 shadow-sm'
                              : 'bg-white/80 border-teal-700/15'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-7 h-7 rounded-full flex items-center justify-center font-heading font-black text-xs tabular-nums ${
                                isCurrentTop
                                  ? 'bg-[#62B44A] text-white'
                                  : 'bg-teal-50 text-teal-800'
                              }`}
                            >
                              {layerNum}
                            </span>
                            <div>
                              <span className="font-heading font-bold text-sm text-teal-900">
                                Soft Tissue Layer {layerNum}
                              </span>
                              {isCurrentTop && (
                                <span className="ml-2 text-xs font-semibold text-green-700">
                                  · Ready to wipe
                                </span>
                              )}
                            </div>
                          </div>

                          <span className="text-xs text-ink/65 font-medium">
                            {isCurrentTop
                              ? 'Tear off after wiping'
                              : 'Fresh underneath'}
                          </span>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-teal-700/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-teal-900">
                <div className="flex items-center gap-2 font-heading font-bold">
                  <span className="w-3 h-3 rounded-full bg-[#62B44A] inline-block" />
                  <span>Reusable Silicone Wristband Cradle (Ages 2–6)</span>
                </div>
                <span className="text-ink/70">
                  Used layers are torn off and binned — never worn after use.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
