"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import styles from "./sitemap.module.css";

const SITEMAP_SECTIONS = [
  {
    category: "Corporate & Profile Pages",
    icon: "🏛️",
    links: [
      {
        title: "Home",
        path: "/",
        desc: "Overview of C S Kakkad & Associates, core practice highlights, client trust & services summary.",
      },
      {
        title: "About Us",
        path: "/about",
        desc: "Firm legacy, ethical commitments, leadership vision, and professional background.",
      },
      {
        title: "Our Team",
        path: "/team",
        desc: "Profile of founder CA Chintan S. Kakkad (F.C.A.) and associate chartered accountants.",
      },
      {
        title: "Firm Vision",
        path: "/vision",
        desc: "Strategic vision to empower Indian enterprises with sound financial foundations.",
      },
      {
        title: "Firm Mission",
        path: "/mission",
        desc: "Core mission delivering diligent auditing, strategic taxation, and unwavering integrity.",
      },
      {
        title: "Empanelment & Credentials",
        path: "/empanelment",
        desc: "Bank audit empanelment, CAG/RBI eligibility, due diligence, and tender capabilities.",
      },
      {
        title: "Careers & Articleship",
        path: "/career",
        desc: "Current opportunities for qualified CAs, semi-qualified professionals, and article assistants.",
      },
      {
        title: "Contact Us",
        path: "/contact",
        desc: "Dwarka head office address, phone numbers, email support, and interactive Google map.",
      },
      {
        title: "Online Enquiry",
        path: "/enquiry",
        desc: "Book a direct tax consultation, corporate advisory, or audit inquiry online.",
      },
    ],
  },
  {
    category: "Professional Services",
    icon: "⚖️",
    links: [
      {
        title: "Audit & Assurance",
        path: "/services/audit-assurance",
        desc: "Statutory company audits, Tax Audits under Sec 44AB, internal control & stock verification.",
      },
      {
        title: "Income Tax Advisory & Filing",
        path: "/services/income-tax",
        desc: "Corporate & individual ITR, capital gains planning, advance tax, TDS, and scrutiny appeals.",
      },
      {
        title: "Goods & Services Tax (GST)",
        path: "/services/gst",
        desc: "GST registration, monthly GSTR-1 & 3B filing, annual returns, ITC reconciliation audits.",
      },
      {
        title: "Business Finance & Loan Syndication",
        path: "/services/business-finance-loan",
        desc: "Bank project reports, CMA data formulation, working capital CC limits, and commercial loans.",
      },
      {
        title: "Corporate Consultancy & Entity Setup",
        path: "/services/consultancy",
        desc: "Private limited incorporation, LLP formation, MSME Udyam, and MCA regulatory compliances.",
      },
      {
        title: "Accounting & Outsourcing",
        path: "/services/accounting-outsourcing",
        desc: "End-to-end cloud bookkeeping, monthly financial MIS, payroll management, and TDS withholding.",
      },
    ],
  },
  {
    category: "Financial Calculators & Utilities",
    icon: "🧮",
    links: [
      {
        title: "Tax & Financial Calculators",
        path: "/calculators",
        desc: "Interactive calculators for Income Tax (Old vs New Regime), Home/Business Loan EMI, and GST.",
      },
      {
        title: "Government Portals Directory",
        path: "/useful-links",
        desc: "Direct single-click access to Income Tax e-filing, GSTN, MCA21, Traces, RBI, and ICAI portals.",
      },
      {
        title: "Statutory Forms Download",
        path: "/forms",
        desc: "Download official income tax declarations, MCA ROC formats, GST certificates, and banking templates.",
      },
      {
        title: "Acts & Statutory Rules",
        path: "/acts-rules",
        desc: "Reference copies of Income Tax Act 1961, Companies Act 2013, CGST/GGST Acts, and SEBI rules.",
      },
      {
        title: "ICAI CPE Status Check",
        path: "/cpe-status",
        desc: "Track and verify mandatory Continuing Professional Education (CPE) hours for ICAI members.",
      },
    ],
  },
  {
    category: "Legal & Regulatory Policies",
    icon: "🛡️",
    links: [
      {
        title: "Privacy Policy",
        path: "/privacy-policy",
        desc: "Commitment to strict client confidentiality, data encryption, and privacy protections.",
      },
      {
        title: "Disclaimer & Ethics",
        path: "/disclaimer",
        desc: "Chartered Accountants Act 1949 compliance, ICAI regulations, and website terms of usage.",
      },
      {
        title: "XML Sitemap Feed (for Search Bots)",
        path: "/sitemap.xml",
        desc: "Direct XML protocol feed generated automatically for Googlebot, Bingbot, and web crawlers.",
      },
    ],
  },
];

export default function SitemapClient() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSections = useMemo(() => {
    if (!searchTerm.trim()) return SITEMAP_SECTIONS;
    const term = searchTerm.toLowerCase();

    return SITEMAP_SECTIONS.map((section) => {
      const matchedLinks = section.links.filter(
        (link) =>
          link.title.toLowerCase().includes(term) ||
          link.desc.toLowerCase().includes(term) ||
          link.path.toLowerCase().includes(term)
      );
      return {
        ...section,
        links: matchedLinks,
      };
    }).filter((section) => section.links.length > 0);
  }, [searchTerm]);

  const totalPagesCount = useMemo(() => {
    return SITEMAP_SECTIONS.reduce((acc, curr) => acc + curr.links.length, 0);
  }, []);

  return (
    <div className={styles.sitemapContainer}>
      {/* Intro Header Box */}
      <div className={styles.introBox}>
        <div className={styles.introContent}>
          <h2 className={styles.introTitle}>Comprehensive Site Directory</h2>
          <p className={styles.introText}>
            Welcome to the complete sitemap of <strong>C S Kakkad & Associates</strong>. Browse our full directory of chartered accountancy services, financial calculators, firm credentials, and regulatory portals.
          </p>
        </div>
        <a
          href="/sitemap.xml"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.xmlBadge}
          title="Open raw XML sitemap for search crawlers"
        >
          <span>📄</span>
          <span>View XML Sitemap ({totalPagesCount} URLs)</span>
        </a>
      </div>

      {/* Interactive Search Filter */}
      <div className={styles.searchBarWrapper}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder="Filter pages, services, or tools (e.g., GST, Audit, Loan, Calculators)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
          aria-label="Filter sitemap links"
        />
      </div>

      {/* Sections Grid */}
      {filteredSections.length === 0 ? (
        <div className={styles.noResults}>
          <p>No pages found matching &ldquo;{searchTerm}&rdquo;.</p>
        </div>
      ) : (
        <div className={styles.sectionGrid}>
          {filteredSections.map((sec, idx) => (
            <div key={idx} className={styles.categoryCard}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon}>{sec.icon}</div>
                <h3 className={styles.categoryTitle}>{sec.category}</h3>
              </div>
              <ul className={styles.linkList}>
                {sec.links.map((link, lIdx) => (
                  <li key={lIdx} className={styles.linkItem}>
                    <Link href={link.path} className={styles.itemAnchor}>
                      {link.title}
                    </Link>
                    <span className={styles.itemDesc}>{link.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* SEO & Search Engine Crawl Note */}
      <div className={styles.summaryCard}>
        <strong>Search Engine & Crawler Notice:</strong> This HTML sitemap is continuously synchronized with our live XML feed at <code>/sitemap.xml</code>. All internal URLs adhere to canonical standards under <code>https://www.cachintankakkad.in</code> and are structured to guarantee fast indexing by Google, Bing, and automated audit spiders.
      </div>
    </div>
  );
}
