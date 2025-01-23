import { useState } from "react";
import AdminNav from "./AdminNav";
import { Button } from "../../ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Nav Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-gray-900 text-white z-50 flex items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-white hover:bg-gray-800"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label="Toggle admin navigation"
          aria-expanded={isNavOpen}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle admin navigation menu</span>
        </Button>
        <h1 className="ml-4 font-bold">Admin Panel</h1>
      </div>

      {/* Backdrop */}
      {isNavOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Navigation */}
      <div
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 w-64 bg-gray-900 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isNavOpen ? "translate-x-0" : "-translate-x-full",
        )}
        role="navigation"
        aria-label="Admin navigation"
      >
        <AdminNav onNavItemClick={() => setIsNavOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 pt-16 lg:pt-0">
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
