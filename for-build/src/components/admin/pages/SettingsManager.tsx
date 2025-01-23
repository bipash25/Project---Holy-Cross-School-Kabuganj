import { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useToast } from "../../ui/use-toast";
import { Save } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Label } from "../../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

interface Settings {
  id: string;
  school_name: string;
  email: string;
  phone: string;
  address: string;
  facebook_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  admission_email?: string;
  support_email?: string;
  office_hours?: string;
  meta_description?: string;
  meta_keywords?: string;
}

const SettingsManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .single();

      if (error) throw error;
      setSettings(data);
    } catch (error) {
      console.error("Error loading settings:", error);
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("settings")
        .upsert([{ ...settings, id: settings?.id || "1" }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Settings have been saved successfully",
      });
      loadSettings();
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: keyof Settings, value: string) => {
    setSettings((prev) => (prev ? { ...prev, [key]: value } : null));
  };

  if (!settings) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage website settings and configurations
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="general" className="w-full">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>School Name</Label>
                    <Input
                      value={settings.school_name}
                      onChange={(e) =>
                        handleChange("school_name", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input
                      value={settings.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Office Hours</Label>
                    <Input
                      value={settings.office_hours}
                      onChange={(e) =>
                        handleChange("office_hours", e.target.value)
                      }
                      placeholder="e.g., Mon-Fri: 8:00 AM - 4:00 PM"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Primary Email</Label>
                    <Input
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      value={settings.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Admission Email</Label>
                    <Input
                      type="email"
                      value={settings.admission_email || ""}
                      onChange={(e) =>
                        handleChange("admission_email", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Support Email</Label>
                    <Input
                      type="email"
                      value={settings.support_email || ""}
                      onChange={(e) =>
                        handleChange("support_email", e.target.value)
                      }
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="social">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Facebook URL</Label>
                    <Input
                      type="url"
                      value={settings.facebook_url || ""}
                      onChange={(e) =>
                        handleChange("facebook_url", e.target.value)
                      }
                      placeholder="https://facebook.com/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Twitter URL</Label>
                    <Input
                      type="url"
                      value={settings.twitter_url || ""}
                      onChange={(e) =>
                        handleChange("twitter_url", e.target.value)
                      }
                      placeholder="https://twitter.com/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Instagram URL</Label>
                    <Input
                      type="url"
                      value={settings.instagram_url || ""}
                      onChange={(e) =>
                        handleChange("instagram_url", e.target.value)
                      }
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="seo">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Meta Description</Label>
                    <Input
                      value={settings.meta_description || ""}
                      onChange={(e) =>
                        handleChange("meta_description", e.target.value)
                      }
                      placeholder="Brief description of the school for search engines"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Meta Keywords</Label>
                    <Input
                      value={settings.meta_keywords || ""}
                      onChange={(e) =>
                        handleChange("meta_keywords", e.target.value)
                      }
                      placeholder="school, education, kabuganj, etc."
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default SettingsManager;
