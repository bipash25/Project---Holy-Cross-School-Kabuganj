import "./lib/babel-setup";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./components/theme-provider";
import { ErrorBoundary } from "./components/ErrorBoundary";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Starting app initialization...");

  const rootElement = document.getElementById("root");

  if (!rootElement) {
    console.error("Root element not found");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <HelmetProvider>
            <ThemeProvider defaultTheme="light" storageKey="ui-theme">
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ThemeProvider>
          </HelmetProvider>
        </ErrorBoundary>
      </React.StrictMode>,
    );

    console.log("App mounted successfully");
  } catch (error) {
    console.error("Error mounting app:", error);
  }
});
