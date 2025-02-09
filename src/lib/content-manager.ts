import { parse } from "@babel/parser";
import "./babel-setup";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";

export interface EditableContent {
  id: string;
  componentPath: string;
  elementType: string;
  content: string;
  description?: string;
  section: string;
  parentComponent?: string;
}

export interface ContentSection {
  id: string;
  name: string;
  path: string;
  description?: string;
}

export const CONTENT_SECTIONS: ContentSection[] = [
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
];

// Parse JSX files to find editable content
export function parseEditableContent(
  code: string,
  filePath: string,
  section: string,
): EditableContent[] {
  const contents: EditableContent[] = [];
  const ast = parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  let currentComponent = "";

  traverse(ast as any, {
    FunctionDeclaration(path) {
      if (path.node.id) {
        currentComponent = path.node.id.name;
      }
    },
    JSXElement(path) {
      const openingElement = path.node.openingElement;

      // Check for data-editable attribute
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
          // Get the text content
          let content = "";
          path.node.children.forEach((child) => {
            if (t.isJSXText(child)) {
              content += child.value;
            } else if (t.isStringLiteral(child)) {
              content += child.value;
            }
          });

          contents.push({
            id: idAttr.value.value,
            componentPath: filePath,
            elementType: openingElement.name.name as string,
            content: content.trim(),
            description:
              descAttr && t.isStringLiteral(descAttr.value)
                ? descAttr.value.value
                : undefined,
            section,
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

  traverse(ast as any, {
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
        path.node.children = [t.jsxText(newContent)];
      }
    },
  });

  return generate(ast).code;
}
