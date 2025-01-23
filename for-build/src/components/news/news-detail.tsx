import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Button } from "../ui/button";
import { SEO } from "../ui/seo";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Link as LinkIcon,
  ArrowLeft,
} from "lucide-react";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { supabase } from "@/lib/supabase";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  type: "news" | "event";
  date: string;
  time?: string;
  end_time?: string;
  image_url?: string;
  venue?: string;
  organizer?: string;
  contact_info?: string;
  registration_link?: string;
}

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("news_events")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setNews(data);
      } catch (error) {
        console.error("Failed to load news:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-8" />
            <Skeleton className="h-[400px] w-full mb-8 rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">News Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The news item you're looking for doesn't exist or has been
              removed.
            </p>
            <Button onClick={() => navigate("/news")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={news.title}
        description={news.description.substring(0, 160)}
        keywords={`school news, ${news.type}, ${news.title.toLowerCase()}, Holy Cross School`}
        type="article"
        image={news.image_url}
      />
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <Button
            variant="outline"
            onClick={() => navigate("/news")}
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
          </Button>

          <Card className="p-8">
            <div
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-4 ${
                news.type === "event"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                  : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              }`}
            >
              {news.type === "event" ? "Event" : "News"}
            </div>

            <h1 className="text-4xl font-bold mb-4">{news.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(news.date).toLocaleDateString()}
              </div>
              {news.time && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {news.time}
                  {news.end_time && ` - ${news.end_time}`}
                </div>
              )}
              {news.venue && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {news.venue}
                </div>
              )}
              {news.organizer && (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {news.organizer}
                </div>
              )}
            </div>

            <img
              src={news.image_url}
              alt={news.title}
              className="w-full h-[400px] object-cover rounded-lg mb-8"
            />

            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <p className="text-muted-foreground whitespace-pre-line">
                {news.description}
              </p>
            </div>

            {(news.contact_info || news.registration_link) && (
              <div className="border-t pt-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Additional Information
                </h2>
                {news.contact_info && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Contact Information:</h3>
                    <p className="text-muted-foreground">{news.contact_info}</p>
                  </div>
                )}
                {news.registration_link && (
                  <div>
                    <h3 className="font-semibold mb-2">Registration:</h3>
                    <Button
                      variant="outline"
                      onClick={() =>
                        window.open(news.registration_link, "_blank")
                      }
                    >
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Register Now
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetail;
