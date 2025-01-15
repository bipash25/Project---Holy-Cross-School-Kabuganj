import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useAuth } from "./auth-context";
import { LogOut, Users, BookOpen, Calendar, Bell } from "lucide-react";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/management-portal-hcsk-x8k9z2/login");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center"
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex flex-col items-center space-y-2">
              <Users className="h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-semibold">Students</h3>
              <p className="text-3xl font-bold">1,234</p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex flex-col items-center space-y-2">
              <BookOpen className="h-8 w-8 text-green-600" />
              <h3 className="text-xl font-semibold">Classes</h3>
              <p className="text-3xl font-bold">48</p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex flex-col items-center space-y-2">
              <Calendar className="h-8 w-8 text-purple-600" />
              <h3 className="text-xl font-semibold">Events</h3>
              <p className="text-3xl font-bold">12</p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex flex-col items-center space-y-2">
              <Bell className="h-8 w-8 text-yellow-600" />
              <h3 className="text-xl font-semibold">Notifications</h3>
              <p className="text-3xl font-bold">25</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add more admin features here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
