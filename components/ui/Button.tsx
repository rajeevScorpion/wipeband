'use client';

import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'amazon' | 'white' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  external?: boolean;
}

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  external = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-heading font-bold rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] select-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-sm px-4 py-2 min-h-[38px]',
    md: 'text-base px-6 py-3 min-h-[46px]',
    lg: 'text-lg px-8 py-4 min-h-[54px]',
  };

  const variantStyles = {
    primary:
      'bg-teal-700 hover:bg-teal-800 text-white shadow-sm hover:shadow-md focus-visible:ring-teal-700',
    secondary:
      'bg-teal-700/10 hover:bg-teal-700/15 text-teal-800 focus-visible:ring-teal-700',
    outline:
      'border-2 border-teal-700 text-teal-700 hover:bg-teal-700/5 focus-visible:ring-teal-700',
    amazon:
      'bg-teal-800 hover:bg-teal-900 text-white/95 focus-visible:ring-teal-800 border border-teal-700/40',
    white:
      'bg-white text-teal-800 hover:bg-offwhite shadow-sm hover:shadow-md focus-visible:ring-white',
    ghost:
      'text-teal-700 hover:bg-teal-50 focus-visible:ring-teal-700',
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const combined = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combined}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combined}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combined} {...props}>
      {children}
    </button>
  );
}
