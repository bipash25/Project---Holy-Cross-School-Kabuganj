import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import {
  ChevronRight,
  BookOpen,
  Calculator,
  Phone,
  GraduationCap,
} from "lucide-react";
import { BackToTop } from "./ui/back-to-top";
import { NewsSection } from "./news/news-section";
import { TestimonialsSection } from "./testimonials/testimonials-section";

interface HomeProps {
  carouselImages?: string[];
}

const Home = ({
  carouselImages = [
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b",
    "https://images.unsplash.com/photo-1546410531-bb4caa6b424d",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
  ],
}: HomeProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <BackToTop />
      <Header />

      <main className="pt-20">
        {/* Hero Carousel */}
        <section className="w-full h-[85vh] relative">
          <Carousel className="w-full h-full">
            <CarouselContent>
              {carouselImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full h-[85vh]">
                    <img
                      src={image}
                      alt={`School showcase ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                      <div className="text-center text-white">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                          Welcome to Holy Cross School
                        </h1>
                        <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8">
                          Nurturing minds, Building futures
                        </p>
                        <Button
                          size="lg"
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => navigate("/about")}
                        >
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </section>

        {/* Quick Access Cards */}
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

        {/* School Statistics */}
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
        <NewsSection />

        {/* Testimonials Section */}
        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
