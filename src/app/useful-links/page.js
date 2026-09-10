"use client";

import { useState, useMemo } from "react";
import InnerPageLayout from "@/components/InnerPageLayout";
import styles from "./useful-links.module.css";

const PORTAL_LINKS = [
  // Direct Taxation & Income Tax
  {
    name: "Income Tax e-Filing 2.0 Portal",
    dept: "CBDT / MoF",
    category: "Income Tax",
    description: "Official portal for electronic filing of Income Tax Returns (ITR-1 to 7), viewing Form 26AS, AIS/TIS, and e-Verification.",
    url: "https://www.incometax.gov.in/iec/foportal/",
  },
  {
    name: "TRACES (TDS CPC Portal)",
    dept: "Income Tax Department",
    category: "Income Tax",
    description: "TDS Reconciliation Analysis and Correction Enabling System for downloading Form 16/16A, Conso files, and justification reports.",
    url: "https://www.tdscpc.gov.in/app/login.xhtml",
  },
  {
    name: "Protean / NSDL Tax Services",
    dept: "Protean eGov Technologies",
    category: "Income Tax",
    description: "Online application for new PAN/TAN cards, corrections, status tracking, and e-Payment of direct taxes (Challan 280, 281).",
    url: "https://www.tin-nsdl.com/",
  },

  // Goods & Services Tax (GST)
  {
    name: "GST Common Portal",
    dept: "GSTN",
    category: "GST",
    description: "Central portal for GST registration, filing periodic returns (GSTR-1, GSTR-3B, GSTR-9), ITC ledger matching, and refund applications.",
    url: "https://www.gst.gov.in/",
  },
  {
    name: "e-Way Bill System",
    dept: "NIC / GSTN",
    category: "GST",
    description: "National electronic waybill portal for generating, updating vehicle details, and cancelling e-Way Bills for interstate & intrastate movement.",
    url: "https://ewaybillgst.gov.in/",
  },
  {
    name: "e-Invoicing System (IRP)",
    dept: "NIC",
    category: "GST",
    description: "Invoice Registration Portal for B2B e-Invoice generation, IRN generation, and digital signing for taxpayers with turnover > ₹5 Crore.",
    url: "https://einvoice1.gst.gov.in/",
  },

  // Corporate Law & Company Affairs (MCA)
  {
    name: "MCA21 V3 Portal",
    dept: "Ministry of Corporate Affairs",
    category: "Corporate & MCA",
    description: "Statutory filing portal for Company incorporation (SPICe+), Annual Returns (AOC-4, MGT-7), Director KYC (DIR-3), and LLP forms.",
    url: "https://www.mca.gov.in/",
  },
  {
    name: "Insolvency & Bankruptcy Board of India (IBBI)",
    dept: "Government of India",
    category: "Corporate & MCA",
    description: "Regulatory body overseeing insolvency professionals and corporate insolvency resolution processes (CIRP) under IBC 2016.",
    url: "https://www.ibbi.gov.in/",
  },

  // Trade, Industry & Enterprise
  {
    name: "MSME Udyam Registration",
    dept: "Ministry of MSME",
    category: "Trade & Enterprise",
    description: "Official portal for paperless registration of Micro, Small and Medium Enterprises for priority sector lending and government subsidies.",
    url: "https://udyamregistration.gov.in/",
  },
  {
    name: "DGFT (Directorate General of Foreign Trade)",
    dept: "Ministry of Commerce & Industry",
    category: "Trade & Enterprise",
    description: "Online issuance and renewal of Importer-Exporter Code (IEC), export promotion authorizations, and duty exemption schemes.",
    url: "https://www.dgft.gov.in/",
  },
  {
    name: "GeM (Government e-Marketplace)",
    dept: "Ministry of Commerce",
    category: "Trade & Enterprise",
    description: "National public procurement portal for businesses, MSMEs, and vendors to participate in central and state government tenders.",
    url: "https://gem.gov.in/",
  },

  // Labor, EPFO & Social Security
  {
    name: "EPFO Unified Portal (Member & Employer)",
    dept: "Employees' Provident Fund Organisation",
    category: "Labor & Compliance",
    description: "Employer and employee unified portal for electronic ECR challan filing, monthly PF contributions, and online PF transfer/claims.",
    url: "https://unifiedportal-mem.epfindia.gov.in/",
  },
  {
    name: "ESIC Online Portal",
    dept: "Ministry of Labour & Employment",
    category: "Labor & Compliance",
    description: "Employee State Insurance Corporation portal for employer registration, employee monthly contribution filing, and medical benefits.",
    url: "https://www.esic.gov.in/",
  },
  {
    name: "Shram Suvidha Portal",
    dept: "Ministry of Labour & Employment",
    category: "Labor & Compliance",
    description: "One-stop national portal for unified registration, compliance reporting, and annual returns under Central Labour Acts.",
    url: "https://shramsuvidha.gov.in/",
  },

  // Professional Verification & Statutory Bodies
  {
    name: "ICAI UDIN Verification System",
    dept: "ICAI",
    category: "Professional Standards",
    description: "Public verification system allowing banks, tax authorities, and regulators to verify the validity of Unique Document Identification Numbers (UDIN) issued by Chartered Accountants.",
    url: "https://udin.icai.org/",
  },
  {
    name: "The Institute of Chartered Accountants of India (ICAI)",
    dept: "Statutory Body under Act of Parliament",
    category: "Professional Standards",
    description: "Apex national professional body of Chartered Accountants in India providing guidance notes, accounting standards, and regulatory circulars.",
    url: "https://www.icai.org/",
  },
  {
    name: "Reserve Bank of India (RBI)",
    dept: "Central Bank of India",
    category: "Banking & Finance",
    description: "Central bank regulatory notifications, FEMA circulars, Master Directions, foreign investment guidelines, and commercial interest rates.",
    url: "https://www.rbi.org.in/",
  },
];

const CATEGORIES = [
  "All",
  "Income Tax",
  "GST",
  "Corporate & MCA",
  "Trade & Enterprise",
  "Labor & Compliance",
  "Professional Standards",
  "Banking & Finance"
];

export default function UsefulLinksPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLinks = useMemo(() => {
    return PORTAL_LINKS.filter((item) => {
      const matchCat = selectedCategory === "All" || item.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.dept.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <InnerPageLayout
      title="Useful Government Links & Portal Directory"
      breadcrumbs={[{ name: "Useful Links" }]}
    >
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Official Government Portals Directory</h2>
        <p className={styles.subtitle}>
          Direct, verified links to official statutory e-filing portals across Indian Direct Tax, GST, MCA, Trade, and ICAI verification systems.
        </p>
      </div>

      {/* Search and Category Filtering */}
      <div className={styles.searchSection}>
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search portals by name, authority, or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.categoryFilter}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${styles.filterBtn} ${selectedCategory === cat ? styles.filterBtnActive : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Portals Grid */}
      {filteredLinks.length > 0 ? (
        <div className={styles.linksGrid}>
          {filteredLinks.map((portal, idx) => (
            <div key={idx} className={styles.linkCard}>
              <div className={styles.linkHeader}>
                <h3 className={styles.portalName}>{portal.name}</h3>
                <span className={styles.deptTag}>{portal.dept}</span>
              </div>
              <p className={styles.portalDesc}>{portal.description}</p>
              <a
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.visitBtn}
              >
                <span>Visit Official Portal</span>
                <svg style={{ width: "15px", height: "15px" }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p style={{ margin: 0, fontWeight: "600" }}>No government portals matching your search query.</p>
          <p style={{ margin: "4px 0 0 0", fontSize: "0.85rem" }}>Try clearing search keywords or choosing a different category.</p>
        </div>
      )}
    </InnerPageLayout>
  );
}
