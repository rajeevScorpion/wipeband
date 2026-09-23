'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  question: string;
  answer: string | React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenIndex?: number;
  className?: string;
}

export function Accordion({ items, defaultOpenIndex = -1, className = '' }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpenIndex);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className={`divide-y divide-border border-y border-border ${className}`}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="py-4 sm:py-5">
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 rounded-lg p-1"
              aria-expanded={isOpen}
            >
              <span className="font-heading font-bold text-lg sm:text-xl text-teal-900 group-hover:text-teal-700 transition-colors pr-4">
                {item.question}
              </span>
              <span
                className={`p-1.5 rounded-full bg-teal-50 text-teal-800 transition-transform duration-200 shrink-0 ${
                  isOpen ? 'rotate-180 bg-teal-100 text-teal-900' : ''
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </span>
            </button>
            {isOpen && (
              <div className="pt-3 pb-2 text-ink/80 text-base leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
