import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { NewsSection } from "./news-section";

const NewsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="relative h-[200px] mb-8">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1495020689067-958852a7765e"
              alt="News Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-2">News & Events</h1>
              <p className="text-lg">Stay updated with the latest happenings</p>
            </div>
          </div>
        </div>
        <NewsSection showAll />
      </main>
      <Footer />
    </div>
  );
};

export default NewsPage;
