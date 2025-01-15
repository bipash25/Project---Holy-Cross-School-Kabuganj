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
      {/* ... rest of the JSX ... */}
    </div>
  );
};

export default NewsPage;
