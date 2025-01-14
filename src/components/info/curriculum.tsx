import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const Curriculum = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Curriculum</h1>

          <Tabs defaultValue="primary">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="primary">Primary Section</TabsTrigger>
              <TabsTrigger value="secondary">Secondary Section</TabsTrigger>
            </TabsList>

            <TabsContent value="primary">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Primary Section (Classes 1-5)
                </h2>
                <div className="space-y-6">
                  <section>
                    <h3 className="text-xl font-semibold mb-3">
                      Core Subjects
                    </h3>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>Bangla</li>
                      <li>English</li>
                      <li>Mathematics</li>
                      <li>Science</li>
                      <li>Social Studies</li>
                      <li>Religious Studies</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3">
                      Co-curricular Activities
                    </h3>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>Art and Craft</li>
                      <li>Physical Education</li>
                      <li>Music</li>
                      <li>Library Activities</li>
                    </ul>
                  </section>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="secondary">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Secondary Section (Classes 6-10)
                </h2>
                <div className="space-y-6">
                  <section>
                    <h3 className="text-xl font-semibold mb-3">
                      Core Subjects
                    </h3>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>Bangla First Paper</li>
                      <li>Bangla Second Paper</li>
                      <li>English First Paper</li>
                      <li>English Second Paper</li>
                      <li>Mathematics</li>
                      <li>Physics</li>
                      <li>Chemistry</li>
                      <li>Biology</li>
                      <li>Bangladesh and Global Studies</li>
                      <li>Religious Studies</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3">
                      Optional Subjects
                    </h3>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>Higher Mathematics</li>
                      <li>Agricultural Studies</li>
                      <li>Computer Science</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3">
                      Practical Sessions
                    </h3>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>Physics Lab</li>
                      <li>Chemistry Lab</li>
                      <li>Biology Lab</li>
                      <li>Computer Lab</li>
                    </ul>
                  </section>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Teaching Methodology
              </h2>
              <Card className="p-6">
                <ul className="space-y-2 text-muted-foreground">
                  <li>Interactive classroom sessions</li>
                  <li>Project-based learning</li>
                  <li>Regular assessments and feedback</li>
                  <li>Use of modern teaching aids</li>
                  <li>Practical demonstrations</li>
                </ul>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Assessment System</h2>
              <Card className="p-6">
                <ul className="space-y-2 text-muted-foreground">
                  <li>Continuous evaluation through class tests</li>
                  <li>Term examinations</li>
                  <li>Project work and assignments</li>
                  <li>Practical examinations</li>
                  <li>Final examinations</li>
                </ul>
              </Card>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Curriculum;
