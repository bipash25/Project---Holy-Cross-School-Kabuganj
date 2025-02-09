import { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useToast } from "../../ui/use-toast";
import { Plus, UserCog, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "../auth-context";

interface AdminUserData {
  id: string;
  email: string;
  name: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
  last_login: string | null;
}

const AdminUsersManager = () => {
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [adminUsers, setAdminUsers] = useState<AdminUserData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadAdminUsers();
  }, []);

  const loadAdminUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAdminUsers(data || []);
    } catch (error) {
      console.error("Error loading admin users:", error);
      toast({
        title: "Error",
        description: "Failed to load admin users",
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
            <h1 className="text-3xl font-bold">Admin Users</h1>
            <p className="text-muted-foreground">
              Manage administrator accounts
            </p>
          </div>

          {currentUser?.role === "super_admin" && (
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Admin
            </Button>
          )}
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Card>
          <div className="p-6 space-y-4">
            {loading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4 border-b last:border-0 animate-pulse"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-200 rounded" />
                        <div className="h-4 w-48 bg-gray-200 rounded" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 w-32 bg-gray-200 rounded" />
                        <div className="h-3 w-24 bg-gray-200 rounded" />
                        <div className="h-3 w-40 bg-gray-200 rounded" />
                      </div>
                    </div>
                    <div className="h-8 w-24 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                {adminUsers
                  .filter(
                    (admin) =>
                      admin.name
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      admin.email
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()),
                  )
                  .map((admin) => (
                    <div
                      key={admin.id}
                      className="flex items-center justify-between py-4 border-b last:border-0"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <UserCog className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">
                            {admin.name || admin.email}
                          </span>
                          {!admin.is_active && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
                              Inactive
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>{admin.email}</p>
                          <p>Role: {admin.role}</p>
                          <p>
                            Last login:{" "}
                            {admin.last_login
                              ? new Date(admin.last_login).toLocaleString()
                              : "Never"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                {adminUsers.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No admin users found
                  </div>
                )}
              </>
            )}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminUsersManager;
