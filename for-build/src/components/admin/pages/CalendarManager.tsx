import { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Card } from "../../ui/card";
import { useToast } from "../../ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "../../ui/skeleton";

const CalendarManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("calendar_events")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
    } catch (error) {
      console.error("Error loading events:", error);
      toast({
        title: "Error",
        description: "Failed to load calendar events",
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
            <h1 className="text-3xl font-bold">Calendar Events</h1>
            <p className="text-muted-foreground">
              Manage school calendar events
            </p>
          </div>
        </div>

        <Card>
          <div className="p-6">
            {loading ? (
              <div className="space-y-6">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0"
                  >
                    <Skeleton className="h-10 w-10 rounded" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-1/3" />
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">{/* Event items */}</div>
            )}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default CalendarManager;
