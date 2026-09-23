'use client';

import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquareHeart } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="w-12 h-12 rounded-2xl bg-coral-50 text-coral-500 flex items-center justify-center mx-auto mb-4">
            <MessageSquareHeart className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-teal-900 tracking-tight">
            Share Your Wipeband Experience
          </h1>
          <p className="mt-3 text-base text-ink/80 max-w-md mx-auto">
            Your real-world routines help us refine designs, patterns, and new ideas.
          </p>
        </div>

        {submitted ? (
          <div className="p-10 rounded-3xl bg-[#EEF7EA] border border-teal-700/10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-heading font-black text-2xl text-teal-900">
              Thank You for Your Feedback!
            </h2>
            <p className="text-sm text-ink/75 max-w-sm mx-auto">
              We appreciate you taking the time to share your perspective. It directly informs how we improve Wipeband for families everywhere.
            </p>
            <div className="pt-2">
              <Button href="/" variant="primary" size="md">
                Return to Home
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-3xl bg-offwhite border border-border shadow-sm space-y-6"
          >
            {/* Rating */}
            <div>
              <label className="block text-xs font-bold text-teal-900 mb-2">
                Overall Experience Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 focus:outline-none"
                    aria-label={`Rate ${star} out of 5 stars`}
                  >
                    <Star
                      className={`w-7 h-7 transition-colors ${
                        star <= rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-transparent text-gray-300 hover:text-amber-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Who are you */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-teal-900 mb-1">
                  You are a...
                </label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-700">
                  <option>Parent or Guardian</option>
                  <option>Teacher or Educator</option>
                  <option>Grandparent or Relative</option>
                  <option>Gift Giver</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-teal-900 mb-1">
                  Child&apos;s Age Group
                </label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-700">
                  <option>2 - 3 years old</option>
                  <option>4 - 5 years old</option>
                  <option>6 - 8 years old</option>
                  <option>9+ years old</option>
                </select>
              </div>
            </div>

            {/* Where used */}
            <div>
              <label className="block text-xs font-bold text-teal-900 mb-1">
                Where do they use Wipeband most often?
              </label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-700">
                <option>Preschool / Elementary School</option>
                <option>Sports, Playgrounds & Outdoors</option>
                <option>Travel, Car Rides & Outings</option>
                <option>Around the House & Bedtime</option>
              </select>
            </div>

            {/* Comments */}
            <div>
              <label className="block text-xs font-bold text-teal-900 mb-1">
                What do you or your child like most about Wipeband?
              </label>
              <textarea
                rows={3}
                placeholder="He loves wearing it like his dad's watch..."
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-teal-900 mb-1">
                What could make Wipeband even better?
              </label>
              <textarea
                rows={3}
                placeholder="More patterns, animal designs, larger pack sizes..."
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
              />
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth>
              Submit Feedback
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
