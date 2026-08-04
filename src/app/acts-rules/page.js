"use client";

import InnerPageLayout from "@/components/InnerPageLayout";

export default function ActsRules() {
  const acts = [
    { 
      name: "Income Tax Act", 
      link: "https://www.indiacode.nic.in/bitstream/123456789/1567/1/196143.pdf" 
    },
    { 
      name: "Customs Act, 1962", 
      link: "https://www.indiacode.nic.in/bitstream/123456789/1368/1/A1962-52.pdf" 
    },
    { 
      name: "The Companies Act, 2013", 
      link: "https://www.mca.gov.in/Ministry/pdf/CompaniesAct2013.pdf" 
    },
    { 
      name: "The Limited Liability Partnership Act, 2008", 
      link: "https://www.mca.gov.in/Ministry/pdf/LLP_Act_2008.pdf" 
    },
    { 
      name: "Chartered Accountants Act, 1949 [As amended by the Chartered Accountants (Amendment) Act, 2011]", 
      link: "https://www.indiacode.nic.in/bitstream/123456789/1621/1/A1949-38.pdf" 
    },
    { 
      name: "Company Secretaries Act, 1980 [As amended by The Company Secretaries (Amendment) Act, 2006]", 
      link: "https://www.indiacode.nic.in/bitstream/123456789/1622/1/198056.pdf" 
    },
    { 
      name: "Cost and Works Accountants Act, 1959 [As Amended By The Cost And Works Accountants (Amendment) Act, 2006]", 
      link: "https://www.indiacode.nic.in/bitstream/123456789/1623/1/A1959-23.pdf" 
    },
    { 
      name: "The Societies Registration Act, 1860", 
      link: "https://www.indiacode.nic.in/bitstream/123456789/1630/1/186021.pdf" 
    },
    { 
      name: "Right to Information (RTI) Act, 2005.", 
      link: "https://www.rti.gov.in/RTI-Act-English.pdf" 
    },
    { 
      name: "The Foreign Exchange Management Act, 1999", 
      link: "https://www.indiacode.nic.in/bitstream/123456789/1714/1/199942.pdf" 
    },
    { 
      name: "Reserve Bank of India Act, 1934", 
      link: "https://rbidocs.rbi.org.in/rdocs/Publications/PDFs/RBIA1934170510.PDF" 
    },
    { 
      name: "CGST Act", 
      link: "https://www.cbic-gst.gov.in/pdf/cgst-act.pdf" 
    },
    { 
      name: "IGST Act", 
      link: "https://www.cbic-gst.gov.in/pdf/igst-act.pdf" 
    },
    { 
      name: "UTGST Act", 
      link: "https://www.cbic-gst.gov.in/pdf/utgst-act.pdf" 
    },
    { 
      name: "GST (Compensation to the States) Act", 
      link: "https://www.cbic-gst.gov.in/pdf/gst-compensation-act.pdf" 
    },
    { 
      name: "Insolvency And Bankruptcy Code, 2016.", 
      link: "https://www.indiacode.nic.in/bitstream/123456789/2012/1/A2016-31.pdf" 
    },
    { 
      name: "Customs Tariff Act, 1975", 
      link: "https://www.indiacode.nic.in/bitstream/123456789/1723/1/A1975-51.pdf" 
    }
  ];

  const rules = [
    { 
      name: "Income Tax Rules", 
      link: "https://www.incometaxindia.gov.in/Rules/Income-tax%20Rules/103120000000002131.pdf" 
    },
    { 
      name: "Wealth Tax Rules", 
      link: "https://www.incometaxindia.gov.in/Rules/Wealth-tax%20Rules/103120000000002139.pdf" 
    },
    { 
      name: "The Companies (Registered Valuers and Valuation) Rules, 2017", 
      link: "https://www.mca.gov.in/Ministry/pdf/RegisteredValuersValuationRules2017.pdf" 
    },
    { 
      name: "IGST Rules, 2017", 
      link: "https://www.cbic-gst.gov.in/pdf/igst-rules.pdf" 
    },
    { 
      name: "CGST Rules, 2017 - Part B", 
      link: "https://www.cbic-gst.gov.in/pdf/cgst-rules.pdf" 
    }
  ];

  return (
    <InnerPageLayout title="Acts & Rules" breadcrumbs={[{ name: "Acts & Rules" }]}>
      {/* Acts Section */}
      <h2 style={{ 
        color: "var(--primary-color)",
        fontSize: "1.8rem",
        fontWeight: "700",
        marginBottom: "20px",
        borderBottom: "2px solid var(--border-color)",
        paddingBottom: "8px"
      }}>
        Acts
      </h2>
      <ul style={{ 
        paddingLeft: "20px", 
        lineHeight: "2", 
        marginBottom: "40px",
        fontSize: "1rem"
      }}>
        {acts.map((act, idx) => (
          <li key={idx} style={{ marginBottom: "6px" }}>
            <a 
              href={act.link} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: "#3182ce",
                textDecoration: "none",
                fontWeight: "500",
                transition: "color var(--transition-fast)"
              }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = "underline";
                e.target.style.color = "var(--secondary-color)";
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = "none";
                e.target.style.color = "#3182ce";
              }}
            >
              {act.name}
            </a>
          </li>
        ))}
      </ul>

      {/* Rules Section */}
      <h2 style={{ 
        color: "var(--primary-color)",
        fontSize: "1.8rem",
        fontWeight: "700",
        marginBottom: "20px",
        borderBottom: "2px solid var(--border-color)",
        paddingBottom: "8px"
      }}>
        Rules
      </h2>
      <ul style={{ 
        paddingLeft: "20px", 
        lineHeight: "2", 
        marginBottom: "30px",
        fontSize: "1rem"
      }}>
        {rules.map((rule, idx) => (
          <li key={idx} style={{ marginBottom: "6px" }}>
            <a 
              href={rule.link} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: "#3182ce",
                textDecoration: "none",
                fontWeight: "500",
                transition: "color var(--transition-fast)"
              }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = "underline";
                e.target.style.color = "var(--secondary-color)";
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = "none";
                e.target.style.color = "#3182ce";
              }}
            >
              {rule.name}
            </a>
          </li>
        ))}
      </ul>
    </InnerPageLayout>
  );
}
