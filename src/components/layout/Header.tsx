import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { School } from "lucide-react";

interface HeaderProps {
  logo?: string;
  schoolName?: string;
}

const Header = ({
  logo = "https://api.dicebear.com/7.x/initials/svg?seed=HCSK",
  schoolName = "Holy Cross School Kabuganj",
}: HeaderProps) => {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo and School Name */}
        <div className="flex items-center space-x-2">
          <School className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">{schoolName}</span>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink href="/about/history">
                    History
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/about/mission">
                    Mission & Vision
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/about/values">
                    Core Values
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/about/statistics">
                    Statistics
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>School Info</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink href="/info/fees">
                    Fee Structure
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/info/curriculum">
                    Curriculum
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/info/uniform">
                    Uniform Guidelines
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/info/timing">
                    School Timing
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Facilities</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink href="/facilities/library">
                    Library
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/facilities/computer-lab">
                    Computer Lab
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/facilities/science-lab">
                    Science Lab
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Academics</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink href="/academics/examinations">
                    Examinations
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/academics/admissions">
                    Admissions
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/academics/guidelines">
                    Parent Guidelines
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/academics/conduct">
                    Student Conduct
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Contact Button */}
        <Button variant="outline">Contact Us</Button>
      </div>
    </header>
  );
};

export default Header;
