'use client';

import React, { useState } from 'react';

import Image from 'next/image';

interface PlaceholderMediaProps {
  assetId: string;
  alt: string;
  aspectRatio?: '1:1' | '4:3' | '16:9' | '16:10' | '4:5' | '21:9' | '3:2';
  className?: string;
  category?: 'lifestyle' | 'product' | 'step' | 'explainer' | 'story' | 'adventure';
  stepNumber?: string;
  calloutText?: string;
  children?: React.ReactNode;
}

export function PlaceholderMedia({
  assetId,
  alt,
  aspectRatio = '4:3',
  className = '',
  category = 'lifestyle',
  stepNumber,
  children,
}: PlaceholderMediaProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const aspectClasses = {
    '1:1': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-[16/9]',
    '16:10': 'aspect-[16/10]',
    '4:5': 'aspect-[4/5]',
    '21:9': 'aspect-[21/9]',
    '3:2': 'aspect-[3/2]',
  };

  // Determine potential file path in /public/assets/...
  const imageSrc = assetId.startsWith('/')
    ? assetId
    : category === 'product' || category === 'explainer'
    ? `/assets/product/${assetId}`
    : `/assets/lifestyle/${assetId}`;

  // Render stylized SVG compositions matching the landing page art style
  const renderVisualContent = () => {
    if (children) return children;

    if (assetId.includes('child-using-wipeband')) {
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#EBF6F6] to-[#D5EBEA] overflow-hidden">
          {/* Subtle classroom background suggestion */}
          <div className="absolute top-4 left-6 right-6 h-12 bg-white/40 rounded-lg flex items-center px-4 border border-teal-700/10">
            <div className="w-16 h-2 bg-teal-700/20 rounded mr-2" />
            <div className="w-8 h-2 bg-green-500/30 rounded" />
          </div>

          {/* Illustrated child wiping sleeve / wearing wipeband */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Child character silhouette/vector */}
            <div className="relative w-36 h-36 bg-[#F6DFD2] rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
              {/* Hair */}
              <div className="absolute -top-3 w-40 h-20 bg-[#6C442A] rounded-b-full" />
              {/* Soft facial expression */}
              <div className="relative z-10 flex flex-col items-center mt-3">
                <div className="flex gap-4">
                  <div className="w-2.5 h-1.5 bg-[#422B1E] rounded-full" />
                  <div className="w-2.5 h-1.5 bg-[#422B1E] rounded-full" />
                </div>
                <div className="w-3 h-2 bg-[#D97D64] rounded-full mt-2" />
              </div>
              {/* Arm reaching with Wipeband */}
              <div className="absolute bottom-0 right-0 w-20 h-16 bg-[#2B7A8B] rounded-tl-2xl flex items-center justify-center">
                <div className="w-12 h-6 bg-white rounded-md border-2 border-teal-700 shadow flex items-center justify-center">
                  <span className="text-[9px] font-bold text-teal-800">Wipeband</span>
                </div>
              </div>
            </div>
            {/* Blue shirt collar */}
            <div className="w-48 h-20 bg-[#2C6E80] rounded-t-3xl -mt-4 shadow-sm border border-teal-900/10" />
          </div>

          {/* Floating callout */}
          <div className="absolute top-6 right-6 bg-[#62B44A] text-white text-xs font-heading font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform rotate-3">
            <span>✨</span>
            <span>Tissues right there when they need them.</span>
          </div>
        </div>
      );
    }

    if (assetId.includes('exploded-product') || assetId.includes('features_exploded')) {
      return (
        <div className="relative w-full h-full flex items-center justify-center p-6 bg-gradient-to-tr from-[#EEF7EA] via-white to-[#EEF9FA]">
          {/* 3D-styled Wipeband watch with fanned tissues */}
          <div className="relative flex items-center justify-center">
            {/* Silicone strap */}
            <div className="w-44 h-16 bg-white rounded-2xl border-2 border-teal-700/20 shadow-lg flex items-center justify-between px-3">
              <div className="w-3 h-3 rounded-full bg-teal-600/30" />
              <div className="w-2 h-2 rounded-full bg-teal-600/20" />
              <div className="w-2 h-2 rounded-full bg-teal-600/20" />
            </div>
            {/* Tissue Pad Holder Base */}
            <div className="absolute w-24 h-24 bg-white rounded-2xl shadow-xl border-2 border-teal-700/30 flex flex-col items-center justify-center p-2">
              <div className="w-full h-3 bg-teal-700/10 rounded mb-1" />
              {/* 6 fanned layers */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-2 bg-white border border-teal-700/20 rounded shadow-sm my-0.5"
                  style={{
                    transform: `translateX(${i * 3}px) rotate(${i * 1.5 - 4}deg)`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (assetId.includes('wipeband-product') || assetId.includes('product_wrist-fit')) {
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#F2FBF9] to-[#E2F4F2]">
          <div className="relative w-36 h-36 rounded-full border-8 border-white bg-teal-50 shadow-inner flex items-center justify-center">
            {/* Watch strap with cute pattern */}
            <div className="w-28 h-10 bg-white rounded-xl shadow-md border border-teal-600/20 flex items-center justify-center gap-1.5">
              <span className="text-xs">🦕</span>
              <span className="text-xs">✨</span>
              <span className="text-xs">🌈</span>
            </div>
            {/* Mounted pad */}
            <div className="absolute -top-1 w-16 h-8 bg-white rounded-lg shadow-lg border-2 border-teal-700 flex items-center justify-center">
              <span className="text-[10px] font-bold text-teal-800">WIPEBAND</span>
            </div>
          </div>
        </div>
      );
    }

    if (category === 'step') {
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#FAFDFB] to-[#EEF7EA]">
          <div className="w-20 h-20 rounded-2xl bg-white shadow-md border border-green-200 flex items-center justify-center text-3xl">
            {stepNumber === '01' ? '⌚' : stepNumber === '02' ? '👃' : '🗑️'}
          </div>
          <div className="mt-3 text-xs font-bold text-teal-800 tracking-wider">
            {stepNumber === '01'
              ? 'WEAR IT LIKE A WATCH'
              : stepNumber === '02'
              ? 'WIPE ON SOFT TISSUE'
              : 'TEAR OFF & BIN IT'}
          </div>
        </div>
      );
    }

    if (category === 'adventure') {
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#F7FAF9] to-[#E9F3F2]">
          <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-teal-100 flex items-center justify-center text-3xl mb-2">
            {assetId.includes('school') ? '🏫' : assetId.includes('play') ? '⚽' : '🚗'}
          </div>
          <span className="text-xs font-semibold text-teal-800">Everyday Ready</span>
        </div>
      );
    }

    // Default stylized brand placeholder
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#F8FAF9] to-[#EFF5F4]">
        <div className="w-14 h-14 rounded-2xl bg-white/90 shadow-sm border border-teal-700/10 flex items-center justify-center text-teal-700 text-2xl">
          📦
        </div>
        <p className="mt-3 text-xs font-semibold text-teal-800/80 text-center max-w-[200px]">
          {alt}
        </p>
      </div>
    );
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-teal-700/10 shadow-sm bg-white group ${aspectClasses[aspectRatio]} ${className}`}
      data-asset-id={assetId}
      aria-label={alt}
    >
      {/* Real image if placed in /public/assets/... */}
      {!imageError && (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100 z-10' : 'opacity-0'
          }`}
        />
      )}

      {/* Stylized visual fallback if image file not loaded */}
      {(!imageLoaded || imageError) && (
        <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
          {renderVisualContent()}
        </div>
      )}

      {/* Step number badge if provided */}
      {stepNumber && (
        <div className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full bg-[#62B44A] text-white font-heading font-black text-sm flex items-center justify-center shadow-md">
          {stepNumber}
        </div>
      )}

      {/* Asset Identifier Badge (subtle, non-intrusive metadata per brief) */}
      <div className="absolute bottom-2 right-2 z-20 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] font-mono text-white/90 opacity-40 group-hover:opacity-100 transition-opacity select-none pointer-events-none">
        {assetId}
      </div>
    </div>
  );
}
