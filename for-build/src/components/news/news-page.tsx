import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { NewsSection } from "./news-section";
import { SEO } from "../ui/seo";

const NewsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="News & Events"
        description="Stay updated with the latest news and events from Holy Cross School Kabuganj. Find information about upcoming events, achievements, and announcements."
        keywords="school news, school events, announcements, activities, achievements"
        type="website"
      />
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">News & Events</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stay updated with the latest news and events from our school
          </p>
          <NewsSection showAll />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsPage;
