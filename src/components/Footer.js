import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Company Info column */}
          <div className={styles.columnLogo}>
            <div className={styles.logoRow}>
              <img src="/logo.png" alt="C S Kakkad & Associates Logo" className={styles.logo} />
              <div className={styles.logoText}>
                <span className={styles.firmName}>C S Kakkad & Associates</span>
                <span className={styles.firmTag}>Chartered Accountants</span>
              </div>
            </div>
            <p className={styles.description}>
              Offering a wide range of professional services in accounting, auditing, taxation, business finance, and regulatory compliance. Committed to excellence, integrity, and trust.
            </p>
          </div>

          {/* Offices column */}
          <div className={styles.columnInfo}>
            <h4 className={styles.title}>Our Offices</h4>
            <div className={styles.officeBlock}>
              <span className={styles.officeTitle}>Main Office (Dwarka)</span>
              <p>Office No. 8, 1st Floor, Dwarkesh Shopping Centre, Nr. Rabari Gate, Dwarka - 361335</p>
              <p className={styles.contact}>
                <strong>Mo:</strong> <a href="tel:+919409207388">94092 07388</a> | <a href="tel:+919978666211">99786 66211</a>
              </p>
            </div>
            <div className={styles.officeBlock}>
              <span className={styles.officeTitle}>Branch Office (Surajkaradi)</span>
              <p>Nr. Navneet Hotel, Okha Highway Road, Surajkaradi - 361347</p>
              <p className={styles.contact}>
                <strong>Mo:</strong> <a href="tel:+917383538193">73835 38193</a> | <a href="tel:+919409207388">94092 07388</a>
              </p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className={styles.columnLinks}>
            <h4 className={styles.title}>Quick Links</h4>
            <ul className={styles.links}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/vision">Vision</Link></li>
              <li><Link href="/mission">Mission</Link></li>
              <li><Link href="/team">Our Team</Link></li>
              <li><Link href="/career">Careers</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className={styles.columnLinks}>
            <h4 className={styles.title}>Our Services</h4>
            <ul className={styles.links}>
              <li><Link href="/services/accounting-outsourcing">Accounting & Outsourcing</Link></li>
              <li><Link href="/services/audit-assurance">Audit & Assurance</Link></li>
              <li><Link href="/services/business-finance-loan">Business Finance & Loan</Link></li>
              <li><Link href="/services/consultancy">Consultancy Services</Link></li>
              <li><Link href="/services/gst">Goods & Service Tax</Link></li>
              <li><Link href="/services/income-tax">Income Tax</Link></li>
            </ul>
          </div>

          {/* Utilities Column */}
          <div className={styles.columnLinks}>
            <h4 className={styles.title}>Utilities</h4>
            <ul className={styles.links}>
              <li><Link href="/acts-rules">Acts & Rules</Link></li>
              <li><Link href="/forms">Download Forms</Link></li>
              <li><Link href="/cpe-status">CPE Status Check</Link></li>
              <li><Link href="/enquiry">Submit Enquiry</Link></li>
              <li><Link href="/empanelment">Empanelment Info</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomBarInner}>
            <p className={styles.copyright}>
              © {currentYear} C S Kakkad & Associates. All rights reserved.
            </p>
            <div className={styles.legalLinks}>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <span className={styles.divider}>|</span>
              <Link href="/disclaimer">Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
