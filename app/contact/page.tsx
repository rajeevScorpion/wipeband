'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, HelpCircle, CheckCircle2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/site';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      orderNumber: formData.get('orderNumber'),
      topic: formData.get('topic'),
      message: formData.get('message'),
    };

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-heading font-black tracking-wider uppercase text-teal-700 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-700/10">
            We are here for you
          </span>
          <h1 className="mt-3 font-heading text-4xl sm:text-5xl font-black text-teal-900 tracking-tight">
            Contact Wipeband Support
          </h1>
          <p className="mt-3 text-lg text-ink/80 max-w-xl mx-auto">
            Questions about your order, product fit, or using Wipeband? Reach out anytime and our team will get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Left Info Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#EEF9FA] border border-teal-700/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-teal-800 shadow-sm">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="font-heading font-bold text-lg text-teal-900">
                Direct Email
              </h2>
              <p className="text-xs text-ink/75">
                For fastest assistance with order questions, shipping or returns:
              </p>
              <a
                href={`mailto:${SITE_CONFIG.supportEmail}`}
                className="text-base font-heading font-bold text-teal-800 hover:underline block"
              >
                {SITE_CONFIG.supportEmail}
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-offwhite border border-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-teal-800 shadow-sm">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="font-heading font-bold text-lg text-teal-900">
                Quick Answers
              </h2>
              <p className="text-xs text-ink/75">
                Check our FAQ section for instant guidance on refilling, sizing, and cleaning.
              </p>
              <Link
                href="/faq"
                className="text-xs font-heading font-bold text-teal-800 hover:text-green-600 transition-colors block"
              >
                Visit FAQ Page →
              </Link>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="md:col-span-7 bg-white p-8 rounded-3xl border border-border shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-600 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="font-heading font-black text-2xl text-teal-900">
                  Message Sent!
                </h2>
                <p className="text-sm text-ink/75 max-w-sm mx-auto">
                  Thank you for reaching out. We will review your inquiry and reply to your email address shortly.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="secondary"
                  size="sm"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-teal-900 mb-1">
                      Your Name *
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-teal-900 mb-1">
                      Email Address *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-teal-900 mb-1">
                      Order Number (Optional)
                    </label>
                    <input
                      name="orderNumber"
                      type="text"
                      placeholder="WB-12345"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-teal-900 mb-1">
                      Topic
                    </label>
                    <select
                      name="topic"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                    >
                      <option>Order Status / Shipping</option>
                      <option>Product Question / Fit</option>
                      <option>Returns & Exchanges</option>
                      <option>Wholesale / School Inquiries</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-teal-900 mb-1">
                    How can we help? *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us what you need help with..."
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
