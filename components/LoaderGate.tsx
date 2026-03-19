"use client";

import { ReactNode, useEffect, useState } from "react";
import EyeLoader from "./loader";

type LoaderGateProps = {
  children: ReactNode;
};

export default function LoaderGate({ children }: LoaderGateProps) {
  const [showLoader, setShowLoader] = useState(true);
  const [loaderVisible, setLoaderVisible] = useState(true);

  useEffect(() => {
    const loadedBefore = sessionStorage.getItem("portfolio_loaded_once") === "1";
    const displayDuration = loadedBefore ? 650 : 1450;

    const hideTimer = window.setTimeout(() => {
      setLoaderVisible(false);
      sessionStorage.setItem("portfolio_loaded_once", "1");
    }, displayDuration);

    const unmountTimer = window.setTimeout(() => {
      setShowLoader(false);
    }, displayDuration + 420);

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(unmountTimer);
    };
  }, []);

  return (
    <>
      {showLoader ? (
        <div
          className={`fixed inset-0 transition-opacity duration-500 ${
            loaderVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: 999 }}
          aria-hidden={!loaderVisible}
        >
          <EyeLoader />
        </div>
      ) : null}

      <div
        className={`transition-opacity duration-500 ${
          loaderVisible ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}
