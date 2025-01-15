import { Card } from "../ui/card";
import { Calendar, Clock } from "lucide-react";
import { Button } from "../ui/button";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  time?: string;
  description: string;
  type: "news" | "event";
}

interface NewsSectionProps {
  news?: NewsItem[];
}

export const NewsSection = ({
  news = [
    {
      id: "1",
      title: "Annual Sports Day 2024",
      date: "2024-03-15",
      time: "9:00 AM",
      description:
        "Join us for our annual sports day celebration featuring various athletic events and competitions.",
      type: "event",
    },
    {
      id: "2",
      title: "Academic Excellence Awards",
      date: "2024-02-28",
      description:
        "Congratulations to our students who achieved outstanding results in their recent examinations.",
      type: "news",
    },
    {
      id: "3",
      title: "Parent-Teacher Meeting",
      date: "2024-03-20",
      time: "2:00 PM",
      description:
        "Important meeting to discuss student progress and upcoming academic plans.",
      type: "event",
    },
  ],
}: NewsSectionProps) => {
  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">News & Events</h2>
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
                <p className="text-muted-foreground">{item.description}</p>
                <Button variant="outline" className="w-full">
                  Read More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
