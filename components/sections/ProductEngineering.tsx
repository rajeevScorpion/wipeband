import React from 'react';
import { Watch, Layers, Scissors } from 'lucide-react';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';

export function ProductEngineering() {
  const features = [
    {
      icon: Watch,
      title: 'Watch-like fit',
      description: 'Comfortable, adjustable and kid-friendly.',
    },
    {
      icon: Layers,
      title: '6-layer absorbent pad',
      description: 'Six thin layers for everyday wipes. Remove one layer at a time.',
    },
    {
      icon: Scissors,
      title: 'Tear-away design',
      description: 'Easy to remove the used layer and keep going.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#FAFCFA] to-white border-y border-border/60">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Title Column */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-900 tracking-tight leading-tight">
              Designed for kids.{' '}
              <span className="text-green-600 block mt-1">Built for real life.</span>
            </h2>
            <p className="text-lg text-ink/80 max-w-sm">
              A reusable band. Replaceable tissue packs.
            </p>
          </div>

          {/* Center Exploded Visual */}
          <div className="lg:col-span-4 relative flex items-center justify-center">
            <div className="relative w-full max-w-xs mx-auto">
              <PlaceholderMedia
                assetId="home_features_exploded-product.webp"
                alt="Exploded diagram of Wipeband watch with 6 tissue layers"
                aspectRatio="1:1"
                category="explainer"
                className="shadow-hover rounded-3xl"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-green-500 font-bold text-xs">
                {'/// /// ///'}
              </div>
            </div>
          </div>

          {/* Right 3 Callouts */}
          <div className="lg:col-span-4 space-y-8">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div key={feat.title} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-700/10 flex items-center justify-center text-teal-800 shrink-0 group-hover:bg-teal-700 group-hover:text-white transition-all duration-200">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-lg text-teal-900">
                      {feat.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink/75 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
