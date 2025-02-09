// Set up browser environment for Babel
if (typeof window !== "undefined") {
  (window as any).process = {
    env: {
      NODE_ENV: "production",
      BABEL_TYPES_8_BREAKING: false,
    },
  };
}

export const BABEL_PARSER_OPTIONS = {
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
