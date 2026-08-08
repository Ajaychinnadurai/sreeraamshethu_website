import { Suspense, lazy, useState, useCallback } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PublicLayout from "./layouts/PublicLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";
import PageLoader from "./components/PageLoader";
import Intro from "./components/Intro";
import ScrollToTop from "./components/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Interiors = lazy(() => import("./pages/Interiors"));
const Process = lazy(() => import("./pages/Process"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Login = lazy(() => import("./pages/auth/Login"));
const ClientDashboard = lazy(() => import("./pages/client/Dashboard"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminProjects = lazy(() => import("./pages/admin/Projects"));
const AdminClients = lazy(() => import("./pages/admin/Clients"));
const AdminInquiries = lazy(() => import("./pages/admin/Inquiries"));
const AdminAppointments = lazy(() => import("./pages/admin/Appointments"));
const AdminTestimonials = lazy(() => import("./pages/admin/Testimonials"));

export default function App() {
  const [introDone, setIntroDone] = useState(() => {
    try {
      return sessionStorage.getItem("sr_intro_seen") === "1";
    } catch {
      return false;
    }
  });

  const handleIntroDone = useCallback(() => {
    try {
      sessionStorage.setItem("sr_intro_seen", "1");
    } catch {
      /* ignore */
    }
    setIntroDone(true);
  }, []);

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          {!introDone && <Intro onDone={handleIntroDone} />}
          <ScrollToTop />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/interiors" element={<Interiors />} />
              <Route path="/process" element={<Process />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/client/login" element={<Login />} />
            </Route>

            <Route element={<ProtectedRoute role="CLIENT" />}>
              <Route element={<ClientLayout />}>
                <Route path="/client" element={<ClientDashboard />} />
                <Route path="/client/" element={<ClientDashboard />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute role="ADMIN" />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/" element={<AdminDashboard />} />
                <Route path="/admin/projects" element={<AdminProjects />} />
                <Route path="/admin/clients" element={<AdminClients />} />
                <Route path="/admin/inquiries" element={<AdminInquiries />} />
                <Route path="/admin/appointments" element={<AdminAppointments />} />
                <Route path="/admin/testimonials" element={<AdminTestimonials />} />
              </Route>
            </Route>

            <Route path="/admin/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}