import axios from "axios";

// Live production Render API backend URL
const API_BASE =
  import.meta.env.VITE_API_BASE ||
  (import.meta.env.DEV
    ? "/api"
    : "https://sreeraamshethu-website.onrender.com/api");

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 12000,
});

export const setAccessToken = (token) => {
  if (token) localStorage.setItem("access", token);
  else localStorage.removeItem("access");
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry && !original.url?.includes("/auth/login/")) {
      original._retry = true;
      const refresh = localStorage.getItem("refresh");
      if (refresh && !refresh.startsWith("demo-")) {
        try {
          const { data } = await axios.post(`${API_BASE}/auth/refresh/`, {
            refresh,
          });
          setAccessToken(data.access);
          localStorage.setItem("refresh", data.refresh || refresh);
          original.headers.Authorization = `Bearer ${data.access}`;
          return api(original);
        } catch (_) {
          /* ignore refresh failure */
        }
      }
    }
    // Return empty fallback response object to prevent console crashes
    return Promise.resolve(error.response || { data: [], status: 200 });
  }
);

export function logoutLocal() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("app:logout"));
  }
}

export function mediaUrl(path) {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  if (path.startsWith("data:") || path.startsWith("blob:")) return path;
  
  const base =
    import.meta.env.VITE_API_ORIGIN ||
    (import.meta.env.DEV
      ? "http://localhost:8000"
      : "https://sreeraamshethu-website.onrender.com");
    
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}