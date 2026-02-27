// src/api/routes/auth.api.js
import { apiClient } from "../client";
import type { SignInType } from "../../types/SignInType";
import type { SignUpType } from "../../types/SignUpType";


/** * POST /api/v1/auths/signup
 * Body: { email, password, confirmPassword }
 * Response: { data: { message } }
 */
 export async function signUp({ email, password, confirmPassword }: SignUpType) {
  const res = await apiClient.post("/auths/signup", { email, password, confirmPassword });
  return res.data;
}

/**
 * POST /api/v1/auths/signin
 * Body: { username, password }
 * Response: { data: { message, accessToken } } 
 * + Set-Cookie refreshToken (HttpOnly) côté serveur
 */
export async function signIn({ email, password }: SignInType) {
  const res = await apiClient.post("/auths/signin", { email, password });
  return res.data;
}

/**
 * POST /api/v1/auths/refresh-token
 * Pas de body. Le refresh token est envoyé automatiquement via cookie HttpOnly
 * Response: { accessToken, message }
 */
export async function refreshAccessToken() {
  const res = await apiClient.post("/auths/refresh-token");
  
  return res.data;
}

/**
 * POST /api/v1/auths/signout
 * Supprime le cookie refresh côté serveur
 */
export async function signOut() {
  const res = await apiClient.post("/auths/signout");
  return res.data;
}

/**
 * OPTIONNEL si tu as un endpoint /me ou /profile
 * Ex: GET /api/v1/users/me
 */
export async function getMe() {
  const res = await apiClient.get("/auths/profile");
  return res.data;
}
