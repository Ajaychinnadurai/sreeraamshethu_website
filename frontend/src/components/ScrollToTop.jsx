import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets window scroll to top on every route change.
 * Rendered inside <BrowserRouter>. Use "instant" so pages open at
 * the very top without a lingering scroll animation.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}