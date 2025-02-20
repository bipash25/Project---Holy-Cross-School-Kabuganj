// Set up browser environment for Babel
const setupEnvironment = () => {
  if (typeof window !== "undefined") {
    if (!(window as any).process) {
      (window as any).process = {};
    }
    if (!(window as any).process.env) {
      (window as any).process.env = {};
    }
    Object.assign((window as any).process.env, {
      NODE_ENV: "production",
      BABEL_TYPES_8_BREAKING: false,
    });
  }
};

setupEnvironment();

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
