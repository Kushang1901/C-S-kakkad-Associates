"use client";

import { useState, useEffect } from "react";

export default function FloatingWidgets() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Monitor scroll height to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {/* Scroll to Top Button (Bottom Left) */}
      <button 
        onClick={scrollToTop} 
        className={`back-to-top ${showScrollBtn ? "visible" : ""}`}
        title="Scroll to Top"
        aria-label="Scroll to Top"
      >
        <svg 
          style={{ width: "20px", height: "20px" }} 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button>

      {/* Chatbot & Commute Widget (Bottom Right) */}
      <div className="chatbot-container">
        {/* Dropdown Menu */}
        <div className={`chatbot-menu ${chatOpen ? "open" : ""}`}>
          <div className="chatbot-options">
            {/* WhatsApp option */}
            <a 
              href="https://wa.me/919409207388?text=Hello%20CS%20Kakkad%20%26%20Associates%2C%20I%20have%20an%20enquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="chatbot-option"
            >
              <svg style={{ color: "#25D366" }} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.077-1.33a9.923 9.923 0 004.931 1.314c5.508 0 9.99-4.479 9.99-9.986 0-2.668-1.04-5.178-2.928-7.067A9.926 9.926 0 0012.012 2zm5.727 14.043c-.246.697-1.428 1.272-1.96 1.343-.483.064-.993.102-3.076-.757-2.665-1.097-4.385-3.805-4.518-3.982-.133-.178-.99-1.314-.99-2.507 0-1.192.624-1.78.847-2.022.223-.242.483-.303.644-.303.161 0 .322.001.463.007.148.007.348-.056.545.421.2.489.684 1.666.744 1.787.06.121.1.262.02.423-.08.162-.121.262-.242.404-.12.14-.254.312-.362.422-.12.12-.246.252-.105.493.14.242.625 1.03 1.34 1.666.924.82 1.7 1.074 1.942 1.196.242.12.383.101.524-.06.14-.162.604-.705.765-.947.16-.242.321-.202.543-.121.222.081 1.409.665 1.65.786.242.121.403.181.463.282.06.101.06.585-.186 1.282z"/>
              </svg>
              <span>WhatsApp Chat</span>
            </a>

            {/* Call Option */}
            <a 
              href="tel:+919409207388"
              className="chatbot-option"
            >
              <svg style={{ color: "var(--primary-color)" }} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span>Call: 94092 07388</span>
            </a>

            {/* Email Option */}
            <a 
              href="mailto:cachintankakkad@gmail.com"
              className="chatbot-option"
            >
              <svg style={{ color: "var(--primary-light)" }} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span>Email Us</span>
            </a>
          </div>
        </div>

        {/* Trigger Button */}
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className={`chatbot-button ${chatOpen ? "active" : ""}`}
          title="Quick Connect"
          aria-label="Quick Connect"
        >
          {chatOpen ? (
            <svg 
              style={{ width: "24px", height: "24px" }} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <>
              <span className="pulse-ring"></span>
              <svg 
                style={{ width: "24px", height: "24px" }} 
                fill="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"></path>
              </svg>
            </>
          )}
        </button>
      </div>
    </>
  );
}
