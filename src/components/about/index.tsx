import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import { SEO } from "../ui/seo";
import { Book, Heart, Trophy, Users } from "lucide-react";
import { BackToTop } from "../ui/back-to-top";

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
      {/* ... rest of the JSX ... */}
    </div>
  );
};

export default About;
