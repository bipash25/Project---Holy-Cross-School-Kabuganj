import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import {
  Users,
  GraduationCap,
  Trophy,
  BookOpen,
  Building,
  Award,
} from "lucide-react";

const Statistics = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Total Students",
      value: "100+",
      subtext: "Enrolled in 2023-24",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-green-500" />,
      title: "Pass Rate",
      value: "98%",
      subtext: "Class of 2023",
    },
    {
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      title: "Academic Awards",
      value: "50+",
      subtext: "In last 5 years",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-500" />,
      title: "Subjects Offered",
      value: "25+",
      subtext: "Diverse curriculum",
    },
  ];

  const performanceMetrics = [
    { label: "HSLC Pass Rate", value: 98 },
    { label: "First Divisions", value: 85 },
    { label: "Extra-curricular Participation", value: 75 },
    { label: "Student Satisfaction", value: 92 },
  ];

  const facilities = [
    {
      icon: <Building className="h-8 w-8 text-indigo-500" />,
      title: "Infrastructure",
      stats: [
        { label: "Classrooms", value: "40" },
        { label: "Labs", value: "5" },
        { label: "Library Books", value: "10,000+" },
        { label: "Sports Fields", value: "3" },
      ],
    },
    {
      icon: <Award className="h-8 w-8 text-red-500" />,
      title: "Achievements",
      stats: [
        { label: "District Toppers", value: "15" },
        { label: "Sports Medals", value: "100+" },
        { label: "Cultural Awards", value: "45" },
        { label: "Science Fair Wins", value: "25" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Key Statistics */}
        <section className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-12">
            School Statistics
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
                <p className="text-3xl font-bold text-blue-600 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.subtext}</p>
              </Card>
            ))}
          </div>

          {/* Performance Metrics */}
          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6">
              Academic Performance
            </h2>
            <div className="space-y-6">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{metric.label}</span>
                    <span className="font-semibold">{metric.value}%</span>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          {/* Detailed Statistics */}
          <div className="grid md:grid-cols-2 gap-6">
            {facilities.map((facility, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  {facility.icon}
                  <h3 className="text-xl font-semibold">{facility.title}</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {facility.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="text-center p-3 bg-muted rounded-lg"
                    >
                      <p className="text-lg font-bold text-blue-600">
                        {stat.value}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Statistics;
