import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";

export interface EditableContent {
  id: string;
  componentPath: string;
  elementType: string;
  content: string;
  description?: string;
  parentComponent?: string;
}

export const CONTENT_SECTIONS = [
  {
    id: "home",
    name: "Home Page",
    path: "src/components/home",
    description: "Main landing page content",
  },
  {
    id: "about",
    name: "About Pages",
    path: "src/components/about",
    description: "School history, mission, and values",
  },
  {
    id: "academics",
    name: "Academics",
    path: "src/components/academics",
    description: "Academic programs and information",
  },
  {
    id: "facilities",
    name: "Facilities",
    path: "src/components/facilities",
    description: "School facilities and infrastructure",
  },
  {
    id: "news",
    name: "News & Events",
    path: "src/components/news",
    description: "School news and events",
  },
];

// Parse JSX files to find editable content
export function findEditableContent(
  code: string,
  filePath: string,
): EditableContent[] {
  const contents: EditableContent[] = [];
  const ast = parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  let currentComponent = "";

  traverse(ast, {
    FunctionDeclaration(path) {
      if (path.node.id) {
        currentComponent = path.node.id.name;
      }
    },
    JSXElement(path) {
      const openingElement = path.node.openingElement;
      const editableAttr = openingElement.attributes.find(
        (attr): attr is t.JSXAttribute =>
          t.isJSXAttribute(attr) && attr.name.name === "data-editable",
      );

      if (editableAttr) {
        const idAttr = openingElement.attributes.find(
          (attr): attr is t.JSXAttribute =>
            t.isJSXAttribute(attr) && attr.name.name === "id",
        );

        const descAttr = openingElement.attributes.find(
          (attr): attr is t.JSXAttribute =>
            t.isJSXAttribute(attr) && attr.name.name === "data-description",
        );

        if (idAttr && t.isStringLiteral(idAttr.value)) {
          const content = path.node.children
            .map((child) => {
              if (t.isJSXText(child)) {
                return child.value;
              } else if (t.isStringLiteral(child)) {
                return child.value;
              }
              return "";
            })
            .join("");

          contents.push({
            id: idAttr.value.value,
            componentPath: filePath,
            elementType: openingElement.name.name as string,
            content: content.trim(),
            description:
              descAttr && t.isStringLiteral(descAttr.value)
                ? descAttr.value.value
                : undefined,
            parentComponent: currentComponent,
          });
        }
      }
    },
  });

  return contents;
}

// Update content in JSX file
export function updateContent(
  code: string,
  id: string,
  newContent: string,
): string {
  const ast = parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  traverse(ast, {
    JSXElement(path) {
      const openingElement = path.node.openingElement;
      const idAttr = openingElement.attributes.find(
        (attr): attr is t.JSXAttribute =>
          t.isJSXAttribute(attr) &&
          attr.name.name === "id" &&
          t.isStringLiteral(attr.value) &&
          attr.value.value === id,
      );

      if (idAttr) {
        // Preserve whitespace before and after content
        const leadingSpaces =
          path.node.children[0] && t.isJSXText(path.node.children[0])
            ? path.node.children[0].value.match(/^\s*/)?.[0] || ""
            : "";
        const trailingSpaces =
          path.node.children[path.node.children.length - 1] &&
          t.isJSXText(path.node.children[path.node.children.length - 1])
            ? path.node.children[path.node.children.length - 1].value.match(
                /\s*$/,
              )?.[0] || ""
            : "";

        path.node.children = [
          t.jsxText(leadingSpaces + newContent + trailingSpaces),
        ];
      }
    },
  });

  return generate(ast).code;
}

// Load content from multiple files
export async function loadAllContent(
  files: { path: string; content: string }[],
): Promise<EditableContent[]> {
  const allContent: EditableContent[] = [];

  for (const file of files) {
    const contents = findEditableContent(file.content, file.path);
    allContent.push(...contents);
  }

  return allContent;
}
