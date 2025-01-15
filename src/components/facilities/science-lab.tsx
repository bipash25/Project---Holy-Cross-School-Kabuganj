import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Beaker, Atom, Microscope, ShieldAlert } from "lucide-react";

const ScienceLab = () => {
  const labRules = [
    "Always wear safety goggles during experiments",
    "No food or drinks allowed in the laboratory",
    "Wear lab coats during practical sessions",
    "Report any accidents immediately",
    "Clean workstation after use",
    "Follow teacher's instructions strictly",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Science Laboratories</h1>

          <Tabs defaultValue="physics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="physics">Physics Lab</TabsTrigger>
              <TabsTrigger value="chemistry">Chemistry Lab</TabsTrigger>
              <TabsTrigger value="biology">Biology Lab</TabsTrigger>
            </TabsList>

            <TabsContent value="physics">
              <Card className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <Atom className="h-8 w-8 text-blue-600 mt-1" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">
                      Physics Laboratory
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      Our state-of-the-art physics lab is equipped with modern
                      apparatus for conducting experiments in mechanics, optics,
                      electricity, and more.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Equipment
                        </h3>
                        <ul className="list-disc pl-6 text-muted-foreground">
                          <li>Mechanics demonstration apparatus</li>
                          <li>Optical bench sets</li>
                          <li>Electrical circuit components</li>
                          <li>Digital measurement tools</li>
                          <li>Wave motion apparatus</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Experiments
                        </h3>
                        <ul className="list-disc pl-6 text-muted-foreground">
                          <li>Force and motion studies</li>
                          <li>Light and sound experiments</li>
                          <li>Circuit building and analysis</li>
                          <li>Energy conversion demonstrations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="chemistry">
              <Card className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <Beaker className="h-8 w-8 text-green-600 mt-1" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">
                      Chemistry Laboratory
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      A well-equipped chemistry lab with modern facilities for
                      conducting various chemical experiments and
                      demonstrations.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Equipment
                        </h3>
                        <ul className="list-disc pl-6 text-muted-foreground">
                          <li>Analytical balances</li>
                          <li>Distillation apparatus</li>
                          <li>pH meters</li>
                          <li>Spectrophotometers</li>
                          <li>Fume hoods</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Experiments
                        </h3>
                        <ul className="list-disc pl-6 text-muted-foreground">
                          <li>Acid-base titrations</li>
                          <li>Organic compound analysis</li>
                          <li>Chemical reaction studies</li>
                          <li>Solution preparation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="biology">
              <Card className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <Microscope className="h-8 w-8 text-purple-600 mt-1" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">
                      Biology Laboratory
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      Our biology lab provides students with hands-on experience
                      in studying life sciences through modern equipment and
                      specimens.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Equipment
                        </h3>
                        <ul className="list-disc pl-6 text-muted-foreground">
                          <li>Compound microscopes</li>
                          <li>Dissection kits</li>
                          <li>Specimen collections</li>
                          <li>Models and charts</li>
                          <li>Incubators</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Experiments
                        </h3>
                        <ul className="list-disc pl-6 text-muted-foreground">
                          <li>Cell structure studies</li>
                          <li>Plant and animal dissections</li>
                          <li>Microscopic observations</li>
                          <li>Environmental studies</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Safety Rules */}
          <Card className="mt-8 p-6 border-l-4 border-red-500">
            <div className="flex items-start gap-4">
              <ShieldAlert className="h-6 w-6 text-red-500 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Laboratory Safety Rules
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-muted-foreground">
                    {labRules
                      .slice(0, Math.ceil(labRules.length / 2))
                      .map((rule, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="font-bold">•</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                  </ul>
                  <ul className="space-y-2 text-muted-foreground">
                    {labRules
                      .slice(Math.ceil(labRules.length / 2))
                      .map((rule, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="font-bold">•</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ScienceLab;
