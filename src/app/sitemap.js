export default async function sitemap() {
  const baseUrl = "https://cachintankakkad.in";

  // Core static & service routes with tailored SEO priorities
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/about", priority: 0.85, changeFrequency: "monthly" },
    { path: "/team", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/audit-assurance", priority: 0.95, changeFrequency: "weekly" },
    { path: "/services/gst", priority: 0.95, changeFrequency: "weekly" },
    { path: "/services/income-tax", priority: 0.95, changeFrequency: "weekly" },
    { path: "/services/business-finance-loan", priority: 0.95, changeFrequency: "weekly" },
    { path: "/services/consultancy", priority: 0.9, changeFrequency: "weekly" },
    { path: "/services/accounting-outsourcing", priority: 0.9, changeFrequency: "weekly" },
    { path: "/calculators", priority: 0.85, changeFrequency: "weekly" },
    { path: "/useful-links", priority: 0.8, changeFrequency: "weekly" },
    { path: "/acts-rules", priority: 0.75, changeFrequency: "monthly" },
    { path: "/forms", priority: 0.8, changeFrequency: "weekly" },
    { path: "/cpe-status", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { path: "/enquiry", priority: 0.85, changeFrequency: "monthly" },
    { path: "/empanelment", priority: 0.85, changeFrequency: "monthly" },
    { path: "/vision", priority: 0.7, changeFrequency: "monthly" },
    { path: "/mission", priority: 0.7, changeFrequency: "monthly" },
    { path: "/career", priority: 0.75, changeFrequency: "monthly" },
    { path: "/sitemap", priority: 0.85, changeFrequency: "weekly" },
    { path: "/privacy-policy", priority: 0.5, changeFrequency: "yearly" },
    { path: "/disclaimer", priority: 0.5, changeFrequency: "yearly" },
  ];

  const staticEntries = routes.map((item) => ({
    url: `${baseUrl}${item.path}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  // Dynamically include key verified news & circular article pages for fresh search indexing
  const verifiedNewsLinks = [
    "https://www.casansaar.com/news-gst/gst-council-clarifies-basis-for-comparing-gst-revenue-growth-figures/14789.html",
    "https://www.casansaar.com/news-fema/fema-case-18-locations-searched-by-ed-in-karnataka-maharashtra/14787.html",
    "https://www.casansaar.com/news-sebi/sebi-revises-commodity-derivatives-position-limits-and-penalty-framework/14785.html",
    "https://www.casansaar.com/news-icai/icai-releases-nri-residential-status-handbook-covering-income-tax-and-fema-rules/14783.html",
    "https://www.casansaar.com/news-income-tax/itat-allows-tax-regime-correction-after-consultants-error-led-to-rs123-lakh-tax-demand/14779.html",
    "https://www.casansaar.com/news-mca/mca-registers-firs-in-rs7383-crore-overseas-remittance-case-involving-companies-cas/14772.html",
  ];

  const dynamicNewsEntries = verifiedNewsLinks.map((link) => ({
    url: `${baseUrl}/news-events/detail?url=${encodeURIComponent(link)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const dynamicNotificationEntries = verifiedNewsLinks.map((link) => ({
    url: `${baseUrl}/notifications/detail?url=${encodeURIComponent(link)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...dynamicNewsEntries, ...dynamicNotificationEntries];
}
