import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./components/theme-provider";
import { TempoDevtools } from "tempo-devtools";

// Initialize Tempo Devtools
TempoDevtools.init();

// Remove loading indicator
const removeLoader = () => {
  const loader = document.querySelector(".initial-loader");
  if (loader) {
    loader.remove();
  }
};

// Mount application
const mountApp = () => {
  const root = document.getElementById("root");
  if (!root) throw new Error("Root element not found");

  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <HelmetProvider>
        <ThemeProvider defaultTheme="light" storageKey="ui-theme">
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </BrowserRouter>,
  );

  // Remove loader after app is mounted
  removeLoader();
};

// Start the application
document.addEventListener("DOMContentLoaded", () => {
  try {
    mountApp();
  } catch (error) {
    console.error("Failed to mount app:", error);
    const root = document.getElementById("root");
    if (root) {
      root.innerHTML = '<div class="error">Failed to load application</div>';
    }
  }
});
