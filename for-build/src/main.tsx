import { initializeApp } from "./lib/init";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./components/theme-provider";
import { ErrorBoundary } from "./components/ErrorBoundary";

const mount = async () => {
  const rootElement = document.getElementById("root");
  const fallbackElement = document.getElementById("fallback");

  if (!rootElement || !fallbackElement) {
    console.error("Required elements not found");
    return;
  }

  try {
    await initializeApp();
    
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <ErrorBoundary>
          <HelmetProvider>
            <ThemeProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ThemeProvider>
          </HelmetProvider>
        </ErrorBoundary>
      </React.StrictMode>
    );

    console.log("App mounted successfully");
  } catch (error) {
    console.error("Error mounting app:", error);
    fallbackElement.innerHTML = `
      <h1>Error Loading Application</h1>
      <p>Please try refreshing the page.</p>
    `;
  }
};

// Only mount after DOM is fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}