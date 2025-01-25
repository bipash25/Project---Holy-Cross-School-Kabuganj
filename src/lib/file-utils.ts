import { parse } from "@babel/parser";
import type { NodePath } from "@babel/traverse";
import traverse from "@babel/traverse";

type TraversePath = NodePath & {
  node: any;
  parent: any;
  parentPath: any;
  scope: any;
  type: string;
  findParent: (
    predicate: (path: TraversePath) => boolean,
  ) => TraversePath | null;
  isJSXElement: () => boolean;
};

type TraverseVisitor = {
  [key: string]: (path: TraversePath) => void;
};

export function findJSXElements(code: string, elementType: string): string[] {
  const ast = parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  const elements: string[] = [];

  const visitor: TraverseVisitor = {
    JSXText(path: TraversePath) {
      const parentJSX = path.findParent(
        (p: TraversePath) =>
          p.isJSXElement() &&
          p.node.openingElement.attributes.some(
            (attr: any) =>
              attr.name.name === "data-element-type" &&
              attr.value.value === elementType,
          ),
      );

      if (parentJSX) {
        elements.push(path.node.value);
      }
    },

    StringLiteral(path: TraversePath) {
      const parentJSX = path.findParent(
        (p: TraversePath) =>
          p.isJSXElement() &&
          p.node.openingElement.attributes.some(
            (attr: any) =>
              attr.name.name === "data-element-type" &&
              attr.value.value === elementType,
          ),
      );

      if (parentJSX) {
        elements.push(path.node.value);
      }
    },
  };

  traverse(ast as any, visitor);

  return elements;
}

export function findImports(code: string): string[] {
  const ast = parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  const imports: string[] = [];

  const visitor: TraverseVisitor = {
    ImportDeclaration(path: TraversePath) {
      const source = path.node.source.value;
      path.node.specifiers.forEach((spec: any) => {
        if (spec.type === "ImportDefaultSpecifier") {
          imports.push(`${spec.local.name} from ${source}`);
        } else if (spec.type === "ImportSpecifier") {
          imports.push(`${spec.imported.name} from ${source}`);
        }
      });
    },
  };

  traverse(ast as any, visitor);

  return imports;
}

export function findJSXAttributes(
  code: string,
  attributeName: string,
): string[] {
  const ast = parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  const attributes: string[] = [];

  const visitor: TraverseVisitor = {
    JSXText(path: TraversePath) {
      const parentJSX = path.findParent(
        (p: TraversePath) =>
          p.isJSXElement() &&
          p.node.openingElement.attributes.some(
            (attr: any) => attr.name.name === attributeName,
          ),
      );

      if (parentJSX) {
        attributes.push(path.node.value);
      }
    },

    StringLiteral(path: TraversePath) {
      const parentJSX = path.findParent(
        (p: TraversePath) =>
          p.isJSXElement() &&
          p.node.openingElement.attributes.some(
            (attr: any) => attr.name.name === attributeName,
          ),
      );

      if (parentJSX) {
        attributes.push(path.node.value);
      }
    },
  };

  traverse(ast as any, visitor);

  return attributes;
}
