import { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { useToast } from "../../ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Label } from "../../ui/label";
import { FileEdit, Save, Search, FileCode, Loader2 } from "lucide-react";
import { useContentEditor } from "@/hooks/use-content-editor";
import { CONTENT_SECTIONS } from "@/lib/content-manager";

const ContentManager = () => {
  const [selectedSection, setSelectedSection] = useState(
    CONTENT_SECTIONS[0].id,
  );

  const {
    contents,
    loading,
    error,
    editingItem,
    searchQuery,
    setEditingItem,
    setSearchQuery,
    updateContent,
    refresh,
  } = useContentEditor(selectedSection);

  const { toast } = useToast();

  const handleUpdate = async (id: string, newContent: string) => {
    try {
      await updateContent(id, newContent);
      toast({
        title: "Success",
        description: "Content has been updated successfully",
      });
      setEditingItem(null);
    } catch (error) {
      console.error("Error updating content:", error);
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Content Manager</h1>
            <p className="text-muted-foreground">
              Edit website content directly in components
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Tabs
            value={selectedSection}
            onValueChange={setSelectedSection}
            className="w-full"
          >
            <TabsList className="w-full justify-start">
              {CONTENT_SECTIONS.map((section) => (
                <TabsTrigger key={section.id} value={section.id}>
                  {section.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="relative w-full sm:w-64 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : contents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No editable content found in this section
          </div>
        ) : (
          <div className="space-y-4">
            {contents.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{item.id}</h3>
                      {item.description && (
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground">
                          {item.componentPath}
                        </p>
                        {item.parentComponent && (
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-muted">
                            {item.parentComponent}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingItem(item.id)}
                    >
                      <FileEdit className="h-4 w-4" />
                    </Button>
                  </div>

                  {editingItem === item.id ? (
                    <div className="space-y-4">
                      <Textarea
                        value={item.content}
                        onChange={(e) =>
                          contents.map((c) =>
                            c.id === item.id
                              ? { ...c, content: e.target.value }
                              : c,
                          )
                        }
                        className="min-h-[100px] font-mono text-sm"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingItem(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleUpdate(item.id, item.content)}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <pre className="whitespace-pre-wrap text-sm p-3 bg-muted rounded-md font-mono">
                        {item.content}
                      </pre>
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          {item.elementType}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ContentManager;
