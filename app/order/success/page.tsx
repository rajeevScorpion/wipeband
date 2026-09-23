'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, PackageCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function SessionInfo() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  if (!sessionId) return null;

  return (
    <div className="p-4 bg-offwhite rounded-2xl border border-border text-xs text-muted font-mono break-all">
      Session ID: {sessionId}
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="py-20 sm:py-32 bg-white">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-green-600 mx-auto mb-2">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl font-black text-teal-900 tracking-tight">
          Thank you for your order!
        </h1>

        <p className="text-lg text-ink/80 leading-relaxed">
          Your Wipeband direct order has been received and is being prepared for fulfillment.
        </p>

        <Suspense fallback={null}>
          <SessionInfo />
        </Suspense>

        <div className="p-6 rounded-3xl bg-[#EEF7EA] border border-teal-700/10 text-left space-y-3">
          <div className="flex items-center gap-2 font-heading font-bold text-teal-900 text-sm">
            <PackageCheck className="w-5 h-5 text-green-700" />
            <span>What happens next:</span>
          </div>
          <p className="text-xs text-ink/75 leading-relaxed">
            1. You will receive an order confirmation email with your purchase receipt.
          </p>
          <p className="text-xs text-ink/75 leading-relaxed">
            2. Once your package ships, a tracking number will be emailed to your inbox.
          </p>
          <p className="text-xs text-ink/75 leading-relaxed">
            3. Have questions? Reach out anytime at support@wipeband.com.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Button href="/" variant="primary" size="md">
            Return Home
          </Button>
          <Button href="/track-order" variant="secondary" size="md">
            Track Order Status
          </Button>
        </div>
      </div>
    </div>
  );
}
