import React from "react";

type ContentType = "text" | "richtext" | "image" | "list";

interface EditableContentProps {
  id: string;
  type: ContentType;
  children: React.ReactNode;
}

export function EditableContent({ id, type, children }: EditableContentProps) {
  return (
    <div data-editable-id={id} data-editable-type={type}>
      {children}
    </div>
  );
}
