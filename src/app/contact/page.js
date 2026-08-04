"use client";

import { useState } from "react";
import Link from "next/link";
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
            {/* Address columns */}
            <div>
              <h2 style={{ marginBottom: "24px" }}>Our Office Locations</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "30px" }}>
                Please visit us at our offices or get in touch through our phone numbers or email address. We look forward to working with you.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                <div style={{ padding: "24px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius)", background: "var(--bg-light)" }}>
                  <h3 style={{ color: "var(--primary-color)", margin: "0 0 12px 0", fontSize: "1.2rem" }}>Main Office (Dwarka)</h3>
                  <p style={{ margin: "0 0 12px 0", fontSize: "0.95rem" }}>
                    Office No. 8, 1st Floor, Dwarkesh Shopping Centre,<br />
                    Nr. Rabari Gate, Dwarka - 361335
                  </p>
                  <p style={{ margin: "0 0 4px 0", fontSize: "0.95rem" }}>
                    <strong>Mobile:</strong> <a href="tel:+919409207388">+91 94092 07388</a> | <a href="tel:+919978666211">+91 99786 66211</a>
                  </p>
                  <p style={{ margin: 0, fontSize: "0.95rem" }}>
                    <strong>Email:</strong> <a href="mailto:cachintankakkad@gmail.com" style={{ color: "var(--secondary-color)", fontWeight: "600" }}>cachintankakkad@gmail.com</a>
                  </p>
                </div>

                <div style={{ padding: "24px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius)", background: "var(--bg-light)" }}>
                  <h3 style={{ color: "var(--primary-color)", margin: "0 0 12px 0", fontSize: "1.2rem" }}>Branch Office (Surajkaradi)</h3>
                  <p style={{ margin: "0 0 12px 0", fontSize: "0.95rem" }}>
                    Nr. Navneet Hotel, Okha Highway Road,<br />
                    Surajkaradi - 361347
                  </p>
                  <p style={{ margin: "0 0 4px 0", fontSize: "0.95rem" }}>
                    <strong>Mobile:</strong> <a href="tel:+917383538193">+91 73835 38193</a> | <a href="tel:+919409207388">+91 94092 07388</a>
                  </p>
                  <p style={{ margin: 0, fontSize: "0.95rem" }}>
                    <strong>Email:</strong> <a href="mailto:cachintankakkad@gmail.com" style={{ color: "var(--secondary-color)", fontWeight: "600" }}>cachintankakkad@gmail.com</a>
                  </p>
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
                      placeholder="e.g. John Doe"
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
                        placeholder="john@example.com"
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
                        placeholder="e.g. 98989 00000"
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
                      placeholder="e.g. Business Tax Audit Query"
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
                      placeholder="Write your detailed questions or comments here..."
                      className="form-control"
                      required
                    ></textarea>
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

          {/* Google Map Box - Container Aligned Rectangle View */}
          <div style={{ marginTop: "40px", width: "100%", height: "380px", backgroundColor: "#f0f0f0", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius)", overflow: "hidden" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.8990117699523!2d68.96291147518288!3d22.24391014493722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39569d7dafe91cfb%3A0xc15b726cfa017ca1!2sC%20S%20KAKKAD%20%26%20ASSOCIATES!5e0!3m2!1sen!2sin!4v1785841640233!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="C S Kakkad & Associates Office Location Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
