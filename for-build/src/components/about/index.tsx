import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import { SEO } from "../ui/seo";
import { Book, Heart, Trophy, Users } from "lucide-react";
import { BackToTop } from "../ui/back-to-top";
import { EditableContent } from "../ui/editable-content";
import aboutImage from "@/assets/images/about_1.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About Us"
        description="Learn about Holy Cross School Kabuganj's history, mission, values, and commitment to educational excellence."
        keywords="about school, school history, mission, values, Holy Cross School, education"
        type="website"
      />
      <BackToTop />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] mb-12 mt-20">
          <div className="absolute inset-0">
            <EditableContent id="heroImage" type="image">
              <img
                src={aboutImage}
                alt="About Us"
                className="w-full h-full object-cover"
              />
            </EditableContent>
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-4xl font-bold mb-4">About Our School</h1>
              <EditableContent id="introText" type="richtext">
                <p className="text-xl">
                  Learn about Holy Cross School Kabuganj's history, mission,
                  values, and commitment to educational excellence.
                </p>
              </EditableContent>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <EditableContent id="stats" type="list">
          <section className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Book className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">15+ Years</h3>
                <p className="text-muted-foreground">Of Academic Excellence</p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Users className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-semibold mb-2">1000+ Students</h3>
                <p className="text-muted-foreground">Active Enrollment</p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
                <h3 className="text-xl font-semibold mb-2">100+ Awards</h3>
                <p className="text-muted-foreground">Academic & Sports</p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Heart className="h-12 w-12 mx-auto mb-4 text-red-600" />
                <h3 className="text-xl font-semibold mb-2">95% Success</h3>
                <p className="text-muted-foreground">Student Achievement</p>
              </Card>
            </div>
          </section>
        </EditableContent>
      </main>

      <Footer />
    </div>
  );
};

export default About;
