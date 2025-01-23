import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import { ClipboardList, Calendar, Award, AlertTriangle } from "lucide-react";

const Examinations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Examination System</h1>

          <div className="grid gap-8">
            {/* Exam Types */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <ClipboardList className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Types of Examinations
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Internal Assessments
                      </h3>
                      <ul className="list-disc pl-6 text-muted-foreground">
                        <li>Class Tests (Monthly)</li>
                        <li>Unit Tests</li>
                        <li>Half-Yearly Examinations</li>
                        <li>Annual Examinations</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        External Examinations
                      </h3>
                      <ul className="list-disc pl-6 text-muted-foreground">
                        <li>Board Pre-Tests</li>
                        <li>Board Examinations</li>
                        <li>Competitive Examinations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Exam Schedule */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Calendar className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Examination Schedule
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">First Term</h3>
                      <ul className="list-disc pl-6 text-muted-foreground">
                        <li>Unit Test I: July</li>
                        <li>Mid-Term Examinations: September</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Second Term
                      </h3>
                      <ul className="list-disc pl-6 text-muted-foreground">
                        <li>Unit Test II: December</li>
                        <li>Annual Examinations: March</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Grading System */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Award className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Grading System
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left pb-2">Grade</th>
                          <th className="text-left pb-2">Percentage</th>
                        </tr>
                      </thead>
                      <tbody className="text-muted-foreground">
                        <tr>
                          <td>A+</td>
                          <td>90% and above</td>
                        </tr>
                        <tr>
                          <td>A</td>
                          <td>80% - 89%</td>
                        </tr>
                        <tr>
                          <td>B+</td>
                          <td>70% - 79%</td>
                        </tr>
                        <tr>
                          <td>B</td>
                          <td>60% - 69%</td>
                        </tr>
                        <tr>
                          <td>C</td>
                          <td>50% - 59%</td>
                        </tr>
                        <tr>
                          <td>D</td>
                          <td>Below 50%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Card>

            {/* Examination Rules */}
            <Card className="p-6 border-l-4 border-yellow-500">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-yellow-500 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Examination Rules
                  </h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Students must carry their hall ticket and school ID</li>
                    <li>No electronic devices allowed in examination hall</li>
                    <li>Minimum 75% attendance required to appear for exams</li>
                    <li>Medical certificates required for exam absence</li>
                    <li>Re-examinations only conducted in special cases</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Examinations;
