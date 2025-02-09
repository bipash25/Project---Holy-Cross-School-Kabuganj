// Define process.env for babel in browser
if (typeof window !== "undefined") {
  (window as any).process = { env: { NODE_ENV: "development" } };
}
