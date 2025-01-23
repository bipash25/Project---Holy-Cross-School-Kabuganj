import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import {
  LogOut,
  LayoutDashboard,
  Users,
  Bell,
  Image,
  FileText,
  Settings,
  School,
  Trophy,
  Calendar,
} from "lucide-react";
import { useAuth } from "../auth-context";

interface AdminNavProps {
  onNavItemClick?: () => void;
}

const AdminNav = ({ onNavItemClick }: AdminNavProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      path: "/management-portal-hcsk/dashboard",
    },
    {
      icon: <Bell className="h-5 w-5" />,
      label: "News & Events",
      path: "/management-portal-hcsk/news",
    },
    {
      icon: <Image className="h-5 w-5" />,
      label: "Media Gallery",
      path: "/management-portal-hcsk/media",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Students",
      path: "/management-portal-hcsk/students",
    },
    {
      icon: <School className="h-5 w-5" />,
      label: "Academics",
      path: "/management-portal-hcsk/academics",
    },
    {
      icon: <Trophy className="h-5 w-5" />,
      label: "Achievements",
      path: "/management-portal-hcsk/achievements",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Events Calendar",
      path: "/management-portal-hcsk/calendar",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Content",
      path: "/management-portal-hcsk/content",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      path: "/management-portal-hcsk/settings",
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onNavItemClick?.();
  };

  const handleLogout = async () => {
    await logout();
    navigate("/management-portal-hcsk/login");
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="mb-8 mt-4 lg:mt-0">
        <h2 className="text-xl font-bold text-white">Admin Panel</h2>
        <p className="text-sm text-gray-400">Holy Cross School</p>
      </div>

      <nav className="flex-1 -mx-2">
        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <li key={index}>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:text-white hover:bg-gray-800"
                onClick={() => handleNavigation(item.path)}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <Button
        variant="ghost"
        onClick={handleLogout}
        className="w-full justify-start text-white hover:text-white hover:bg-gray-800 mt-auto"
      >
        <LogOut className="h-5 w-5 mr-2" />
        Logout
      </Button>
    </div>
  );
};

export default AdminNav;
