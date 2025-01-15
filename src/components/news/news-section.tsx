import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { supabase } from "@/lib/supabase";
import { NewsEvent } from "@/lib/api";
import { Skeleton } from "../ui/skeleton";

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
        <Skeleton className="w-full h-full rounded-lg" />
      </div>
      <Skeleton className="h-8 w-3/4" />
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <Skeleton className="h-10 w-full" />
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

  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="space-y-8">
      {showAll && (
        <div className="flex justify-center mb-8">
          <Tabs
            defaultValue="all"
            value={filter}
            onValueChange={(v) => {
              setFilter(v as FilterType);
              setPage(1);
            }}
          >
            <TabsList className="grid w-full max-w-[400px] grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
              <TabsTrigger value="event">Events</TabsTrigger>
            </TabsList>
          </Tabs>
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <Card
                key={item.id}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="space-y-4">
                  <div className="aspect-video w-full">
                    <img
                      src={item.image_url || DEFAULT_IMAGE}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
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

          {showAll && totalPages > 1 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex flex-wrap items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <Button
                      key={pageNum}
                      variant={pageNum === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  ),
                )}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
