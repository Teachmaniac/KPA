import { NextResponse } from 'next/server';
import { getForms } from '@/lib/actions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get('phone');
  
  if (!phone) {
    return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
  }

  // In a real app, you would have proper authentication and authorization from a session.
  // Here we trust the phone number from the client, as it's set on login.
  try {
    const result = await getForms(phone);
    return NextResponse.json(result.forms);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch forms' }, { status: 500 });
  }
}
