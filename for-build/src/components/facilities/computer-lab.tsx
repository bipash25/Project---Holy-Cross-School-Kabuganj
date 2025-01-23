import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import { Monitor, Cpu, Network, ShieldCheck } from "lucide-react";

const ComputerLab = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Computer Laboratory</h1>

            <div className="grid gap-6">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Monitor className="h-8 w-8 text-blue-600 mt-1" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">
                      Infrastructure
                    </h2>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>30 modern desktop computers</li>
                      <li>High-speed internet connectivity</li>
                      <li>Interactive smartboard</li>
                      <li>Projector system</li>
                      <li>Air-conditioned environment</li>
                      <li>Ergonomic furniture</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Cpu className="h-8 w-8 text-blue-600 mt-1" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">
                      Software and Resources
                    </h2>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>Latest Windows operating system</li>
                      <li>Microsoft Office Suite</li>
                      <li>Programming languages (Python, Java)</li>
                      <li>Graphics design software</li>
                      <li>Educational software</li>
                      <li>Typing tutors</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Network className="h-8 w-8 text-blue-600 mt-1" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">
                      Courses Offered
                    </h2>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>Basic computer operations</li>
                      <li>Microsoft Office applications</li>
                      <li>Internet and email usage</li>
                      <li>Basic programming concepts</li>
                      <li>Web design fundamentals</li>
                      <li>Digital literacy</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="h-8 w-8 text-blue-600 mt-1" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Lab Rules</h2>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>No food or drinks allowed in the lab</li>
                      <li>Handle equipment with care</li>
                      <li>Save work in designated folders</li>
                      <li>Report any technical issues immediately</li>
                      <li>Follow internet usage guidelines</li>
                      <li>Clean workstation after use</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ComputerLab;
