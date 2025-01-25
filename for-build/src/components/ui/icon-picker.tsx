import * as React from "react";
import * as Icons from "lucide-react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./dropdown-menu";

type IconName = keyof typeof Icons;

interface IconPickerProps {
  value?: IconName;
  onChange?: (value: IconName) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const IconComponent = value ? Icons[value] : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start">
          {IconComponent && <IconComponent className="h-4 w-4 mr-2" />}
          {value || "Select icon..."}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="h-[300px] overflow-y-auto">
        {Object.entries(Icons).map(([name, Icon]) => (
          <DropdownMenuItem
            key={name}
            onSelect={() => onChange?.(name as IconName)}
          >
            {React.createElement(
              Icon as React.ComponentType<{ className?: string }>,
              {
                className: "h-4 w-4 mr-2",
              },
            )}
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
