import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Route guard for authenticated areas.
 * Checks for role permissions and protects admin/client routes.
 */
export default function ProtectedRoute({ role }) {
  const { user, loading } = useAuth();
  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = Boolean(user.role === "ADMIN" || user.is_staff || user.is_superuser || user.username?.toLowerCase() === "admin");
  
  if (role === "ADMIN" && !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}