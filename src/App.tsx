import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import History from "./components/about/history";
import Mission from "./components/about/mission";
import Values from "./components/about/values";
import Statistics from "./components/about/statistics";

import Academics from "./components/academics";
import Examinations from "./components/academics/examinations";
import Admissions from "./components/academics/admissions";
import Guidelines from "./components/academics/guidelines";
import Conduct from "./components/academics/conduct";

import FeeStructure from "./components/info/fees";
import Curriculum from "./components/info/curriculum";
import Uniform from "./components/info/uniform";
import Timing from "./components/info/timing";

import Library from "./components/facilities/library";
import ComputerLab from "./components/facilities/computer-lab";
import ScienceLab from "./components/facilities/science-lab";

import Contact from "./components/contact";
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

        {/* About Routes */}
        <Route path="/about" element={<About />} />
        <Route path="/about/history" element={<History />} />
        <Route path="/about/mission" element={<Mission />} />
        <Route path="/about/values" element={<Values />} />
        <Route path="/about/statistics" element={<Statistics />} />

        {/* School Info Routes */}
        <Route path="/info/fees" element={<FeeStructure />} />
        <Route path="/info/curriculum" element={<Curriculum />} />
        <Route path="/info/uniform" element={<Uniform />} />
        <Route path="/info/timing" element={<Timing />} />

        {/* Facilities Routes */}
        <Route path="/facilities/library" element={<Library />} />
        <Route path="/facilities/computer-lab" element={<ComputerLab />} />
        <Route path="/facilities/science-lab" element={<ScienceLab />} />

        {/* Academics Routes */}
        <Route path="/academics" element={<Academics />} />
        <Route path="/academics/examinations" element={<Examinations />} />
        <Route path="/academics/admissions" element={<Admissions />} />
        <Route path="/academics/guidelines" element={<Guidelines />} />
        <Route path="/academics/conduct" element={<Conduct />} />

        {/* Contact Route */}
        <Route path="/contact" element={<Contact />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
