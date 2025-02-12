import { Card } from "../ui/card";
import principalImg from "../../assets/images/principal.webp";

const PrincipalSection = () => {
  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3 flex-shrink-0">
              <img
                src={principalImg}
                alt="School Principal"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Principal's Message
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="mb-4">
                  Welcome to Holy Cross School Kabuganj. As the Principal, I am
                  proud to lead an institution that has been dedicated to
                  academic excellence and holistic development of students for
                  many years.
                </p>
                <p className="mb-4">
                  Our mission is to provide quality education that nurtures not
                  just academic achievement, but also character, creativity, and
                  leadership skills. We believe in creating an environment where
                  every student can discover their potential and grow into
                  responsible citizens.
                </p>
                <p>
                  At Holy Cross School, we combine traditional values with
                  modern teaching methodologies, ensuring our students are
                  well-prepared for the challenges of the future while remaining
                  rooted in our cultural heritage.
                </p>
                <div className="mt-6">
                  <p className="font-semibold">Fr. John Doe</p>
                  <p className="text-muted-foreground">Principal</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PrincipalSection;
