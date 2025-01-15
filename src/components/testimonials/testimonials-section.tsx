import { Card } from "../ui/card";
import { Quote } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  image?: string;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export const TestimonialsSection = ({
  testimonials = [
    {
      id: "1",
      quote:
        "Holy Cross School has provided my children with an excellent education and strong moral foundation. The teachers are dedicated and caring.",
      author: "Mrs. Sarah Johnson",
      role: "Parent",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      id: "2",
      quote:
        "The school's focus on both academic excellence and character development has helped shape me into who I am today.",
      author: "John Smith",
      role: "Alumni, Class of 2018",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: "3",
      quote:
        "I'm proud to be part of a school that nurtures not just academic growth but also personal development in students.",
      author: "Ms. Emily Chen",
      role: "Teacher",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    },
  ],
}: TestimonialsSectionProps) => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What People Say</h2>
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
                  {testimonial.image && (
                    <img
                      src={testimonial.image}
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
      </div>
    </section>
  );
};
