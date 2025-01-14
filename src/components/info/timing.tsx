import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Clock, Calendar, Bell, AlertTriangle } from "lucide-react";

const Timing = () => {
  const regularSchedule = [
    { period: "Assembly", time: "7:30 AM - 7:45 AM" },
    { period: "1st Period", time: "7:45 AM - 8:30 AM" },
    { period: "2nd Period", time: "8:30 AM - 9:15 AM" },
    { period: "3rd Period", time: "9:15 AM - 10:00 AM" },
    { period: "Break", time: "10:00 AM - 10:30 AM" },
    { period: "4th Period", time: "10:30 AM - 11:15 AM" },
    { period: "5th Period", time: "11:15 AM - 12:00 PM" },
    { period: "6th Period", time: "12:00 PM - 12:45 PM" },
    { period: "Prayer & Lunch", time: "12:45 PM - 1:30 PM" },
    { period: "7th Period", time: "1:30 PM - 2:15 PM" },
    { period: "8th Period", time: "2:15 PM - 3:00 PM" },
  ];

  const fridaySchedule = [
    { period: "Assembly", time: "7:30 AM - 7:45 AM" },
    { period: "1st Period", time: "7:45 AM - 8:25 AM" },
    { period: "2nd Period", time: "8:25 AM - 9:05 AM" },
    { period: "3rd Period", time: "9:05 AM - 9:45 AM" },
    { period: "Break", time: "9:45 AM - 10:15 AM" },
    { period: "4th Period", time: "10:15 AM - 10:55 AM" },
    { period: "5th Period", time: "10:55 AM - 11:35 AM" },
    { period: "Prayer & Dismissal", time: "11:35 AM - 12:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center gap-3 mb-8">
            <Clock className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold">School Timing</h1>
          </div>

          <div className="grid gap-8">
            {/* Regular Days Schedule */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold">
                  Regular Days (Sun-Thu)
                </h2>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regularSchedule.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {item.period}
                      </TableCell>
                      <TableCell>{item.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            {/* Friday Schedule */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold">Friday Schedule</h2>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fridaySchedule.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {item.period}
                      </TableCell>
                      <TableCell>{item.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            {/* Important Notes */}
            <Card className="p-6 border-l-4 border-yellow-500">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Important Notes
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Gates open at 7:00 AM</li>
                    <li>Students should arrive by 7:25 AM</li>
                    <li>Late arrivals must report to the office</li>
                    <li>
                      Parents should pick up students within 30 minutes after
                      dismissal
                    </li>
                    <li>
                      Extra-curricular activities are held from 3:15 PM to 4:30
                      PM
                    </li>
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

export default Timing;
