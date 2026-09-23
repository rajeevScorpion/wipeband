import React from 'react';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';

export function EverydayAdventures() {
  const cards = [
    {
      title: 'School days',
      description: 'Tissues on hand for brighter days at school.',
      assetId: 'home_usecase_school.webp',
      alt: 'Children in classroom with Wipeband',
    },
    {
      title: 'Playdates',
      description: 'Ready for all the fun (and sniffles).',
      assetId: 'home_usecase_playdate.webp',
      alt: 'Kids playing soccer outdoors with Wipeband',
    },
    {
      title: 'Travel days',
      description: 'Convenient for car rides, trips and new places.',
      assetId: 'home_usecase_travel.webp',
      alt: 'Child traveling in car seat with Wipeband',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-teal-900 tracking-tight text-center mb-12 sm:mb-16">
          Made for their everyday adventures.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col rounded-3xl overflow-hidden group bg-white"
            >
              <div className="relative overflow-hidden rounded-3xl">
                <PlaceholderMedia
                  assetId={card.assetId}
                  alt={card.alt}
                  aspectRatio="4:3"
                  category="adventure"
                  className="rounded-3xl border border-border group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              <div className="pt-5 px-1">
                <h3 className="font-heading font-black text-xl text-teal-900">
                  {card.title}
                </h3>
                <p className="mt-1 text-sm text-ink/75 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
