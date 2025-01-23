import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const ImageUpload = ({
  value,
  onChange,
  className,
}: ImageUploadProps) => {
  const [preview, setPreview] = useState(value);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange?.(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={className}>
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="ghost"
              className="text-white"
              onClick={() => {
                setPreview("");
                onChange?.("");
              }}
            >
              Change Image
            </Button>
          </div>
        </div>
      ) : (
        <label className="block">
          <div className="w-full h-48 border-2 border-dashed border-muted-foreground/20 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-muted-foreground/40 transition-colors">
            <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">
              Click to upload image
            </span>
          </div>
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
};
