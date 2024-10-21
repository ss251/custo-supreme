// lib/tokenManager.ts

import { kv } from '@vercel/kv';

export async function getAccessToken() {
  return await kv.get('zoho_access_token');
}

export async function setAccessToken(token: string) {
  await kv.set('zoho_access_token', token, { ex: 3600 }); // Set expiration to 1 hour
}

export async function getRefreshToken() {
  return await kv.get('zoho_refresh_token');
}

export async function setRefreshToken(token: string) {
  await kv.set('zoho_refresh_token', token);
}
