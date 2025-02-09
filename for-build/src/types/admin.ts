export interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
  last_login: string | null;
  created_at: string;
}

export interface AdminSession {
  user: AdminUser;
  token: string;
}
