import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { ScrollArea } from "./scroll-area";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

interface IconPickerProps {
  value?: string;
  onChange?: (iconName: string) => void;
}

export const IconPicker = ({ value = "Circle", onChange }: IconPickerProps) => {
  const [selected, setSelected] = useState(value);

  const handleSelect = (iconName: string) => {
    setSelected(iconName);
    onChange?.(iconName);
  };

  const SelectedIcon = Icons[selected as keyof typeof Icons] || Icons.Circle;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <SelectedIcon className="h-4 w-4 mr-2" />
          {selected}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <ScrollArea className="h-72">
          <div className="grid grid-cols-3 gap-2 p-2">
            {Object.keys(Icons).map((iconName) => {
              const Icon = Icons[iconName as keyof typeof Icons];
              return (
                <Button
                  key={iconName}
                  variant="ghost"
                  className={cn(
                    "h-10 w-full justify-start",
                    selected === iconName && "bg-muted",
                  )}
                  onClick={() => handleSelect(iconName)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  <span className="text-xs">{iconName}</span>
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
