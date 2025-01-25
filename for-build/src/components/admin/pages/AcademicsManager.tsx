import { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { useToast } from "../../ui/use-toast";
import { GraduationCap, Users, Trophy } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface SchoolStats {
  id: string;
  total_students: number;
  total_teachers: number;
  total_staff: number;
  years_of_excellence: number;
  success_rate: number;
  district_toppers: number;
  sports_medals: number;
  cultural_awards: number;
  science_fair_wins: number;
  updated_at: string;
}

const AcademicsManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<SchoolStats | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data, error } = await supabase
        .from("school_stats")
        .select("*")
        .single();

      if (error) throw error;
      setStats(data);
    } catch (error) {
      console.error("Error loading stats:", error);
      toast({
        title: "Error",
        description: "Failed to load academic statistics",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stats) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("school_stats")
        .upsert([{ ...stats, updated_at: new Date().toISOString() }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Academic statistics updated successfully",
      });
      loadStats();
    } catch (error) {
      console.error("Error updating stats:", error);
      toast({
        title: "Error",
        description: "Failed to update statistics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!stats) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <p className="text-muted-foreground">Loading statistics...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Academic Statistics</h1>
            <p className="text-muted-foreground">
              Manage school academic statistics
            </p>
          </div>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <Users className="h-8 w-8 text-blue-600 mt-1" />
              <div className="space-y-4 flex-1">
                <h2 className="text-xl font-semibold">Student Statistics</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">
                      Total Students
                    </label>
                    <input
                      type="number"
                      value={stats.total_students}
                      onChange={(e) =>
                        setStats({ ...stats, total_students: +e.target.value })
                      }
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Total Teachers
                    </label>
                    <input
                      type="number"
                      value={stats.total_teachers}
                      onChange={(e) =>
                        setStats({ ...stats, total_teachers: +e.target.value })
                      }
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Total Staff</label>
                    <input
                      type="number"
                      value={stats.total_staff}
                      onChange={(e) =>
                        setStats({ ...stats, total_staff: +e.target.value })
                      }
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <Trophy className="h-8 w-8 text-yellow-600 mt-1" />
              <div className="space-y-4 flex-1">
                <h2 className="text-xl font-semibold">Achievements</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">
                      District Toppers
                    </label>
                    <input
                      type="number"
                      value={stats.district_toppers}
                      onChange={(e) =>
                        setStats({
                          ...stats,
                          district_toppers: +e.target.value,
                        })
                      }
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Sports Medals</label>
                    <input
                      type="number"
                      value={stats.sports_medals}
                      onChange={(e) =>
                        setStats({ ...stats, sports_medals: +e.target.value })
                      }
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Cultural Awards
                    </label>
                    <input
                      type="number"
                      value={stats.cultural_awards}
                      onChange={(e) =>
                        setStats({ ...stats, cultural_awards: +e.target.value })
                      }
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <GraduationCap className="h-8 w-8 text-green-600 mt-1" />
              <div className="space-y-4 flex-1">
                <h2 className="text-xl font-semibold">Academic Performance</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">
                      Success Rate (%)
                    </label>
                    <input
                      type="number"
                      value={stats.success_rate}
                      onChange={(e) =>
                        setStats({ ...stats, success_rate: +e.target.value })
                      }
                      min="0"
                      max="100"
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Science Fair Wins
                    </label>
                    <input
                      type="number"
                      value={stats.science_fair_wins}
                      onChange={(e) =>
                        setStats({
                          ...stats,
                          science_fair_wins: +e.target.value,
                        })
                      }
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Years of Excellence
                    </label>
                    <input
                      type="number"
                      value={stats.years_of_excellence}
                      onChange={(e) =>
                        setStats({
                          ...stats,
                          years_of_excellence: +e.target.value,
                        })
                      }
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AcademicsManager;
