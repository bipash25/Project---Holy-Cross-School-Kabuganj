import { ReactNode } from "react";
import AdminNav from "./AdminNav";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <div className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900">
          <AdminNav />
        </div>
        <main className="flex-1 ml-64 p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
