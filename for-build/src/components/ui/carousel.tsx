import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel, { type EmblaOptionsType } from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselProps = {
  opts?: EmblaOptionsType;
  plugins?: any[];
  orientation?: "horizontal" | "vertical";
  setApi?: (api: any) => void;
} & React.HTMLAttributes<HTMLDivElement>;

type CarouselApiType = any;

export const CarouselContext = React.createContext<CarouselApiType>(null);

function Carousel({
  opts,
  plugins,
  orientation = "horizontal",
  setApi,
  className,
  children,
  ...props
}: CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );

  React.useEffect(() => {
    if (api) {
      setApi?.(api);
    }
  }, [api, setApi]);

  return (
    <CarouselContext.Provider value={api}>
      <div
        ref={carouselRef}
        className={cn(
          "relative",
          orientation === "horizontal" ? "w-full" : "h-full",
          className,
        )}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex", "-ml-4 [&>*]:pl-4", className)} {...props} />
  );
}

function CarouselItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const api = React.useContext(CarouselContext);

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("absolute h-8 w-8 rounded-full", className)}
      disabled={!api?.canScrollPrev()}
      onClick={() => api?.scrollPrev()}
      aria-label="Previous slide"
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const api = React.useContext(CarouselContext);

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("absolute h-8 w-8 rounded-full", className)}
      disabled={!api?.canScrollNext()}
      onClick={() => api?.scrollNext()}
      aria-label="Next slide"
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
