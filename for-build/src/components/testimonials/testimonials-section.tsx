import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { Quote, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { api, Testimonial } from "@/lib/api";

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await api.testimonials.getRecent();
        setTestimonials(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load testimonials",
        );
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">What People Say</h2>
            <Button
              onClick={() => navigate("/testimonials/new")}
              className="hidden sm:flex items-center"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Share Your Story
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="space-y-4">
                  <div className="h-8 w-8 bg-gray-300 rounded" />
                  <div className="h-20 bg-gray-300 rounded" />
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-gray-300 rounded-full" />
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-gray-300 rounded" />
                      <div className="h-4 w-32 bg-gray-300 rounded" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 text-center text-red-500">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">What People Say</h2>
          <Button
            onClick={() => navigate("/testimonials/new")}
            className="hidden sm:flex items-center"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Share Your Story
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="p-6 hover:shadow-lg transition-shadow"
            >
              <div className="space-y-4">
                <Quote className="h-8 w-8 text-blue-600" />
                <p className="text-muted-foreground italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center space-x-4">
                  {testimonial.image_url && (
                    <img
                      src={testimonial.image_url}
                      alt={testimonial.author}
                      className="h-12 w-12 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button
            onClick={() => navigate("/testimonials/new")}
            className="w-full"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Share Your Story
          </Button>
        </div>
      </div>
    </section>
  );
};
