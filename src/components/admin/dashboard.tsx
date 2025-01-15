import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import AdminLayout from "./layout/AdminLayout";
import { Users, BookOpen, Calendar, Bell, Trophy, Image } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface SchoolStats {
  total_students: number;
  total_teachers: number;
  total_staff: number;
  years_of_excellence: number;
  success_rate: number;
  district_toppers: number;
  sports_medals: number;
  cultural_awards: number;
  science_fair_wins: number;
}

interface Activity {
  id: string;
  action: string;
  description: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<SchoolStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, activitiesData] = await Promise.all([
          supabase.from("school_stats").select("*").single(),
          supabase
            .from("activities")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(5),
        ]);

        if (statsData.error) throw statsData.error;
        setStats(statsData.data);
        setActivities(activitiesData.data || []);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const statCards = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      label: "Total Students",
      value: stats?.total_students.toString() || "0",
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      label: "Total Teachers",
      value: stats?.total_teachers.toString() || "0",
    },
    {
      icon: <Trophy className="h-8 w-8 text-yellow-600" />,
      label: "Success Rate",
      value: `${stats?.success_rate || 0}%`,
    },
    {
      icon: <BookOpen className="h-8 w-8 text-green-600" />,
      label: "Years of Excellence",
      value: stats?.years_of_excellence.toString() || "0",
    },
  ];

  const achievementStats = [
    {
      label: "District Toppers",
      value: stats?.district_toppers || 0,
    },
    {
      label: "Sports Medals",
      value: stats?.sports_medals || 0,
    },
    {
      label: "Cultural Awards",
      value: stats?.cultural_awards || 0,
    },
    {
      label: "Science Fair Wins",
      value: stats?.science_fair_wins || 0,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to the admin dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex flex-col items-center space-y-2">
                {stat.icon}
                <h3 className="text-xl font-semibold">{stat.label}</h3>
                {loading ? (
                  <div className="h-8 w-16 animate-pulse bg-muted rounded" />
                ) : (
                  <p className="text-3xl font-bold">{stat.value}</p>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Achievements</h3>
            <div className="grid grid-cols-2 gap-4">
              {achievementStats.map((stat, index) => (
                <div
                  key={index}
                  className="p-4 bg-muted rounded-lg text-center"
                >
                  <p className="text-2xl font-bold text-primary mb-1">
                    {loading ? (
                      <div className="h-8 w-16 mx-auto animate-pulse bg-muted rounded" />
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 animate-pulse"
                  >
                    <div className="h-2 w-2 bg-muted rounded-full" />
                    <div className="h-4 w-full bg-muted rounded" />
                  </div>
                ))}
              </div>
            ) : activities.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No recent activities
              </p>
            ) : (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 text-sm"
                  >
                    <span className="text-blue-600">•</span>
                    <span>{activity.description}</span>
                    <span className="text-muted-foreground ml-auto">
                      {new Date(activity.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
