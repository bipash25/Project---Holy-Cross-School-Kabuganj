import { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useToast } from "../../ui/use-toast";
import { Plus, Trash2, FileText, Edit } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

interface PageContent {
  id: string;
  title: string;
  content: string;
  slug: string;
  section: string;
  last_updated: string;
}

const ContentManager = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState<PageContent[]>([]);
  const [editingPage, setEditingPage] = useState<PageContent | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    slug: "",
    section: "about",
  });

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .order("title");

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error("Error loading pages:", error);
      toast({
        title: "Error",
        description: "Failed to load pages",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingPage) {
        const { error } = await supabase
          .from("pages")
          .update({
            ...formData,
            last_updated: new Date().toISOString(),
          })
          .eq("id", editingPage.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Page has been updated successfully",
        });
      } else {
        const { error } = await supabase.from("pages").insert([
          {
            ...formData,
            last_updated: new Date().toISOString(),
          },
        ]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Page has been added successfully",
        });
      }

      setIsDialogOpen(false);
      setFormData({
        title: "",
        content: "",
        slug: "",
        section: "about",
      });
      setEditingPage(null);
      loadPages();
    } catch (error) {
      console.error("Error saving page:", error);
      toast({
        title: "Error",
        description: "Failed to save page",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page: PageContent) => {
    setEditingPage(page);
    setFormData({
      title: page.title,
      content: page.content,
      slug: page.slug,
      section: page.section,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return;

    try {
      const { error } = await supabase.from("pages").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Page has been deleted successfully",
      });
      loadPages();
    } catch (error) {
      console.error("Error deleting page:", error);
      toast({
        title: "Error",
        description: "Failed to delete page",
        variant: "destructive",
      });
    }
  };

  const sections = [
    { value: "about", label: "About" },
    { value: "academics", label: "Academics" },
    { value: "facilities", label: "Facilities" },
    { value: "info", label: "School Info" },
  ];

  const filteredPages = (section: string) =>
    pages.filter((page) => page.section === section);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Content Manager</h1>
            <p className="text-muted-foreground">
              Manage website pages and content
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Page
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingPage ? "Edit Page" : "Add New Page"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      required
                      placeholder="e.g., about-us"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Section</Label>
                  <select
                    value={formData.section}
                    onChange={(e) =>
                      setFormData({ ...formData, section: e.target.value })
                    }
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    required
                  >
                    {sections.map((section) => (
                      <option key={section.value} value={section.value}>
                        {section.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    required
                    className="min-h-[200px]"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      setEditingPage(null);
                      setFormData({
                        title: "",
                        content: "",
                        slug: "",
                        section: "about",
                      });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading
                      ? editingPage
                        ? "Updating..."
                        : "Adding..."
                      : editingPage
                        ? "Update Page"
                        : "Add Page"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="about" className="w-full">
          <TabsList>
            {sections.map((section) => (
              <TabsTrigger key={section.value} value={section.value}>
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {sections.map((section) => (
            <TabsContent key={section.value} value={section.value}>
              <div className="grid gap-4">
                {filteredPages(section.value).length === 0 ? (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">
                      No pages found in this section
                    </p>
                  </Card>
                ) : (
                  filteredPages(section.value).map((page) => (
                    <Card key={page.id} className="p-6">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <h3 className="font-semibold">{page.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            /{page.slug}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Last updated:{" "}
                            {new Date(page.last_updated).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(page)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(page.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ContentManager;
