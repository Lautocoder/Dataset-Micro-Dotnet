// src/auth/PublicRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Loading from "@/components/common/Loading";

export default function PublicRoute() {
  const { isAuthenticated, loading } = useAuth();
  const { pathname } = useLocation();
  
  if (loading) return <Loading fullScreen={true} />; 

  if (isAuthenticated && pathname.startsWith("/login")) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
