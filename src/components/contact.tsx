import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { SEO } from "./ui/seo";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact Us"
        description="Get in touch with Holy Cross School Kabuganj. Find our contact information, location, and office hours."
        keywords="contact school, school location, contact information, school address, phone number"
        type="website"
      />
      <Header />
      {/* ... rest of the JSX ... */}
    </div>
  );
};

export default Contact;
