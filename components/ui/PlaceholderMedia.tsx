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
  const [videoLoaded, setVideoLoaded] = useState(false);

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

    // 1. Hero Lifestyle / Video Slot — Rich, colorful illustration of child wearing Wipeband
    if (assetId.includes('child-using-wipeband') || assetId.includes('usage_loop')) {
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-[#FFF3E6] via-[#E8F8F5] to-[#E2F4EA] overflow-hidden">
          {/* Ambient decorative blobs */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-teal-700/15 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-52 h-52 rounded-full bg-[#62B44A]/20 blur-2xl pointer-events-none" />

          <svg
            viewBox="0 0 420 270"
            className="w-full h-full max-h-[250px] drop-shadow-sm relative z-10"
            role="img"
            aria-label={alt}
          >
            {/* Soft sunlit backdrop card */}
            <circle cx="210" cy="135" r="108" fill="#FFFFFF" fillOpacity="0.85" />
            <circle cx="210" cy="135" r="92" fill="#FFF9F2" />

            {/* Happy child face profile */}
            <circle cx="176" cy="118" r="48" fill="#FBD3C1" />
            {/* Warm hair */}
            <path
              d="M128 114 C128 70, 224 68, 224 110 C208 92, 150 92, 128 114 Z"
              fill="#4E3629"
            />
            {/* Happy closed eye */}
            <path
              d="M168 112 Q176 105 184 112"
              stroke="#3B281E"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Rosy cheek */}
            <circle cx="164" cy="126" r="8" fill="var(--color-teal-700)" fillOpacity="0.35" />
            {/* Little nose */}
            <circle cx="218" cy="122" r="7" fill="#F4B8A0" />

            {/* Child's raised arm & sweater sleeve (clean coral-gold sweater) */}
            <path
              d="M276 232 L232 152 C226 142, 214 140, 208 148 L236 232 Z"
              fill="#3BA59B"
            />
            {/* Hand */}
            <circle cx="214" cy="138" r="14" fill="#FBD3C1" />

            {/* Wipeband Silicone Strap on Wrist (Leaf Green Dinosaur Band) */}
            <rect
              x="202"
              y="136"
              width="44"
              height="18"
              rx="9"
              transform="rotate(-26 202 136)"
              fill="#62B44A"
              stroke="#0A4D57"
              strokeWidth="2"
            />
            {/* White 6-Layer Soft Tissue Pad facing & contacting the nose */}
            <rect
              x="200"
              y="122"
              width="34"
              height="16"
              rx="5"
              transform="rotate(-26 200 122)"
              fill="#FFFFFF"
              stroke="#0A4D57"
              strokeWidth="2"
            />
            {/* Stacked tissue layer lines */}
            <line
              x1="205"
              y1="126"
              x2="228"
              y2="115"
              stroke="#3BA59B"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Floating playful color badges */}
            <g transform="translate(46, 44)">
              <rect width="84" height="30" rx="15" fill="#FFFFFF" stroke="#62B44A" strokeWidth="1.5" />
              <circle cx="16" cy="15" r="5" fill="#62B44A" />
              <text x="28" y="19" fill="#0A4D57" fontSize="11" fontWeight="800" fontFamily="sans-serif">
                Wear
              </text>
            </g>
            <g transform="translate(292, 56)">
              <rect width="84" height="30" rx="15" fill="#FFFFFF" stroke="var(--color-teal-700)" strokeWidth="1.5" />
              <circle cx="16" cy="15" r="5" fill="var(--color-teal-700)" />
              <text x="28" y="19" fill="#0A4D57" fontSize="11" fontWeight="800" fontFamily="sans-serif">
                Wipe
              </text>
            </g>
            <g transform="translate(284, 182)">
              <rect width="84" height="30" rx="15" fill="#FFFFFF" stroke="#3BA59B" strokeWidth="1.5" />
              <circle cx="16" cy="15" r="5" fill="#3BA59B" />
              <text x="28" y="19" fill="#0A4D57" fontSize="11" fontWeight="800" fontFamily="sans-serif">
                Tear
              </text>
            </g>
          </svg>
        </div>
      );
    }

    // 2. 6-Layer Exploded Product Diagram
    if (assetId.includes('exploded') || assetId.includes('features_exploded')) {
      return (
        <div className="relative w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-[#EAF8F5] via-[#FFF9F0] to-[#EEF8EA]">
          <div className="relative flex flex-col items-center justify-center w-full max-w-[240px]">
            <div className="w-full space-y-1.5 mb-3">
              {[1, 2, 3, 4, 5, 6].map((layerNum) => (
                <div
                  key={layerNum}
                  className="flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-white border border-teal-700/15 shadow-xs text-xs font-heading font-bold text-teal-950"
                >
                  <span>Tissue Layer {layerNum}</span>
                  <span className="text-[11px] text-[#62B44A]">
                    {layerNum === 1 ? 'Peel off' : 'Fresh'}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full py-2.5 px-4 rounded-2xl bg-teal-700 text-white text-center text-xs font-heading font-bold shadow-sm">
              Soft Silicone Wristband
            </div>
          </div>
        </div>
      );
    }

    // 3. Starter Kit / Refills Product Visual
    if (
      assetId.includes('wipeband-product') ||
      assetId.includes('product_wrist-fit') ||
      assetId.includes('starter-kit') ||
      assetId.includes('refills') ||
      assetId.includes('howitworks_hero')
    ) {
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#FFF6EB] via-[#F2FBF9] to-[#EAF6E8]">
          <svg viewBox="0 0 240 200" className="w-48 h-40 drop-shadow-sm" aria-label={alt}>
            {/* Three colorful Wipeband straps */}
            <rect x="28" y="88" width="184" height="32" rx="16" fill="#62B44A" />
            <circle cx="48" cy="104" r="4" fill="#FFFFFF" fillOpacity="0.6" />
            <circle cx="64" cy="104" r="4" fill="#FFFFFF" fillOpacity="0.6" />
            <circle cx="192" cy="104" r="4" fill="#FFFFFF" fillOpacity="0.6" />
            {/* White tissue cradle on top */}
            <rect
              x="72"
              y="62"
              width="96"
              height="64"
              rx="18"
              fill="#FFFFFF"
              stroke="#0A4D57"
              strokeWidth="3"
            />
            <rect x="84" y="72" width="72" height="44" rx="10" fill="#F4FBF9" />
            <text
              x="120"
              y="93"
              textAnchor="middle"
              fill="#0A4D57"
              fontSize="12"
              fontWeight="800"
              fontFamily="sans-serif"
            >
              6 SOFT LAYERS
            </text>
            <text
              x="120"
              y="108"
              textAnchor="middle"
              fill="var(--color-teal-700)"
              fontSize="10"
              fontWeight="700"
              fontFamily="sans-serif"
            >
              WEARABLE TISSUE
            </text>
          </svg>
        </div>
      );
    }

    // 4. Step cards (Wear / Wipe / Tear)
    if (category === 'step') {
      const stepBg =
        stepNumber === '01'
          ? 'from-teal-50 to-teal-100'
          : stepNumber === '02'
          ? 'from-[#E9F8F5] to-[#D4F1EC]'
          : 'from-[#EEF9E8] to-[#DCF2D0]';
      const accentColor =
        stepNumber === '01' ? 'var(--color-teal-700)' : stepNumber === '02' ? '#3BA59B' : '#62B44A';

      return (
        <div
          className={`relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br ${stepBg}`}
        >
          <div
            className="w-20 h-20 rounded-3xl bg-white shadow-sm flex items-center justify-center text-2xl font-heading font-black"
            style={{ color: accentColor }}
          >
            {stepNumber === '01' ? 'Wear' : stepNumber === '02' ? 'Wipe' : 'Tear'}
          </div>
        </div>
      );
    }

    // 5. Adventure / UGC / Story cards
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#FFF6EC] via-[#EEF9F7] to-[#EFF8EB] text-center">
        <div className="w-14 h-14 rounded-2xl bg-white/90 shadow-xs flex items-center justify-center mb-3">
          <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-teal-700 to-[#62B44A]" />
        </div>
        <p className="text-sm font-heading font-bold text-teal-950 max-w-[200px]">
          {alt}
        </p>
      </div>
    );
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-3xl bg-[#FFFDF9] group ${aspectClasses[aspectRatio]} ${className}`}
      data-asset-id={assetId}
      aria-label={alt}
    >
      {/* Always render colorful visual fallback underneath until real media finishes loading */}
      {((isVideoSlot && !videoLoaded) || (!isVideoSlot && !imageLoaded)) && (
        <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.02]">
          {renderVisualContent()}
        </div>
      )}

      {isVideoSlot && !videoError ? (
        <video
          src={assetId.startsWith('/') ? assetId : `/assets/lifestyle/${assetId}`}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            videoLoaded ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
          }`}
        />
      ) : (
        !isVideoSlot &&
        !imageError && (
          <Image
            src={imageSrc}
            alt={alt}
            fill
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
            }`}
          />
        )
      )}

      {stepNumber && (
        <div className="absolute top-3.5 left-3.5 z-20 w-8 h-8 rounded-full bg-teal-950 text-white font-heading font-bold text-xs flex items-center justify-center shadow-sm">
          {stepNumber}
        </div>
      )}
    </div>
  );
}
