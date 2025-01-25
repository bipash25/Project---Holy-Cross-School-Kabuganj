import * as React from "react";
import * as LucideIcons from "lucide-react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./dropdown-menu";

type IconName = keyof typeof LucideIcons;
type LucideIcon = (typeof LucideIcons)[IconName];

interface IconPickerProps {
  value?: IconName;
  onChange?: (value: IconName) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  // Get the actual icon component if a value is provided
  const Icon = value ? (LucideIcons[value] as LucideIcon) : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start">
          {Icon && React.createElement(Icon, { className: "h-4 w-4 mr-2" })}
          {value || "Select icon..."}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="h-[300px] overflow-y-auto">
        {(Object.entries(LucideIcons) as [IconName, LucideIcon][]).map(
          ([name, Icon]) => (
            <DropdownMenuItem
              key={name}
              onSelect={() => onChange?.(name)}
              className="flex items-center"
            >
              {React.createElement(Icon, { className: "h-4 w-4 mr-2" })}
              {name}
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
