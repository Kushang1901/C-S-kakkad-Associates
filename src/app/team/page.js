import InnerPageLayout from "@/components/InnerPageLayout";
import styles from "../content-page.module.css";

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

      {/* Responsive Grid from CSS Module */}
      <div className={styles.teamGrid}>
        {teamMembers.map((member, idx) => (
          <div key={idx} className={styles.teamCard}>
            <div className={styles.teamAvatar}>
              {member.initials}
            </div>
            <div className={styles.teamInfo}>
              <h3 className={styles.teamName}>{member.name}</h3>
              <span className={styles.teamRole}>{member.role}</span>
              <p className={styles.teamBio}>{member.bio}</p>
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
