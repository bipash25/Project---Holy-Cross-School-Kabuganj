import {
  EditableContent,
  parseEditableContent,
  updateContentInFile,
} from "./content-manager";

export async function loadContent(): Promise<EditableContent[]> {
  try {
    const files = [
      "/src/components/home.tsx",
      "/src/components/about/index.tsx",
      "/src/components/about/mission.tsx",
      "/src/components/academics/index.tsx",
    ];

    const contents = await Promise.all(
      files.map(async (path) => {
        try {
          const response = await fetch(path);
          if (!response.ok) throw new Error(`Failed to fetch ${path}`);
          const code = await response.text();
          const section = path.split("/")[2];
          return parseEditableContent(code, path, section);
        } catch (err) {
          console.error(`Error loading content from ${path}:`, err);
          return [];
        }
      }),
    );

    return contents.flat();
  } catch (error) {
    console.error("Error loading content:", error);
    throw error;
  }
}

export { updateContentInFile as updateContent };
