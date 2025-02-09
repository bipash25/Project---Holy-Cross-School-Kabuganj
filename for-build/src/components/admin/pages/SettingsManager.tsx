import { useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useToast } from "../../ui/use-toast";
import { Save, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  settingsFormSchema,
  type SettingsFormValues,
} from "@/lib/validations/settings";
import { Form } from "../../ui/form";
import { Skeleton } from "../../ui/skeleton";

const SettingsManager = () => {
  const { toast } = useToast();
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      school_name: "",
      email: "",
      phone: "",
      address: "",
      facebook_url: "",
      twitter_url: "",
      instagram_url: "",
      admission_email: "",
      support_email: "",
      office_hours: "",
      meta_description: "",
      meta_keywords: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

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
      if (data) {
        form.reset(data);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (values: SettingsFormValues) => {
    try {
      const { error } = await supabase
        .from("settings")
        .upsert([{ ...values, id: "1" }]);

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
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage website settings and configurations
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="general" className="w-full">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="social">Social Media</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>

              {isSubmitting ? (
                <div className="space-y-6 mt-6">
                  {[...Array(4)].map((_, index) => (
                    <Card key={index} className="p-6">
                      <div className="space-y-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="mt-6 space-y-6">
                  <Card className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          School Name
                        </label>
                        <Input {...form.register("school_name")} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input {...form.register("email")} type="email" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone</label>
                        <Input {...form.register("phone")} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Address</label>
                        <Input {...form.register("address")} />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Facebook URL
                        </label>
                        <Input {...form.register("facebook_url")} type="url" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Twitter URL
                        </label>
                        <Input {...form.register("twitter_url")} type="url" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Instagram URL
                        </label>
                        <Input {...form.register("instagram_url")} type="url" />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Meta Description
                        </label>
                        <Input {...form.register("meta_description")} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Meta Keywords
                        </label>
                        <Input {...form.register("meta_keywords")} />
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </Tabs>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-[150px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default SettingsManager;
