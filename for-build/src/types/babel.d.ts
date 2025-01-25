declare module "@babel/parser" {
  export function parse(input: string, options?: any): any;
}

declare module "@babel/traverse" {
  export interface NodePath {
    node: any;
    parent: any;
    parentPath: any;
    scope: any;
    type: string;
    findParent: (predicate: (path: NodePath) => boolean) => NodePath | null;
    isJSXElement: () => boolean;
  }

  export default function traverse(ast: any, visitor: any): void;
}

declare module "@babel/generator" {
  export default function generate(
    ast: any,
    opts?: any,
    code?: string,
  ): { code: string; map?: any };
}
