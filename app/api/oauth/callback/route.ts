// app/api/oauth/callback/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { setAccessToken, setRefreshToken } from '@/lib/tokenManager';

const clientId = process.env.ZOHO_CLIENT_ID!;
const clientSecret = process.env.ZOHO_CLIENT_SECRET!;
const redirectUri = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/oauth/callback' : 'https://www.custosupreme.com/api/oauth/callback';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Authorization code not found' }, { status: 400 });
  }

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    code,
  });

  const response = await fetch('https://accounts.zoho.com/oauth/v2/token', {
    method: 'POST',
    body: params,
  });
  const data = await response.json();
  console.log(data);
  if (data.error) {
    console.error('Error exchanging code:', data);
    return NextResponse.json({ error: data.error }, { status: 400 });
  }

  // Store tokens in memory
  setAccessToken(data.access_token);
  setRefreshToken(data.refresh_token);

  return NextResponse.json({ message: 'Tokens obtained successfully' });
}