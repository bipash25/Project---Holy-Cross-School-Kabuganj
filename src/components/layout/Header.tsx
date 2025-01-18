import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: "About Us",
      items: [
        { href: "/about/message", label: "Principal's Message" },
        { href: "/about/history", label: "History" },
        { href: "/about/mission", label: "Mission & Vision" },
        { href: "/about/values", label: "Core Values" },
        { href: "/about/statistics", label: "Statistics" },
      ],
    },
    {
      title: "School Info",
      items: [
        { href: "/info/fees", label: "Fee Structure" },
        { href: "/info/curriculum", label: "Curriculum" },
        { href: "/info/uniform", label: "Uniform Guidelines" },
        { href: "/info/timing", label: "School Timing" },
      ],
    },
    {
      title: "Facilities",
      items: [
        { href: "/facilities/library", label: "Library" },
        { href: "/facilities/computer-lab", label: "Computer Lab" },
        { href: "/facilities/science-lab", label: "Science Lab" },
      ],
    },
    {
      title: "Academics",
      items: [
        { href: "/academics/examinations", label: "Examinations" },
        { href: "/academics/admissions", label: "Admissions" },
        { href: "/academics/guidelines", label: "Parent Guidelines" },
        { href: "/academics/conduct", label: "Student Conduct" },
      ],
    },
  ];

  return (
    <header className="w-full h-20 bg-background border-b border-border fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">HCSK</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((menu) => (
                <NavigationMenuItem key={menu.title}>
                  <NavigationMenuTrigger>{menu.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      {menu.items.map((item) => (
                        <NavigationMenuLink key={item.href} asChild>
                          <Link
                            to={item.href}
                            className="block p-2 hover:bg-muted rounded-md"
                          >
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Contact Button */}
        <div className="hidden lg:block">
          <Button variant="outline" onClick={() => navigate("/contact")}>
            Contact Us
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden ml-auto">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <SheetHeader className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <SheetTitle>Menu</SheetTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </SheetHeader>
              <div className="py-4">
                {menuItems.map((menu) => (
                  <div key={menu.title} className="px-4">
                    <h3 className="mb-2 font-semibold">{menu.title}</h3>
                    <div className="space-y-2">
                      {menu.items.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className={`
                            block p-2 rounded-md text-sm
                            ${
                              location.pathname === item.href
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted"
                            }
                          `}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="px-4 mt-4">
                  <Button
                    className="w-full"
                    onClick={() => {
                      navigate("/contact");
                      setIsOpen(false);
                    }}
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
