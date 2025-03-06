import React from "react";

interface protectedRouteProps {
  children: React.ReactNode;
  allowedRoutes: string[];
}
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export function ProtectedRoute({
  children,
  allowedRoutes,
}: protectedRouteProps) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  if (currentUser === undefined) {
    return null;
  }
  if (!currentUser ) {
    navigate("/login");
  } else if (!allowedRoutes.includes(currentUser?.role)) {
    navigate("/unauthorized");
  }
  return children;
}
