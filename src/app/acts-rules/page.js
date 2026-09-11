"use client";

import { useState, useMemo } from "react";
import InnerPageLayout from "@/components/InnerPageLayout";
import styles from "./acts-rules.module.css";

const STATUTORY_ITEMS = [
  // --- ACTS ---
  { 
    name: "Income Tax Act, 1961",
    type: "Act",
    category: "Direct Tax",
    authority: "CBDT / MoF",
    link: "https://incometaxindia.gov.in/pages/acts/income-tax-act.aspx" 
  },
  { 
    name: "Customs Act, 1962",
    type: "Act",
    category: "Indirect Tax",
    authority: "CBIC / Revenue",
    link: "https://www.cbic.gov.in/htdocs-cbec/customs/cs-act/cs-act-idx" 
  },
  { 
    name: "The Companies Act, 2013",
    type: "Act",
    category: "Corporate & LLP",
    authority: "Ministry of Corporate Affairs",
    link: "https://www.mca.gov.in/Ministry/pdf/CompaniesAct2013.pdf" 
  },
  { 
    name: "The Limited Liability Partnership Act, 2008",
    type: "Act",
    category: "Corporate & LLP",
    authority: "Ministry of Corporate Affairs",
    link: "https://www.mca.gov.in/Ministry/pdf/LLP_Act_2008.pdf" 
  },
  { 
    name: "Chartered Accountants Act, 1949 [As amended]",
    type: "Act",
    category: "Professional Bodies",
    authority: "ICAI / MCA",
    link: "https://www.mca.gov.in/Ministry/pdf/CharteredAccountantsAct1949.pdf" 
  },
  { 
    name: "Company Secretaries Act, 1980 [As amended]",
    type: "Act",
    category: "Professional Bodies",
    authority: "ICSI / MCA",
    link: "https://www.mca.gov.in/Ministry/pdf/CompanySecretariesAct1980.pdf" 
  },
  { 
    name: "Cost and Works Accountants Act, 1959 [As amended]",
    type: "Act",
    category: "Professional Bodies",
    authority: "ICMAI / MCA",
    link: "https://www.mca.gov.in/Ministry/pdf/CostAndWorksAccountantsAct1959.pdf" 
  },
  { 
    name: "The Societies Registration Act, 1860",
    type: "Act",
    category: "Corporate & LLP",
    authority: "Legislative Dept",
    link: "https://legislative.gov.in/actsofparliamentfromtheyear/societies-registration-act-1860" 
  },
  { 
    name: "Right to Information (RTI) Act, 2005",
    type: "Act",
    category: "General Statutory",
    authority: "CIC / DoPT",
    link: "https://cic.gov.in/sites/default/files/RTI-Act_English.pdf" 
  },
  { 
    name: "The Foreign Exchange Management Act, 1999 (FEMA)",
    type: "Act",
    category: "Banking & Finance",
    authority: "Reserve Bank of India",
    link: "https://www.rbi.org.in/scripts/Fema.aspx" 
  },
  { 
    name: "Reserve Bank of India Act, 1934",
    type: "Act",
    category: "Banking & Finance",
    authority: "Reserve Bank of India",
    link: "https://www.rbi.org.in/Scripts/AboutUsDisplay.aspx?pg=Acts.htm" 
  },
  { 
    name: "Central Goods and Services Tax (CGST) Act, 2017",
    type: "Act",
    category: "GST",
    authority: "CBIC / GST Council",
    link: "https://www.cbic.gov.in/htdocs-cbec/gst/cgst-act-idx" 
  },
  { 
    name: "Integrated Goods and Services Tax (IGST) Act, 2017",
    type: "Act",
    category: "GST",
    authority: "CBIC / GST Council",
    link: "https://www.cbic.gov.in/htdocs-cbec/gst/igst-act-idx" 
  },
  { 
    name: "Union Territory Goods and Services Tax (UTGST) Act, 2017",
    type: "Act",
    category: "GST",
    authority: "CBIC / GST Council",
    link: "https://www.cbic.gov.in/htdocs-cbec/gst/utgst-act-idx" 
  },
  { 
    name: "GST (Compensation to the States) Act, 2017",
    type: "Act",
    category: "GST",
    authority: "CBIC / GST Council",
    link: "https://www.cbic.gov.in/htdocs-cbec/gst/gst-compens-idx" 
  },
  { 
    name: "Insolvency And Bankruptcy Code, 2016 (IBC)",
    type: "Act",
    category: "Corporate & LLP",
    authority: "IBBI / MCA",
    link: "https://www.ibbi.gov.in/en/legal-framework/act" 
  },
  { 
    name: "Customs Tariff Act, 1975",
    type: "Act",
    category: "Indirect Tax",
    authority: "CBIC / Revenue",
    link: "https://www.cbic.gov.in/htdocs-cbec/customs/cs-tariff/cst-idx" 
  },

  // --- RULES ---
  { 
    name: "Income Tax Rules, 1962",
    type: "Rule",
    category: "Direct Tax",
    authority: "CBDT / MoF",
    link: "https://incometaxindia.gov.in/pages/rules/income-tax-rules-1962.aspx" 
  },
  { 
    name: "Wealth Tax Rules, 1957",
    type: "Rule",
    category: "Direct Tax",
    authority: "CBDT / MoF",
    link: "https://incometaxindia.gov.in/pages/rules/wealth-tax-rules.aspx" 
  },
  { 
    name: "The Companies (Registered Valuers and Valuation) Rules, 2017",
    type: "Rule",
    category: "Corporate & LLP",
    authority: "Ministry of Corporate Affairs",
    link: "https://www.mca.gov.in/Ministry/pdf/RegisteredValuersValuationRules2017.pdf" 
  },
  { 
    name: "Central Goods and Services Tax (CGST) Rules, 2017",
    type: "Rule",
    category: "GST",
    authority: "CBIC / GST Council",
    link: "https://www.cbic.gov.in/htdocs-cbec/gst/cgst-rules-idx" 
  },
  { 
    name: "Integrated Goods and Services Tax (IGST) Rules, 2017",
    type: "Rule",
    category: "GST",
    authority: "CBIC / GST Council",
    link: "https://www.cbic.gov.in/htdocs-cbec/gst/igst-rules-idx" 
  }
];

const CATEGORIES = [
  "All",
  "Direct Tax",
  "GST",
  "Indirect Tax",
  "Corporate & LLP",
  "Banking & Finance",
  "Professional Bodies",
  "General Statutory"
];

export default function ActsRules() {
  const [activeType, setActiveType] = useState("All"); // "All", "Act", "Rule"
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return STATUTORY_ITEMS.filter((item) => {
      const matchType = activeType === "All" || item.type === activeType;
      const matchCat = selectedCategory === "All" || item.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.authority.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchCat && matchSearch;
    });
  }, [activeType, selectedCategory, searchQuery]);

  const actsList = useMemo(() => filteredItems.filter(i => i.type === "Act"), [filteredItems]);
  const rulesList = useMemo(() => filteredItems.filter(i => i.type === "Rule"), [filteredItems]);

  return (
    <InnerPageLayout title="Statutory Acts & Rules" breadcrumbs={[{ name: "Acts & Rules" }]}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Acts, Rules & Statutory Codes</h2>
        <p className={styles.subtitle}>
          Direct, verified access to official Central legislation, tax statutes, corporate acts, and statutory rules maintained by the Ministry of Finance, MCA, CBIC, and RBI.
        </p>
      </div>

      <div className={styles.officialNotice}>
        <strong>Statutory Notice:</strong> All links point directly to authentic, up-to-date legislative databases and official Ministry repositories (CBDT, MCA, CBIC, RBI, IBBI, and CIC). Documents open securely in a new browser tab.
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
            placeholder="Search acts, rules, or authority (e.g., GST, Companies, Income Tax, FEMA)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeType === "All" ? styles.filterBtnActive : ""}`}
            onClick={() => setActiveType("All")}
          >
            All Types
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeType === "Act" ? styles.filterBtnActive : ""}`}
            onClick={() => setActiveType("Act")}
          >
            Acts Only
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeType === "Rule" ? styles.filterBtnActive : ""}`}
            onClick={() => setActiveType("Rule")}
          >
            Rules Only
          </button>
        </div>

        <div className={styles.filterGroup} style={{ width: "100%", marginTop: "4px" }}>
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

      {/* Acts Section */}
      {(activeType === "All" || activeType === "Act") && actsList.length > 0 && (
        <div className={styles.sectionBlock}>
          <div className={styles.sectionHeading}>
            <span>Central & Statutory Acts</span>
            <span className={styles.itemCountBadge}>{actsList.length} Acts</span>
          </div>
          <div className={styles.cardsGrid}>
            {actsList.map((act, idx) => (
              <div key={idx} className={styles.actCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.actTitle}>{act.name}</h3>
                  <span className={styles.authorityBadge}>{act.authority}</span>
                </div>
                <span className={styles.categoryTag}>{act.category}</span>
                <a
                  href={act.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openLinkBtn}
                >
                  <span>Open Official Document / Portal</span>
                  <svg style={{ width: "14px", height: "14px" }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rules Section */}
      {(activeType === "All" || activeType === "Rule") && rulesList.length > 0 && (
        <div className={styles.sectionBlock}>
          <div className={styles.sectionHeading}>
            <span>Statutory Rules & Regulations</span>
            <span className={styles.itemCountBadge}>{rulesList.length} Rules</span>
          </div>
          <div className={styles.cardsGrid}>
            {rulesList.map((rule, idx) => (
              <div key={idx} className={styles.actCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.actTitle}>{rule.name}</h3>
                  <span className={styles.authorityBadge}>{rule.authority}</span>
                </div>
                <span className={styles.categoryTag}>{rule.category}</span>
                <a
                  href={rule.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openLinkBtn}
                >
                  <span>Open Official Document / Portal</span>
                  <svg style={{ width: "14px", height: "14px" }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className={styles.emptyState}>
          <p style={{ margin: 0, fontWeight: "600", fontSize: "1.1rem" }}>No statutory acts or rules matching your search.</p>
          <p style={{ margin: "6px 0 0 0", fontSize: "0.88rem" }}>Try clearing search keywords or selecting "All Types" / "All" categories.</p>
        </div>
      )}
    </InnerPageLayout>
  );
}
