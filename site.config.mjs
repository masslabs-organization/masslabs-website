export const siteConfig = {
  siteName: "MassLabs",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://masslabs.info",
  contactEmail: process.env.CONTACT_EMAIL || "info@masslabs.info",
  location: {
    tr: "İzmir, Türkiye",
    en: "Izmir, Türkiye"
  },
  socialLinks: {
    github: "https://github.com/masslabs-organization",
    linkedin: "",
    x: "",
    instagram: "",
    medium: ""
  },
  projectLinks: {
    pma: "",
    reviewAi: ""
  },
  archivedProjectName: "Get Clow Clow",
  founders: [
    { name: "", role: "Co-Founder", bio: { tr: "", en: "" } },
    { name: "Ahmet", role: "Co-Founder", bio: { tr: "", en: "" } }
  ],
  legal: {
    companyName: "MassLabs",
    address: "",
    dataControllerName: "MassLabs",
    lastUpdated: "2026-07-30"
  },
  analyticsId: process.env.NEXT_PUBLIC_GA_ID || ""
};
