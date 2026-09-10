"use client";

import { useState, useEffect } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Smooth transition: wait for content to settle, then trigger fade out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1200);

    // Destroy loader container after animation completes
    const destroyTimer = setTimeout(() => {
      setVisible(false);
    }, 1600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(destroyTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`preloader-overlay ${fadeOut ? "fade-out" : ""}`}>
      <img src="/cs-kakkad-logo.png" alt="CS Kakkad & Associates Logo" className="preloader-logo" />
      <div className="dots-loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
