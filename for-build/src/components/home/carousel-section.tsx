import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface CarouselSectionProps {
  images: string[];
}

interface ImageLoadingState {
  [key: string]: boolean;
}

const CarouselSection = ({ images }: CarouselSectionProps) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<ImageLoadingState>({});

  useEffect(() => {
    const preloadImages = () => {
      images.forEach((src) => {
        const img = new window.Image();
        img.src = src;
        img.onload = () => {
          setImagesLoaded((prev) => ({ ...prev, [src]: true }));
        };
      });
    };

    preloadImages();
  }, [images]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  const CarouselSkeleton = () => (
    <div className="w-full h-[85vh] bg-muted animate-pulse relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4 w-full max-w-2xl px-4">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
          <Skeleton className="h-12 w-40 mx-auto mt-8" />
        </div>
      </div>
    </div>
  );

  const allImagesLoaded = images.every((src) => imagesLoaded[src]);

  if (!allImagesLoaded) {
    return <CarouselSkeleton />;
  }

  return (
    <div className="relative w-full h-[85vh] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`
            absolute inset-0 transition-opacity duration-1000
            ${index === currentIndex ? "opacity-100" : "opacity-0"}
          `}
        >
          <img
            src={image}
            alt={`School showcase ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
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
      ))}
    </div>
  );
};

export default CarouselSection;
