import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import { SEO } from "../ui/seo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Beaker, Atom, Microscope, ShieldAlert } from "lucide-react";

const ScienceLab = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Science Laboratories"
        description="Explore our state-of-the-art science laboratories at Holy Cross School Kabuganj. Well-equipped physics, chemistry, and biology labs for practical learning."
        keywords="science lab, school laboratory, physics lab, chemistry lab, biology lab, practical education"
        type="website"
      />
      <Header />
      {/* ... rest of the JSX ... */}
    </div>
  );
};

export default ScienceLab;
