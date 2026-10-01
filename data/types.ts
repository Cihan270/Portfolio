/**
 * Shared content types. Every piece of copy on the site is typed here so
 * that editing a data file gives you autocomplete and compile-time checks.
 */

/** Which abstract diagram to render for a case. See components/visuals. */
export type CaseVisualKey = "unive" | "nedap" | "duo" | "police" | "geniuz";

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ContentBlock {
  heading: string;
  /** One string per paragraph. */
  body: string[];
}

export interface CaseStudy {
  /** URL segment: /work/<slug> */
  slug: string;
  organization: string;
  /** Optional clarifying line under the organization name. */
  organizationNote?: string;
  category: string;
  year: string;
  role: string;
  /** Optional team description, e.g. "Group of 5 student consultants". */
  team?: string;
  /** Optional public website, shown on the case page and card. */
  website?: { label: string; href: string };
  /**
   * "academic" renders the Windesheim disclaimer. "venture" is for own
   * companies such as Geniuz.
   */
  context: {
    type: "academic" | "venture";
    label: string;
  };
  /** Short description used on the homepage card. */
  summary: string;
  /** One-line result shown at the bottom of the card. */
  cardOutcome: { label: string; text: string };
  topics: string[];
  visual: CaseVisualKey;
  /** Shows the confidentiality note on the case page. */
  confidential: boolean;

  challenge: string[];
  roleDescription: string[];
  approach: ProcessStep[];
  methods: string[];
  /**
   * Number of alternatives compared in an MCDA. When set, an illustrative
   * (score-free) evaluation matrix is shown in the analysis section.
   */
  mcdaAlternatives?: number;
  analysis: ContentBlock[];
  outcome: {
    /** Section title, e.g. "Recommendation" or "Where it stands". */
    heading: string;
    summary: string;
    points: string[];
    /**
     * Makes explicit what kind of outcome this is, so an advisory
     * recommendation is never mistaken for an implemented result.
     */
    status: string;
  };
  /** Leave empty to hide the section. Only list what you actually delivered. */
  deliverables: string[];
  learnings: ContentBlock[];
  /**
   * Open questions / missing details. Rendered as dashed boxes in
   * development only (`npm run dev`), never in production.
   */
  todos?: string[];
}

export interface OtherProject {
  organization: string;
  category: string;
  year: string;
  /** Optional one-liner. Leave undefined until you have written it. */
  description?: string;
}

export interface ExperienceItem {
  organization: string;
  website?: string;
  role: string;
  period: string;
  description: string;
  responsibilities: string[];
  /** De-emphasised entries render smaller. */
  emphasis: "primary" | "secondary";
}

export interface EducationItem {
  institution: string;
  shortName: string;
  programme: string;
  period: string;
  location: string;
  note?: string;
  courses?: string[];
  activities?: string[];
  /** Start / end as decimal years for the journey chart (e.g. 2026.0 = Jan 2026). */
  start: number;
  end: number;
  /** true = still running / expected end. */
  ongoing: boolean;
}

export interface ToolkitCategory {
  title: string;
  items: string[];
}
