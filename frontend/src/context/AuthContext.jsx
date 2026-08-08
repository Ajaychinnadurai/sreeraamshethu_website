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
      const { data } = await api.post("/auth/login/", { username, password });
      setAccessToken(data.access);
      localStorage.setItem("refresh", data.refresh);
      persistUser(data.user);
      return data.user;
    },
    [persistUser]
  );

  const register = useCallback(
    async (payload) => {
      const { data } = await api.post("/auth/register/", payload);
      setAccessToken(data.access);
      localStorage.setItem("refresh", data.refresh);
      persistUser(data.user);
      return data.user;
    },
    [persistUser]
  );

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await api.get("/auth/me/");
      persistUser(data);
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
      if (tok) {
        setAccessToken(tok);
        const u = await refreshUser();
        if (!u) persistUser(null);
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

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    refreshUser,
    openAuthModal,
    closeAuthModal,
    isAdmin: user?.role === "ADMIN" || user?.is_staff,
    isClient: user?.role === "CLIENT",
    mediaUrl: mediaUrlUtil,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <Suspense fallback={null}>
        <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} initialMode={authModalMode} />
      </Suspense>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}