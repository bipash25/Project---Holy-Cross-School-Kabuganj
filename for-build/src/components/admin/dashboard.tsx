import { useState, useEffect } from "react";
import AdminLayout from "./layout/AdminLayout";
import { Card } from "../ui/card";
import { Users, BookOpen, Trophy } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalAchievements: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalTeachers: 0,
    totalAchievements: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data: schoolStats } = await supabase
          .from("school_stats")
          .select("total_students, total_teachers")
          .single();

        const { count: achievementsCount } = await supabase
          .from("achievements")
          .select("*", { count: "exact", head: true });

        setStats({
          totalStudents: schoolStats?.total_students || 0,
          totalTeachers: schoolStats?.total_teachers || 0,
          totalAchievements: achievementsCount || 0,
        });
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      }
    };

    loadStats();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Total Students</h3>
              <p className="text-3xl font-bold text-blue-600">
                {stats.totalStudents}
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center">
              <BookOpen className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Total Teachers</h3>
              <p className="text-3xl font-bold text-green-600">
                {stats.totalTeachers}
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center">
              <Trophy className="h-12 w-12 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Achievements</h3>
              <p className="text-3xl font-bold text-yellow-600">
                {stats.totalAchievements}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
