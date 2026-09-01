import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { captureAdsParams } from "../lib/ads";

export default function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    captureAdsParams();
  }, [pathname, search]);
  return null;
}
