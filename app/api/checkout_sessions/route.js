import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  try {
    console.log('Creating subscription checkout session...');
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const session = await stripe.checkout.sessions.create({
        custpmer: user.id,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID, // Make sure this is a recurring price ID
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${baseUrl}/?success=true`,
      cancel_url: `${baseUrl}/?canceled=true`,
      automatic_tax: { enabled: true },
      allow_promotion_codes: true,
    });
    
    console.log('Subscription checkout session created:', session.id);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Error creating subscription checkout session:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}