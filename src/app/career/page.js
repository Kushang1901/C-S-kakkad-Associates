"use client";

import { useState } from "react";
import InnerPageLayout from "@/components/InnerPageLayout";

export default function Career() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    experience: "",
    position: "",
    coverLetter: "",
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

    if (!formData.name || !formData.email || !formData.phone || !formData.qualification || !formData.position) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);

    // Format WhatsApp message
    const line = "---------------------------------";
    const title = "*New Job Application*";
    const textMsg = 
`${title}
${line}
*Name:* ${formData.name}
*Mobile:* ${formData.phone}
*Email:* ${formData.email}
*Position:* ${formData.position}
*Qualification:* ${formData.qualification}
*Experience:* ${formData.experience || "Not Provided"}
*Skills Summary:* ${formData.coverLetter || "Not Provided"}`;

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
        qualification: "",
        experience: "",
        position: "",
        coverLetter: "",
      });
    }, 1000);
  };

  return (
    <InnerPageLayout title="Careers" breadcrumbs={[{ name: "Careers" }]}>
      <h2>Work With Us</h2>
      <p>
        We are constantly seeking passionate, dedicated, and ethical individuals who want to learn, grow, and establish a rewarding career in auditing, direct taxation, company law compliance, and financial syndication. Submitting your details will direct you to send them to us on WhatsApp.
      </p>

      <h2>Current Openings</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px", marginBottom: "40px", marginTop: "20px" }}>
        <div style={{ padding: "20px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius)", background: "var(--bg-light)" }}>
          <h3 style={{ color: "var(--primary-color)", margin: 0, fontSize: "1.15rem" }}>Articled Assistants (CA Articleship)</h3>
          <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--secondary-color)" }}>POSITION: 2 OPENINGS</span>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "8px", marginBottom: 0 }}>
            Candidates who have cleared one or both groups of CA Intermediate (IPCC). We offer exposure to statutory audits, bank branch audits, GST audits, and personal income tax assessments under direct partner guidance.
          </p>
        </div>
        <div style={{ padding: "20px", border: "1px solid var(--border-color)", borderRadius: "var(--border-radius)", background: "var(--bg-light)" }}>
          <h3 style={{ color: "var(--primary-color)", margin: 0, fontSize: "1.15rem" }}>Paid Assistant / Accountant</h3>
          <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--secondary-color)" }}>POSITION: 1 OPENING</span>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "8px", marginBottom: 0 }}>
            Commerce Graduates (B.Com / M.Com) with 2+ years of experience in bookkeeping, Tally/ERP solutions, preparing TDS returns, and monthly GST draft filings. Good communication skills are an asset.
          </p>
        </div>
      </div>

      <h2>Application Form</h2>
      <p>
        If you wish to apply for articleship or a professional position, please submit your credentials below. We will review your application and contact you for an interview.
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
          <h3 style={{ color: "var(--secondary-color)", fontSize: "1.4rem", marginBottom: "8px" }}>Application Sent to WhatsApp!</h3>
          <p style={{ color: "var(--text-dark)", margin: 0 }}>
            Your application message has been created. If the WhatsApp screen did not open automatically, please click the button below to send it to our desk.
          </p>
          <div className="btn-group" style={{ justifyContent: "center" }}>
            <button 
              onClick={() => {
                window.open(`https://api.whatsapp.com/send?phone=919409207388&text=...`, "_blank");
              }} 
              className="btn btn-secondary"
            >
              Open WhatsApp Manually
            </button>
            <button onClick={() => setSuccess(false)} className="btn btn-outline">
              New Application Form
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
          {error && (
            <div style={{ color: "#D32F2F", background: "#FFEBEE", padding: "12px 16px", borderRadius: "var(--border-radius)", marginBottom: "20px" }}>
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
                placeholder="e.g. Rahul Patel"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Number <span style={{ color: "red" }}>*</span></label>
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

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email Address <span style={{ color: "red" }}>*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. rahul@gmail.com"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Apply for Position <span style={{ color: "red" }}>*</span></label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">-- Select Position --</option>
                <option value="Articled Assistant">Articled Assistant (IPCC qualified)</option>
                <option value="Paid Assistant">Paid Assistant / Accountant</option>
                <option value="GST Associate">GST Compliance Associate</option>
                <option value="Intern">Summer Internship / Audit Trainee</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Educational Qualification <span style={{ color: "red" }}>*</span></label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="e.g. B.Com Graduate / CA Inter Cleared"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Prior Experience (in years)</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. Fresh Graduate / 2 Years in Tax Firm"
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Resume Details & Professional Skills Summary</label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="List your key skills (Tally, GST filing, Excel, etc.) and why you wish to join our firm..."
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
