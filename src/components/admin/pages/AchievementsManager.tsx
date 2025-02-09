import { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useToast } from "../../ui/use-toast";
import { Plus, Trash2, Trophy, Search, ArrowUpDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { DeleteConfirmDialog } from "../../ui/delete-confirm";

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image_url?: string;
}

type SortField = "date" | "title" | "category";
type SortOrder = "asc" | "desc";

const AchievementsManager = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [categories, setCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    image_url: "",
  });

  useEffect(() => {
    loadAchievements();
  }, [sortField, sortOrder]);

  const loadAchievements = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order(sortField, { ascending: sortOrder === "asc" });

      if (error) throw error;
      setAchievements(data || []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("achievements").insert([formData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Achievement has been added successfully",
      });

      setIsDialogOpen(false);
      setFormData({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        category: "",
        image_url: "",
      });
      loadAchievements();
    } catch (error) {
      console.error("Error adding achievement:", error);
      toast({
        title: "Error",
        description: "Failed to add achievement",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("achievements")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Achievement has been deleted successfully",
      });
      loadAchievements();
    } catch (error) {
      console.error("Error deleting achievement:", error);
      toast({
        title: "Error",
        description: "Failed to delete achievement",
        variant: "destructive",
      });
    } finally {
      setItemToDelete(null);
    }
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const filteredAchievements = achievements.filter((achievement) => {
    const matchesSearch =
      achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || achievement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Achievements</h1>
            <p className="text-muted-foreground">
              Manage school achievements and accolades
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Achievement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Achievement</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* ... (form content remains the same) ... */}
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter Controls */}
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

        {/* Sort Controls */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSort("date")}
            className="flex items-center gap-1"
          >
            Date
            <ArrowUpDown
              className={`h-4 w-4 ${sortField === "date" ? "text-primary" : "text-muted-foreground"}`}
            />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSort("title")}
            className="flex items-center gap-1"
          >
            Title
            <ArrowUpDown
              className={`h-4 w-4 ${sortField === "title" ? "text-primary" : "text-muted-foreground"}`}
            />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSort("category")}
            className="flex items-center gap-1"
          >
            Category
            <ArrowUpDown
              className={`h-4 w-4 ${sortField === "category" ? "text-primary" : "text-muted-foreground"}`}
            />
          </Button>
          <p className="text-sm text-muted-foreground ml-2 self-center">
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredAchievements.map((achievement) => (
            <Card key={achievement.id} className="overflow-hidden">
              {achievement.image_url && (
                <img
                  src={achievement.image_url}
                  alt={achievement.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      {achievement.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Trophy className="h-4 w-4" />
                      <span>{achievement.category}</span>
                      <span>•</span>
                      <span>
                        {new Date(achievement.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setItemToDelete(achievement.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {achievement.description}
                </p>
              </div>
            </Card>
          ))}

          {filteredAchievements.length === 0 && (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No achievements found
            </div>
          )}
        </div>

        <DeleteConfirmDialog
          open={!!itemToDelete}
          onOpenChange={(open) => !open && setItemToDelete(null)}
          onConfirm={() => itemToDelete && handleDelete(itemToDelete)}
          title="Delete Achievement"
          description="Are you sure you want to delete this achievement? This action cannot be undone."
        />
      </div>
    </AdminLayout>
  );
};

export default AchievementsManager;
