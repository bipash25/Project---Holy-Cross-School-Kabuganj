import { ApiError } from "./error-handling";

export async function initializeApp() {
  try {
    if (typeof window !== 'undefined') {
      // Ensure process.env exists
      if (!(window as any).process) {
        (window as any).process = { env: {} };
      }
      
      // Set necessary environment variables
      if (!(window as any).process.env) {
        (window as any).process.env = {};
      }
  
      Object.assign((window as any).process.env, {
        NODE_ENV: 'production',
        BABEL_TYPES_8_BREAKING: false
      });
    }
  } catch (error) {
    throw new ApiError("Failed to initialize application", 500);
  }
}