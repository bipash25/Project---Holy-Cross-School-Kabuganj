import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { OptimizedImage } from "../ui/optimized-image";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <OptimizedImage
              src="/assets/logo-Dm9Rbx_j.png"
              alt="School Logo"
              className="h-12 w-12 object-contain"
            />
            <div>
              <h1 className="text-lg font-bold">Holy Cross School</h1>
              <p className="text-sm text-muted-foreground">Kabuganj</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-primary"
            >
              About
            </Link>
            <Link
              to="/academics"
              className="text-sm font-medium hover:text-primary"
            >
              Academics
            </Link>
            <Link to="/news" className="text-sm font-medium hover:text-primary">
              News & Events
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium hover:text-primary"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button asChild variant="outline">
              <Link to="/management-portal-hcsk/login">Admin Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
