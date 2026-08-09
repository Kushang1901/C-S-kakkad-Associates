import Link from "next/link";
import InnerPageLayout from "@/components/InnerPageLayout";
import styles from "./team.module.css";

export default function Team() {
  const departments = [
    {
      title: "Audit & Assurance",
      role: "Assurance & Corporate Compliance",
      desc: "Statutory audits, tax audits u/s 44AB, internal financial controls (IFC), and corporate governance compliance.",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "GST & Indirect Tax",
      role: "Compliance & Departmental Representation",
      desc: "Monthly/quarterly GSTR filings, annual audits (GSTR-9/9C), refund processing, and GST litigation representation.",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "Business Finance",
      role: "Loan Syndication & Project Advisory",
      desc: "DPR preparation, CMA data, credit appraisals, working capital limits, term loans, and bank syndication.",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "Direct Taxation",
      role: "Income Tax Planning & Appeals",
      desc: "Income tax return preparation, advance tax planning, assessment proceedings, and CIT(A) / ITAT appellate representation.",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "Accounting & Outsourcing",
      role: "Bookkeeping & MIS Reporting",
      desc: "Full-service accounting, Tally/ERP bookkeeping, monthly MIS reports, and financial statement preparation.",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "Secretarial & Compliance",
      role: "Company Law & ROC Filings",
      desc: "Company incorporation, ROC annual filings, board resolutions, statutory registers, and corporate compliance advisory.",
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  const highlights = [
    { val: "15+", label: "Years of Practice" },
    { val: "500+", label: "Clients Served" },
    { val: "F.C.A.", label: "ICAI Fellow Member" },
    { val: "100%", label: "Compliance Focus" },
  ];

  return (
    <InnerPageLayout title="Our Team & Leadership" breadcrumbs={[{ name: "Team" }]}>

      {/* ── Founder Horizontal Card ── */}
      <div className={styles.founderCard}>

        {/* Left: Photo Column */}
        <div className={styles.photoCol}>
          <div className={styles.photoWrap}>
            <img src="/owner-image-2.jpeg" alt="CA Chintan S. Kakkad" className={styles.photo} />
          </div>
          <div className={styles.fellowBadge}>
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
            ICAI Fellow Member
          </div>
        </div>

        {/* Right: Details Column */}
        <div className={styles.detailsCol}>
          <div className={styles.nameRow}>
            <h2 className={styles.founderName}>CA Chintan S. Kakkad</h2>
            <span className={styles.qualBadge}>F.C.A. &nbsp;·&nbsp; B.Com</span>
          </div>
          <p className={styles.founderRole}>Founder &amp; Managing Partner</p>

          <p className={styles.bio}>
            A Fellow Chartered Accountant with over 15 years of practice, CA Chintan S. Kakkad leads the firm&apos;s strategic direction, client advisory, and quality assurance. He specializes in statutory audits, direct tax representation before ITAT, corporate finance syndication, and financial restructuring for MSMEs and corporates across Gujarat.
          </p>

          {/* Stats Row */}
          <div className={styles.statsRow}>
            {highlights.map((h, i) => (
              <div key={i} className={styles.statBox}>
                <span className={styles.statVal}>{h.val}</span>
                <span className={styles.statLabel}>{h.label}</span>
              </div>
            ))}
          </div>

          {/* Chips */}
          <div className={styles.chipsRow}>
            <span className={styles.chip}>Statutory Audit</span>
            <span className={styles.chip}>Tax Appeals</span>
            <span className={styles.chip}>Loan Syndication</span>
            <span className={styles.chip}>GST Litigation</span>
            <span className={styles.chip}>Corporate Finance</span>
            <span className={styles.chip}>Tax Planning</span>
          </div>

          {/* Quote */}
          <blockquote className={styles.quote}>
            &ldquo;Our mission is to empower businesses with ethical compliance, proactive financial insights, and uncompromising audit integrity.&rdquo;
          </blockquote>

          {/* CTA */}
          <div className={styles.ctaRow}>
            <Link href="/enquiry" className={styles.btnPrimary}>Book Consultation</Link>
            <a href="mailto:cachintankakkad@gmail.com" className={styles.btnOutline}>
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
              cachintankakkad@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className={styles.divider}>
        <span>Core Practice Divisions</span>
      </div>
      <p className={styles.sectionSub}>Our firm is structured into six specialized practice groups, each led by experienced professionals ensuring precise, compliant, and timely service delivery.</p>

      {/* ── Department Grid ── */}
      <div className={styles.deptGrid}>
        {departments.map((dept, idx) => (
          <div key={idx} className={styles.deptCard}>
            <div className={styles.deptIcon}>{dept.icon}</div>
            <div className={styles.deptBody}>
              <h4 className={styles.deptTitle}>{dept.title}</h4>
              <span className={styles.deptRole}>{dept.role}</span>
              <p className={styles.deptDesc}>{dept.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Professional Standards ── */}
      <div className={styles.standardsBanner}>
        <div className={styles.standardsLeft}>
          <h3>Professional Standards &amp; Ethics</h3>
          <p>Every member of our team operates under the ICAI Code of Ethics, mandatory CPE requirements, and strict client confidentiality protocols ensuring trust, accuracy, and regulatory compliance on every engagement.</p>
        </div>
        <Link href="/contact" className={styles.btnPrimary}>Connect With Us</Link>
      </div>

    </InnerPageLayout>
  );
}
