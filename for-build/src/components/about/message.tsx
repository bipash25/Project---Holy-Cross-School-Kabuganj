import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import principalImg from "../../assets/images/principal.webp";

const Message = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                  <img
                    src={principalImg}
                    alt="School Principal"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex-1 space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      Principal's Message
                    </h1>
                    <p className="text-muted-foreground">
                      Fr. John Doe | Principal, Holy Cross School Kabuganj
                    </p>
                  </div>

                  <div className="prose dark:prose-invert max-w-none space-y-4">
                    <p>
                      Welcome to Holy Cross School Kabuganj. As the Principal, I
                      am proud to lead an institution that has been dedicated to
                      academic excellence and holistic development of students
                      for many years.
                    </p>

                    <p>
                      Our mission is to provide quality education that nurtures
                      not just academic achievement, but also character,
                      creativity, and leadership skills. We believe in creating
                      an environment where every student can discover their
                      potential and grow into responsible citizens.
                    </p>

                    <p>
                      At Holy Cross School, we combine traditional values with
                      modern teaching methodologies, ensuring our students are
                      well-prepared for the challenges of the future while
                      remaining rooted in our cultural heritage.
                    </p>

                    <p>
                      Our dedicated team of teachers works tirelessly to provide
                      individualized attention to each student, fostering their
                      unique talents and abilities. We encourage critical
                      thinking, creativity, and a love for learning that will
                      stay with them throughout their lives.
                    </p>

                    <p>
                      Parents are our valued partners in this educational
                      journey. Together, we create a supportive and nurturing
                      environment that helps students achieve their full
                      potential.
                    </p>

                    <p>
                      I invite you to explore our website and learn more about
                      our programs, achievements, and the vibrant community that
                      makes Holy Cross School Kabuganj special.
                    </p>
                  </div>
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

export default Message;
