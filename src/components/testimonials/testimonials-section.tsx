import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { api, Testimonial } from "@/lib/api";
import { Skeleton } from "../ui/skeleton";

const TestimonialsSection = () => {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await api.testimonials.getRecent();
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Testimonials</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <div className="flex items-center mt-4">
                <Skeleton className="h-12 w-12 rounded-full mr-4" />
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Testimonials</h2>
        <p className="text-muted-foreground mt-4">
          Hear what our community says about us
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div 
            key={testimonial.id || index} 
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col"
          >
            <p className="text-lg italic mb-4 flex-grow">
              "{testimonial.quote || testimonial.message}"
            </p>

            <div className="flex items-center mt-4">
              {testimonial.image_url && (
                <img
                  src={testimonial.image_url}
                  alt={testimonial.author || testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
              )}
              <div>
                <p className="font-semibold">
                  {testimonial.author || testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role || testimonial.designation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button 
          variant="outline" 
          onClick={() => navigate("/testimonials/new")}
        >
          Share Your Experience
        </Button>
      </div>
    </section>
  );
};

export default TestimonialsSection;
