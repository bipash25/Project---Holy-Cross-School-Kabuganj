import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import {
  UserCheck,
  Shield,
  Award,
  AlertTriangle,
  BookOpen,
  Users,
} from "lucide-react";

const StudentConduct = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Student Code of Conduct</h1>

          <div className="grid gap-8">
            {/* General Conduct */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <UserCheck className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    General Conduct
                  </h2>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Maintain discipline and decorum at all times</li>
                    <li>
                      Show respect to teachers, staff, and fellow students
                    </li>
                    <li>Wear proper school uniform daily</li>
                    <li>Be punctual and regular in attendance</li>
                    <li>Keep the school premises clean</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Academic Integrity */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Academic Integrity
                  </h2>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Complete assignments independently</li>
                    <li>Avoid plagiarism in any form</li>
                    <li>Be honest during examinations</li>
                    <li>Submit work on time</li>
                    <li>Maintain academic records properly</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Classroom Behavior */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <BookOpen className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Classroom Behavior
                  </h2>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Pay attention during lessons</li>
                    <li>Participate actively in class discussions</li>
                    <li>Maintain silence when required</li>
                    <li>Keep classrooms clean and organized</li>
                    <li>Follow teacher instructions promptly</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Social Behavior */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Users className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Social Behavior
                  </h2>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Practice kindness and empathy</li>
                    <li>No bullying or harassment</li>
                    <li>Respect cultural diversity</li>
                    <li>Use appropriate language</li>
                    <li>Help and support classmates</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Disciplinary Actions */}
            <Card className="p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-red-500 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Disciplinary Actions
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Violation of the code of conduct may result in:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Verbal warning</li>
                    <li>Written warning to parents</li>
                    <li>Detention</li>
                    <li>Parent conference</li>
                    <li>Suspension in severe cases</li>
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

export default StudentConduct;
