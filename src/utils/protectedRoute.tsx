import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoutes: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoutes }) => {
  const { currentUser } = useAuth();
  const location = useLocation();



  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoutes.includes(currentUser.role)) {
    alert("you don't have permission");
    const redirectPath = `/${currentUser.role.toLowerCase()}`;
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
