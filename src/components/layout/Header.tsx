import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "../theme-provider";
import schoolLogo from "@/assets/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

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
    <header className="fixed top-0 left-0 right-0 h-20 bg-background border-b border-border z-50 w-full">
      <div className="w-full max-w-[1400px] mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo & School Name */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={schoolLogo} alt="HCSK Logo" className="h-12 w-auto" />
          <span className="text-xl font-bold">HCSK</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center flex-1 px-8">
          <nav className="flex items-center space-x-6">
            {menuItems.map((menu) => (
              <DropdownMenu key={menu.title}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-base font-medium">
                    {menu.title}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {menu.items.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        to={item.href}
                        className={`w-full py-2 ${location.pathname === item.href ? "bg-accent" : "hover:bg-accent/50"}`}
                      >
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button variant="outline" onClick={() => navigate("/contact")}>
            Contact Us
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex lg:hidden items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
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
              <div className="py-4 overflow-y-auto">
                <Accordion type="single" collapsible className="w-full">
                  {menuItems.map((menu, index) => (
                    <AccordionItem
                      value={`item-${index}`}
                      key={menu.title}
                      className="border-b last:border-none"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted text-center">
                        {menu.title}
                      </AccordionTrigger>
                      <AccordionContent className="pb-2">
                        <div className="space-y-1">
                          {menu.items.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className={`block px-6 py-2 text-center transition-colors ${location.pathname === item.href ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}
                              onClick={() => setIsOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <div className="px-6 py-4 border-t">
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
