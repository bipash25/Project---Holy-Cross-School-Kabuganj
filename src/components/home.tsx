import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { SEO } from "./ui/seo";
import {
  ChevronRight,
  BookOpen,
  Calculator,
  Phone,
  GraduationCap,
} from "lucide-react";
import { BackToTop } from "./ui/back-to-top";
import { ErrorBoundary } from "./ui/error-boundary";
import CarouselSection from "./home/carousel-section";
import { HomeNewsSection } from "./news/home-news-section";
import { Skeleton } from "./ui/skeleton";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const [slider1, slider2, slider5] = await Promise.all([
          import("@/assets/images/slider1.jpg").then((m) => m.default),
          import("@/assets/images/slider2.jpg").then((m) => m.default),
          import("@/assets/images/slider5.jpg").then((m) => m.default),
        ]);
        setCarouselImages([slider1, slider2, slider5]);
      } catch (error) {
        console.error("Failed to load carousel images:", error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEO
        title="Home"
        description="Welcome to Holy Cross School Kabuganj. We provide quality education and nurture young minds for a better future."
        keywords="school, education, Holy Cross, Kabuganj, admission, academics, students"
        type="website"
      />
      <BackToTop />
      <Header />
      <main className="flex-grow">
        {/* Hero Carousel Section */}
        <section className="relative bg-muted h-[85vh]">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Skeleton className="w-full h-full" />
            </div>
          ) : (
            <ErrorBoundary section="Hero Carousel">
              <CarouselSection images={carouselImages} />
            </ErrorBoundary>
          )}
        </section>

        {/* Quick Access Section */}
        <section className="container mx-auto px-4 py-8 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-12">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="p-4 sm:p-6 hover:shadow-lg transition-all">
              <div className="flex flex-col items-center text-center h-full">
                <GraduationCap className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Admission Procedures
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 flex-grow">
                  Learn about our admission process and requirements
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/academics/admissions")}
                >
                  View Details <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 hover:shadow-lg transition-all">
              <div className="flex flex-col items-center text-center h-full">
                <Calculator className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  School Fees
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 flex-grow">
                  View our transparent fee structure
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/info/fees")}
                >
                  View Details <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 hover:shadow-lg transition-all">
              <div className="flex flex-col items-center text-center h-full">
                <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Curriculum
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 flex-grow">
                  Explore our comprehensive curriculum
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/info/curriculum")}
                >
                  View Details <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 hover:shadow-lg transition-all">
              <div className="flex flex-col items-center text-center h-full">
                <Phone className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Contact Information
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 flex-grow">
                  Get in touch with us
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/contact")}
                >
                  View Details <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* News & Events Section */}
        <ErrorBoundary section="News & Events">
          <HomeNewsSection />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
