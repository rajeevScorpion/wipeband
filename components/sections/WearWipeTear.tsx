import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';

export function WearWipeTear() {
  const steps = [
    {
      num: '01',
      title: 'Wear it like a watch.',
      assetId: 'home_howitworks_wear.webp',
      alt: 'Putting Wipeband on wrist like a watch',
    },
    {
      num: '02',
      title: 'Wipe on the soft tissue.',
      assetId: 'home_howitworks_wipe.webp',
      alt: 'Using soft tissue layer on wrist',
    },
    {
      num: '03',
      title: 'Tear off the used layer and bin it.',
      assetId: 'home_howitworks_tear.webp',
      alt: 'Tearing off used tissue layer',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-900 tracking-tight">
              Wear it. Wipe it. Tear it.
            </h2>
          </div>
          <p className="text-sm font-heading font-medium text-teal-700/80 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-700/10 self-start sm:self-auto">
            Refill when the pack is used up.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div key={step.num} className="relative flex flex-col group">
              {/* Media card */}
              <div className="relative">
                <PlaceholderMedia
                  assetId={step.assetId}
                  alt={step.alt}
                  aspectRatio="4:3"
                  category="step"
                  stepNumber={step.num}
                  className="rounded-3xl border border-border group-hover:shadow-md transition-shadow"
                />

                {/* Connecting arrow for desktop */}
                {idx < 2 && (
                  <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-teal-700/15 shadow-sm items-center justify-center text-green-600">
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </div>
                )}
              </div>

              {/* Title under card */}
              <h3 className="mt-4 font-heading font-bold text-lg sm:text-xl text-teal-900 text-center">
                {step.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
