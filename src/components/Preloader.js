"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show loader on initial visit and whenever the user navigates to a new page
    setVisible(true);
    setFadeOut(false);

    // Smooth transition: brief pause to allow new page to render, then fade out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 600);

    // Remove from DOM after fade-out transition completes
    const destroyTimer = setTimeout(() => {
      setVisible(false);
    }, 950);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(destroyTimer);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className={`preloader-overlay ${fadeOut ? "fade-out" : ""}`}>
      <img src="/loader.png" alt="CS Kakkad & Associates Logo" className="preloader-logo" />
      <div className="dots-loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
