import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import {
  History as HistoryIcon,
  School,
  Trophy,
  Building2,
} from "lucide-react";

const History = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[300px] mb-12">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f"
              alt="School History"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">Our History</h1>
              <p className="text-xl max-w-2xl">
                A journey of excellence since 2007
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Foundation Story */}
          <Card className="p-8 mb-12 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <div className="flex items-start gap-6">
              <School className="h-12 w-12 text-blue-600 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold mb-4">The Beginning</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Founded on February 15, 2007, Holy Cross School Kabuganj was
                  established with a vision to provide quality education to the
                  region. Founded as a small institution with just a handful of
                  students, it has since grown into one of the most respected
                  educational institutions in the area, fostering academic
                  excellence and holistic development.
                </p>
              </div>
            </div>
          </Card>

          {/* Growth Timeline */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-blue-600">
                      2007
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Foundation</h3>
                    <p className="text-muted-foreground">
                      School founded with primary section and a mission to
                      provide quality education and holistic development.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-green-600">
                      2010
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Expansion</h3>
                    <p className="text-muted-foreground">
                      The school introduced its secondary section to cater to
                      students up to Class 10.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-purple-600">
                      2012
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      First Milestone
                    </h3>
                    <p className="text-muted-foreground">
                      The first batch of HSLC graduates achieved outstanding
                      results in 2012, setting a benchmark for academic
                      excellence.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-orange-600">
                      2015
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">New Campus</h3>
                    <p className="text-muted-foreground">
                      A new modern campus with advanced facilities was
                      inaugurated in 2015, enhancing the learning environment.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Key Achievements */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              Key Achievements
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
                <h3 className="text-xl font-semibold mb-2">
                  Academic Excellence
                </h3>
                <p className="text-muted-foreground">
                  Consistently achieving 95%+ pass rate in HSLC examinations
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Building2 className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Infrastructure</h3>
                <p className="text-muted-foreground">
                  Modern facilities including computer labs and science
                  laboratories
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <HistoryIcon className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-semibold mb-2">Legacy</h3>
                <p className="text-muted-foreground">
                  15+ years of educational excellence and community service
                </p>
              </Card>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;
