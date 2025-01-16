import { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { useToast } from "../../ui/use-toast";
import { Plus, Trash2, Calendar, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { NewsEvent } from "@/lib/api";
import { ScrollArea } from "../../ui/scroll-area";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1546410531-bb4caa6b424d";

interface MediaItem {
  id: string;
  title: string;
  url: string;
  created_at: string;
}

const cleanFormData = (data: Record<string, any>) => {
  const nullableFields = [
    "time",
    "end_time",
    "venue",
    "organizer",
    "contact_info",
    "registration_link",
    "image_url",
  ];

  const cleaned = { ...data };

  // Clean nullable fields
  nullableFields.forEach((field) => {
    if (field in cleaned && typeof cleaned[field] === "string") {
      cleaned[field] =
        cleaned[field].trim() === "" ? null : cleaned[field].trim();
    }
  });

  // Clean required fields (just trim them)
  if (cleaned.title) cleaned.title = cleaned.title.trim();
  if (cleaned.description) cleaned.description = cleaned.description.trim();

  return cleaned;
};

const NewsManager = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsEvent[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [showMediaDialog, setShowMediaDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "news",
    date: new Date().toISOString().split("T")[0],
    time: "",
    end_time: "",
    venue: "",
    organizer: "",
    contact_info: "",
    registration_link: "",
    image_url: "",
  });

  useEffect(() => {
    loadNews();
    loadMedia();
  }, []);

  const loadNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news_events")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      setNewsItems(data || []);
    } catch (error) {
      console.error("Error loading news:", error);
      toast({
        title: "Error",
        description: "Failed to load news items",
        variant: "destructive",
      });
    }
  };

  const loadMedia = async () => {
    try {
      const { data, error } = await supabase
        .from("media")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMediaItems(data || []);
    } catch (error) {
      console.error("Error loading media:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Clean the form data before submission
      const cleanedData = cleanFormData({
        ...formData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      const { error } = await supabase
        .from("news_events")
        .insert([cleanedData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "News/Event has been created successfully",
      });

      setIsDialogOpen(false);
      setFormData({
        title: "",
        description: "",
        type: "news",
        date: new Date().toISOString().split("T")[0],
        time: "",
        end_time: "",
        venue: "",
        organizer: "",
        contact_info: "",
        registration_link: "",
        image_url: "",
      });
      loadNews();
    } catch (error) {
      console.error("Error creating news:", error);
      toast({
        title: "Error",
        description: "Failed to create news/event",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const { error } = await supabase
        .from("news_events")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "News/Event has been deleted successfully",
      });
      loadNews();
    } catch (error) {
      console.error("Error deleting news:", error);
      toast({
        title: "Error",
        description: "Failed to delete news/event",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">News & Events</h1>
            <p className="text-muted-foreground">Manage news and events</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add New
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create News/Event</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                      placeholder="Enter title"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant={formData.type === "news" ? "default" : "outline"}
                      className="w-full justify-center"
                      onClick={() => setFormData({ ...formData, type: "news" })}
                    >
                      News
                    </Button>
                    <Button
                      type="button"
                      variant={
                        formData.type === "event" ? "default" : "outline"
                      }
                      className="w-full justify-center"
                      onClick={() =>
                        setFormData({ ...formData, type: "event" })
                      }
                    >
                      Event
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Time (optional)</Label>
                      <Input
                        type="time"
                        value={formData.time}
                        onChange={(e) =>
                          setFormData({ ...formData, time: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      required
                      className="min-h-[120px] resize-none"
                      placeholder="Enter description"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <div className="flex gap-2">
                      <Input
                        value={formData.image_url}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            image_url: e.target.value,
                          })
                        }
                        placeholder="Enter image URL"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowMediaDialog(true)}
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {formData.type === "event" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Venue (optional)</Label>
                        <Input
                          value={formData.venue}
                          onChange={(e) =>
                            setFormData({ ...formData, venue: e.target.value })
                          }
                          placeholder="Enter venue"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Organizer (optional)</Label>
                        <Input
                          value={formData.organizer}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              organizer: e.target.value,
                            })
                          }
                          placeholder="Enter organizer"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Contact Information (optional)</Label>
                        <Input
                          value={formData.contact_info}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contact_info: e.target.value,
                            })
                          }
                          placeholder="Enter contact information"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Registration Link (optional)</Label>
                        <Input
                          type="url"
                          value={formData.registration_link}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              registration_link: e.target.value,
                            })
                          }
                          placeholder="Enter registration link"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={showMediaDialog} onOpenChange={setShowMediaDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select Media</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[400px] pr-4">
                <div className="grid grid-cols-2 gap-4">
                  {mediaItems.map((item) => (
                    <Card
                      key={item.id}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => {
                        setFormData({ ...formData, image_url: item.url });
                        setShowMediaDialog(false);
                      }}
                    >
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                      <div className="p-2">
                        <p className="text-sm truncate">{item.title}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {newsItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-48 h-48 sm:h-auto relative">
                  <img
                    src={item.image_url || DEFAULT_IMAGE}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                      className="-mr-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                    {item.time && (
                      <span className="flex items-center">
                        • {item.time}
                        {item.end_time && ` - ${item.end_time}`}
                      </span>
                    )}
                    {item.venue && <span>• {item.venue}</span>}
                    <div
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.type === "event"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      }`}
                    >
                      {item.type === "event" ? "Event" : "News"}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewsManager;
