import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./components/admin/auth-context";
import { ProtectedRoute } from "./components/admin/protected-route";

// Pages
import Home from "./components/home";
import About from "./components/about";
import History from "./components/about/history";
import Mission from "./components/about/mission";
import Message from "./components/about/message";
import Values from "./components/about/values";
import Statistics from "./components/about/statistics";
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
import NewsManager from "./components/admin/pages/NewsManager";
import MediaManager from "./components/admin/pages/MediaManager";
import StudentsManager from "./components/admin/pages/StudentsManager";
import AchievementsManager from "./components/admin/pages/AchievementsManager";
import AcademicsManager from "./components/admin/pages/AcademicsManager";
import CalendarManager from "./components/admin/pages/CalendarManager";
import ContentManager from "./components/admin/pages/ContentManager";
import SettingsManager from "./components/admin/pages/SettingsManager";

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="h-[100vh] w-[100vw] flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* About Routes */}
          <Route path="/about" element={<About />} />
          <Route path="/about/history" element={<History />} />
          <Route path="/about/message" element={<Message />} />
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

          {/* News Routes */}
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetail />} />

          {/* Contact Route */}
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route
            path="/management-portal-hcsk/login"
            element={<AdminLogin />}
          />
          <Route
            path="/management-portal-hcsk/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/management-portal-hcsk/news"
            element={
              <ProtectedRoute>
                <NewsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/management-portal-hcsk/media"
            element={
              <ProtectedRoute>
                <MediaManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/management-portal-hcsk/students"
            element={
              <ProtectedRoute>
                <StudentsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/management-portal-hcsk/achievements"
            element={
              <ProtectedRoute>
                <AchievementsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/management-portal-hcsk/academics"
            element={
              <ProtectedRoute>
                <AcademicsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/management-portal-hcsk/calendar"
            element={
              <ProtectedRoute>
                <CalendarManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/management-portal-hcsk/content"
            element={
              <ProtectedRoute>
                <ContentManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/management-portal-hcsk/settings"
            element={
              <ProtectedRoute>
                <SettingsManager />
              </ProtectedRoute>
            }
          />

          {/* Add this before the catchall route */}
          {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
