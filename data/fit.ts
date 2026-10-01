/**
 * The assignment fit check: a small multi-criteria decision analysis that the
 * visitor can operate. They weight what their assignment needs; the model
 * scores how well that matches this profile.
 *
 * `score` is an honest self-assessment on a 1–5 scale, reflecting both
 * experience so far and the direction of specialisation. Keep it that way:
 * the model is only credible because it also admits what is not a fit.
 */

export interface FitCriterion {
  id: string;
  label: string;
  /** What this criterion covers, shown under the label. */
  description: string;
  /** 1 = not my ground, 5 = core of what I do. */
  score: number;
  /** Where that score comes from. */
  evidence: string;
}

export const fitCriteria: FitCriterion[] = [
  {
    id: "process",
    label: "Business process analysis",
    description: "Mapping how work runs today and where it breaks down.",
    score: 5,
    evidence: "Core of every consulting project so far, and of the work at Geniuz.",
  },
  {
    id: "requirements",
    label: "Business analysis & requirements",
    description: "Turning a vague question into something decidable.",
    score: 5,
    evidence: "Problem analysis and requirements work in all five projects.",
  },
  {
    id: "research",
    label: "Research & advisory work",
    description: "Thesis-level research ending in a written recommendation.",
    score: 5,
    evidence: "Five advisory reports, each with research design, analysis and advice.",
  },
  {
    id: "architecture",
    label: "Enterprise architecture & IT governance",
    description: "Coherence of the landscape, roles, decision rights.",
    score: 4,
    evidence: "Univé (architecture in feature teams) and DUO (governance and roles).",
  },
  {
    id: "change",
    label: "Organisational change & adoption",
    description: "Getting a decision adopted by the people it affects.",
    score: 4,
    evidence: "ADKAR implementation plan at Univé, mitigation measures at DUO.",
  },
  {
    id: "ai",
    label: "AI & automation in processes",
    description: "Finding where AI or automation realistically helps.",
    score: 4,
    evidence: "Geniuz, the Copilot search advice at Nedap, AI data analysis at Appbakkers.",
  },
  {
    id: "stakeholders",
    label: "Stakeholder & client-facing work",
    description: "Interviews, workshops, presenting advice to a client.",
    score: 4,
    evidence: "Client sessions in every project; acquisition and client meetings at Geniuz.",
  },
  {
    id: "data",
    label: "Data analysis & reporting",
    description: "Working with data to support a decision.",
    score: 3,
    evidence: "SQL and Python, survey analysis, AI data analysis project.",
  },
  {
    id: "lowcode",
    label: "Low-code / application build",
    description: "Building working applications in a platform.",
    score: 3,
    evidence: "Mendix Certified Rapid Developer, OutSystems, freelance web development.",
  },
  {
    id: "engineering",
    label: "Deep software engineering & infrastructure",
    description: "Backend architecture, pipelines, networks, systems administration.",
    score: 2,
    evidence: "Java, PHP and Python at programme level — not where I specialise.",
  },
];

export interface FitPreset {
  label: string;
  /** Importance per criterion id, 0 (irrelevant) to 5 (decisive). */
  weights: Record<string, number>;
}

export const fitPresets: FitPreset[] = [
  {
    label: "Graduation assignment",
    weights: {
      research: 5,
      process: 4,
      requirements: 4,
      architecture: 3,
      change: 3,
      stakeholders: 3,
      ai: 2,
      data: 2,
      lowcode: 0,
      engineering: 0,
    },
  },
  {
    label: "Business analyst",
    weights: {
      requirements: 5,
      process: 5,
      stakeholders: 4,
      data: 3,
      change: 3,
      research: 2,
      architecture: 2,
      ai: 1,
      lowcode: 1,
      engineering: 0,
    },
  },
  {
    label: "Technology consultant",
    weights: {
      architecture: 4,
      process: 4,
      change: 4,
      stakeholders: 4,
      ai: 3,
      requirements: 3,
      research: 3,
      data: 2,
      lowcode: 1,
      engineering: 1,
    },
  },
  {
    label: "AI & automation",
    weights: {
      ai: 5,
      process: 4,
      requirements: 3,
      data: 3,
      stakeholders: 2,
      change: 2,
      research: 2,
      lowcode: 2,
      architecture: 1,
      engineering: 1,
    },
  },
  {
    label: "Software engineering",
    weights: {
      engineering: 5,
      lowcode: 4,
      data: 2,
      requirements: 1,
      process: 1,
      architecture: 0,
      change: 0,
      ai: 0,
      research: 0,
      stakeholders: 0,
    },
  },
];

export interface FitBand {
  /** Lower bound on the 0–10 scale, inclusive. */
  min: number;
  title: string;
  body: string;
  /** Shows the email button. */
  invite: boolean;
}

/** Ordered from high to low. */
export const fitBands: FitBand[] = [
  {
    min: 7.5,
    title: "Strong fit",
    body: "This is the kind of assignment I am looking for. Most of what it asks for is work I have done in my consulting projects. I would like to hear more about it.",
    invite: true,
  },
  {
    min: 5.5,
    title: "Worth a conversation",
    body: "A good part of this assignment sits in my work. The rest I would need to grow into, which is fine for a graduation assignment — let's talk through the details.",
    invite: true,
  },
  {
    min: 3.5,
    title: "Partial fit",
    body: "There is real overlap, but this assignment leans on areas that are not my strongest side. Tell me what matters most in it and I will give you an honest answer about whether I am the right person.",
    invite: false,
  },
  {
    min: 0,
    title: "Probably not the right match",
    body: "Honestly: this leans mostly on work I do not specialise in. I would rather say that now than halfway through an assignment. If the emphasis shifts toward analysis, architecture or process work, I would be glad to talk.",
    invite: false,
  },
];

export const fitCopy = {
  eyebrow: "Fit check",
  title: "Does your assignment fit?",
  intro:
    "Multi-criteria decision analysis is the method I used at Univé, Nedap and the Dutch National Police to compare alternatives. Here it is, applied to my own search: set how much each area matters in your assignment and the model scores the match.",
  note: "Criteria scores are my own assessment of my experience and the direction I want to specialise in. Nothing is sent anywhere — the calculation runs in your browser.",
};
