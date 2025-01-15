import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Button } from "../ui/button";
import { Calendar, Clock, ArrowLeft, AlertTriangle } from "lucide-react";
import { api, NewsEvent } from "@/lib/api";
import { Skeleton } from "../ui/skeleton";
import { getErrorMessage } from "@/lib/error-handling";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        if (!id) throw new Error("News ID not provided");
        const data = await api.news.getById(id);
        setNews(data);
      } catch (err) {
        setError(getErrorMessage(err));
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
          <div className="container mx-auto px-4 py-8">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="mb-6 inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
            </Button>

            <Skeleton className="h-8 w-24 mb-4" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-48 mb-6" />
            <Skeleton className="h-[400px] w-full mb-8" />
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

  if (error || !news) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error || "News not found"}</AlertDescription>
            </Alert>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="mb-6 inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
          </Button>

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

          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(news.date).toLocaleDateString()}
            </div>
            {news.time && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {news.time}
              </div>
            )}
          </div>

          {news.image_url && (
            <img
              src={news.image_url}
              alt={news.title}
              className="w-full h-[400px] object-cover rounded-lg mb-8"
            />
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground whitespace-pre-line">
              {news.description}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetail;
