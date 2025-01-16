import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import { SEO } from "../ui/seo";
import { Quote } from "lucide-react";
import principalImage from "../../assets/images/principal_1.jpg";

const Message = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Principal's Message"
        description="Message from the Principal of Holy Cross School Kabuganj. Learn about our vision, values, and commitment to education."
        keywords="principal message, school principal, education vision, Holy Cross School"
        type="article"
      />
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Principal's Image */}
                <div className="md:col-span-1">
                  <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={principalImage}
                      alt="School Principal"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="font-semibold">Sr. Rose (C J)</h3>
                    <p className="text-sm text-muted-foreground">Principal</p>
                  </div>
                </div>

                {/* Message Content */}
                <div className="md:col-span-2 space-y-6">
                  <div className="flex items-center gap-4">
                    <Quote className="h-8 w-8 text-blue-600" />
                    <h1 className="text-3xl font-bold">Principal's Message</h1>
                  </div>

                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Every individual is a unique creation. God has shaped man
                      in a special way and bestowed upon him many blessings
                      according to the purpose and plan for his life. So, men
                      differ in many ways; in size, complexion, talents,
                      abilities, skills, character and so on, each designed to
                      establish the plans of the Almighty progressively
                      fulfilling the God-ordained purpose of his life. The rich
                      deposits God has placed in every student need to be
                      discovered, revealed and multiplied; and education serves
                      best, to fulfill this purpose. It is the apt tool in
                      successfully bringing to light the treasure that lies
                      dormant within the student. Here at St Marys school,
                      education is imparted with a strong focus on this concept.
                      Activities pertaining to Language, Math, Science and other
                      subjects that enhance knowledge, provide hands-on
                      experience and provide opportunities for growth are
                      carefully studied and introduced. It helps the students to
                      bring out the best in them thereby identifying their areas
                      of strength and God-given talents.
                    </p>
                    <p>
                      The students acquire a clear understanding of what they
                      are and what they could become. In short, education at St
                      Marys school is designed to identify latent potential,
                      sharpen focus and build a vision to fulfill the mission of
                      the student’s life, with true happiness and satisfaction,
                      making them a boon to society.
                    </p>
                    <p>
                      As John F. Kennedy puts it, "Let us think of education as
                      the means of developing our greatest abilities, because in
                      each of us there is a private hope and dream which,
                      fulfilled, can be translated into benefit for everyone and
                      greater strength for our nation."
                    </p>
                    <p className="pt-4">
                      Best regards,
                      <br />
                      Sr. Rose (C J)
                      <br />
                      Principal, Holy Cross School, Kabuganj
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
