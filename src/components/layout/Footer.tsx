import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Button } from "../ui/button";

interface FooterProps {
  schoolName?: string;
  address?: string;
  phone?: string;
  email?: string;
}

const Footer = ({
  schoolName = "Holy Cross School Kabuganj",
  address = "123 School Street, Kabuganj",
  phone = "+880 1234-567890",
  email = "info@hcsk.edu.bd",
}: FooterProps) => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{schoolName}</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {address}
              </p>
              <p className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                {phone}
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                {email}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/academics"
                  className="hover:text-white transition-colors"
                >
                  Academics
                </a>
              </li>
              <li>
                <a
                  href="/facilities"
                  className="hover:text-white transition-colors"
                >
                  Facilities
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Important Information */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Important Info
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/admission"
                  className="hover:text-white transition-colors"
                >
                  Admission Process
                </a>
              </li>
              <li>
                <a
                  href="/calendar"
                  className="hover:text-white transition-colors"
                >
                  Academic Calendar
                </a>
              </li>
              <li>
                <a href="/news" className="hover:text-white transition-colors">
                  News & Events
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  className="hover:text-white transition-colors"
                >
                  Photo Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-4 mb-6">
              <Button variant="ghost" size="icon" className="hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} {schoolName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
