import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const EventsSection = () => {
  const events = [
    {
      title: "Christmas Celebration",
      image: "@/assets/images/christmas.webp",
      description: "Annual Christmas celebration with students and staff",
      date: "December 25, 2023",
    },
    {
      title: "Independence Day Celebration",
      image: "@/assets/images/independence_day_flag_hosting.webp",
      description: "Flag hoisting ceremony and cultural performances",
      date: "August 15, 2023",
    },
    {
      title: "Sports Achievement",
      image:
        "@/assets/images/inter-school_sports_competition_football_winners.webp",
      description: "Our football team won the inter-school competition",
      date: "September 30, 2023",
    },
    {
      title: "Drawing Competition",
      image: "@/assets/images/junior_drawing_examination.webp",
      description: "Junior students participating in drawing examination",
      date: "October 15, 2023",
    },
  ];

  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Recent Events</h2>
          <Button variant="outline" asChild>
            <Link to="/news">
              View All <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{event.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {event.description}
                </p>
                <p className="text-sm text-primary">{event.date}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
