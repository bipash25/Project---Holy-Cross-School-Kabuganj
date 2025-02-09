import { createContext, useContext, useState, useEffect } from "react";
import type { AdminUser } from "@/types/admin";
import {
  loginAdmin,
  logoutAdmin,
  getAdminSession,
  validateAdminSession,
} from "@/lib/admin";

type AuthContextType = {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const session = getAdminSession();
      if (session) {
        const isValid = await validateAdminSession();
        if (isValid) {
          setIsAuthenticated(true);
          setUser(session.user);
        }
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const session = await loginAdmin(email, password);
    setIsAuthenticated(true);
    setUser(session.user);
  };

  const logout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
