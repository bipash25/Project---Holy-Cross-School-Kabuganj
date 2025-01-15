import React from "react";
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
  ArrowRight,
  Trophy,
  Medal,
  Award,
  Star,
} from "lucide-react";
import { BackToTop } from "./ui/back-to-top";
import { ErrorBoundary } from "./ui/error-boundary";
import CarouselSection from "./home/carousel-section";
import NewsSection from "./home/news-section";

const achievements = [
  {
    icon: <Trophy className="h-12 w-12 text-yellow-500" />,
    title: "Academic Excellence",
    description: "Consistently achieving 95%+ pass rate in board examinations",
    stats: "15+ District Toppers",
  },
  {
    icon: <Medal className="h-12 w-12 text-blue-500" />,
    title: "Sports Champions",
    description: "Multiple district and state level sports achievements",
    stats: "100+ Sports Medals",
  },
  {
    icon: <Award className="h-12 w-12 text-purple-500" />,
    title: "Cultural Achievements",
    description: "Winners in various cultural competitions and events",
    stats: "45+ Cultural Awards",
  },
  {
    icon: <Star className="h-12 w-12 text-green-500" />,
    title: "Innovation & Research",
    description: "Excellence in science fairs and innovation challenges",
    stats: "25+ Science Fair Wins",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const carouselImages = [
    "/src/assets/images/slider1.jpg",
    "/src/assets/images/slider2.jpg",
    "/src/assets/images/slider5.jpg",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Home"
        description="Welcome to Holy Cross School Kabuganj. We provide quality education and nurture young minds for a better future."
        keywords="school, education, Holy Cross, Kabuganj, admission, academics, students"
        type="website"
      />
      <BackToTop />
      <Header />

      <main className="pt-20">
        {/* Hero Carousel Section */}
        <section className="w-full h-[85vh] relative">
          <ErrorBoundary section="Hero Carousel">
            <CarouselSection images={carouselImages} />
          </ErrorBoundary>
        </section>

        {/* Quick Access Section */}
        <section className="container mx-auto px-4 py-8 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-12">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="p-4 sm:p-6 hover:shadow-lg hover:scale-105 transition-all h-full flex flex-col">
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
                  className="w-full mt-auto"
                  onClick={() => navigate("/academics/admissions")}
                >
                  View Details <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 hover:shadow-lg hover:scale-105 transition-all h-full flex flex-col">
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
                  className="w-full mt-auto"
                  onClick={() => navigate("/info/fees")}
                >
                  View Details <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 hover:shadow-lg hover:scale-105 transition-all h-full flex flex-col">
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
                  className="w-full mt-auto"
                  onClick={() => navigate("/info/curriculum")}
                >
                  View Details <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 hover:shadow-lg hover:scale-105 transition-all h-full flex flex-col">
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
                  className="w-full mt-auto"
                  onClick={() => navigate("/contact")}
                >
                  View Details <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-16 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Our Achievements
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Celebrating excellence in academics, sports, and co-curricular
                activities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-3 rounded-full bg-muted">
                      {achievement.icon}
                    </div>
                    <h3 className="text-xl font-semibold">
                      {achievement.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {achievement.description}
                    </p>
                    <div className="mt-4 text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {achievement.stats}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button
                onClick={() => navigate("/about/statistics")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                View All Achievements <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-blue-600 text-white py-8 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                  15+
                </h3>
                <p className="text-sm sm:text-base">Years of Excellence</p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                  1000+
                </h3>
                <p className="text-sm sm:text-base">Students</p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                  100+
                </h3>
                <p className="text-sm sm:text-base">Expert Faculty</p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                  95%
                </h3>
                <p className="text-sm sm:text-base">Success Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* News & Events Section */}
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

            <ErrorBoundary section="News & Events">
              <NewsSection />
            </ErrorBoundary>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
