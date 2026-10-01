import type { EducationItem, ExperienceItem, ToolkitCategory } from "./types";

/* ------------------------------------------------------------------ */
/* Hero                                                               */
/* ------------------------------------------------------------------ */

/** Text on top of the image band at the very top of the page. */
export const heroOverlay = {
  role: "Business IT & Management",
  heading: "I solve problems where business meets technology.",
  sub: "Technology consulting · Business analysis · Enterprise architecture",
  primary: { label: "View work", href: "/#work" },
  secondary: { label: "About me", href: "/#experience" },
  contact: { label: "Get in touch", href: "/#contact" },
};

export const hero = {
  statement: "I solve problems where business meets technology.",
  /** Cycles slowly in the hero. Keep it short: one word each. */
  focusWords: ["Processes.", "Architecture.", "AI.", "Transformation."],
  intro:
    "I am a Business IT & Management student at Windesheim University of Applied Sciences and a pre-master student in Business Information Technology at the University of Twente. I work on challenges involving business processes, enterprise architecture, digital transformation and AI.",
};

/**
 * The recurring "how I work" motif: Business → Analysis → Technology → Change.
 */
export const workingModel = [
  {
    label: "Business",
    description: "Start from the organization: its goals, processes and the question behind the question.",
  },
  {
    label: "Analysis",
    description: "Make the problem explicit — stakeholders, risks, options and the criteria to judge them by.",
  },
  {
    label: "Technology",
    description: "Choose technology that fits the problem, not the other way around.",
  },
  {
    label: "Change",
    description: "Translate the choice into an approach people can adopt, with its costs in view.",
  },
];

/* ------------------------------------------------------------------ */
/* Experience                                                         */
/* ------------------------------------------------------------------ */

export const experience: ExperienceItem[] = [
  {
    organization: "Geniuz",
    website: "https://geniuzaic.com/nl",
    role: "Co-founder",
    period: "April 2026 – Present",
    description: "AI consultancy for SMEs.",
    responsibilities: [
      "Analyze business processes and identify opportunities for AI and automation.",
      "Translate business needs into practical AI and automation solutions.",
      "Contribute to client acquisition, client meetings and the positioning of the consultancy.",
    ],
    emphasis: "primary",
  },
  {
    organization: "Self-employed",
    role: "Freelance Web Developer",
    period: "February 2024 – June 2026",
    description:
      "Delivered websites and web applications for clients, from requirements analysis through implementation.",
    responsibilities: [],
    emphasis: "secondary",
  },
];

/* ------------------------------------------------------------------ */
/* Consulting toolkit                                                 */
/* ------------------------------------------------------------------ */

export const toolkit: ToolkitCategory[] = [
  {
    title: "Strategy & Analysis",
    items: [
      "Business Process Management",
      "Requirements Analysis",
      "Data Analysis",
      "Stakeholder Management",
      "Process Modeling",
    ],
  },
  {
    title: "Architecture & Transformation",
    items: ["Enterprise Architecture", "Organizational Change", "SAFe / Agile", "Digital Transformation"],
  },
  {
    title: "Methods",
    items: ["Multi-Criteria Decision Analysis", "ADKAR", "Business Analysis", "Cost Analysis"],
  },
  {
    title: "Technology",
    items: ["Python", "SQL", "Mendix", "OutSystems", "Java", "PHP"],
  },
];

export const certifications = [{ name: "Mendix Certified Rapid Developer", issuer: "Mendix Academy" }];

/* ------------------------------------------------------------------ */
/* Education                                                          */
/* ------------------------------------------------------------------ */

export const education: EducationItem[] = [
  {
    institution: "Windesheim University of Applied Sciences",
    shortName: "Windesheim",
    programme: "HBO-ICT — Business IT & Management",
    period: "2023 – 2027 (expected)",
    location: "Zwolle, Netherlands",
    note: "Applied Business IT: processes, architecture and consulting projects for real organizations.",
    start: 2023.67,
    end: 2027.5,
    ongoing: true,
  },
  {
    institution: "Widener University",
    shortName: "Widener",
    programme: "Study Abroad — Computer Science & Management",
    period: "January 2026 – July 2026",
    location: "Chester, Pennsylvania, USA",
    courses: ["Introduction to AI", "Data Structures & Algorithms", "International Business"],
    start: 2026.0,
    end: 2026.55,
    ongoing: false,
  },
  {
    institution: "University of Twente",
    shortName: "Twente",
    programme: "Pre-master Business Information Technology",
    period: "September 2026 – Present",
    location: "Enschede, Netherlands",
    note: "English-taught university-level programme.",
    start: 2026.67,
    end: 2027.5,
    ongoing: true,
  },
];

/* ------------------------------------------------------------------ */
/* Graduation                                                         */
/* ------------------------------------------------------------------ */

export const graduation = {
  heading: "Looking for a graduation challenge",
  intro:
    "I am looking for an HBO-ICT graduation internship / thesis assignment where I can research a real business and technology challenge and translate the findings into actionable recommendations.",
  /** Shown as quick facts next to the intro. */
  facts: [
    { label: "Type", value: "Graduation internship / thesis assignment" },
    { label: "Programme", value: "HBO-ICT — Business IT & Management" },
    { label: "Start", value: "February 2027" },
    { label: "Based in", value: "Apeldoorn, Netherlands" },
  ],
  interests: [
    "AI adoption & governance",
    "Business process automation",
    "Digital transformation",
    "Enterprise architecture",
    "IT governance",
    "AI in knowledge management",
    "Business analysis",
    "Technology strategy",
  ],
};

/* ------------------------------------------------------------------ */
/* Contact                                                            */
/* ------------------------------------------------------------------ */

export const contact = {
  heading: "Let’s work on something meaningful.",
  body: "Whether it is a graduation research challenge, consulting opportunity or conversation about business and technology, feel free to reach out.",
};
