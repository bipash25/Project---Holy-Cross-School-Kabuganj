import { useState, useEffect } from "react";
import { EditableContent } from "@/lib/content-manager";
import { loadContent, updateContent } from "@/lib/content-editor";

export function useContentEditor(section: string) {
  const [contents, setContents] = useState<EditableContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadSectionContent();
  }, [section]);

  const loadSectionContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const allContents = await loadContent();
      const sectionContents = allContents.filter((c) => c.section === section);
      console.log("Loaded contents:", sectionContents); // Debug log
      setContents(sectionContents);
    } catch (err) {
      console.error("Error loading content:", err);
      setError(err instanceof Error ? err.message : "Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  const updateContentItem = async (id: string, newContent: string) => {
    try {
      const item = contents.find((c) => c.id === id);
      if (!item) throw new Error("Content not found");

      await updateContent(item.componentPath, id, newContent);
      setContents((prev) =>
        prev.map((c) => (c.id === id ? { ...c, content: newContent } : c)),
      );
      return true;
    } catch (err) {
      console.error("Error updating content:", err);
      throw err;
    }
  };

  const filteredContents = contents.filter((item) =>
    searchQuery
      ? item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true,
  );

  return {
    contents: filteredContents,
    loading,
    error,
    editingItem,
    searchQuery,
    setEditingItem,
    setSearchQuery,
    updateContent: updateContentItem,
    refresh: loadSectionContent,
  };
}
