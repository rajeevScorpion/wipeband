import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!data.email || !data.message) {
      return NextResponse.json({ error: 'Email and message are required.' }, { status: 400 });
    }
    // In production, send via email or CRM
    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting Wipeband! Our team will get back to you shortly.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to process inquiry.' }, { status: 500 });
  }
}
