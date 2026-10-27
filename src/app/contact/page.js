"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import CloudflareTurnstile from "@/components/CloudflareTurnstile";
import styles from "../content-page.module.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState(null);
  const turnstileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      setError("Please fill out all required fields.");
      return;
    }

    if (!turnstileToken) {
      setError("Please complete the Cloudflare security verification.");
      return;
    }

    setLoading(true);

    // Format WhatsApp message
    const line = "---------------------------------";
    const title = "*New Direct Message*";
    const textMsg = 
`${title}
${line}
*Name:* ${formData.name}
*Mobile:* ${formData.phone}
*Email:* ${formData.email}
*Subject:* ${formData.subject}
*Message:* ${formData.message}`;

    const waUrl = `https://api.whatsapp.com/send?phone=919409207388&text=${encodeURIComponent(textMsg)}`;

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Redirect
      window.open(waUrl, "_blank");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    }, 1000);
  };

  return (
    <div>
      {/* Banner */}
      <div className={styles.pageBanner}>
        <div className="container">
          <h1 className={styles.bannerTitle}>Contact Us</h1>
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link>
            <span className={styles.separator}>/</span>
            <span>Contact Us</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`${styles.contentWrapper} section`}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: "start" }}>
            {/* Address & Office Information Column */}
            <div>
              <div style={{ marginBottom: "24px" }}>
                <h2 style={{ marginBottom: "10px", fontSize: "1.75rem", color: "var(--primary-color)" }}>
                  Our Office Location
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                  Please visit us at our office or connect via phone or email for tax consultations, audits, and financial advisory.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {/* Main Office Card */}
                <div style={{
                  padding: "24px",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--border-radius)",
                  background: "#ffffff",
                  boxShadow: "var(--shadow-sm)",
                  borderLeft: "4px solid var(--primary-color)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
                    <h3 style={{ color: "var(--primary-color)", margin: 0, fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "8px" }}>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: "var(--secondary-color)" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                      Dwarka (Head Office)
                    </h3>
                    <span style={{
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      padding: "4px 10px",
                      background: "var(--accent-green)",
                      color: "var(--secondary-color)",
                      borderRadius: "20px",
                      letterSpacing: "0.5px"
                    }}>
                      MAIN FIRM
                    </span>
                  </div>

                  <p style={{ margin: "0 0 14px 0", fontSize: "0.95rem", lineHeight: "1.6", color: "var(--text-dark)", display: "flex", gap: "10px" }}>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: "3px", color: "var(--secondary-color)" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span>
                      Office No. 8, 1st Floor, Dwarkesh Shopping Centre,<br />
                      Nr. Rabari Gate, Dwarka - 361335, Gujarat
                    </span>
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "12px", borderTop: "1px solid var(--border-light)" }}>
                    <p style={{ margin: 0, fontSize: "0.92rem", display: "flex", alignItems: "center", gap: "10px" }}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: "var(--secondary-color)", flexShrink: 0 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      <span><strong>Mobile:</strong> <a href="tel:+919409207388" style={{ color: "var(--text-dark)", textDecoration: "none" }}>+91 94092 07388</a> &nbsp;|&nbsp; <a href="tel:+919978666211" style={{ color: "var(--text-dark)", textDecoration: "none" }}>+91 99786 66211</a></span>
                    </p>

                    <p style={{ margin: 0, fontSize: "0.92rem", display: "flex", alignItems: "center", gap: "10px" }}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: "var(--secondary-color)", flexShrink: 0 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <span><strong>Email:</strong> <a href="mailto:info@cachintankakkad.in" style={{ color: "var(--secondary-color)", fontWeight: "600" }}>info@cachintankakkad.in</a></span>
                    </p>
                  </div>
                </div>

                {/* Office Working Hours Card */}
                <div style={{
                  padding: "20px 24px",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--border-radius)",
                  background: "#ffffff",
                  boxShadow: "var(--shadow-sm)",
                  borderLeft: "4px solid var(--secondary-color)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: "var(--secondary-color)" }}>
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <h3 style={{ margin: 0, fontSize: "1.05rem", color: "var(--primary-color)" }}>Office Working Hours</h3>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.9rem", paddingBottom: "8px", borderBottom: "1px dashed var(--border-light)" }}>
                    <span style={{ color: "var(--text-dark)", fontWeight: "500" }}>Monday – Saturday</span>
                    <span style={{ color: "var(--primary-color)", fontWeight: "600" }}>09:30 AM – 07:30 PM</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.9rem", paddingTop: "8px" }}>
                    <span style={{ color: "var(--text-muted)" }}>Sunday</span>
                    <span style={{ color: "#b91c1c", fontWeight: "600", fontSize: "0.85rem" }}>Closed (Appointments only)</span>
                  </div>
                </div>

                {/* Direct Consultation / Quick Action Banner */}
                <div style={{
                  padding: "16px 20px",
                  border: "1px solid #bfdbfe",
                  borderRadius: "var(--border-radius)",
                  background: "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "12px"
                }}>
                  <div>
                    <h4 style={{ margin: "0 0 2px 0", fontSize: "0.92rem", color: "var(--primary-color)", fontWeight: "700" }}>
                      Need Quick Consultation?
                    </h4>
                    <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
                      Connect directly with our team for tax or finance assistance
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <a
                      href="tel:+919409207388"
                      className="btn btn-primary"
                      style={{ padding: "7px 13px", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "5px" }}
                    >
                      Call Now
                    </a>
                    <a
                      href="https://api.whatsapp.com/send?phone=919409207388&text=Hello%20CA%20Chintan%20Kakkad,%20I%20have%20an%20enquiry."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ padding: "7px 13px", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "5px" }}
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className={styles.mainContent}>
              <h2 style={{ fontSize: "1.4rem", margin: "0 0 20px 0" }}>Send Message</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "20px" }}>
                Submit this form to automatically prepare and redirect your message directly to our WhatsApp portal.
              </p>
              {success ? (
                <div style={{
                  textAlign: "center",
                  padding: "30px 10px",
                  background: "var(--accent-green)",
                  borderRadius: "var(--border-radius)",
                  border: "1px solid var(--secondary-color)"
                }}>
                  <svg style={{ width: "48px", height: "48px", color: "var(--secondary-color)", marginBottom: "15px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 style={{ color: "var(--secondary-color)", fontSize: "1.2rem", marginBottom: "8px" }}>Message Prepared!</h3>
                  <p style={{ color: "var(--text-dark)", fontSize: "0.95rem" }}>
                    Your message draft is compiled. If WhatsApp did not open automatically, click the button below to send it to us.
                  </p>
                  <div className="btn-group" style={{ justifyContent: "center" }}>
                    <button 
                      onClick={() => {
                        window.open(`https://api.whatsapp.com/send?phone=919409207388&text=...`, "_blank");
                      }} 
                      className="btn btn-secondary"
                      style={{ fontSize: "0.85rem", padding: "8px 16px" }}
                    >
                      Open WhatsApp
                    </button>
                    <button 
                      onClick={() => setSuccess(false)} 
                      className="btn btn-outline"
                      style={{ fontSize: "0.85rem", padding: "8px 16px" }}
                    >
                      New Message Form
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div style={{ color: "red", background: "#FFEBEE", padding: "10px", borderRadius: "4px", marginBottom: "15px", fontSize: "0.9rem" }}>
                      {error}
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">Full Name <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=""
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Email Address <span style={{ color: "red" }}>*</span></label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder=""
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Mobile Number <span style={{ color: "red" }}>*</span></label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder=""
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder=""
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message Details <span style={{ color: "red" }}>*</span></label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder=""
                      className="form-control"
                      required
                    ></textarea>
                  </div>

                  <div className="form-group" style={{ marginBottom: "16px" }}>
                    <label className="form-label" style={{ marginBottom: "6px", display: "block" }}>
                      Security Verification <span style={{ color: "red" }}>*</span>
                    </label>
                    <CloudflareTurnstile
                      ref={turnstileRef}
                      onVerify={(token) => {
                        setTurnstileToken(token);
                        setError("");
                      }}
                      onExpire={() => setTurnstileToken(null)}
                      onError={() => setTurnstileToken(null)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ width: "100%", marginTop: "10px" }}
                  >
                    {loading ? "SUBMITTING..." : "SUBMIT"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Office Google Maps Section */}
          <div style={{ marginTop: "50px" }}>
            <div style={{ marginBottom: "18px" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", color: "var(--primary-color)", margin: "0 0 4px 0" }}>
                Office Location Map
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", margin: 0 }}>
                Find us easily at Dwarkesh Shopping Centre in Dwarka or get live GPS navigation via Google Maps.
              </p>
            </div>

            {/* Office Info Strip */}
            <div style={{
              background: "#ffffff",
              border: "1px solid var(--border-color)",
              borderBottom: "none",
              borderRadius: "var(--border-radius) var(--border-radius) 0 0",
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "14px"
            }}>
              <div>
                <strong style={{ color: "var(--primary-color)", fontSize: "1rem" }}>
                  Dwarka (Main Office)
                </strong>
                <p style={{ margin: "4px 0 0 0", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Office No. 8, 1st Floor, Dwarkesh Shopping Centre, Nr. Rabari Gate, Dwarka - 361335
                </p>
              </div>

              <a
                href="https://maps.google.com/?q=C+S+KAKKAD+%26+ASSOCIATES+Dwarka"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ fontSize: "0.82rem", padding: "8px 14px", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <span>Get Directions in Google Maps</span>
                <svg style={{ width: "14px", height: "14px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>

            {/* Map Frame Container */}
            <div style={{ width: "100%", height: "400px", backgroundColor: "#f0f0f0", border: "1px solid var(--border-color)", borderRadius: "0 0 var(--border-radius) var(--border-radius)", overflow: "hidden" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.8990117699523!2d68.96291147518288!3d22.24391014493722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39569d7dafe91cfb%3A0xc15b726cfa017ca1!2sC%20S%20KAKKAD%20%26%20ASSOCIATES!5e0!3m2!1sen!2sin!4v1785841640233!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="C S Kakkad & Associates Dwarka Office Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
