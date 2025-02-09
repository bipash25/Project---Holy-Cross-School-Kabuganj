import { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Card } from "../../ui/card";
import { useToast } from "../../ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "../../ui/skeleton";

const StudentsManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("students")
        .select("*")
        .order("name");

      if (error) throw error;
    } catch (error) {
      console.error("Error loading students:", error);
      toast({
        title: "Error",
        description: "Failed to load students",
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
            <h1 className="text-3xl font-bold">Students</h1>
            <p className="text-muted-foreground">Manage student records</p>
          </div>
        </div>

        <Card>
          {loading ? (
            <div>
              <div className="p-4 border-b">
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-6 gap-4 items-center border-b pb-4 last:border-0 last:pb-0"
                    >
                      <Skeleton className="h-4 col-span-2" />
                      <Skeleton className="h-4" />
                      <Skeleton className="h-4" />
                      <Skeleton className="h-4" />
                      <Skeleton className="h-8 w-24 justify-self-end" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>{/* Student records table */}</div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
};

export default StudentsManager;
