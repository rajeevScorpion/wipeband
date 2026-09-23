import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const ALLOWED_PRICE_MAP: Record<string, string | undefined> = {
  'wipeband-starter-kit': process.env.STRIPE_PRICE_STARTER_KIT,
  'family-bundle': process.env.STRIPE_PRICE_FAMILY_BUNDLE,
  'tissue-refills': process.env.STRIPE_PRICE_REFILLS,
};

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided for checkout.' },
        { status: 400 }
      );
    }

    const secretKey = process.env.STRIPE_SECRET_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    if (!secretKey) {
      return NextResponse.json({
        configured: false,
        message: 'Stripe is currently in scaffold mode. Set STRIPE_SECRET_KEY and price IDs in environment variables to enable live payments.',
      });
    }

    const stripe = new Stripe(secretKey, {
      apiVersion: '2024-11-20.acacia' as any,
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const item of items) {
      const priceId = ALLOWED_PRICE_MAP[item.slug];
      if (!priceId) {
        return NextResponse.json(
          { error: `Missing Stripe Price ID configuration for product '${item.slug}'.` },
          { status: 400 }
        );
      }
      line_items.push({
        price: priceId,
        quantity: Math.max(1, Number(item.quantity) || 1),
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${siteUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart?canceled=true`,
    });

    return NextResponse.json({
      configured: true,
      url: session.url,
    });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to initiate checkout.' },
      { status: 500 }
    );
  }
}
