// Babel configuration and environment setup for browser
import { ParserOptions } from "@babel/parser";

// Configure Babel for browser environment
if (typeof window !== "undefined" && !(window as any).process) {
  (window as any).process = { env: { NODE_ENV: "development" } };
}

export const BABEL_PARSER_OPTIONS: ParserOptions = {
  sourceType: "module",
  plugins: ["jsx", "typescript"],
  tokens: true,
};

export const BABEL_GENERATOR_OPTIONS = {
  retainLines: true,
  compact: false,
  jsescOption: {
    minimal: true,
  },
};
