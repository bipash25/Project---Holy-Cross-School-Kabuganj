import { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Card } from "../../ui/card";
import { useToast } from "../../ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "../../ui/skeleton";

const MediaManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("media")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
    } catch (error) {
      console.error("Error loading media:", error);
      toast({
        title: "Error",
        description: "Failed to load media items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Media Gallery</h1>
            <p className="text-muted-foreground">
              Manage website media content
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <div className="flex justify-between items-center pt-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Media items grid */}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default MediaManager;
