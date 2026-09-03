"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import styles from "./LanguageTranslator.module.css";

const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
];

// Memory cache to make repeated transitions instant
const translationCache = {
  gu: {},
  hi: {},
};

export default function LanguageTranslator({ isMobile = false }) {
  // Always default to English on every page load/reload as requested
  const [currentLang, setCurrentLang] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper to gather all translatable text nodes across the page
  const getTextNodes = () => {
    const nodes = [];
    const walk = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          if (!node.nodeValue || !node.nodeValue.trim()) {
            return NodeFilter.FILTER_REJECT;
          }
          let parent = node.parentElement;
          while (parent) {
            const tagName = parent.tagName.toLowerCase();
            if (
              tagName === "script" ||
              tagName === "style" ||
              tagName === "noscript" ||
              tagName === "code" ||
              tagName === "textarea" ||
              parent.classList.contains("notranslate") ||
              parent.getAttribute("translate") === "no"
            ) {
              return NodeFilter.FILTER_REJECT;
            }
            parent = parent.parentElement;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    let curr;
    while ((curr = walk.nextNode())) {
      nodes.push(curr);
    }
    return nodes;
  };

  // Main translation function
  const applyTranslation = useCallback(async (langCode) => {
    if (typeof window === "undefined") return;

    const nodes = getTextNodes();

    // 1. If English, restore to original text in 0ms with a brief smooth confirmation
    if (langCode === "en") {
      setIsTranslating(true);
      nodes.forEach((node) => {
        if (node.__originalText !== undefined) {
          node.nodeValue = node.__originalText;
        }
      });
      setTimeout(() => {
        setIsTranslating(false);
      }, 250);
      return;
    }

    // 2. For Gujarati / Hindi
    setIsTranslating(true);
    const toTranslateMap = new Map();
    const uncachedTexts = new Set();

    nodes.forEach((node) => {
      if (node.__originalText === undefined) {
        node.__originalText = node.nodeValue;
      }

      const original = (node.__originalText || "").trim();
      if (!original) return;

      if (!toTranslateMap.has(original)) {
        toTranslateMap.set(original, []);
      }
      toTranslateMap.get(original).push(node);

      if (translationCache[langCode][original]) {
        node.nodeValue = translationCache[langCode][original];
      } else {
        if (!/^[\d\s,.\-+/%:()]+$/.test(original)) {
          uncachedTexts.add(original);
        }
      }
    });

    // If all nodes already translated from cache, we're done immediately!
    if (uncachedTexts.size === 0) {
      setIsTranslating(false);
      return;
    }

    try {
      const textsArray = Array.from(uncachedTexts);
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: textsArray, targetLang: langCode }),
      });

      if (res.ok) {
        const { translations } = await res.json();
        textsArray.forEach((original, idx) => {
          const translated = translations[idx] || original;
          translationCache[langCode][original] = translated;

          const targetNodes = toTranslateMap.get(original) || [];
          targetNodes.forEach((node) => {
            node.nodeValue = translated;
          });
        });
      }
    } catch (err) {
      console.error("Translation error:", err);
    } finally {
      setIsTranslating(false);
    }
  }, []);

  // Re-apply translation when route changes while a non-English language is active
  useEffect(() => {
    if (currentLang !== "en") {
      const timer = setTimeout(() => {
        applyTranslation(currentLang);
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [pathname, currentLang, applyTranslation]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  const changeLanguage = (langCode) => {
    if (langCode === currentLang) {
      setIsOpen(false);
      return;
    }

    setCurrentLang(langCode);
    setIsOpen(false);

    // Notify other components like the hero slider in page.js
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("appLanguageChanged", { detail: langCode }));
    }

    applyTranslation(langCode);
  };

  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <div
      ref={dropdownRef}
      className={`${styles.translatorWrapper} ${isMobile ? styles.mobileVariant : ""} notranslate`}
      translate="no"
    >
      <button
        type="button"
        className={styles.translatorBtn}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        aria-label="Select website language"
        aria-expanded={isOpen}
      >
        <span className={styles.btnInner}>
          {isTranslating ? (
            <svg
              className={styles.globeIcon}
              style={{ animation: "spin 1s linear infinite" }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 60" />
            </svg>
          ) : (
            <svg className={styles.globeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          )}
          <span>{activeLangObj.nativeName}</span>
        </span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronRotate : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <ul className={styles.dropdown} role="menu">
          {LANGUAGES.map((lang) => (
            <li key={lang.code} role="none">
              <button
                type="button"
                role="menuitem"
                className={`${styles.dropdownItem} ${
                  currentLang === lang.code ? styles.dropdownItemActive : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  changeLanguage(lang.code);
                }}
              >
                <div className={styles.langText}>
                  <span className={styles.nativeName}>{lang.nativeName}</span>
                  {lang.code !== "en" && <span className={styles.subName}>{lang.name}</span>}
                </div>
                {currentLang === lang.code && (
                  <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Full-Screen Glassmorphic Translation Loader matching CA firm theme */}
      {isTranslating && mounted && typeof document !== "undefined" && createPortal(
        <div className={styles.translationOverlay} role="status" aria-live="polite">
          <div className={styles.loaderCard}>
            <div className={styles.spinnerContainer}>
              <div className={styles.spinnerRing}></div>
              <svg
                className={styles.centerGlobe}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div>
              <h4 className={styles.loaderTitle}>Translating Website...</h4>
              <p className={styles.loaderSub}>
                Switching content to <strong>{activeLangObj.nativeName}</strong>
              </p>
            </div>
            <div className={styles.progressBarTrack}>
              <div className={styles.progressBarFill}></div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
