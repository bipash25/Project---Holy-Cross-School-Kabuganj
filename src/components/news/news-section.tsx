import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { Calendar, Clock, ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { api, NewsEvent } from "@/lib/api";
import { supabase } from "@/lib/supabase";

type FilterType = "all" | "news" | "event";

interface NewsSectionProps {
  showAll?: boolean;
}

const PAGE_SIZE = 9;
const DEFAULT_IMAGE = "/src/assets/images/slider1.jpg";

const NewsCardSkeleton = () => (
  <Card className="p-6">
    <div className="space-y-4">
      <div className="aspect-video w-full">
        <div className="w-full h-full bg-muted animate-pulse rounded-lg" />
      </div>
      <div className="h-8 w-3/4 bg-muted animate-pulse rounded" />
      <div className="flex flex-wrap gap-2">
        <div className="h-4 w-24 bg-muted animate-pulse rounded" />
        <div className="h-4 w-24 bg-muted animate-pulse rounded" />
        <div className="h-4 w-16 bg-muted animate-pulse rounded" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-muted animate-pulse rounded" />
        <div className="h-4 w-full bg-muted animate-pulse rounded" />
        <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
      </div>
      <div className="h-10 w-full bg-muted animate-pulse rounded" />
    </div>
  </Card>
);

export const NewsSection = ({ showAll = false }: NewsSectionProps) => {
  const [news, setNews] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const query = supabase
          .from("news_events")
          .select("*", { count: "exact" })
          .order("date", { ascending: false });

        if (filter !== "all") {
          query.eq("type", filter);
        }

        if (!showAll) {
          query.limit(3);
        } else {
          query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
        }

        const { data, error, count } = await query;

        if (error) throw error;
        setNews(data || []);
        setTotalItems(count || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [filter, showAll, page]);

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="space-y-8">
      {showAll && (
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex rounded-lg bg-muted p-1">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === "all" ? "bg-background shadow-sm" : "hover:bg-background/50"}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === "news" ? "bg-background shadow-sm" : "hover:bg-background/50"}`}
              onClick={() => setFilter("news")}
            >
              News
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === "event" ? "bg-background shadow-sm" : "hover:bg-background/50"}`}
              onClick={() => setFilter("event")}
            >
              Events
            </button>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: showAll ? 9 : 3 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      ) : news.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          No {filter === "all" ? "news or events" : filter} found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video relative">
                <img
                  src={item.image_url || DEFAULT_IMAGE}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <div
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.type === "event" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"}`}
                >
                  {item.type === "event" ? "Event" : "News"}
                </div>
                <h3 className="text-xl font-semibold line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                  {item.time && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {item.time}
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground line-clamp-3">
                  {item.description}
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate(`/news/${item.id}`)}
                >
                  Read More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
