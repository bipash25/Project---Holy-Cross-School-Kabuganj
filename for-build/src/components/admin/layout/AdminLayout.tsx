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
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Admin Sidebar */}
        <div
          className={`
            fixed md:static left-0 top-0 bottom-0 w-64 bg-gray-900 
            transition-transform duration-200 ease-in-out z-40
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            ${sidebarOpen ? "shadow-lg md:shadow-none" : ""}
          `}
        >
          <AdminNav onNavItemClick={() => setSidebarOpen(false)} />
        </div>

        {/* Main Content Area */}
        <main
          className={`
            flex-1 w-full min-h-screen
            transition-all duration-200 ease-in-out
            p-4 md:p-8
            ${sidebarOpen ? "md:ml-64" : ""}
            ${sidebarOpen ? "blur-sm md:blur-none" : ""}
          `}
        >
          <div className="max-w-7xl mx-auto space-y-6 pt-12 md:pt-0">
            {children}
          </div>
        </main>

        {/* Mobile Overlay */}
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
