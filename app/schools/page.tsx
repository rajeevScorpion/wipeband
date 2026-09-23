'use client';

import React, { useState } from 'react';
import { School, Users, Bus, Palette, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PlaceholderMedia } from '@/components/ui/PlaceholderMedia';
import { SITE_CONFIG } from '@/lib/site';

export default function SchoolsPage() {
  const useCases = [
    {
      icon: School,
      title: 'Classrooms & Preschools',
      desc: 'Help children manage quick sniffles independently without disrupting group learning or circles.',
    },
    {
      icon: Bus,
      title: 'Field Trips & Outings',
      desc: 'Keep tissues right on student wrists when tissue boxes and bathrooms are out of reach.',
    },
    {
      icon: Users,
      title: 'Daycares & Camps',
      desc: 'Active outdoor adventures and sports programs where kids need immediate wipe access.',
    },
    {
      icon: Palette,
      title: 'Art & Activity Programs',
      desc: 'Messy hands and quick touch-ups stay contained without running back and forth to paper dispensers.',
    },
  ];

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-heading font-black tracking-wider uppercase text-teal-700 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-700/10">
              Institutional & Bulk Inquiries
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-teal-900 tracking-tight leading-[1.08]">
              Wipeband for Schools, Daycares & Groups
            </h1>
            <p className="text-lg sm:text-xl text-ink/80 max-w-xl leading-relaxed">
              Support cleaner classrooms, active play and simpler everyday routines with wearable Wipeband bands and volume refill packs.
            </p>
            <div className="pt-2">
              <Button href="#inquiry" variant="primary" size="lg">
                Inquire About Bulk Pricing
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <PlaceholderMedia
              assetId="schools_hero_classroom_group.webp"
              alt="Classroom students wearing Wipeband during learning activity"
              aspectRatio="4:3"
              category="lifestyle"
              className="shadow-hover rounded-3xl"
            />
          </div>
        </div>

        {/* 4 Group Settings */}
        <div className="mb-20">
          <h2 className="font-heading text-3xl font-black text-teal-900 text-center tracking-tight mb-12">
            Built for Active Learning Environments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((uc) => {
              const Icon = uc.icon;
              return (
                <div key={uc.title} className="p-6 rounded-3xl bg-[#FAFCFA] border border-border">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-800 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-teal-900 mb-2">
                    {uc.title}
                  </h3>
                  <p className="text-sm text-ink/75 leading-relaxed">
                    {uc.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Inquiry Form */}
        <div id="inquiry" className="max-w-2xl mx-auto rounded-3xl p-8 sm:p-12 bg-offwhite border border-border shadow-sm scroll-mt-20">
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-teal-900 mb-2">
            Submit a School or Group Inquiry
          </h2>
          <p className="text-sm text-ink/75 mb-8">
            Tell us about your organization or program size, and our team will get in touch with volume options and details.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you! Your school inquiry has been sent to our bulk program coordinators.');
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-teal-900 mb-1">
                  Contact Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ms. Emily Watson"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-teal-900 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="emily@preschool.org"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-teal-900 mb-1">
                  School / Organization
                </label>
                <input
                  type="text"
                  placeholder="Sunny Valley Elementary"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-teal-900 mb-1">
                  Estimated Quantity of Bands
                </label>
                <input
                  type="number"
                  placeholder="50"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-teal-900 mb-1">
                Tell us about your program or requirements
              </label>
              <textarea
                rows={4}
                placeholder="We are looking to supply 3 kindergarten classrooms with Wipebands for the upcoming school year..."
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
              />
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth>
              Send Inquiry
            </Button>

            <p className="text-center text-xs text-muted pt-2">
              Or email our educational team directly at{' '}
              <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-teal-700 underline">
                {SITE_CONFIG.supportEmail}
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
