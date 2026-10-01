/**
 * Which method was used in which project. Shown as a matrix under Selected
 * work. Keep the slugs in sync with data/projects.ts.
 */

export interface MethodRow {
  method: string;
  /** Short explanation, shown on hover and to screen readers. */
  description: string;
  /** Slugs of the case studies where this method was used. */
  usedIn: string[];
}

export const methodMatrix: MethodRow[] = [
  {
    method: "Problem analysis (6W)",
    description: "Defining and bounding the actual problem before looking for answers.",
    usedIn: ["unive", "nedap-livestock-management", "duo", "dutch-national-police", "geniuz"],
  },
  {
    method: "Stakeholder analysis",
    description: "Mapping who decides, who is affected and whose support the advice needs.",
    usedIn: ["unive", "nedap-livestock-management", "duo", "dutch-national-police", "geniuz"],
  },
  {
    method: "Survey research",
    description: "Testing how a problem is actually experienced, instead of assuming it.",
    usedIn: ["unive", "nedap-livestock-management", "geniuz"],
  },
  {
    method: "IST-SOLL analysis",
    description: "Comparing the current and the intended situation to find the gap.",
    usedIn: ["duo", "geniuz"],
  },
  {
    method: "Benchmarking",
    description: "Checking how comparable organisations arranged the same thing.",
    usedIn: ["duo", "geniuz"],
  },
  {
    method: "Risk analysis & clustering",
    description: "Scoring risks on probability and impact, then grouping them to find the structural ones.",
    usedIn: ["duo", "geniuz"],
  },
  {
    method: "Multi-criteria decision analysis",
    description: "Comparing alternatives against weighted criteria, so a choice can be followed and challenged.",
    usedIn: ["unive", "nedap-livestock-management", "dutch-national-police", "geniuz"],
  },
  {
    method: "Change management (ADKAR)",
    description: "Structuring a change around the people who have to work differently.",
    usedIn: ["unive", "duo", "geniuz"],
  },
  {
    method: "Process improvement",
    description: "Redesigning how work runs between teams, roles and systems.",
    usedIn: ["dutch-national-police", "geniuz"],
  },
  {
    method: "AI & automation analysis",
    description: "Finding where AI or automation realistically helps inside a process.",
    usedIn: ["nedap-livestock-management", "geniuz"],
  },
  {
    method: "Cost analysis",
    description: "Putting a price next to the advice, so it can be weighed on feasibility.",
    usedIn: ["unive", "nedap-livestock-management", "dutch-national-police", "geniuz"],
  },
];
