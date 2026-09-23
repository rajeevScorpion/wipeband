import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="py-24 sm:py-36 bg-white text-center">
      <div className="max-w-md mx-auto px-4">
        <span className="text-sm font-heading font-black tracking-widest text-teal-700 bg-teal-50 px-4 py-1.5 rounded-full border border-teal-700/10 uppercase">
          404 Error
        </span>
        <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-black text-teal-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="mt-3 text-base text-ink/75 leading-relaxed">
          The page you are looking for may have moved or doesn&apos;t exist. Let&apos;s get you back to clean sleeves.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/" variant="primary" size="md">
            Return Home
          </Button>
          <Button href="/shop" variant="secondary" size="md">
            Shop Wipeband
          </Button>
        </div>
      </div>
    </div>
  );
}
