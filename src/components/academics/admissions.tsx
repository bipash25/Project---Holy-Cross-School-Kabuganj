import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { FileText, Calendar, ClipboardCheck, Info } from "lucide-react";

const Admissions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Admissions</h1>

          <div className="grid gap-8">
            {/* Admission Process */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <FileText className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Admission Process
                  </h2>
                  <ol className="list-decimal pl-6 space-y-4 text-muted-foreground">
                    <li>
                      <h3 className="text-lg font-semibold mb-1">
                        Application Submission
                      </h3>
                      <p>
                        Fill out the online application form or collect it from
                        the school office
                      </p>
                    </li>
                    <li>
                      <h3 className="text-lg font-semibold mb-1">
                        Document Verification
                      </h3>
                      <p>Submit required documents for verification</p>
                    </li>
                    <li>
                      <h3 className="text-lg font-semibold mb-1">
                        Entrance Test
                      </h3>
                      <p>
                        Appear for the entrance test (for classes 2 and above)
                      </p>
                    </li>
                    <li>
                      <h3 className="text-lg font-semibold mb-1">Interview</h3>
                      <p>
                        Parent and student interview with school authorities
                      </p>
                    </li>
                    <li>
                      <h3 className="text-lg font-semibold mb-1">
                        Admission Confirmation
                      </h3>
                      <p>
                        Payment of fees and completion of admission formalities
                      </p>
                    </li>
                  </ol>
                </div>
              </div>
            </Card>

            {/* Important Dates */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Calendar className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Important Dates
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Primary Section
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>Form Distribution: December 1-15</li>
                        <li>Form Submission: December 16-31</li>
                        <li>Entrance Test: January 15</li>
                        <li>Results: January 30</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Secondary Section
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>Form Distribution: November 15-30</li>
                        <li>Form Submission: December 1-15</li>
                        <li>Entrance Test: January 10</li>
                        <li>Results: January 25</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Required Documents */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <ClipboardCheck className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Required Documents
                  </h2>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>Completed application form</li>
                    <li>Birth certificate</li>
                    <li>
                      Previous school transfer certificate (for classes 2 and
                      above)
                    </li>
                    <li>Report card of previous class</li>
                    <li>Passport size photographs</li>
                    <li>Address proof</li>
                    <li>Aadhar card copy of student and parents</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Age Criteria */}
            <Card className="p-6 border-l-4 border-blue-600">
              <div className="flex items-start gap-4">
                <Info className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Age Criteria</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>As of April 1st of the academic year:</p>
                    <ul className="list-disc pl-6">
                      <li>Class 1: 5+ years</li>
                      <li>Class 2: 6+ years</li>
                      <li>Class 3: 7+ years</li>
                      <li>And so on...</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* Apply Now Button */}
            <div className="text-center mt-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admissions;
