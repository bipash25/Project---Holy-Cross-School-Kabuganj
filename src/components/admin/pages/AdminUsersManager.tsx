import { useState, useEffect, useMemo } from "react";
import { validatePassword } from "@/lib/validations/password";
import AdminLayout from "../layout/AdminLayout";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useToast } from "../../ui/use-toast";
import { Plus, Trash2, UserCog, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { DeleteConfirmDialog } from "../../ui/delete-confirm";
import { useAuth } from "../auth-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

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
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminUsers, setAdminUsers] = useState<AdminUserData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    role: "admin",
  });

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

  const { password } = formData;
  const passwordValidation = useMemo(
    () => validatePassword(password),
    [password],
  );

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("admin_users")
        .update({
          name: editingUser.name,
          role: editingUser.role,
        })
        .eq("id", editingUser.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin user has been updated successfully",
      });

      setIsEditDialogOpen(false);
      setEditingUser(null);
      loadAdminUsers();
    } catch (error) {
      console.error("Error updating admin user:", error);
      toast({
        title: "Error",
        description: "Failed to update admin user",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!passwordValidation.isValid) {
      e.preventDefault();
      toast({
        title: "Invalid Password",
        description: "Please ensure your password meets all requirements",
        variant: "destructive",
      });
      return;
    }

    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.rpc("create_admin_user", {
        p_email: formData.email,
        p_password: formData.password,
        p_name: formData.name || null,
        p_role: formData.role,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin user has been created successfully",
      });

      setIsAddDialogOpen(false);
      setFormData({
        email: "",
        name: "",
        password: "",
        role: "admin",
      });
      loadAdminUsers();
    } catch (error) {
      console.error("Error creating admin user:", error);
      toast({
        title: "Error",
        description: "Failed to create admin user",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("admin_users")
        .update({ is_active: false })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin user has been deactivated successfully",
      });
      loadAdminUsers();
    } catch (error) {
      console.error("Error deactivating admin user:", error);
      toast({
        title: "Error",
        description: "Failed to deactivate admin user",
        variant: "destructive",
      });
    } finally {
      setItemToDelete(null);
    }
  };

  const handleReactivate = async (id: string) => {
    try {
      const { error } = await supabase
        .from("admin_users")
        .update({ is_active: true })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin user has been reactivated successfully",
      });
      loadAdminUsers();
    } catch (error) {
      console.error("Error reactivating admin user:", error);
      toast({
        title: "Error",
        description: "Failed to reactivate admin user",
        variant: "destructive",
      });
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
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Add Admin
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Admin User</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                      className={
                        passwordValidation.errors.length > 0
                          ? "border-red-500"
                          : ""
                      }
                    />
                    <div className="text-sm space-y-1">
                      <p className="text-muted-foreground">Password must:</p>
                      <ul className="space-y-1 list-none">
                        {[
                          {
                            check: password.length >= 8,
                            text: "Be at least 8 characters long",
                          },
                          {
                            check: /[A-Z]/.test(password),
                            text: "Contain at least one uppercase letter",
                          },
                          {
                            check: /[a-z]/.test(password),
                            text: "Contain at least one lowercase letter",
                          },
                          {
                            check: /[0-9]/.test(password),
                            text: "Contain at least one number",
                          },
                          {
                            check: /[!@#$%^&*]/.test(password),
                            text: "Contain at least one special character (!@#$%^&*)",
                          },
                        ].map((requirement, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${requirement.check ? "bg-green-500" : "bg-red-500"}`}
                            />
                            <span
                              className={
                                requirement.check
                                  ? "text-muted-foreground"
                                  : "text-red-500"
                              }
                            >
                              {requirement.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) =>
                        setFormData({ ...formData, role: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="super_admin">Super Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Creating..." : "Create Admin"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
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
              // Loading skeletons
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
                          <Button
                            variant="ghost"
                            className="p-0 hover:bg-transparent"
                            onClick={() => {
                              setEditingUser(admin);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <UserCog className="h-4 w-4 text-blue-600 mr-2" />
                            <span className="font-medium">
                              {admin.name || admin.email}
                            </span>
                          </Button>
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

                      {currentUser?.role === "super_admin" &&
                        currentUser?.id !== admin.id && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              admin.is_active
                                ? setItemToDelete(admin.id)
                                : handleReactivate(admin.id)
                            }
                          >
                            {admin.is_active ? "Deactivate" : "Reactivate"}
                          </Button>
                        )}
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

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Admin User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={editingUser?.email || ""} disabled />
              </div>

              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={editingUser?.name || ""}
                  onChange={(e) =>
                    setEditingUser(
                      editingUser
                        ? { ...editingUser, name: e.target.value }
                        : null,
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Select
                  value={editingUser?.role || "admin"}
                  onValueChange={(value) =>
                    setEditingUser(
                      editingUser ? { ...editingUser, role: value } : null,
                    )
                  }
                  disabled={currentUser?.id === editingUser?.id}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setEditingUser(null);
                  }}
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

        <DeleteConfirmDialog
          open={!!itemToDelete}
          onOpenChange={(open) => !open && setItemToDelete(null)}
          onConfirm={() => itemToDelete && handleDelete(itemToDelete)}
          title="Deactivate Admin User"
          description="Are you sure you want to deactivate this admin user? They will no longer be able to access the admin panel."
        />
      </div>
    </AdminLayout>
  );
};

export default AdminUsersManager;
