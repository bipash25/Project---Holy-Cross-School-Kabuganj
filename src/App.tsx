import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "./components/ui/toaster";

// Pages
import Home from "./components/home";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Suspense>
  );
}

export default App;
