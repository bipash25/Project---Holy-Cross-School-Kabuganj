import { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Card } from "../../ui/card";
import { Input } from "../../ui/input";
import { useToast } from "../../ui/use-toast";
import { Search } from "lucide-react";
import { supabase } from "@/lib/supabase";

const AchievementsManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(data?.map((item) => item.category) || []),
      );
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error loading achievements:", error);
      toast({
        title: "Error",
        description: "Failed to load achievements",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Achievements</h2>
            <p className="text-muted-foreground">Manage school achievements</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search achievements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded-md min-w-[150px]"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-6">
          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, index) => (
                <Card key={index} className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-6 w-2/3 bg-gray-200 rounded" />
                    <div className="space-y-2">
                      <div className="h-4 w-1/4 bg-gray-200 rounded" />
                      <div className="h-4 w-full bg-gray-200 rounded" />
                      <div className="h-4 w-3/4 bg-gray-200 rounded" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-8 w-24 bg-gray-200 rounded" />
                      <div className="h-8 w-24 bg-gray-200 rounded" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">{/* Achievement items */}</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AchievementsManager;
