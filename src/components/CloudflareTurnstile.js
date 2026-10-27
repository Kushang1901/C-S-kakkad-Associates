"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const CloudflareTurnstile = forwardRef(function CloudflareTurnstile(
  { onVerify, onExpire, onError, theme = "light" },
  ref
) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);

  // Cloudflare Turnstile site key
  const siteKey =
    process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ||
    "0x4AAAAAAFnxHYwKxToSr18i";

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (typeof window !== "undefined" && window.turnstile && widgetIdRef.current) {
        try {
          window.turnstile.reset(widgetIdRef.current);
        } catch (err) {
          console.warn("Could not reset Turnstile widget:", err);
        }
      }
    },
  }));

  useEffect(() => {
    let isMounted = true;

    const renderWidget = () => {
      if (!isMounted || !containerRef.current || !window.turnstile) return;
      if (widgetIdRef.current) return;

      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: theme,
          callback: (token) => {
            if (isMounted && onVerify) onVerify(token);
          },
          "expired-callback": () => {
            if (isMounted && onExpire) onExpire();
          },
          "error-callback": (err) => {
            if (isMounted && onError) onError(err);
          },
        });
      } catch (err) {
        console.warn("Cloudflare Turnstile render error:", err);
      }
    };

    if (typeof window !== "undefined") {
      if (window.turnstile) {
        renderWidget();
      } else {
        let script = document.getElementById("cf-turnstile-script");
        if (!script) {
          script = document.createElement("script");
          script.id = "cf-turnstile-script";
          script.src =
            "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
        }

        const pollInterval = setInterval(() => {
          if (window.turnstile) {
            clearInterval(pollInterval);
            renderWidget();
          }
        }, 100);

        const timeout = setTimeout(() => {
          clearInterval(pollInterval);
        }, 12000);

        return () => {
          isMounted = false;
          clearInterval(pollInterval);
          clearTimeout(timeout);
          if (widgetIdRef.current && window.turnstile) {
            try {
              window.turnstile.remove(widgetIdRef.current);
              widgetIdRef.current = null;
            } catch (_) {}
          }
        };
      }
    }

    return () => {
      isMounted = false;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch (_) {}
      }
    };
  }, [siteKey, theme]);

  return (
    <div
      style={{
        margin: "18px 0 12px 0",
        minHeight: "65px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div ref={containerRef} />
    </div>
  );
});

export default CloudflareTurnstile;
