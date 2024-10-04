// lib/tokenManager.ts

import fs from 'fs';
import path from 'path';

const tokenFilePath = path.resolve(process.cwd(), 'zoho_tokens.json');

interface Tokens {
  accessToken: string | null;
  refreshToken: string | null;
}

function readTokens(): Tokens {
  try {
    const data = fs.readFileSync(tokenFilePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { accessToken: null, refreshToken: null };
  }
}

function writeTokens(tokens: Tokens) {
  fs.writeFileSync(tokenFilePath, JSON.stringify(tokens));
}

let { accessToken, refreshToken } = readTokens();

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token: string) {
  accessToken = token;
  writeTokens({ accessToken, refreshToken });
}

export function getRefreshToken() {
  return refreshToken;
}

export function setRefreshToken(token: string) {
  refreshToken = token;
  writeTokens({ accessToken, refreshToken });
}