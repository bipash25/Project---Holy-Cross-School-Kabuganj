import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Calendar, Clock, ChevronRight } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "news" | "event";
  time?: string;
}

const NewsSection = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated news data - replace with actual API call
    const mockNews: NewsItem[] = [
      {
        id: "1",
        title: "Annual Sports Day 2024",
        description:
          "Join us for our annual sports day celebration with exciting competitions and events.",
        date: "2024-02-15",
        type: "event",
        time: "9:00 AM",
      },
      {
        id: "2",
        title: "Academic Excellence Awards",
        description:
          "Congratulations to our students who achieved outstanding results in the recent examinations.",
        date: "2024-02-10",
        type: "news",
      },
      {
        id: "3",
        title: "Science Fair 2024",
        description:
          "Students showcase their innovative science projects in our annual science fair.",
        date: "2024-02-20",
        type: "event",
        time: "10:00 AM",
      },
    ];

    setNews(mockNews);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-1/4" />
              <div className="h-6 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-20 bg-muted rounded" />
              <div className="h-10 bg-muted rounded" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => (
        <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-4">
            <div
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${item.type === "event" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}
              `}
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
              Read More <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NewsSection;
