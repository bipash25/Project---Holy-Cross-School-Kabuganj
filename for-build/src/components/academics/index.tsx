import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import { GraduationCap, BookOpen, Users, ClipboardList } from "lucide-react";

const Academics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px]">
          <div className="absolute inset-0">
            <img
              src="/src/assets/slider5.jpg"
              alt="Academic Life"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-4">Academics</h1>
              <p className="text-xl max-w-2xl">
                Fostering excellence through comprehensive education
              </p>
            </div>
          </div>
        </section>

        {/* Academic Programs */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Academic Programs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <GraduationCap className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Primary Education
                </h3>
                <p className="text-muted-foreground">
                  Comprehensive foundation for grades 1-5 following the national
                  curriculum
                </p>
              </Card>
              <Card className="p-6">
                <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Secondary Education
                </h3>
                <p className="text-muted-foreground">
                  Advanced learning for grades 6-10 preparing for SSC
                  examinations
                </p>
              </Card>
              <Card className="p-6">
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Special Programs</h3>
                <p className="text-muted-foreground">
                  Extra-curricular activities and specialized training programs
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Examination System */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Examination System
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  Internal Assessments
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Regular class tests and assignments</li>
                  <li>Mid-term examinations</li>
                  <li>Final term examinations</li>
                  <li>Practical assessments</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  External Examinations
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Primary School Certificate (PSC)</li>
                  <li>Junior School Certificate (JSC)</li>
                  <li>Secondary School Certificate (SSC)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Calendar */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Academic Calendar
            </h2>
            <Card className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">First Term</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>January: New Academic Year Begins</li>
                    <li>February: First Unit Tests</li>
                    <li>March: Sports Week</li>
                    <li>April: Mid-term Examinations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Second Term</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>July: Second Term Begins</li>
                    <li>August: Cultural Week</li>
                    <li>October: Pre-final Examinations</li>
                    <li>December: Final Examinations</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Academics;
