import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContentType = "text" | "richtext" | "image" | "list" | "link" | "color";

interface EditableContentProps {
  id: string;
  type: ContentType;
  children: ReactNode;
  className?: string;
  preview?: boolean;
}

const typeLabels: Record<ContentType, string> = {
  text: "Text",
  richtext: "Rich Text",
  image: "Image",
  list: "List",
  link: "Link",
  color: "Color",
};

const typeColors: Record<ContentType, string> = {
  text: "bg-blue-500",
  richtext: "bg-purple-500",
  image: "bg-green-500",
  list: "bg-yellow-500",
  link: "bg-red-500",
  color: "bg-orange-500",
};

export const EditableContent = ({
  id,
  type,
  children,
  className,
  preview = false,
}: EditableContentProps) => {
  return (
    <div
      data-content-id={id}
      data-content-type={type}
      className={cn(
        "relative group",
        !preview && [
          "hover:outline hover:outline-2 hover:outline-blue-500/50",
          "focus-within:outline focus-within:outline-2 focus-within:outline-blue-500",
        ],
        className,
      )}
    >
      {children}
      {!preview && (
        <div
          className={cn(
            "absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity",
            typeColors[type],
            "text-white text-xs px-1.5 py-0.5 rounded pointer-events-none",
          )}
        >
          {typeLabels[type]}
        </div>
      )}
    </div>
  );
};
