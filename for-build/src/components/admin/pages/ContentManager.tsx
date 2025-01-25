import { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Card } from "../../ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { EditableContent } from "../../ui/editable-content";

type ContentType = "text" | "richtext" | "image" | "list";

interface ContentItem {
  id: string;
  type: ContentType;
  content: any;
}

const ContentManager = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);

  const handleContentChange = (id: string, value: any) => {
    setContents((prev) =>
      prev.map((item) => (item.id === id ? { ...item, content: value } : item)),
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Content Manager</h1>
          <p className="text-muted-foreground">
            Manage website content and layouts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content Editor */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Content</h2>
            <div className="space-y-6">
              {contents.map((content) => (
                <div key={content.id} className="space-y-2">
                  <Label>{content.id}</Label>
                  {content.type === "text" && (
                    <Input
                      value={content.content}
                      onChange={(e) =>
                        handleContentChange(content.id, e.target.value)
                      }
                    />
                  )}
                  {content.type === "richtext" && (
                    <Textarea
                      value={content.content}
                      onChange={(e) =>
                        handleContentChange(content.id, e.target.value)
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Preview */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="space-y-6">
              {contents.map((content) => (
                <EditableContent
                  key={content.id}
                  id={content.id}
                  type={content.type}
                >
                  {content.content}
                </EditableContent>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContentManager;
