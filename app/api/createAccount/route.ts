// app/api/createAccount/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken, setAccessToken, getRefreshToken } from '@/lib/tokenManager';

const clientId = process.env.ZOHO_CLIENT_ID!;
const clientSecret = process.env.ZOHO_CLIENT_SECRET!;

export async function POST(request: NextRequest) {
  const bookingDetails = await request.json();

  let accessToken = getAccessToken();

  if (!accessToken) {
    accessToken = await refreshAccessToken();
    if (!accessToken) {
      return NextResponse.json({ error: 'Failed to obtain access token' }, { status: 500 });
    }
  }

  const leadData = {
    data: [
      {
        Company: bookingDetails.companyName,
        Last_Name: bookingDetails.name || 'Unknown',
        Email: bookingDetails.email,
        Phone: bookingDetails.phoneNumber,
        Description: bookingDetails.additionalInfo || '',
        Address: bookingDetails.companyAddress || '',
        Additional_Info: bookingDetails.additionalInfo || '',
      },
    ],
  };

  let response = await fetch('https://www.zohoapis.com/crm/v3/Leads', {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(leadData),
  });

  if (response.status === 401) {
    // Access token may have expired; refresh it
    accessToken = await refreshAccessToken();
    if (!accessToken) {
      return NextResponse.json({ error: 'Failed to refresh access token' }, { status: 500 });
    }

    // Retry the request with the new access token
    response = await fetch('https://www.zohoapis.com/crm/v3/Leads', {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });
  }

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error creating lead:', errorData);
    return NextResponse.json(
      { success: false, error: 'Failed to create lead in Zoho CRM.' },
      { status: response.status }
    );
  }

  const responseData = await response.json();
  return NextResponse.json({ success: true, data: responseData });
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    console.error('Refresh token not available');
    return null;
  }

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
  });

  const response = await fetch('https://accounts.zoho.com/oauth/v2/token', {
    method: 'POST',
    body: params,
  });

  const data = await response.json();

  if (data.error) {
    console.error('Error refreshing access token:', data);
    return null;
  }

  // Update the access token in memory
  setAccessToken(data.access_token);

  return data.access_token;
}