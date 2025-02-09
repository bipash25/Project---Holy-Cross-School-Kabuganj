import { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Input } from "../../ui/input";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { Search, Loader2 } from "lucide-react";
import { useContentEditor } from "@/hooks/use-content-editor";
import { CONTENT_SECTIONS } from "@/lib/content-manager";

const ContentManager = () => {
  const [selectedSection, setSelectedSection] = useState(
    CONTENT_SECTIONS[0].id,
  );

  const { contents, loading, error, searchQuery, setSearchQuery } =
    useContentEditor(selectedSection);

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
          <div className="space-y-4">{/* Content items */}</div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ContentManager;
