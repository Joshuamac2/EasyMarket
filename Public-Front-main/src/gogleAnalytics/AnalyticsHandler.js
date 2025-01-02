import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initializeGA, logPageView } from "./G4Analytics";

function AnalyticsHandler() {
  const location = useLocation();
  const isGAInitialized = useRef(false);
  const hasLoggedPageView = useRef(null);

  useEffect(() => {
    if (!isGAInitialized.current) {
      const gaId = process.env.REACT_APP_GA_ID;
      if (gaId) {
        initializeGA(gaId);
        isGAInitialized.current = true;
      }
    }
  }, []);

  useEffect(() => {
    if (hasLoggedPageView.current !== location.pathname) {
      logPageView();
      hasLoggedPageView.current = location.pathname;
    }
  }, [location.pathname]);

  return null;
}

export default AnalyticsHandler;
