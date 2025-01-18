import { useState, useRef, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { useToast } from "../../ui/use-toast";
import { ColorPicker } from "../../ui/color-picker";
import { LinkEditor } from "../../ui/link-editor";
import { IconPicker } from "../../ui/icon-picker";
import { EditableContent } from "../../ui/editable-content";
import * as Icons from "lucide-react";

// ... (previous imports and interfaces)

interface ContentTypeConfig {
  label: string;
  icon: keyof typeof Icons;
  editor: React.ComponentType<any>;
  preview: React.ComponentType<any>;
}

const contentTypes: Record<string, ContentTypeConfig> = {
  text: {
    label: "Text",
    icon: "Type",
    editor: Input,
    preview: ({ value }) => <span>{value}</span>,
  },
  richtext: {
    label: "Rich Text",
    icon: "FileText",
    editor: Textarea,
    preview: ({ value }) => <div className="prose">{value}</div>,
  },
  image: {
    label: "Image",
    icon: "Image",
    editor: ImageUpload,
    preview: ({ value }) => (
      <img src={value} alt="Preview" className="max-w-full h-auto" />
    ),
  },
  list: {
    label: "List",
    icon: "List",
    editor: ListEditor,
    preview: ({ value }) => (
      <ul className="list-disc pl-4">
        {value.map((item: string, i: number) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    ),
  },
  link: {
    label: "Link",
    icon: "Link",
    editor: LinkEditor,
    preview: ({ value }) => (
      <a href={value.url} className="text-blue-500 hover:underline">
        {value.text}
      </a>
    ),
  },
  color: {
    label: "Color",
    icon: "Palette",
    editor: ColorPicker,
    preview: ({ value }) => (
      <div
        className="w-6 h-6 rounded-full"
        style={{ backgroundColor: value }}
      />
    ),
  },
};

const ContentManager = () => {
  // ... (previous state and handlers)

  const renderContentEditor = (content: EditableContent) => {
    const typeConfig = contentTypes[content.type];
    if (!typeConfig) return null;

    const EditorComponent = typeConfig.editor;
    const Icon = Icons[typeConfig.icon];

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <Label>{content.label}</Label>
        </div>
        <EditorComponent
          value={content.defaultValue}
          onChange={(value: any) => handleContentChange(content, value)}
        />
      </div>
    );
  };

  const renderLayoutPreview = (layout: LayoutSection) => {
    return (
      <div className="relative border-2 border-dashed border-muted-foreground/20 p-4 rounded-lg">
        <div
          className={cn(
            "grid gap-4",
            layout.type === "row" ? "grid-flow-col" : "grid-flow-row",
            `grid-cols-${layout.columns || 1}`,
          )}
        >
          {layout.children.map((child, index) => (
            <div
              key={index}
              className={cn(
                "p-4 bg-muted rounded-lg",
                "hover:outline hover:outline-2 hover:outline-blue-500/50",
              )}
            >
              {typeof child === "string" ? (
                <EditableContent
                  id={child}
                  type={getContentType(child)}
                  preview
                >
                  {renderContentPreview(child)}
                </EditableContent>
              ) : (
                renderLayoutPreview(child)
              )}
            </div>
          ))}
        </div>
        <div className="absolute -top-3 left-4 px-2 bg-background text-xs text-muted-foreground">
          {layout.type === "row" ? "Row" : "Column"}
        </div>
      </div>
    );
  };

  const renderContentPreview = (contentId: string) => {
    const content = findContent(contentId);
    if (!content) return null;

    const typeConfig = contentTypes[content.type];
    if (!typeConfig) return null;

    const PreviewComponent = typeConfig.preview;
    return <PreviewComponent value={content.defaultValue} />;
  };

  // ... (rest of the component)
};

export default ContentManager;
