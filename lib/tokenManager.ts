// lib/tokenManager.ts

let accessToken: string | null = null;
let refreshToken: string | null = null;

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token: string) {
  accessToken = token;
}

export function getRefreshToken() {
  return refreshToken;
}

export function setRefreshToken(token: string) {
  refreshToken = token;
}