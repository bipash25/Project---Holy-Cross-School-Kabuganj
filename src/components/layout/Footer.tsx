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
  address = "MVG5+XXP, Kabuganj, Assam - 788121",
  phone = "+91 6000632897",
  email = "hcskabuganj@gmail.com",
}: FooterProps) => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
              {schoolName}
            </h3>
            <div className="space-y-2 text-sm sm:text-base">
              <p className="flex items-center justify-center sm:justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                {address}
              </p>
              <p className="flex items-center justify-center sm:justify-start">
                <Phone className="h-4 w-4 mr-2" />
                {phone}
              </p>
              <p className="flex items-center justify-center sm:justify-start">
                <Mail className="h-4 w-4 mr-2" />
                {email}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm sm:text-base">
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
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
              Important Info
            </h3>
            <ul className="space-y-2 text-sm sm:text-base">
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

          {/* Social Media */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-4 justify-center sm:justify-start">
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

        <div className="border-t border-gray-800 mt-8 pt-6 sm:pt-8 text-center text-sm sm:text-base">
          <p>
            &copy; {new Date().getFullYear()} {schoolName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
