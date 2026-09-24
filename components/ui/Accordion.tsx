'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
              className="w-full flex items-center justify-between text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 rounded-xl p-1 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-heading font-bold text-lg sm:text-xl text-teal-900 group-hover:text-teal-700 transition-colors pr-4">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className={`p-1.5 rounded-full transition-colors shrink-0 ${
                  isOpen ? 'bg-teal-700 text-white shadow-sm' : 'bg-teal-50 text-teal-800 group-hover:bg-teal-100'
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 pb-2 text-ink/80 text-base leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
