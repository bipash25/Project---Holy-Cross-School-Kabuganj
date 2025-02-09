import { Navigate } from "react-router-dom";
import { useAuth } from "./auth-context";
import { usePermissions } from "@/hooks/use-permissions";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?:
    | "manage_admins"
    | "manage_content"
    | "manage_settings"
    | "manage_students";
}

export function ProtectedRoute({
  children,
  requiredPermission,
}: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const { can } = usePermissions();

  if (!isAuthenticated) {
    return <Navigate to="/management-portal-hcsk/login" replace />;
  }

  if (requiredPermission && !can(requiredPermission)) {
    return <Navigate to="/management-portal-hcsk/dashboard" replace />;
  }

  return <>{children}</>;
}
