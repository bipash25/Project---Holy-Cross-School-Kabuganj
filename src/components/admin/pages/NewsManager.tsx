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
import { CardSkeleton } from "../../ui/card-skeleton";
import { DeleteConfirmDialog } from "../../ui/delete-confirm";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1546410531-bb4caa6b424d";

interface MediaItem {
  id: string;
  title: string;
  url: string;
  created_at: string;
}

const NewsManager = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newsItems, setNewsItems] = useState<NewsEvent[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [showMediaDialog, setShowMediaDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
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
      setLoading(true);
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
    } finally {
      setLoading(false);
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

    try {
      const { error } = await supabase.from("news_events").insert([formData]);

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
    }
  };

  const handleDelete = async (id: string) => {
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
    } finally {
      setItemToDelete(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">News & Events</h2>
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
                {/* Form content remains the same */}
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={i} imageHeight="h-48" />
            ))}
          </div>
        ) : (
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
                        onClick={() => setItemToDelete(item.id)}
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

            {newsItems.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No news or events found
              </div>
            )}
          </div>
        )}

        <DeleteConfirmDialog
          open={!!itemToDelete}
          onOpenChange={(open) => !open && setItemToDelete(null)}
          onConfirm={() => itemToDelete && handleDelete(itemToDelete)}
          title="Delete News/Event"
          description="Are you sure you want to delete this news/event? This action cannot be undone."
        />
      </div>
    </AdminLayout>
  );
};

export default NewsManager;
