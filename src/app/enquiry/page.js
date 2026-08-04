"use client";

import { useState } from "react";
import InnerPageLayout from "@/components/InnerPageLayout";

export default function Enquiry() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
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

    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);

    // Construct formatted WhatsApp message
    const line = "---------------------------------";
    const title = "*New Business & Tax Enquiry*";
    const textMsg = 
`${title}
${line}
*Name:* ${formData.name}
*Mobile:* ${formData.phone}
*Email:* ${formData.email}
*Company:* ${formData.company || "Not Provided"}
*Service:* ${formData.service}
*Message:* ${formData.message || "Not Provided"}`;

    const waUrl = `https://api.whatsapp.com/send?phone=919409207388&text=${encodeURIComponent(textMsg)}`;

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Redirect to WhatsApp
      window.open(waUrl, "_blank");
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <InnerPageLayout title="Submit Enquiry" breadcrumbs={[{ name: "Enquiry" }]}>
      <h2>Business & Tax Enquiry</h2>
      <p>
        Please fill out the form below to request information or book a tax consultation. CA Chintan S. Kakkad or an associate will get back to you shortly. Submitting this form will automatically redirect you to send details via WhatsApp.
      </p>

      {success ? (
        <div style={{
          textAlign: "center",
          padding: "40px 20px",
          background: "var(--accent-green)",
          borderRadius: "var(--border-radius)",
          border: "1px solid var(--secondary-color)",
          marginTop: "30px"
        }}>
          <svg style={{ width: "64px", height: "64px", color: "var(--secondary-color)", marginBottom: "20px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 style={{ color: "var(--secondary-color)", fontSize: "1.4rem", marginBottom: "8px" }}>Enquiry Prepared for WhatsApp!</h3>
          <p style={{ color: "var(--text-dark)", margin: 0 }}>
            We have generated a formatted WhatsApp message. If the WhatsApp window did not open automatically, please click the button below to send it to us.
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "24px" }}>
            <button 
              onClick={() => {
                const line = "---------------------------------";
                const title = "*New Business & Tax Enquiry*";
                // Re-trigger open in case blocker stopped it
                window.open(`https://api.whatsapp.com/send?phone=919409207388&text=...`, "_blank");
              }} 
              className="btn btn-secondary"
            >
              Open WhatsApp Manually
            </button>
            <button onClick={() => setSuccess(false)} className="btn btn-outline">
              New Enquiry Form
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
          {error && (
            <div style={{
              color: "#D32F2F",
              background: "#FFEBEE",
              padding: "12px 16px",
              borderRadius: "var(--border-radius)",
              marginBottom: "20px",
              fontWeight: "600",
              fontSize: "0.9rem"
            }}>
              {error}
            </div>
          )}

          <div className="form-row">
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
            <div className="form-group">
              <label className="form-label">Mobile Number <span style={{ color: "red" }}>*</span></label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 94092 00000"
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email Address <span style={{ color: "red" }}>*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. john@example.com"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Acme Corp"
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Service of Interest <span style={{ color: "red" }}>*</span></label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">-- Select Service --</option>
              <option value="Accounting & Outsourcing">Accounting & Outsourcing</option>
              <option value="Audit & Assurance">Audit & Assurance</option>
              <option value="Business Finance & Loan">Business Finance & Loan Syndication</option>
              <option value="Consultancy Services">Consultancy Services</option>
              <option value="Goods & Service Tax">Goods & Service Tax (GST)</option>
              <option value="Income Tax">Income Tax Advisory</option>
              <option value="General Consult">General Financial Enquiry</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Enquiry Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Briefly describe your requirements or tax queries..."
              className="form-control"
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
    </InnerPageLayout>
  );
}
