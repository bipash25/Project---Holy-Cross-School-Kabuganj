import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import { Book, Heart, Trophy, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px]">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
              alt="School Building"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-4">About Our School</h1>
              <p className="text-xl max-w-2xl">
                Nurturing minds and building character since our establishment
              </p>
            </div>
          </div>
        </section>

        {/* History & Mission */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our History</h2>
                <p className="text-muted-foreground">
                  Founded in 2008, Holy Cross School Kabuganj has been a beacon
                  of educational excellence in the region. Our journey began
                  with a vision to provide quality education that nurtures both
                  academic excellence and moral values.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground">
                  To provide a nurturing environment that fosters academic
                  excellence, personal growth, and social responsibility,
                  preparing students to become successful global citizens of
                  tomorrow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <Book className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">
                  Academic Excellence
                </h3>
                <p className="text-muted-foreground">
                  Striving for the highest standards in education
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Heart className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">
                  Character Building
                </h3>
                <p className="text-muted-foreground">
                  Developing strong moral values and integrity
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Community Spirit</h3>
                <p className="text-muted-foreground">
                  Fostering a sense of belonging and cooperation
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Trophy className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Leadership</h3>
                <p className="text-muted-foreground">
                  Nurturing tomorrow's leaders today
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-4xl font-bold mb-2">15+</h3>
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
      <Footer />
    </div>
  );
};

export default About;
