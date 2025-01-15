import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { SEO } from "../ui/seo";
import {
  FileText,
  Calendar,
  ClipboardCheck,
  Info,
  Download,
} from "lucide-react";

const Admissions = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Admissions"
        description="Join Holy Cross School Kabuganj. Learn about our admission process, requirements, and important dates for enrollment."
        keywords="school admission, enrollment, admission process, admission requirements, school fees"
        type="website"
      />
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Admission Process</h1>

          {/* Important Dates */}
          <section className="mb-12">
            <Card className="p-6 border-l-4 border-blue-600">
              <div className="flex items-start gap-4">
                <Calendar className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Important Dates
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Primary Section
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>Form Distribution: January 15 - February 15</li>
                        <li>Form Submission: January 20 - February 20</li>
                        <li>Entrance Test: March 1</li>
                        <li>Results: March 15</li>
                        <li>Admission: March 20 - 30</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Secondary Section
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>Form Distribution: December 1 - December 31</li>
                        <li>Form Submission: December 5 - January 5</li>
                        <li>Entrance Test: January 15</li>
                        <li>Results: January 30</li>
                        <li>Admission: February 5 - 15</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Required Documents */}
          <section className="mb-12">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <FileText className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Required Documents
                  </h2>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Completed application form</li>
                    <li>Birth certificate (original and photocopy)</li>
                    <li>
                      Previous school's transfer certificate (if applicable)
                    </li>
                    <li>Report card of the previous academic year</li>
                    <li>4 recent passport-size photographs</li>
                    <li>Parent/Guardian's ID proof</li>
                    <li>Residential address proof</li>
                    <li>Immunization records</li>
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          {/* Admission Process */}
          <section className="mb-12">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <ClipboardCheck className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Admission Process
                  </h2>
                  <ol className="list-decimal pl-6 text-muted-foreground space-y-4">
                    <li>
                      <span className="font-semibold text-foreground">
                        Form Collection:
                      </span>
                      <p>
                        Obtain admission form from the school office or download
                        from website
                      </p>
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">
                        Form Submission:
                      </span>
                      <p>Submit completed form with all required documents</p>
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">
                        Entrance Test:
                      </span>
                      <p>
                        Appear for written test and/or interview as applicable
                      </p>
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">
                        Selection:
                      </span>
                      <p>Merit-based selection process</p>
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">
                        Fee Payment:
                      </span>
                      <p>Payment of admission and term fees</p>
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">
                        Final Admission:
                      </span>
                      <p>
                        Submission of original documents and completion of
                        admission process
                      </p>
                    </li>
                  </ol>
                </div>
              </div>
            </Card>
          </section>

          {/* Additional Information */}
          <section className="mb-12">
            <Card className="p-6 border-l-4 border-yellow-500">
              <div className="flex items-start gap-4">
                <Info className="h-8 w-8 text-yellow-500 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Important Information
                  </h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Age criteria must be met as per class requirements</li>
                    <li>Incomplete applications will not be processed</li>
                    <li>
                      All original documents must be presented for verification
                    </li>
                    <li>Admission is subject to seat availability</li>
                    <li>The school's decision in admission matters is final</li>
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          {/* Download Section */}
          <section>
            <div className="flex justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="mr-2 h-4 w-4" />
                Download Admission Form
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admissions;
