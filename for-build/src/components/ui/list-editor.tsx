import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface ListEditorProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  className?: string;
}

export const ListEditor = ({
  value = [],
  onChange,
  className,
}: ListEditorProps) => {
  const [items, setItems] = useState<string[]>(value);

  const handleAdd = () => {
    const newItems = [...items, ""];
    setItems(newItems);
    onChange?.(newItems);
  };

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange?.(newItems);
  };

  const handleChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
    onChange?.(newItems);
  };

  return (
    <div className={className}>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
            <Input
              value={item}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`Item ${index + 1}`}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemove(index)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={handleAdd}
      >
        <Plus className="h-4 w-4 mr-2" /> Add Item
      </Button>
    </div>
  );
};
