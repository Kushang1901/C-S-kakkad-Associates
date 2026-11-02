export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Google Favicon",
          "Bingbot",
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Google-Extended",
          "Applebot",
          "Applebot-Extended",
          "CCBot",
          "Meta-ExternalAgent",
        ],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://cachintankakkad.in/sitemap.xml",
    host: "https://cachintankakkad.in",
  };
}
