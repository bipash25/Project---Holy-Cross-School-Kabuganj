import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import { Book, Clock, Users, BookOpen } from "lucide-react";

const Library = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">School Library</h1>

            <div className="grid gap-6">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Book className="h-8 w-8 text-blue-600 mt-1" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Collection</h2>
                    <p className="text-muted-foreground mb-4">
                      Our library houses over 10,000 books covering various
                      subjects, including:
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>Academic textbooks and reference materials</li>
                      <li>Fiction and literature</li>
                      <li>Science and technology</li>
                      <li>History and geography</li>
                      <li>Magazines and periodicals</li>
                      <li>Digital resources</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Clock className="h-8 w-8 text-blue-600 mt-1" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Timings</h2>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>Monday - Thursday: 8:00 AM - 4:00 PM</li>
                      <li>Friday: 8:00 AM - 12:00 PM</li>
                      <li>Saturday: 9:00 AM - 2:00 PM</li>
                      <li>Sunday: Closed</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Users className="h-8 w-8 text-blue-600 mt-1" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Services</h2>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>Book lending</li>
                      <li>Reading room facilities</li>
                      <li>Digital catalog access</li>
                      <li>Research assistance</li>
                      <li>Photocopying services</li>
                      <li>Study areas</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <BookOpen className="h-8 w-8 text-blue-600 mt-1" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">
                      Rules and Guidelines
                    </h2>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>Maximum 3 books can be borrowed at a time</li>
                      <li>Books must be returned within 14 days</li>
                      <li>Late returns will incur a fine of ৳5 per day</li>
                      <li>Lost books must be replaced or paid for</li>
                      <li>Maintain silence in the library</li>
                      <li>No food or drinks allowed</li>
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

export default Library;
