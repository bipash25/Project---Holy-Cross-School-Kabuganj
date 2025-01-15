import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { api, NewsEvent } from "@/lib/api";

export const HomeNewsSection = () => {
  const [news, setNews] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const data = await api.news.getRecent(3);
        setNews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (error) {
    return (
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 text-center text-red-500">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest News & Events</h2>
          <Button
            variant="outline"
            onClick={() => navigate("/news")}
            className="hidden sm:flex items-center"
          >
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-4" />
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4" />
                <div className="h-20 bg-gray-300 rounded mb-4" />
                <div className="h-10 bg-gray-300 rounded" />
              </Card>
            ))}
          </div>
        ) : news.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No news or events found.
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
                    <div
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.type === "event"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      }`}
                    >
                      {item.type === "event" ? "Event" : "News"}
                    </div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
            <div className="mt-8 text-center sm:hidden">
              <Button
                variant="outline"
                onClick={() => navigate("/news")}
                className="w-full sm:w-auto"
              >
                View All News & Events
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
