// src/api/client.js
import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { GATEWAY_URL } from "../config/env";

// --- Types utiles ---
export type RefreshResponse = {
  accessToken?: string;
  message?: string;
};

type RetryAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type QueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

export const apiClient: AxiosInstance = axios.create({
  baseURL: GATEWAY_URL,
  timeout: 20000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Gestion du rafraîchissement atomique
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token as string);
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;

    // Si pas de requête originale, on rejette directement
    if (!originalRequest) return Promise.reject(error);

    const status = error.response?.status;
    const url = originalRequest.url || "";

    // Évite les boucles infinies pour les appels de login
    const isLoginCall = url.includes("/auths/signin");
    if (status === 401 && !originalRequest._retry && !isLoginCall) {
      // Gestion du rafraîchissement du token
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Appel pour rafraîchir le token
        const res = await axios.post<RefreshResponse>(
          `${GATEWAY_URL}/auths/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newToken = res.data?.accessToken;
        if (!newToken) {
          throw new Error("Refresh succeeded but no token returned by server");
        }

        // Définit le token par défaut pour les prochaines requêtes
        apiClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;

        // Débloque la queue
        processQueue(null, newToken);

        // Relance la requête originale
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        // Prévenir l'app que la session est morte
        window.dispatchEvent(new Event("auth-session-expired"));
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
