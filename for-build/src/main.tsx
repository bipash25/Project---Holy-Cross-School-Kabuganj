import "./lib/babel-setup";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./components/theme-provider";

console.log("Starting app initialization...");

try {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <HelmetProvider>
        <ThemeProvider defaultTheme="light" storageKey="ui-theme">
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </React.StrictMode>,
  );
  console.log("App mounted successfully");
} catch (error) {
  console.error("Error mounting app:", error);
}
