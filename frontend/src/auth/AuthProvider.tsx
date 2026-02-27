// src/auth/AuthProvider.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { apiClient } from "../api/client";
import { getMe, refreshAccessToken, signIn, signOut } from "../api/routes/auth.api";

import { toast } from "sonner";
import type { SignInType } from "@/types/SignInType";
import type { User } from "../types/User";



type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: SignInType) => Promise<unknown>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 15 minutes
  const IDLE_TIMEOUT = 15 * 60 * 1000;

  const login = async (credentials: SignInType) => {
    const res: any = await signIn(credentials);

    const token = res?.accessToken;

    const userData = res?.data?.user ?? res?.user ?? null;

    if (token) apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    if (userData) setUser(userData);

    return res;
  };

  const logout = useCallback(async () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    try {
      await signOut();
    } finally {
      setUser(null);
      delete apiClient.defaults.headers.common.Authorization;
      setLoading(false);
    }
  }, []);

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    
    if (user) {
      idleTimerRef.current = setTimeout(() => {
        toast.warning("Session expirée", {
          description: "Votre session a expiré suite à une trop longue inactivité.",
        });
        logout();
      }, IDLE_TIMEOUT);
    }
  }, [user, logout, IDLE_TIMEOUT]);

  useEffect(() => {
    const activityEvents: Array<keyof WindowEventMap> = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
    ];

    if (user) {
      resetIdleTimer();
      activityEvents.forEach((event) => window.addEventListener(event, resetIdleTimer));
    }

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      activityEvents.forEach((event) => window.removeEventListener(event, resetIdleTimer));
    };
  }, [user, resetIdleTimer]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res: any = await refreshAccessToken();

        const token = res?.accessToken 

        if (token) {
          apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;

          const userData: any = await getMe();
          setUser(userData?.user ?? null);
        }
      } catch {
        // session absente/expirée
        setUser(null);
        delete apiClient.defaults.headers.common.Authorization;
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const handleExpire = () => {
      setUser(null);
      delete apiClient.defaults.headers.common.Authorization;
      setLoading(false);

      toast.error("Session expirée", {
        description: "Votre session a expiré. Veuillez vous reconnecter.",
      });
    };

    window.addEventListener("auth-session-expired", handleExpire);
    return () => window.removeEventListener("auth-session-expired", handleExpire);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      loading,
      login,
      logout,
    }),
    [user, loading, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé à l’intérieur de <AuthProvider />");
  return ctx;
}
