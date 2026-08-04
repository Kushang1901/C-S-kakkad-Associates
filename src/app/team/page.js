import InnerPageLayout from "@/components/InnerPageLayout";

export default function Team() {
  const teamMembers = [
    {
      name: "CA Chintan S. Kakkad",
      role: "Founder & Managing Partner (F.C.A., B.Com)",
      bio: "Chintan S. Kakkad is a Fellow Chartered Accountant with extensive experience in statutory audits, direct tax representation, corporate finance syndication, and tax planning. He holds a Bachelor of Commerce and oversees the overall strategic advisory and audit practices at C S Kakkad & Associates.",
      initials: "CK"
    },
    {
      name: "Senior Audit Manager",
      role: "Assurance & Corporate Compliance",
      bio: "Over 8 years of experience in leading statutory and tax audits for corporate clients, partnership firms, and educational societies. Specializes in designing robust internal financial controls and company law regulations.",
      initials: "AM"
    },
    {
      name: "GST Compliance Specialist",
      role: "Indirect Tax Consultant",
      bio: "Expert in Goods & Services Tax (GST) registration, compliance audits, monthly return preparation (GSTR-1, 3B, 9, 9C), and representing clients in departmental GST audits and adjudication proceedings.",
      initials: "GS"
    },
    {
      name: "Business Finance Head",
      role: "Loan Syndication & Project Advisory",
      bio: "Dedicated specialist assisting startups and MSMEs with bank project reports, CMA data preparation, credit appraisals, term loan structures, and liaising with banking institutions for syndication.",
      initials: "BF"
    }
  ];

  return (
    <InnerPageLayout title="Our Team" breadcrumbs={[{ name: "Team" }]}>
      <h2>Meet Our Professionals</h2>
      <p>
        C S Kakkad & Associates brings together a team of competent professionals with extensive knowledge, practical experience, and strong integrity. Our collaborative structure allows us to handle complex financial requirements with precision and dedication.
      </p>

      {/* Styled Grid inside Layout */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "24px",
        marginTop: "30px",
        marginBottom: "30px"
      }}>
        {teamMembers.map((member, idx) => (
          <div key={idx} style={{
            display: "flex",
            gap: "20px",
            padding: "24px",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--border-radius)",
            backgroundColor: "var(--bg-white)",
            boxShadow: "var(--shadow-sm)"
          }}>
            <div style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              backgroundColor: "var(--accent-blue)",
              color: "var(--primary-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.4rem",
              fontWeight: "700",
              flexShrink: 0,
              border: "2px solid var(--secondary-color)"
            }}>
              {member.initials}
            </div>
            <div>
              <h3 style={{ margin: "0 0 4px 0", color: "var(--primary-color)" }}>{member.name}</h3>
              <span style={{
                fontSize: "0.8rem",
                fontWeight: "700",
                color: "var(--secondary-color)",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "8px"
              }}>{member.role}</span>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.5" }}>{member.bio}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "40px" }}>Our Approach</h2>
      <p>
        Every team member is trained to maintain client confidentiality, follow standard operating procedures for data security, and respond to queries with speed. We continuously invest in the training and development of our articled assistants and support staff to keep them updated with changing tax regulations and technological tools.
      </p>
    </InnerPageLayout>
  );
}
