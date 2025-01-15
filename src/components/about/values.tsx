import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import { Heart, Users, Brain, Target, Star, Shield } from "lucide-react";

const Values = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Compassion",
      description: "Nurturing empathy and understanding towards others",
      points: [
        "Encouraging kindness in daily interactions",
        "Supporting community service initiatives",
        "Promoting inclusive behavior",
      ],
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      title: "Academic Excellence",
      description: "Striving for the highest standards in education",
      points: [
        "Rigorous academic curriculum",
        "Emphasis on critical thinking",
        "Continuous learning and improvement",
      ],
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Collaboration",
      description: "Working together towards common goals",
      points: [
        "Team-based learning approaches",
        "Parent-teacher partnerships",
        "Community engagement",
      ],
    },
    {
      icon: <Target className="h-8 w-8 text-green-500" />,
      title: "Innovation",
      description: "Embracing new ideas and approaches",
      points: [
        "Modern teaching methodologies",
        "Technology integration",
        "Creative problem-solving",
      ],
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: "Leadership",
      description: "Developing tomorrow's leaders",
      points: [
        "Student leadership programs",
        "Decision-making opportunities",
        "Responsibility and accountability",
      ],
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-500" />,
      title: "Integrity",
      description: "Upholding moral and ethical principles",
      points: [
        "Honesty in all dealings",
        "Ethical decision-making",
        "Moral character development",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[300px] mb-12">
          <div className="absolute inset-0">
            <img
              src="/src/assets/about_2.jpg"
              alt="School Values"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">Our Core Values</h1>
              <p className="text-xl max-w-2xl">
                The principles that guide our educational journey
              </p>
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-lg transition-shadow bg-card"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {value.description}
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground w-full text-left">
                    {value.points.map((point, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Values;
