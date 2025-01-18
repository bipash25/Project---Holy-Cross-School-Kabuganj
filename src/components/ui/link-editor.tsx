import { useState } from "react";
import { Input } from "./input";
import { Label } from "./label";

interface LinkEditorProps {
  value?: { text: string; url: string };
  onChange?: (value: { text: string; url: string }) => void;
}

export const LinkEditor = ({
  value = { text: "", url: "" },
  onChange,
}: LinkEditorProps) => {
  const [link, setLink] = useState(value);

  const handleChange = (field: "text" | "url", newValue: string) => {
    const updatedLink = { ...link, [field]: newValue };
    setLink(updatedLink);
    onChange?.(updatedLink);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Link Text</Label>
        <Input
          value={link.text}
          onChange={(e) => handleChange("text", e.target.value)}
          placeholder="Enter link text"
        />
      </div>
      <div className="space-y-2">
        <Label>URL</Label>
        <Input
          value={link.url}
          onChange={(e) => handleChange("url", e.target.value)}
          placeholder="Enter URL"
        />
      </div>
    </div>
  );
};
