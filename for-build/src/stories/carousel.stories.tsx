import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";

export default {
  title: "Components/Carousel",
  component: Carousel,
};

export const Default = () => (
  <Carousel>
    <CarouselContent>
      {Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem key={index}>
          <div className="p-1">
            <div className="flex aspect-square items-center justify-center rounded-lg border border-border bg-card p-6">
              <span className="text-4xl font-semibold">{index + 1}</span>
            </div>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
);
