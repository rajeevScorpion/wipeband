'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface PlaceholderMediaProps {
  assetId: string;
  alt: string;
  aspectRatio?: '1:1' | '4:3' | '16:9' | '16:10' | '4:5' | '21:9' | '3:2';
  className?: string;
  category?: 'lifestyle' | 'product' | 'step' | 'explainer' | 'story' | 'adventure' | 'ugc' | 'video';
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
  const [videoError, setVideoError] = useState(false);

  const aspectClasses = {
    '1:1': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-[16/9]',
    '16:10': 'aspect-[16/10]',
    '4:5': 'aspect-[4/5]',
    '21:9': 'aspect-[21/9]',
    '3:2': 'aspect-[3/2]',
  };

  const isVideoSlot =
    category === 'video' ||
    assetId.endsWith('.mp4') ||
    assetId.endsWith('.webm') ||
    assetId.includes('usage_loop');

  const imageSrc = assetId.startsWith('/')
    ? assetId
    : category === 'product' || category === 'explainer'
    ? `/assets/product/${assetId}`
    : `/assets/lifestyle/${assetId}`;

  const renderVisualContent = () => {
    if (children) return children;

    if (assetId.includes('child-using-wipeband') || assetId.includes('usage_loop')) {
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#EBF6F6] to-[#D5EBEA] overflow-hidden">
          <div className="absolute top-4 left-6 right-6 h-11 bg-white/50 rounded-xl flex items-center justify-between px-4 border border-teal-700/10">
            <span className="text-[11px] font-heading font-bold text-teal-800">
              Wear → Wipe → Tear
            </span>
            <span className="text-[11px] font-medium text-teal-700/80">
              6–10s silent loop slot
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center mt-4">
            <div className="relative w-40 h-40 bg-white/80 rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
              <svg
                viewBox="0 0 160 160"
                className="w-full h-full"
                role="img"
                aria-label="Illustration showing child raising wrist so the top tissue surface of Wipeband faces and contacts the nose"
              >
                <rect width="160" height="160" fill="#F2FAF9" />
                <circle cx="74" cy="70" r="32" fill="#FADCD0" />
                <path
                  d="M42 66 C42 40, 106 40, 106 66 C96 54, 54 54, 42 66 Z"
                  fill="#4A3525"
                />
                <path
                  d="M64 66 Q69 62 74 66"
                  stroke="#3A281B"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="84" cy="75" r="4" fill="#EBB4A2" />
                <path
                  d="M118 140 L94 92 C90 84, 82 82, 78 88 L96 140 Z"
                  fill="#2C6E80"
                />
                <rect
                  x="79"
                  y="80"
                  width="24"
                  height="10"
                  rx="5"
                  transform="rotate(-24 79 80)"
                  fill="#62B44A"
                />
                <rect
                  x="77"
                  y="73"
                  width="18"
                  height="9"
                  rx="3"
                  transform="rotate(-24 77 73)"
                  fill="#FFFFFF"
                  stroke="#0F4C5C"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <p className="mt-3 text-xs font-heading font-bold text-teal-900 text-center">
              Tissue pad on wrist faces and gently wipes the nose
            </p>
          </div>
        </div>
      );
    }

    if (assetId.includes('exploded-product') || assetId.includes('features_exploded')) {
      return (
        <div className="relative w-full h-full flex items-center justify-center p-6 bg-gradient-to-tr from-[#EEF7EA] via-white to-[#EEF9FA]">
          <div className="relative flex flex-col items-center justify-center w-full max-w-[240px]">
            <div className="w-full space-y-1.5 mb-3">
              {[1, 2, 3, 4, 5, 6].map((layerNum) => (
                <div
                  key={layerNum}
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white border border-teal-700/20 shadow-xs text-xs font-heading font-bold text-teal-900"
                >
                  <span>Soft tissue layer {layerNum}</span>
                  <span className="text-[11px] text-green-700">
                    {layerNum === 1 ? 'Peel after wipe' : 'Fresh underneath'}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full py-2.5 px-4 rounded-2xl bg-teal-700 text-white text-center text-xs font-heading font-bold shadow-sm">
              Reusable Silicone Wristband Base
            </div>
          </div>
        </div>
      );
    }

    if (assetId.includes('wipeband-product') || assetId.includes('product_wrist-fit') || assetId.includes('starter-kit')) {
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#F2FBF9] to-[#E2F4F2]">
          <div className="relative w-40 h-40 rounded-full border-8 border-white bg-teal-50 shadow-inner flex flex-col items-center justify-center p-4">
            <div className="w-28 h-9 bg-[#62B44A] rounded-full shadow-sm border border-teal-800/20 flex items-center justify-center">
              <div className="w-16 h-11 bg-white rounded-xl shadow-md border-2 border-teal-700 flex flex-col items-center justify-center">
                <span className="text-[9px] font-heading font-black text-teal-900">6 LAYERS</span>
                <span className="text-[8px] text-teal-700">SOFT TISSUE</span>
              </div>
            </div>
            <span className="mt-4 text-xs font-heading font-bold text-teal-900">
              Wipeband Starter Kit
            </span>
          </div>
        </div>
      );
    }

    if (category === 'step') {
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#FAFDFB] to-[#EEF7EA]">
          <div className="w-20 h-20 rounded-2xl bg-white shadow-sm border border-green-200 flex items-center justify-center text-2xl font-heading font-black text-teal-800">
            {stepNumber === '01' ? 'Wear' : stepNumber === '02' ? 'Wipe' : 'Tear'}
          </div>
          <div className="mt-3 text-xs font-heading font-bold text-teal-900 text-center max-w-[180px]">
            {stepNumber === '01'
              ? 'Put Wipeband on like a watch.'
              : stepNumber === '02'
              ? 'Wipe their nose on the soft tissue.'
              : 'Remove & dispose of the used layer.'}
          </div>
        </div>
      );
    }

    if (category === 'ugc') {
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#F9FBF9] to-[#EDF5F0] text-center">
          <span className="text-xs font-heading font-bold text-teal-800">
            {alt}
          </span>
          <span className="mt-1.5 text-[11px] text-ink/60">
            Real-life parent video / photo slot
          </span>
        </div>
      );
    }

    if (category === 'adventure') {
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#F7FAF9] to-[#E9F3F2] text-center">
          <span className="text-sm font-heading font-bold text-teal-900">{alt}</span>
          <span className="mt-1 text-xs text-teal-700/80">Tissue right on their wrist</span>
        </div>
      );
    }

    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#F8FAF9] to-[#EFF5F4]">
        <p className="text-xs font-heading font-bold text-teal-900 text-center max-w-[200px]">
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
      {isVideoSlot && !videoError ? (
        <video
          src={assetId.startsWith('/') ? assetId : `/assets/lifestyle/${assetId}`}
          poster="/assets/lifestyle/home_hero_child-using-wipeband_desktop.webp"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        !imageError && (
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
        )
      )}

      {((isVideoSlot && videoError) || (!isVideoSlot && (!imageLoaded || imageError))) && (
        <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
          {renderVisualContent()}
        </div>
      )}

      {stepNumber && (
        <div className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full bg-[#62B44A] text-white font-heading font-black text-sm flex items-center justify-center shadow-md">
          {stepNumber}
        </div>
      )}

      <div className="absolute bottom-2 right-2 z-20 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] font-mono text-white/90 opacity-40 group-hover:opacity-100 transition-opacity select-none pointer-events-none">
        {assetId}
      </div>
    </div>
  );
}
