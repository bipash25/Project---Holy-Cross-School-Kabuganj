import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import {
  Users,
  Clock,
  Book,
  MessageSquare,
  CalendarCheck,
  Bell,
} from "lucide-react";

const ParentGuidelines = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Parent Guidelines</h1>

          <div className="grid gap-8">
            {/* Communication */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <MessageSquare className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Communication</h2>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Regularly check student diary for communications</li>
                    <li>Attend all parent-teacher meetings</li>
                    <li>
                      Inform school about any changes in contact information
                    </li>
                    <li>Use official channels for all communications</li>
                    <li>Schedule appointments for meeting teachers</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Attendance & Timing */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Clock className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Attendance & Timing
                  </h2>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Ensure regular and punctual attendance</li>
                    <li>Inform school about planned absences in advance</li>
                    <li>Submit medical certificates for sick leave</li>
                    <li>Pick up students on time after school</li>
                    <li>Minimum 75% attendance is mandatory</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Academic Support */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Book className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Academic Support
                  </h2>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Monitor homework completion daily</li>
                    <li>Review academic progress regularly</li>
                    <li>Provide necessary study materials</li>
                    <li>Create conducive study environment at home</li>
                    <li>Support participation in school activities</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* School Events */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <CalendarCheck className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">School Events</h2>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Attend school functions and events</li>
                    <li>Support children in extra-curricular activities</li>
                    <li>Participate in parent workshops</li>
                    <li>Volunteer for school activities when possible</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Important Reminders */}
            <Card className="p-6 border-l-4 border-yellow-500">
              <div className="flex items-start gap-4">
                <Bell className="h-8 w-8 text-yellow-500 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Important Reminders
                  </h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Update contact information promptly</li>
                    <li>Follow proper grievance redressal channels</li>
                    <li>Adhere to school policies and guidelines</li>
                    <li>Maintain positive and constructive communication</li>
                    <li>Support school's disciplinary actions</li>
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

export default ParentGuidelines;
