import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
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
import { Moon, Sun, Menu, ChevronRight } from "lucide-react";
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
        {/* Logo and School Name */}
        <Link
          to="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <img
            src={logo}
            alt="School Logo"
            className="h-12 w-12 object-contain"
          />
          <span className="text-xl font-bold text-foreground hidden sm:inline">
            {schoolName}
          </span>
          <span className="text-xl font-bold text-foreground sm:hidden">
            HCSK
          </span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Desktop Theme Toggle and Contact */}
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

        {/* Mobile Navigation */}
        <div className="lg:hidden ml-auto">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <SheetHeader className="p-6 border-b">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="px-6 py-4">
                <Accordion type="single" collapsible className="w-full">
                  {menuItems.map((menu, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-lg">
                        {menu.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-2 pl-4">
                          {menu.items.map((item, idx) => (
                            <Link
                              key={idx}
                              to={item.href}
                              className="p-2 hover:bg-muted rounded-md text-sm flex items-center"
                              onClick={() => setIsOpen(false)}
                            >
                              <ChevronRight className="h-4 w-4 mr-2" />
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {/* Mobile Theme Toggle */}
                <div className="mt-6 pt-6 border-t">
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
