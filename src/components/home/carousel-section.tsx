import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Image } from "../ui/image";

interface CarouselSectionProps {
  images: string[];
}

interface ImageLoadingState {
  [key: string]: boolean;
}

const CarouselSection = ({ images }: CarouselSectionProps) => {
  const navigate = useNavigate();
  const [imagesLoaded, setImagesLoaded] = useState<ImageLoadingState>({});

  useEffect(() => {
    const preloadImages = () => {
      images.forEach((src) => {
        const img = new window.Image();
        img.src = src;
        img.onload = () => {
          setImagesLoaded((prev) => ({ ...prev, [src]: true }));
        };
        img.onerror = () => {
          throw new Error(`Failed to load image: ${src}`);
        };
      });
    };

    preloadImages();
  }, [images]);

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
    <Carousel className="w-full h-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full h-[85vh]">
              <Image
                src={image}
                alt={`School showcase ${index + 1}`}
                className="w-full h-full object-cover"
                lowQuality={true}
                priority={index === 0} // Only the first image gets priority loading
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
  );
};

export default CarouselSection;
