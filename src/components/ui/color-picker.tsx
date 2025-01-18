import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
}

const presetColors = [
  "#000000",
  "#ffffff",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
];

export const ColorPicker = ({
  value = "#000000",
  onChange,
}: ColorPickerProps) => {
  const [color, setColor] = useState(value);

  const handleChange = (newColor: string) => {
    setColor(newColor);
    onChange?.(newColor);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <div
            className="w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: color }}
          />
          {color}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid grid-cols-4 gap-2">
          {presetColors.map((presetColor) => (
            <button
              key={presetColor}
              className={cn(
                "w-8 h-8 rounded-full",
                "ring-2 ring-offset-2",
                color === presetColor ? "ring-black" : "ring-transparent",
              )}
              style={{ backgroundColor: presetColor }}
              onClick={() => handleChange(presetColor)}
            />
          ))}
        </div>
        <div className="mt-4">
          <input
            type="color"
            value={color}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
