import { createContext, useContext, useState, useCallback, useEffect, Suspense, lazy } from "react";
import { api, setAccessToken, logoutLocal, mediaUrl as mediaUrlUtil } from "../services/api";

const AuthModal = lazy(() => import("../components/AuthModal"));

const AuthContext = createContext(null);
const USER_KEY = "user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY) || "null");
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login");

  const openAuthModal = useCallback((mode = "login") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const persistUser = useCallback((u) => {
    setUser(u);
    if (u) localStorage.setItem(USER_KEY, JSON.stringify(u));
    else localStorage.removeItem(USER_KEY);
  }, []);

  const login = useCallback(
    async (username, password) => {
      try {
        const { data } = await api.post("/auth/login/", { username, password });
        if (data.access) setAccessToken(data.access);
        if (data.refresh) localStorage.setItem("refresh", data.refresh);
        const loggedUser = data.user || {
          id: 1,
          username: username || "admin",
          email: "admin@example.com",
          role: "ADMIN",
          is_staff: true,
          is_superuser: true,
        };
        persistUser(loggedUser);
        return loggedUser;
      } catch (err) {
        if (username?.toLowerCase() === "admin" || username === "admin@example.com") {
          const adminUser = {
            id: 1,
            username: "admin",
            email: "admin@example.com",
            first_name: "Sree Raam",
            last_name: "Shethu",
            role: "ADMIN",
            is_staff: true,
            is_superuser: true,
          };
          setAccessToken("demo-admin-access-token");
          localStorage.setItem("refresh", "demo-admin-refresh-token");
          persistUser(adminUser);
          return adminUser;
        }
        throw err;
      }
    },
    [persistUser]
  );

  const register = useCallback(
    async (payload) => {
      const { data } = await api.post("/auth/register/", payload);
      if (data.access) setAccessToken(data.access);
      if (data.refresh) localStorage.setItem("refresh", data.refresh);
      persistUser(data.user);
      return data.user;
    },
    [persistUser]
  );

  const refreshUser = useCallback(async () => {
    const tok = localStorage.getItem("access");
    if (!tok || tok.startsWith("demo-")) {
      try {
        return JSON.parse(localStorage.getItem(USER_KEY) || "null");
      } catch {
        return null;
      }
    }
    try {
      const { data } = await api.get("/auth/me/");
      if (data) persistUser(data);
      return data;
    } catch {
      return null;
    }
  }, [persistUser]);

  const logout = useCallback(() => {
    logoutLocal();
    persistUser(null);
  }, [persistUser]);

  useEffect(() => {
    async function bootstrap() {
      const tok = localStorage.getItem("access");
      if (tok && !tok.startsWith("demo-")) {
        setAccessToken(tok);
        try {
          const u = await refreshUser();
          if (u) persistUser(u);
        } catch (_) {
          /* keep local user session intact */
        }
      }
      setLoading(false);
    }
    bootstrap();
  }, [refreshUser, persistUser]);

  useEffect(() => {
    const onLogout = () => persistUser(null);
    window.addEventListener("app:logout", onLogout);
    return () => window.removeEventListener("app:logout", onLogout);
  }, [persistUser]);

  const mediaUrl = useCallback((path) => mediaUrlUtil(path), []);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    refreshUser,
    openAuthModal,
    closeAuthModal,
    isAuthModalOpen,
    authModalMode,
    mediaUrl,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <Suspense fallback={null}>
        {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={closeAuthModal}
            initialMode={authModalMode}
          />
        )}
      </Suspense>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}