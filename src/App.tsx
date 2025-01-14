import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import History from "./components/about/history";
import Mission from "./components/about/mission";
import Academics from "./components/academics";
import FeeStructure from "./components/info/fees";
import Curriculum from "./components/info/curriculum";
import Library from "./components/facilities/library";
import ComputerLab from "./components/facilities/computer-lab";
import routes from "tempo-routes";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* About Routes */}
          <Route path="/about" element={<About />} />
          <Route path="/about/history" element={<History />} />
          <Route path="/about/mission" element={<Mission />} />

          {/* School Info Routes */}
          <Route path="/info/fees" element={<FeeStructure />} />
          <Route path="/info/curriculum" element={<Curriculum />} />

          {/* Facilities Routes */}
          <Route path="/facilities/library" element={<Library />} />
          <Route path="/facilities/computer-lab" element={<ComputerLab />} />

          {/* Academics Routes */}
          <Route path="/academics" element={<Academics />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
