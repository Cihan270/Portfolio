/**
 * Global site settings: identity, contact details, SEO and navigation.
 * Change values here and they update everywhere on the site.
 */

export const site = {
  name: "Remzi Cihan Uz",
  /** Used in <title>, Open Graph and the footer. */
  title: "Remzi Cihan Uz — Business IT & Technology Consulting",
  description:
    "Business IT & Management student focused on technology consulting, business analysis, enterprise architecture, digital transformation and AI.",
  positioning: [
    "Business IT & Management",
    "Technology Consulting",
    "Business Analysis",
  ],
  discipline: "Business IT & Management",
  location: "Apeldoorn, Netherlands",

  /**
   * Public URL of the deployed site, used for canonical URLs, the sitemap
   * and Open Graph. Set NEXT_PUBLIC_SITE_URL in Vercel once you know your
   * domain. The fallback is only a placeholder.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://remzicihanuz.vercel.app").replace(/\/$/, ""),

  email: "remzicihan.uz@gmail.com",
  linkedin: "https://www.linkedin.com/in/remzicihanuz",
  /** Own company, linked from the hero, experience and the Geniuz case. */
  venture: { name: "Geniuz", href: "https://geniuzaic.com/nl", label: "geniuzaic.com" },

  /**
   * The CV file lives in /public. To replace it, overwrite
   * public/Remzi-Cihan-Uz-CV.pdf with a file of the same name.
   */
  cvPath: "/Remzi-Cihan-Uz-CV.pdf",

  /** Availability line shown in the hero and graduation section. */
  status: "Looking for a graduation internship / thesis assignment — February 2027",

  /**
   * Portrait. Set to e.g. { src: "/images/portrait.jpg", alt: "Portrait of Remzi Cihan Uz" }
   * after placing the file in public/images. Leave null to show the monogram card.
   */
  /** Photo in the hero. Files: public/images/portrait-{600,900}.webp */
  portrait: {
    base: "/images/portrait",
    widths: [600, 900],
    alt: "Remzi Cihan Uz",
  } as null | { base: string; widths: number[]; alt: string },

  /**
   * Full-bleed band under the hero with the cursor-driven scratch reveal.
   * `top` is shown first; scratching it away reveals `bottom`.
   * Set enabled: false to remove the band. `label` can be emptied, but the
   * images are AI-generated illustrations, not photographs of me.
   */
  heroBanner: {
    enabled: true,
    /** Widths available in /public/images. The largest is the source quality. */
    widths: [800, 1200, 1600, 2000],
    top: "/images/hero-plain",
    bottom: "/images/hero-tech",
    /** Width / height of the source images, used for the band's aspect ratio. */
    ratio: 2000 / 833,
    alt: "Illustration of a person at a laptop, surrounded by code, diagrams and data panels",
    label: "AI-generated illustration",
  },
} as const;

export interface NavItem {
  label: string;
  href: string;
  /** Section id on the homepage, used for the active state. */
  section?: string;
  download?: boolean;
}

export const navItems: NavItem[] = [
  { label: "Experience", href: "/#experience", section: "experience" },
  { label: "Work", href: "/#work", section: "work" },
  { label: "Graduation", href: "/#graduation", section: "graduation" },
  { label: "CV", href: site.cvPath, download: true },
  { label: "Contact", href: "/#contact", section: "contact" },
];

export const mailto = `mailto:${site.email}`;
