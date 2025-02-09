import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import { Target, Eye, Lightbulb } from "lucide-react";
import { EditableContent } from "../ui/editable-content";

const Mission = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <section className="mb-16">
              <Card className="p-8 bg-blue-600 text-white">
                <Target className="h-12 w-12 mb-4" />
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <EditableContent id="missionStatement" type="richtext">
                  <p
                    className="text-lg"
                    data-editable
                    id="missionStatement"
                    data-description="School's mission statement"
                  >
                    To provide a nurturing environment that fosters academic
                    excellence, personal growth, and social responsibility,
                    preparing students to become successful global citizens of
                    tomorrow.
                  </p>
                </EditableContent>
              </Card>
            </section>

            <section className="mb-16">
              <Card className="p-8 bg-green-600 text-white">
                <Eye className="h-12 w-12 mb-4" />
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <EditableContent id="visionStatement" type="richtext">
                  <p
                    className="text-lg"
                    data-editable
                    id="visionStatement"
                    data-description="School's vision statement"
                  >
                    To be recognized as a leading educational institution that
                    empowers students with knowledge, skills, and values
                    necessary for lifelong success and meaningful contribution
                    to society.
                  </p>
                </EditableContent>
              </Card>
            </section>

            <section>
              <Card className="p-8">
                <Lightbulb className="h-12 w-12 mb-4 text-yellow-500" />
                <h2 className="text-3xl font-bold mb-6">Our Objectives</h2>
                <EditableContent id="objectives" type="list">
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="font-bold">1.</span>
                      <span>
                        Provide high-quality education that meets international
                        standards
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">2.</span>
                      <span>
                        Foster critical thinking and problem-solving skills
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">3.</span>
                      <span>
                        Develop strong moral character and leadership qualities
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">4.</span>
                      <span>
                        Create a supportive and inclusive learning environment
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">5.</span>
                      <span>
                        Promote cultural awareness and global perspective
                      </span>
                    </li>
                  </ul>
                </EditableContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Mission;
