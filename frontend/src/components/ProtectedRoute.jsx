import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Route guard for authenticated areas.
 * Redirects unauthenticated access directly to the main Home page (/).
 */
export default function ProtectedRoute({ role }) {
  const { user, loading } = useAuth();
  if (loading) return null;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const isAdmin = user.role === "ADMIN" || user.is_staff;
  if (role === "ADMIN" && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}