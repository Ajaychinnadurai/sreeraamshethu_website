import { useEffect, useState } from "react";
import { api } from "../services/api";

export function useSiteConfig() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    let active = true;
    api
      .get("/dashboard/config/")
      .then((res) => active && setConfig(res.data))
      .catch(() => active && setConfig(null));
    return () => {
      active = false;
    };
  }, []);

  return config;
}