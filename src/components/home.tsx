import React from "react";
import Header from "./layout/Header";
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
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main content with top margin to account for fixed header */}
      <main className="pt-20">
        {/* Hero Carousel */}
        <section className="w-full h-[600px] relative">
          <Carousel className="w-full h-full">
            <CarouselContent>
              {carouselImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full h-[600px]">
                    <img
                      src={image}
                      alt={`School showcase ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h1 className="text-5xl font-bold mb-4">
                          Welcome to Holy Cross School
                        </h1>
                        <p className="text-xl mb-8">
                          Nurturing minds, Building futures
                        </p>
                        <Button
                          size="lg"
                          className="bg-blue-600 hover:bg-blue-700"
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
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <GraduationCap className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Admission Procedures
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn about our admission process and requirements
                </p>
                <Button variant="outline" className="w-full">
                  View Details <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <Calculator className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">School Fees</h3>
                <p className="text-gray-600 mb-4">
                  View our transparent fee structure
                </p>
                <Button variant="outline" className="w-full">
                  View Details <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Curriculum</h3>
                <p className="text-gray-600 mb-4">
                  Explore our comprehensive curriculum
                </p>
                <Button variant="outline" className="w-full">
                  View Details <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <Phone className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Contact Information
                </h3>
                <p className="text-gray-600 mb-4">Get in touch with us</p>
                <Button variant="outline" className="w-full">
                  View Details <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* School Statistics */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-4xl font-bold mb-2">50+</h3>
                <p>Years of Excellence</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-2">1000+</h3>
                <p>Students</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-2">100+</h3>
                <p>Expert Faculty</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-2">95%</h3>
                <p>Success Rate</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
