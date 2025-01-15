import { Navigate } from "react-router-dom";
import { useAuth } from "./auth-context";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/management-portal-hcsk-x8k9z2/login" replace />;
  }

  return <>{children}</>;
}
