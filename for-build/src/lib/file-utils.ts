import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";

export interface ContentLocation {
  type: "jsx" | "string" | "import";
  identifier: string;
  value: string;
}

export const findContentInFile = (
  fileContent: string,
  sectionId: string,
): ContentLocation | null => {
  const ast = parse(fileContent, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  let location: ContentLocation | null = null;

  traverse(ast, {
    JSXText(path) {
      // Find text content in JSX
      const parent = path.findParent(
        (p) =>
          p.isJSXElement() &&
          p.node.openingElement.attributes.some(
            (attr) =>
              t.isJSXAttribute(attr) &&
              attr.name.name === "data-content-id" &&
              t.isStringLiteral(attr.value) &&
              attr.value.value === sectionId,
          ),
      );
      if (parent) {
        location = {
          type: "jsx",
          identifier: sectionId,
          value: path.node.value,
        };
      }
    },
    StringLiteral(path) {
      // Find string literals in variables
      const parent = path.findParent(
        (p) =>
          p.isVariableDeclarator() &&
          t.isIdentifier(p.node.id) &&
          p.node.id.name === sectionId,
      );
      if (parent) {
        location = {
          type: "string",
          identifier: sectionId,
          value: path.node.value,
        };
      }
    },
    ImportDeclaration(path) {
      // Find image imports
      if (path.node.source.value.includes("/assets/images/")) {
        const importSpecifier = path.node.specifiers.find(
          (spec) =>
            t.isImportDefaultSpecifier(spec) &&
            t.isIdentifier(spec.local) &&
            spec.local.name === sectionId,
        );
        if (importSpecifier) {
          location = {
            type: "import",
            identifier: sectionId,
            value: path.node.source.value,
          };
        }
      }
    },
  });

  return location;
};

export const updateFileContent = (
  fileContent: string,
  sectionId: string,
  newValue: string,
): string => {
  const ast = parse(fileContent, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  traverse(ast, {
    JSXText(path) {
      const parent = path.findParent(
        (p) =>
          p.isJSXElement() &&
          p.node.openingElement.attributes.some(
            (attr) =>
              t.isJSXAttribute(attr) &&
              attr.name.name === "data-content-id" &&
              t.isStringLiteral(attr.value) &&
              attr.value.value === sectionId,
          ),
      );
      if (parent) {
        path.node.value = newValue;
      }
    },
    StringLiteral(path) {
      const parent = path.findParent(
        (p) =>
          p.isVariableDeclarator() &&
          t.isIdentifier(p.node.id) &&
          p.node.id.name === sectionId,
      );
      if (parent) {
        path.node.value = newValue;
      }
    },
    ImportDeclaration(path) {
      if (path.node.source.value.includes("/assets/images/")) {
        const importSpecifier = path.node.specifiers.find(
          (spec) =>
            t.isImportDefaultSpecifier(spec) &&
            t.isIdentifier(spec.local) &&
            spec.local.name === sectionId,
        );
        if (importSpecifier) {
          path.node.source.value = newValue;
        }
      }
    },
  });

  return generate(ast).code;
};

export const generateImageFileName = (originalName: string): string => {
  const timestamp = Date.now();
  const extension = originalName.split(".").pop();
  const safeName = originalName
    .split(".")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-");
  return `${safeName}-${timestamp}.${extension}`;
};
