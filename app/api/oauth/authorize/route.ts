// app/api/oauth/authorize/route.ts

import { NextRequest, NextResponse } from 'next/server';

const clientId = process.env.ZOHO_CLIENT_ID!;
const redirectUri = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/oauth/callback' : 'https://www.custosupreme.com/api/oauth/callback';

export async function GET(request: NextRequest) {
  const scope = 'ZohoCRM.modules.ALL';
  const authUrl = `https://accounts.zoho.com/oauth/v2/auth?scope=${encodeURIComponent(
    scope
  )}&client_id=${clientId}&response_type=code&access_type=offline&redirect_uri=${encodeURIComponent(
    redirectUri
  )}`;
  return NextResponse.redirect(authUrl);
}