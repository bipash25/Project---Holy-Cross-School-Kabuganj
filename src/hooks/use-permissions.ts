import { useAuth } from "@/components/admin/auth-context";

type Permission =
  | "manage_admins"
  | "manage_content"
  | "manage_settings"
  | "manage_students";

export function usePermissions() {
  const { user } = useAuth();

  const permissions: Record<Permission, boolean> = {
    manage_admins: user?.role === "super_admin",
    manage_content: true, // Both roles can manage content
    manage_settings: user?.role === "super_admin",
    manage_students: true, // Both roles can manage students
  };

  const can = (permission: Permission): boolean => {
    return permissions[permission] ?? false;
  };

  return { can };
}
