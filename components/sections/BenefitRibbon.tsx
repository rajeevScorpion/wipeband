import React from 'react';
import { Backpack, Car, Trophy, Home } from 'lucide-react';

export function BenefitRibbon() {
  const items = [
    { label: 'At school', icon: Backpack },
    { label: 'On the go', icon: Car },
    { label: 'At play', icon: Trophy },
    { label: 'At home', icon: Home },
  ];

  return (
    <section className="bg-gradient-to-r from-[#F4FAF2] via-[#EEF7EA] to-[#F4FAF2] border-y border-teal-700/10 py-10 lg:py-12">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Text */}
          <div className="text-center lg:text-left max-w-xl">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-teal-900 tracking-tight">
              A tissue is useful{' '}
              <span className="text-green-600">when it&apos;s within reach.</span>
            </h2>
            <p className="mt-2 text-ink/75 text-base">
              Less searching for tissues. More getting on with the day.
            </p>
          </div>

          {/* Right 4 Context Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full lg:w-auto">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-teal-700/10 flex items-center justify-center text-teal-800 group-hover:scale-105 group-hover:text-green-600 transition-all duration-200">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <span className="mt-2 text-xs font-heading font-bold text-teal-900">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
