import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Button } from "../ui/button";
import { SEO } from "../ui/seo";
import { Calendar, Clock, ArrowLeft, AlertTriangle } from "lucide-react";
import { api, NewsEvent } from "@/lib/api";
import { Skeleton } from "../ui/skeleton";
import { getErrorMessage } from "@/lib/error-handling";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const NewsDetail = () => {
  // ... existing state and effects ...

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        {/* ... loading state JSX ... */}
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        {/* ... error state JSX ... */}
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
        image={news.image_url || undefined}
      />
      <Header />
      {/* ... rest of the JSX ... */}
    </div>
  );
};

export default NewsDetail;
