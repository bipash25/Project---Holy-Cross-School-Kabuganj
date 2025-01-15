import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./components/admin/auth-context";
import { ProtectedRoute } from "./components/admin/protected-route";

// Pages
import Home from "./components/home";
import About from "./components/about";
import Contact from "./components/contact";
import NotFound from "./components/NotFound";

// Academic Pages
import Academics from "./components/academics";
import Admissions from "./components/academics/admissions";
import Examinations from "./components/academics/examinations";
import Guidelines from "./components/academics/guidelines";
import Conduct from "./components/academics/conduct";

// Info Pages
import FeeStructure from "./components/info/fees";
import Curriculum from "./components/info/curriculum";
import Uniform from "./components/info/uniform";
import Timing from "./components/info/timing";

// Facility Pages
import Library from "./components/facilities/library";
import ComputerLab from "./components/facilities/computer-lab";
import ScienceLab from "./components/facilities/science-lab";

// News Pages
import NewsPage from "./components/news/news-page";
import NewsDetail from "./components/news/news-detail";

// Admin Pages
import AdminLogin from "./components/admin/login";
import AdminDashboard from "./components/admin/dashboard";

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="h-screen w-screen flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />

          {/* About Routes */}
          <Route path="/about" element={<About />} />
          <Route path="/about/history" element={<About />} />
          <Route path="/about/mission" element={<About />} />
          <Route path="/about/values" element={<About />} />
          <Route path="/about/statistics" element={<About />} />

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

          {/* News Routes */}
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetail />} />

          {/* Contact Route */}
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route
            path="/management-portal-hcsk-x8k9z2/login"
            element={<AdminLogin />}
          />
          <Route
            path="/management-portal-hcsk-x8k9z2/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
