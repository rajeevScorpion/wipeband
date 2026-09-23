import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!data.feedbackType || !data.message) {
      return NextResponse.json({ error: 'Feedback type and message are required.' }, { status: 400 });
    }
    return NextResponse.json({
      success: true,
      message: 'Thank you for your feedback! It helps us make Wipeband even better.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to record feedback.' }, { status: 500 });
  }
}
