import { ReactNode, useState } from "react";
import AdminNav from "./AdminNav";
import { Button } from "../../ui/button";
import { Menu } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Mobile sidebar toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Sidebar */}
        <div
          className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            fixed md:static left-0 top-0 bottom-0 w-64 bg-gray-900 
            transition-transform duration-200 ease-in-out z-40 md:translate-x-0
            ${sidebarOpen ? "shadow-lg" : ""}`}
        >
          <AdminNav onNavItemClick={() => setSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <main
          className={`flex-1 p-4 md:p-8 w-full transition-all duration-200
            ${sidebarOpen ? "md:ml-64" : ""}
            ${sidebarOpen ? "blur-sm md:blur-none" : ""}`}
        >
          <div className="max-w-7xl mx-auto space-y-6 pt-12 md:pt-0">
            {children}
          </div>
        </main>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminLayout;
