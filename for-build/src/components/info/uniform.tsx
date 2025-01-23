import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AlertCircle } from "lucide-react";

const UniformGuidelines = () => {
  const uniformRules = [
    "Uniforms must be clean and well-pressed",
    "Name tags are mandatory",
    "Black shoes must be polished",
    "Socks must be white and clean",
    "No modifications to the uniform are allowed",
    "P.E. uniform is only for sports days",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Uniform Guidelines</h1>

          <Tabs defaultValue="boys">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="boys">Boys Uniform</TabsTrigger>
              <TabsTrigger value="girls">Girls Uniform</TabsTrigger>
            </TabsList>

            <TabsContent value="boys">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Regular Uniform</h2>
                <div className="space-y-6">
                  <section>
                    <h3 className="text-xl font-semibold mb-3">Summer</h3>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>White short-sleeved shirt</li>
                      <li>Navy blue trousers</li>
                      <li>School tie with house color</li>
                      <li>Black leather shoes</li>
                      <li>White socks</li>
                      <li>School belt with logo</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3">Winter</h3>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>White long-sleeved shirt</li>
                      <li>Navy blue trousers</li>
                      <li>Navy blue sweater with school logo</li>
                      <li>School blazer (Classes 6-10)</li>
                      <li>School tie with house color</li>
                      <li>Black leather shoes</li>
                      <li>White socks</li>
                    </ul>
                  </section>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="girls">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Regular Uniform</h2>
                <div className="space-y-6">
                  <section>
                    <h3 className="text-xl font-semibold mb-3">Summer</h3>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>White kameez with school logo</li>
                      <li>Navy blue shalwar</li>
                      <li>White dupatta</li>
                      <li>Black shoes</li>
                      <li>White socks</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3">Winter</h3>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>White long-sleeved kameez with school logo</li>
                      <li>Navy blue shalwar</li>
                      <li>Navy blue sweater with school logo</li>
                      <li>School blazer (Classes 6-10)</li>
                      <li>White dupatta</li>
                      <li>Black shoes</li>
                      <li>White socks</li>
                    </ul>
                  </section>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">P.E. Uniform</h2>
              <Card className="p-6">
                <ul className="space-y-2 text-muted-foreground">
                  <li>White T-shirt with school logo</li>
                  <li>Navy blue track pants</li>
                  <li>White sports shoes</li>
                  <li>White socks</li>
                  <li>House color T-shirt for sports events</li>
                </ul>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">General Rules</h2>
              <Card className="p-6 border-l-4 border-blue-600">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-1" />
                  <ul className="space-y-2 text-muted-foreground">
                    {uniformRules.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UniformGuidelines;
