import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check session on mount
    const session = localStorage.getItem("admin_session");
    if (session) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    // In a real app, use proper authentication. This is just for demo.
    const ADMIN_USERNAME = "admin@hcsk.edu";
    const ADMIN_PASSWORD = "HCSKAdmin@2024";

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_session", "true");
      setIsAuthenticated(true);
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = async () => {
    localStorage.removeItem("admin_session");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
