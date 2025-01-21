import { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useToast } from "../../ui/use-toast";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { GraduationCap, Users, Trophy, Edit, Plus } from "lucide-react";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    setLoading(true);

    try {
      const { error } = await supabase
        .from("school_stats")
        .upsert([{ ...stats, id: stats?.id || "1" }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Statistics have been updated successfully",
      });
      setIsDialogOpen(false);
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

  const handleChange = (key: keyof SchoolStats, value: number) => {
    setStats((prev) => (prev ? { ...prev, [key]: value } : null));
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
            <h2 className="text-3xl font-bold">Academic Statistics</h2>
            <p className="text-muted-foreground">
              Manage school statistics and achievements
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Edit className="h-4 w-4 mr-2" /> Edit Statistics
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Statistics</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Total Students</Label>
                    <Input
                      type="number"
                      value={stats.total_students}
                      onChange={(e) =>
                        handleChange("total_students", parseInt(e.target.value))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Total Teachers</Label>
                    <Input
                      type="number"
                      value={stats.total_teachers}
                      onChange={(e) =>
                        handleChange("total_teachers", parseInt(e.target.value))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Total Staff</Label>
                    <Input
                      type="number"
                      value={stats.total_staff}
                      onChange={(e) =>
                        handleChange("total_staff", parseInt(e.target.value))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Years of Excellence</Label>
                    <Input
                      type="number"
                      value={stats.years_of_excellence}
                      onChange={(e) =>
                        handleChange(
                          "years_of_excellence",
                          parseInt(e.target.value),
                        )
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Success Rate (%)</Label>
                    <Input
                      type="number"
                      value={stats.success_rate}
                      onChange={(e) =>
                        handleChange("success_rate", parseInt(e.target.value))
                      }
                      required
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>District Toppers</Label>
                    <Input
                      type="number"
                      value={stats.district_toppers}
                      onChange={(e) =>
                        handleChange(
                          "district_toppers",
                          parseInt(e.target.value),
                        )
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sports Medals</Label>
                    <Input
                      type="number"
                      value={stats.sports_medals}
                      onChange={(e) =>
                        handleChange("sports_medals", parseInt(e.target.value))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Cultural Awards</Label>
                    <Input
                      type="number"
                      value={stats.cultural_awards}
                      onChange={(e) =>
                        handleChange(
                          "cultural_awards",
                          parseInt(e.target.value),
                        )
                      }
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Total Students</h3>
              <p className="text-3xl font-bold text-blue-600">
                {stats.total_students}
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center">
              <GraduationCap className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Success Rate</h3>
              <p className="text-3xl font-bold text-green-600">
                {stats.success_rate}%
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center">
              <Trophy className="h-12 w-12 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">District Toppers</h3>
              <p className="text-3xl font-bold text-yellow-600">
                {stats.district_toppers}
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Total Staff</h3>
              <p className="text-3xl font-bold text-purple-600">
                {stats.total_staff}
              </p>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Detailed Statistics</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Years of Excellence</TableCell>
                <TableCell>{stats.years_of_excellence}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sports Medals</TableCell>
                <TableCell>{stats.sports_medals}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cultural Awards</TableCell>
                <TableCell>{stats.cultural_awards}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Science Fair Wins</TableCell>
                <TableCell>{stats.science_fair_wins}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AcademicsManager;
