import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              Holy Cross School
            </h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Kabuganj, Assam - 784172
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +91 1234567890
              </p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                info@hcsk.edu.in
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/academics"
                  className="hover:text-white transition-colors"
                >
                  Academics
                </Link>
              </li>
              <li>
                <Link
                  to="/facilities"
                  className="hover:text-white transition-colors"
                >
                  Facilities
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Important Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              Important Info
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/academics/admissions"
                  className="hover:text-white transition-colors"
                >
                  Admission Process
                </Link>
              </li>
              <li>
                <Link
                  to="/info/fees"
                  className="hover:text-white transition-colors"
                >
                  Fee Structure
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-white transition-colors">
                  News & Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
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
            © {new Date().getFullYear()} Holy Cross School Kabuganj. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
