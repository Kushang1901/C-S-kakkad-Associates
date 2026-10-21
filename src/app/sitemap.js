export default function sitemap() {
  const baseUrl = "https://www.cachintankakkad.in";

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/vision", priority: 0.7, changeFrequency: "monthly" },
    { path: "/mission", priority: 0.7, changeFrequency: "monthly" },
    { path: "/team", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services/accounting-outsourcing", priority: 0.9, changeFrequency: "weekly" },
    { path: "/services/audit-assurance", priority: 0.9, changeFrequency: "weekly" },
    { path: "/services/business-finance-loan", priority: 0.9, changeFrequency: "weekly" },
    { path: "/services/consultancy", priority: 0.9, changeFrequency: "weekly" },
    { path: "/services/gst", priority: 0.9, changeFrequency: "weekly" },
    { path: "/services/income-tax", priority: 0.9, changeFrequency: "weekly" },
    { path: "/calculators", priority: 0.8, changeFrequency: "weekly" },
    { path: "/useful-links", priority: 0.7, changeFrequency: "weekly" },
    { path: "/acts-rules", priority: 0.7, changeFrequency: "monthly" },
    { path: "/forms", priority: 0.8, changeFrequency: "weekly" },
    { path: "/cpe-status", priority: 0.6, changeFrequency: "monthly" },
    { path: "/news-events", priority: 0.8, changeFrequency: "daily" },
    { path: "/notifications", priority: 0.8, changeFrequency: "daily" },
    { path: "/career", priority: 0.7, changeFrequency: "monthly" },
    { path: "/enquiry", priority: 0.8, changeFrequency: "monthly" },
    { path: "/empanelment", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.5, changeFrequency: "yearly" },
    { path: "/disclaimer", priority: 0.5, changeFrequency: "yearly" },
  ];

  return routes.map((item) => ({
    url: `${baseUrl}${item.path}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));
}
