import { Navigate } from "react-router-dom";
import { useAuth } from "./auth-context";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/management-portal-hcsk/login" replace />;
  }

  return <>{children}</>;
}
