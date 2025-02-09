import { supabase } from "./supabase";
import type { AdminSession } from "@/types/admin";

export async function loginAdmin(
  email: string,
  password: string,
): Promise<AdminSession> {
  const { data, error } = await supabase.rpc("handle_admin_login", {
    email,
    password,
  });

  if (error) throw new Error(error.message);
  if (!data.success) throw new Error(data.message);

  // Store session
  localStorage.setItem("admin_session", JSON.stringify(data));

  return data;
}

export async function logoutAdmin(): Promise<void> {
  localStorage.removeItem("admin_session");
}

export function getAdminSession(): AdminSession | null {
  const session = localStorage.getItem("admin_session");
  return session ? JSON.parse(session) : null;
}

export async function validateAdminSession(): Promise<boolean> {
  const session = getAdminSession();
  if (!session) return false;

  try {
    const { data, error } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", session.user.id)
      .eq("is_active", true)
      .single();

    if (error || !data) {
      localStorage.removeItem("admin_session");
      return false;
    }

    return true;
  } catch {
    localStorage.removeItem("admin_session");
    return false;
  }
}
