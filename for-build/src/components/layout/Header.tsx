import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

// shadcn/ui or your own UI library imports
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../theme-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface HeaderProps {
  schoolName?: string;
}

const Header = ({ schoolName = "Holy Cross School Kabuganj" }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Menu items for both desktop & mobile
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
        {/* LOGO + SCHOOL NAME */}
        <Link
          to="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <img
            src={logo}
            alt="School Logo"
            className="h-12 w-12 object-contain"
          />
          {/* Full name on larger screens, short on smaller */}
          <span className="text-xl font-bold text-foreground hidden sm:inline">
            {schoolName}
          </span>
          <span className="text-xl font-bold text-foreground sm:hidden">
            HCSK
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden lg:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((menu) => (
                <NavigationMenuItem key={menu.title}>
                  <NavigationMenuTrigger className="text-base">
                    {menu.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      {menu.items.map((item) => (
                        <NavigationMenuLink
                          key={item.href}
                          href={item.href}
                          className="block p-2 hover:bg-muted rounded-md"
                        >
                          {item.label}
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* DESKTOP THEME & CONTACT BUTTONS */}
        <div className="hidden lg:flex items-center space-x-2">
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

        {/* MOBILE NAVIGATION (Hamburger) */}
        <div className="lg:hidden ml-auto">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="
                w-[300px]
                p-0
                border-r-0
                bg-background/95
                backdrop-blur
                supports-[backdrop-filter]:bg-background/80
              "
            >
              <SheetHeader className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={logo} alt="Logo" className="h-8 w-8" />
                    <SheetTitle className="text-lg font-bold">
                      {schoolName}
                    </SheetTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-12 w-12 hover:bg-muted rounded-full"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </SheetHeader>

              {/* SCROLLABLE SHEET BODY */}
              <div className="overflow-y-auto h-[calc(100vh-5rem)]">
                <div className="p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-2"
                  >
                    {menuItems.map((menu, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border-none"
                      >
                        <AccordionTrigger className="text-base py-3 px-4 hover:no-underline hover:bg-muted rounded-md [&[data-state=open]]:bg-muted">
                          {menu.title}
                        </AccordionTrigger>
                        <AccordionContent className="pb-2 pt-1">
                          <div className="flex flex-col space-y-1">
                            {menu.items.map((item, idx) => (
                              <Link
                                key={idx}
                                to={item.href}
                                className={`
                                  px-4 py-2 rounded-md text-sm transition-colors
                                  ${
                                    location.pathname === item.href
                                      ? "bg-primary text-primary-foreground"
                                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                  }
                                `}
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

                  {/* MOBILE ACTION BUTTONS */}
                  <div className="mt-6 space-y-4">
                    <Button
                      variant="default"
                      className="w-full justify-center"
                      onClick={() => {
                        navigate("/contact");
                        setIsOpen(false);
                      }}
                    >
                      Contact Us
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                    >
                      <span>Theme</span>
                      {theme === "dark" ? (
                        <Sun className="h-5 w-5" />
                      ) : (
                        <Moon className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
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
