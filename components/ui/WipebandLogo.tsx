'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function WipebandLogo({ className = '', size = 'md' }: LogoProps) {
  const [useFallback, setUseFallback] = useState(false);

  const heights = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-11',
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 rounded-md select-none ${className}`}
      aria-label="Wipeband Home"
    >
      {!useFallback ? (
        /* Automatically attempts to load custom logo file if placed in /public/assets/branding/wipeband_logo.svg */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="/assets/branding/wipeband_logo.svg"
          alt="Wipeband"
          className={`${heights[size]} w-auto object-contain`}
          onError={() => setUseFallback(true)}
        />
      ) : (
        /* Built-in Brand Vector SVG Fallback */
        <svg
          className={`${heights[size]} w-auto select-none`}
          viewBox="0 0 200 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Playful curved bubble letters for WIPEBAND */}
          {/* W */}
          <path
            d="M6 10 C6 7, 10 5, 13 5 C16 5, 18 8, 19 12 L22 28 L26 12 C27 8, 29 5, 32 5 C35 5, 39 7, 39 10 L35 38 C35 41, 31 43, 28 43 C25 43, 22 41, 21 37 L18 22 L15 37 C14 41, 11 43, 8 43 C5 43, 2 41, 2 38 Z"
            fill="#F57642"
          />
          {/* I */}
          <rect x="43" y="12" width="7" height="31" rx="3.5" fill="#F57642" />
          <circle cx="46.5" cy="6" r="3.5" fill="#F57642" />
          {/* P */}
          <path
            d="M55 12 C55 8, 59 5, 64 5 C72 5, 77 9, 77 17 C77 25, 72 29, 64 29 L62 29 L62 40 C62 42, 59 43, 55 43 L55 12 Z M62 12 L62 22 L64 22 C67 22, 70 20, 70 17 C70 14, 67 12, 64 12 Z"
            fill="#F57642"
          />
          {/* E */}
          <path
            d="M83 12 C83 8, 86 5, 90 5 L102 5 C104 5, 106 7, 106 9 C106 11, 104 13, 102 13 L90 13 L90 20 L99 20 C101 20, 103 22, 103 24 C103 26, 101 28, 99 28 L90 28 L90 35 L102 35 C104 35, 106 37, 106 39 C106 41, 104 43, 102 43 L90 43 C86 43, 83 40, 83 36 Z"
            fill="#F57642"
          />

          {/* B */}
          <path
            d="M113 7 C113 5, 116 5, 118 5 L129 5 C135 5, 139 8, 139 14 C139 18, 136 21, 132 22 C137 23, 140 27, 140 33 C140 40, 135 43, 128 43 L118 43 C115 43, 113 41, 113 38 Z M120 12 L120 20 L128 20 C131 20, 133 18, 133 15 C133 12, 131 11, 128 11 Z M120 27 L120 36 L128 36 C132 36, 134 34, 134 31 C134 28, 132 27, 128 27 Z"
            fill="#4FB3A8"
          />
          {/* A */}
          <path
            d="M148 43 L153 10 C154 6, 157 5, 160 5 C163 5, 166 6, 167 10 L172 43 C172 45, 170 46, 167 46 C164 46, 163 44, 162 40 L160 30 L158 30 L156 40 C155 44, 153 46, 150 46 C147 46, 146 45, 148 43 Z M159 15 L158 24 L161 24 Z"
            fill="#4FB3A8"
          />
          {/* N */}
          <path
            d="M178 7 C178 5, 180 5, 182 5 C184 5, 186 6, 187 8 L194 28 L194 8 C194 6, 196 5, 198 5 C200 5, 202 6, 202 8 L202 41 C202 43, 200 44, 198 44 C196 44, 194 43, 193 41 L186 21 L186 41 C186 43, 184 44, 182 44 C180 44, 178 43, 178 41 Z"
            fill="#4FB3A8"
          />
          {/* D */}
          <path
            d="M208 7 C208 5, 210 5, 213 5 C222 5, 228 11, 228 24 C228 37, 222 43, 213 43 C210 43, 208 42, 208 40 Z M215 13 L215 35 C220 35, 222 30, 222 24 C222 17, 220 13, 215 13 Z"
            fill="#4FB3A8"
          />

          {/* Playful horizontal stripe in green accent */}
          <rect x="18" y="24" width="75" height="3.5" rx="1.75" fill="#62B44A" opacity="0.9" />
          <rect x="115" y="24" width="105" height="3.5" rx="1.75" fill="#62B44A" opacity="0.9" />
        </svg>
      )}
    </Link>
  );
}
