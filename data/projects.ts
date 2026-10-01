import type { CaseStudy, OtherProject } from "./types";

/**
 * Case studies, based on the advisory reports written for each project.
 *
 * Content rules used for this file:
 * - Facts come from the project reports only. Nothing about results,
 *   stakeholders or implementation has been added.
 * - No names of client contacts, team members or internal departments, and no
 *   budgets, prices, scores or client metrics: method and reasoning only.
 * - Recommendations are labelled as recommendations, not outcomes.
 * - Anything unknown is listed under `todos` (visible in `npm run dev` only).
 */

const ACADEMIC = {
  type: "academic",
  label: "Academic consulting project — Windesheim University of Applied Sciences",
} as const;

const TEAM = "Five-person student consultancy team";

export const caseStudies: CaseStudy[] = [
  {
    slug: "unive",
    organization: "Univé",
    category: "Enterprise Architecture",
    year: "2025",
    role: "Enterprise Architecture Consultant",
    context: ACADEMIC,
    team: TEAM,
    summary:
      "Investigated how architecture knowledge could be embedded within feature teams and evaluated alternative implementation approaches.",
    cardOutcome: { label: "Advice", text: "Embed architecture through an ADKAR programme" },
    topics: ["Enterprise Architecture", "MCDA", "Change Management", "ADKAR"],
    visual: "unive",
    confidential: true,
    challenge: [
      "A reorganisation moved the architects out of the feature teams and into a central architecture office. The teams kept delivering, but the reason behind the architectural principles travelled with the architects.",
      "What followed was a gap between architecture and day-to-day delivery: teams began to interpret architecture in their own way, which made the way of working inconsistent and complicated the planned move to SAFe value streams. The research question: how can the organisation make working under architecture clear again for the feature teams, now that architects are no longer part of them?",
    ],
    roleDescription: [
      "I worked on this assignment as Enterprise Architecture Consultant in a five-person student consultancy team at Windesheim.",
      "The work ran from problem definition to final advice: analysing the problem, surveying both architects and feature team members, drawing up four alternatives, weighing them in a multi-criteria decision analysis, and working the preferred direction out into an ADKAR implementation plan with phasing and a cost estimate.",
    ],
    approach: [
      {
        title: "Understand",
        description:
          "Define the problem with the 6W method and map the stakeholders: who decides, who is affected and who has to work differently.",
      },
      {
        title: "Analyze",
        description:
          "Survey architects and feature team members to find out how architecture is experienced in daily work, and what changed after the split.",
      },
      {
        title: "Evaluate alternatives",
        description:
          "Compare four directions in a multi-criteria decision analysis, using criteria and weights set together with the client.",
      },
      {
        title: "Recommend",
        description:
          "Advise change management, and select ADKAR as the model that fits a problem of awareness and behaviour.",
      },
      {
        title: "Implementation considerations",
        description:
          "Translate the model into five phases with concrete activities, an estimated duration per phase and a cost estimate.",
      },
    ],
    methods: [
      "Enterprise Architecture",
      "Problem analysis (6W)",
      "Stakeholder Analysis",
      "Survey research",
      "Multi-Criteria Decision Analysis",
      "ADKAR",
      "Change Management",
      "Cost Analysis",
    ],
    mcdaAlternatives: 4,
    analysis: [
      {
        heading: "The problem turned out not to be technical",
        body: [
          "The assignment arrived as an architecture question, and it would have been easy to answer it with architecture: more documentation, clearer principles, a better repository. The survey pointed elsewhere. Teams were not failing to apply architecture because they could not; they were not applying it because the awareness, the motivation and the knowledge had left the team along with the architects.",
          "That turns the question into a behavioural one. It is a different kind of problem, and it rules out a whole class of answers that look productive but change nothing about what people do on a Tuesday afternoon.",
        ],
      },
      {
        heading: "Four directions, deliberately far apart",
        body: [
          "The alternatives were chosen to cover genuinely different responses, not variations on one idea: keep the current situation as a baseline; knowledge sessions combined with monthly alignment sessions; a change management programme; or an architecture ambassador inside each feature team.",
          "Including the current situation as a formal alternative matters. It forces the question of what happens if nothing is done — in this case persistent inconsistency and a harder transition to SAFe — and it gives every other option something concrete to be measured against.",
        ],
      },
      {
        heading: "Weighing: what the client actually valued",
        body: [
          "The criteria and their weights were set together with the client, which is where a multi-criteria analysis earns its keep. Accessibility weighed heaviest: a solution that teams find too complex is never adopted, and then its quality on paper is irrelevant. Measurability came next, so progress could be steered on, followed by impact on the gap between architects and teams, and flexibility, because the organisation was still changing.",
          "Cost carried the lowest weight. The client stated that lasting improvement mattered more than price — worth recording explicitly, because it explains why the most thorough option was not disqualified by its budget.",
        ],
      },
      {
        heading: "From a choice to something people adopt",
        body: [
          "Change management scored highest because it addresses the behavioural core rather than its symptoms. Within that direction, ADKAR fits the problem closely: its five steps — Awareness, Desire, Knowledge, Ability, Reinforcement — run exactly along the chain that had broken.",
          "The implementation plan gives each phase its own activities and an estimated duration, from a kick-off explaining why architecture matters for the move to SAFe, through workshops and training, to coaching inside running projects and a reinforcement phase with monthly evaluation. The last phase is the longest, which is the honest part: behaviour that is not reinforced quietly reverts.",
        ],
      },
    ],
    outcome: {
      heading: "Recommendation",
      summary:
        "Address the gap as a change problem: embed architecture awareness in the feature teams through an ADKAR-based programme, phased over roughly three to four months.",
      points: [
        "Change management selected from four alternatives through a multi-criteria decision analysis.",
        "ADKAR chosen as the model, because the problem is one of awareness, motivation and knowledge rather than technology.",
        "Implementation worked out per phase, with activities, estimated effort and a cost estimate.",
        "Explicitly aligned with the organisation's planned transition to SAFe value streams.",
      ],
      status:
        "Advisory recommendation delivered as part of an academic consulting project. This page does not describe an implemented outcome.",
    },
    deliverables: [
      "Problem and stakeholder analysis",
      "Survey among architects and feature teams",
      "Four elaborated alternatives",
      "MCDA with criteria weighted together with the client",
      "ADKAR implementation plan with phasing",
      "Cost estimate",
      "Advisory report",
    ],
    learnings: [
      {
        heading: "Take the question apart before answering it",
        body: [
          "An architecture question does not always have an architecture answer. Testing what people actually experienced, instead of accepting the problem as it was handed to us, changed the direction of the entire advice.",
        ],
      },
      {
        heading: "A method is a conversation tool",
        body: [
          "Setting the criteria and weights with the client did more than produce a score. It made the client's priorities explicit before any option was judged, which is what made the outcome defensible to people who were not in the room.",
        ],
      },
      {
        heading: "Adoption is part of the design",
        body: [
          "Working through ADKAR changed how I look at recommendations. An answer nobody adopts is not a finished answer, so the implementation path deserves as much attention as the choice itself.",
        ],
      },
    ],
    todos: [
      "Optional: describe your own contribution within the team more specifically (e.g. survey, MCDA, implementation plan).",
    ],
  },
  {
    slug: "nedap-livestock-management",
    organization: "Nedap Livestock Management",
    category: "IT & Knowledge Management",
    year: "2025",
    role: "IT & Knowledge Consultant",
    context: ACADEMIC,
    team: TEAM,
    summary:
      "Analyzed internal information provision and evaluated solution alternatives to improve access to organizational knowledge.",
    cardOutcome: { label: "Advice", text: "One environment with AI-supported search" },
    topics: ["Knowledge Management", "Microsoft 365", "Copilot", "Information Analysis"],
    visual: "nedap",
    confidential: true,
    challenge: [
      "Information inside the organisation had grown organically across intranet, chat, planning documents and loose files. Employees across commerce, operations and research and development were losing time every day working out where a document lived and which version was current.",
      "The research question: how can internal information provision be improved so that employees find and consult the right information faster — with support where useful?",
    ],
    roleDescription: [
      "I worked on this assignment as IT & Knowledge Consultant in a five-person student consultancy team at Windesheim.",
      "The work covered the analysis of the current information provision, a survey among employees, identifying the bottlenecks, and the evaluation of three solution directions in a multi-criteria decision analysis — ending in an advisory report with practical recommendations and a phased implementation plan.",
    ],
    approach: [
      {
        title: "Understand",
        description:
          "Define the problem with the 6W method, map the stakeholders and set objectives with the client.",
      },
      {
        title: "Analyze",
        description:
          "Survey employees about their needs and experiences, and map the system landscape and the workflow around creating, storing and sharing documents.",
      },
      {
        title: "Diagnose",
        description:
          "Translate the findings into concrete bottlenecks in finding, storing and sharing information.",
      },
      {
        title: "Evaluate alternatives",
        description:
          "Weigh three solution directions in an MCDA, with criteria prioritised using MoSCoW.",
      },
      {
        title: "Recommend",
        description:
          "Advise practical agreements first, then an integrated environment with AI search on top, in a phased plan.",
      },
    ],
    methods: [
      "Information Analysis",
      "Knowledge Management",
      "Problem analysis (6W)",
      "Stakeholder Analysis",
      "Survey research",
      "MoSCoW",
      "Multi-Criteria Decision Analysis",
      "Microsoft 365",
      "Microsoft 365 Copilot",
    ],
    mcdaAlternatives: 3,
    analysis: [
      {
        heading: "Fragmentation, not a missing tool",
        body: [
          "The survey and the workflow analysis pointed to the same root cause: there was no single agreed route to information. Everyone decided for themselves whether something belonged in chat, on the intranet, on a shared drive, in personal cloud storage or in a collaboration board — so everyone also had to guess where to look.",
          "Several bottlenecks followed from that. There was no standard information flow, so it was unclear where a document should live and which version was current. Files were kept outside the organisation's control on personal storage, which creates risks around loss, access and dependence on individuals. Tools were used for purposes they were never designed for, without version control or access management. And internal agreements and guidelines in particular turned out to be hard to find — which is how strategy quietly stops reaching the work floor.",
        ],
      },
      {
        heading: "Fix the foundation before adding intelligence",
        body: [
          "Part of the advice needed no technology at all, and was deliberately written so it could be adopted regardless of which alternative was chosen: one document template, one file naming convention, one obligatory storage location, and a clear division between internal collaboration and external correspondence.",
          "This mattered for the technical choice as well. AI search can only surface what it can reach and interpret, so a search layer on top of an unstructured, partly private document landscape would mostly produce confident answers from the wrong sources.",
        ],
      },
      {
        heading: "Three directions, weighed on findability first",
        body: [
          "The alternatives were an AI that automatically classifies and tags documents; a document management system as a control layer for versioning, access and archiving; and an integrated environment with AI-supported search in natural language.",
          "Findability carried the heaviest weight — it was the core problem — followed by ease of use, because the client's precondition was that the solution must not add extra work. Integration with the existing Microsoft environment, implementation time and cost completed the set. Tagging improves findability but depends on document quality and loses value when files are scattered. A document management system scores on structure and compliance, but adds a separate system to learn and does not fit the existing environment well. The integrated environment with natural-language search scored highest because it removes the need for employees to know where anything is stored.",
        ],
      },
      {
        heading: "An implementation in the right order",
        body: [
          "The roadmap deliberately puts the agreements first and the technology last: agree the standards, set up the environment accordingly, clean up the existing documentation, and only then introduce the AI search and test it — followed by a continuous phase of guiding people and collecting feedback.",
          "That order is the advice. Introducing search first would have been faster to demonstrate and far less likely to hold.",
        ],
      },
    ],
    outcome: {
      heading: "Recommendation",
      summary:
        "Standardise the foundation — one template, one naming convention, one storage location, clear communication agreements — and add an integrated environment with Microsoft 365 Copilot search on top, so employees can search in natural language instead of searching for locations.",
      points: [
        "Four practical recommendations that can be adopted immediately, independent of the technical choice.",
        "Selected from three evaluated alternatives, weighed on findability, ease of use, integration, implementation time and cost.",
        "Phased implementation plan: agreements, setup, clean-up of existing documentation, AI search, and ongoing support.",
        "Cost estimate based on public list prices for the licences involved.",
      ],
      status:
        "Advisory recommendation delivered as part of an academic consulting project. Whether and how it was implemented is not claimed here.",
    },
    deliverables: [
      "Analysis of internal information provision",
      "Employee survey",
      "Bottleneck analysis of system landscape and workflow",
      "Four practical recommendations",
      "Three elaborated alternatives with MCDA",
      "Phased implementation plan",
      "Cost estimate",
      "Advisory report",
    ],
    learnings: [
      {
        heading: "AI raises the bar for information quality",
        body: [
          "Evaluating an AI search solution made clear that the structure and ownership of the underlying information matter more, not less, once AI enters the picture. The unglamorous part of the advice was the part that made the rest work.",
        ],
      },
      {
        heading: "Separate what is free from what is expensive",
        body: [
          "Splitting the advice into agreements that cost nothing and a solution that costs a licence gave the client something to act on immediately, instead of one all-or-nothing proposal.",
        ],
      },
      {
        heading: "Ask the people doing the work",
        body: [
          "The survey shifted the emphasis of the analysis. What management experiences as an information problem and what employees run into daily are not automatically the same thing.",
        ],
      },
    ],
    todos: [
      "Optional: describe your own contribution within the team more specifically (e.g. survey, bottleneck analysis, MCDA).",
    ],
  },
  {
    slug: "duo",
    organization: "DUO",
    organizationNote: "Education Executive Agency",
    category: "IT Organization & Governance",
    year: "2025",
    role: "IT Organization Consultant",
    context: ACADEMIC,
    team: TEAM,
    summary:
      "Assessed organizational risks related to a transition toward team-oriented ICT management and developed a recommendation for implementation.",
    cardOutcome: { label: "Advice", text: "Start with the CTO Office pilot" },
    topics: ["IT Governance", "Organizational Design", "Risk Analysis", "Transformation"],
    visual: "duo",
    confidential: true,
    challenge: [
      "The ICT organisation was shifting from management organised around disciplines to management organised around teams, with the aim of improving collaboration, agility and ownership within its DevOps teams.",
      "A change like that moves more than boxes on a chart. It changes who decides, who is accountable, who handles people management, and how teams and management relate to each other. The research question: what are the consequences of this shift, and what measures are needed to make it succeed?",
    ],
    roleDescription: [
      "I worked on this assignment as IT Organization Consultant in a five-person student consultancy team at Windesheim.",
      "The work covered mapping the current and intended situation, identifying and weighing the risks of the transition, clustering them, formulating mitigation measures, and assessing which of the organisation's running pilots should be prioritised.",
    ],
    approach: [
      {
        title: "Understand",
        description:
          "Define the problem with the 6W method, map the stakeholders on both sides of the change and set objectives, critical success factors and KPIs.",
      },
      {
        title: "Analyze",
        description:
          "Compare the current and intended organisation in an IST-SOLL analysis and benchmark the intended model against how other organisations arranged it.",
      },
      {
        title: "Assess risk",
        description:
          "Score the identified risks on probability and impact, then cluster them into themes to find the structural ones.",
      },
      {
        title: "Mitigate",
        description:
          "Formulate concrete measures for the heaviest clusters, from governance documentation to phased handover and coaching.",
      },
      {
        title: "Recommend",
        description:
          "Assess which running pilot reduces the heaviest risk, and advise starting there.",
      },
    ],
    methods: [
      "IT Governance",
      "Organizational Design",
      "Risk Analysis",
      "IST-SOLL analysis",
      "Benchmarking",
      "Probability / impact analysis",
      "Stakeholder Analysis",
      "RACI",
      "Change Management",
    ],
    analysis: [
      {
        heading: "Risk as a design input, not a disclaimer",
        body: [
          "A risk assessment is most useful when it shapes the plan rather than being attached to it afterwards. The risks here were collected from three angles — the gap between the current and intended organisation, benchmarks of comparable transitions, and a probability-and-impact scoring — and then used to decide where the change should begin.",
        ],
      },
      {
        heading: "Clustering turns a long list into a decision",
        body: [
          "Individual risks are hard to act on: a list of dozens of them invites a list of dozens of measures. Grouping them into clusters made the pattern visible instead, covering themes such as role clarity and governance, workload, resistance to change, team dynamics, knowledge staying in silos, agility, quality, career identity and scalability.",
          "Three clusters carried the most weight: role ambiguity combined with governance conflicts, workload and overload, and change and resistance.",
        ],
      },
      {
        heading: "Why role ambiguity outweighs the rest",
        body: [
          "Role ambiguity stood out as the structural risk, because it feeds the others. When it is unclear who decides, who owns a subject and who people should turn to, decision-making slows down, unplanned coordination work increases — which raises workload — and uncertainty about one's own role strengthens resistance to the change.",
          "The measures were aimed at that chain: record roles and responsibilities in a governance document, make ownership and decision rights explicit per team with a RACI model, run workshops so the new responsibilities mean the same thing to everyone, hand over responsibilities in phases rather than at once, monitor workload through retrospectives and employee measurements, and support the transition with communication and coaching.",
        ],
      },
      {
        heading: "Choosing a starting point instead of a big bang",
        body: [
          "The organisation already had several pilots running, each touching a different cluster: one bundling supporting expertise to relieve workload, one giving employees a controlled environment to get used to team-oriented working, and the CTO Office pilot, focused on frameworks, standardisation and governance.",
          "Assessing the pilots against the clusters made the choice concrete. The CTO Office pilot addresses the heaviest risk directly, and by removing ambiguity it also reduces unplanned coordination work and uncertainty — so it lowers the other two clusters indirectly. That is why the advice was to prioritise it as the first step, rather than letting the pilots run at equal weight.",
        ],
      },
    ],
    outcome: {
      heading: "Recommendation",
      summary:
        "Prioritise the CTO Office pilot as the first step in the transition, because it removes role ambiguity — the risk that drives most of the others — and creates a stable base for the rest of the change.",
      points: [
        "Risks identified from three angles, scored on probability and impact and grouped into clusters.",
        "Role ambiguity and governance conflicts identified as the heaviest structural risk.",
        "Mitigation measures per cluster, including governance documentation, RACI per team, phased handover of responsibilities and coaching.",
        "Running pilots assessed on which risk each one actually reduces.",
      ],
      status:
        "Advisory recommendation delivered as part of an academic consulting project. No implementation or measurable impact is claimed.",
    },
    deliverables: [
      "Problem and stakeholder analysis",
      "IST-SOLL analysis of current and intended organisation",
      "Benchmark of comparable transitions",
      "Risk analysis with probability and impact scoring",
      "Risk clustering",
      "Mitigation measures per cluster",
      "Assessment of the running pilots",
      "Advisory report",
    ],
    learnings: [
      {
        heading: "Organizational change is IT work",
        body: [
          "The hardest part of this IT transition was entirely non-technical: who decides, who is accountable, and how people experience a change in their own role.",
        ],
      },
      {
        heading: "Narrowing down is a recommendation too",
        body: [
          "Advising where to start, and being able to explain why that point reduces more risk than the alternatives, was more useful than advising everything at once.",
        ],
      },
      {
        heading: "Risks are connected, not parallel",
        body: [
          "Clustering showed that one risk was feeding several others. Looking for that relationship, instead of treating a risk register as a flat list, is what made a single starting point defensible.",
        ],
      },
    ],
    todos: [
      "Optional: describe your own contribution within the team more specifically (e.g. IST-SOLL, risk clustering, pilot assessment).",
    ],
  },
  {
    slug: "dutch-national-police",
    organization: "Dutch National Police",
    category: "Process & Technology Consulting",
    year: "2025",
    role: "Process Consultant",
    context: ACADEMIC,
    team: TEAM,
    summary:
      "Worked in a multidisciplinary team on the further development of the Visor platform, evaluating ways of working and supporting tooling.",
    cardOutcome: { label: "Advice", text: "BizDevOps, supported by GitLab Enterprise" },
    topics: ["BizDevOps", "GitLab Enterprise", "MCDA", "Process Improvement"],
    visual: "police",
    confidential: true,
    challenge: [
      "Several teams were working on the same platform, each with its own culture and way of working. One side was built for speed, experimentation and fast delivery; the other for stability, security, quality and documentation. Both are necessary, and both were right on their own terms.",
      "Without shared agreements on sprints, feedback moments and documentation, that difference produced miscommunication, delays and an inconsistent development process. The research question: how can the teams be harmonised so that the platform is developed more efficiently, more consistently and at higher quality?",
    ],
    roleDescription: [
      "I worked on this assignment as Process Consultant in a five-person student consultancy team at Windesheim.",
      "The work covered the analysis of the current ways of working and cultures, the comparison of supporting tooling in a multi-criteria decision analysis, and a set of practical guidelines covering methodology, planning, communication, culture, quality and releases — plus a phased implementation plan with a cost estimate.",
    ],
    approach: [
      {
        title: "Understand",
        description:
          "Start from the client's problem presentation and an online Q&A, then define the problem and scope with the 6W method.",
      },
      {
        title: "Analyze",
        description:
          "Map stakeholders, the differences in culture and working methods between the teams, and the objectives, critical success factors and KPIs for the project.",
      },
      {
        title: "Evaluate alternatives",
        description:
          "Compare three development platforms in an MCDA on technical fit, integration with the existing issue tracker, security and annual cost.",
      },
      {
        title: "Recommend",
        description:
          "Advise BizDevOps as the shared way of working and the highest-scoring platform as supporting tooling, with guidelines per theme.",
      },
      {
        title: "Implementation considerations",
        description:
          "Work the advice out into three phases — setup, process design and phased releases — with a cost estimate.",
      },
    ],
    methods: [
      "BizDevOps",
      "Problem analysis (6W)",
      "Stakeholder Analysis",
      "Process Improvement",
      "Multi-Criteria Decision Analysis",
      "CI/CD",
      "Cost Analysis",
    ],
    mcdaAlternatives: 3,
    analysis: [
      {
        heading: "Do not resolve the cultural difference — organise it",
        body: [
          "The obvious move would have been to pick a culture and roll it out. The analysis argued against that: speed and caution were both doing useful work, and the organisation needs both to deliver a platform that is quick to adapt and safe to rely on.",
          "So the advice keeps the difference and gives it a structure. One side stays responsible for rapid further development, prototypes and testing new functionality; the other for quality, stability, security and documentation. What changes is not who they are, but that they run inside one shared process.",
        ],
      },
      {
        heading: "Why BizDevOps rather than scaling an existing agile framework",
        body: [
          "The teams already worked in agile and scrum variants, so the gap was not a lack of method. It was that business, development and operations each ran their own cycle. BizDevOps was recommended because it puts those three perspectives inside the same cycle, which is precisely the seam where the miscommunication occurred.",
          "The practical layer underneath it is deliberately mundane: synchronised sprints with shared sprint goals, one digital backlog with priorities, daily stand-ups, reviews and retrospectives — per team and across teams with the team leads — and one agreed communication channel so information stops disappearing into individual mailboxes.",
        ],
      },
      {
        heading: "Way of working first, tool second",
        body: [
          "A tool encodes a way of working, so choosing it before agreeing on how the teams should collaborate risks freezing the wrong process. The tooling comparison therefore came after the process advice, and was judged against what that process demanded.",
          "Three platforms were compared: GitLab Enterprise, Bitbucket and Azure DevOps. Security carried the heaviest weight — the context required demonstrable certification, access control and compliance — followed by support for the existing technology stack, integration with the issue tracker already in use, and annual cost. All three scored equally on the technology stack, so the decision came down to security and integration, where GitLab Enterprise scored highest. It also lets builds, tests and deployments run in one environment, which is what makes the shared process workable in practice.",
        ],
      },
      {
        heading: "Quality and releases as part of the advice",
        body: [
          "The guidelines go on through the delivery chain: a clear branch structure with defined roles per repository, tests linked to user stories, automated pipelines on every push, and role-based access.",
          "Releases were advised in controlled steps — first to a test group, then to a limited group of users, processing feedback at each step before scaling up. For a platform used in an operational context, a phased release is not caution for its own sake; it is how stability gets verified before it is relied on.",
        ],
      },
    ],
    outcome: {
      heading: "Recommendation",
      summary:
        "Introduce BizDevOps as the shared way of working, keeping the complementary roles of the teams intact, and support it with GitLab Enterprise as the development platform — plus guidelines for planning, communication, quality and phased releases.",
      points: [
        "BizDevOps as one integrated cycle for business, development and operations.",
        "GitLab Enterprise selected through an MCDA of three platforms, with security weighted heaviest.",
        "Practical guidelines per theme: methodology, planning, communication, culture, technology, quality and releases.",
        "Phased implementation plan with a cost estimate, and a recommendation for follow-up research through interviews with the teams.",
      ],
      status:
        "Advisory recommendation from a five-person student consultancy team. No implementation outcome is claimed.",
    },
    deliverables: [
      "Problem and stakeholder analysis",
      "Analysis of cultures and working methods",
      "MCDA of three development platforms (GitLab Enterprise, Bitbucket, Azure DevOps)",
      "Guidelines for methodology, planning, communication, culture, quality and releases",
      "Phased implementation plan",
      "Cost estimate",
      "Advisory report",
    ],
    learnings: [
      {
        heading: "Harmonising is not the same as standardising",
        body: [
          "The useful outcome was not one way of working for everyone, but one process in which two different ways of working could each do what they are good at.",
        ],
      },
      {
        heading: "Sequence is part of the advice",
        body: [
          "Agreeing the process before choosing the tool kept the decision reversible and the reasoning explicit. A tool chosen first would have quietly decided the process for us.",
        ],
      },
      {
        heading: "Sensitive context, explicit reasoning",
        body: [
          "Much of the context could not be shared outside the project. That made criteria-based reasoning more important, not less: the advice had to be traceable without relying on information the reader does not have.",
        ],
      },
    ],
    todos: [
      "Check the year: the advisory report is dated November 2025, while your CV lists this project as 2024.",
      "Optional: describe your own contribution within the team more specifically (e.g. culture analysis, MCDA, guidelines).",
    ],
  },
  {
    slug: "geniuz",
    organization: "Geniuz",
    organizationNote: "AI consultancy for SMEs",
    website: { label: "geniuzaic.com", href: "https://geniuzaic.com/nl" },
    category: "AI & Automation",
    year: "2026–Present",
    role: "Co-founder",
    context: {
      type: "venture",
      label: "Own venture — early-stage AI consultancy, co-founded in April 2026",
    },
    summary:
      "Co-founding an AI consultancy focused on identifying practical opportunities for AI and automation within SME business processes.",
    cardOutcome: { label: "Focus", text: "Practical AI inside SME processes" },
    topics: ["AI", "Automation", "Business Processes", "Entrepreneurship"],
    visual: "geniuz",
    confidential: false,
    challenge: [
      "For many small and medium-sized businesses, the question is not whether AI is interesting, but where it actually helps. The gap is rarely the technology itself. It is identifying which processes are suitable and translating that into something that works in daily operations.",
      "Geniuz is an early-stage consultancy built around that gap: starting from the business process, not from the tool.",
    ],
    roleDescription: [
      "As co-founder, I analyze business processes and identify opportunities for AI and automation, and translate business needs into practical AI and automation solutions.",
      "I also contribute to client acquisition, client meetings and the positioning of the consultancy.",
    ],
    approach: [
      {
        title: "Understand",
        description: "Start from the business and how its processes run today.",
      },
      {
        title: "Analyze",
        description: "Analyze processes to find where AI or automation could realistically help.",
      },
      {
        title: "Translate",
        description: "Translate business needs into a practical AI or automation solution.",
      },
      {
        title: "Position",
        description: "Build the consultancy: client conversations, acquisition and positioning.",
      },
    ],
    methods: ["Process Analysis", "AI & Automation", "Business Development", "Entrepreneurship"],
    analysis: [
      {
        heading: "Process before technology",
        body: [
          "The starting point is always the process: what happens, who does it and where time or quality is lost. Only then does it make sense to ask whether AI or automation is the right answer — and sometimes it is not.",
        ],
      },
      {
        heading: "Practical over impressive",
        body: [
          "For an SME, a solution has to fit existing ways of working and be maintainable without a dedicated IT department. That shapes which opportunities are worth pursuing.",
        ],
      },
    ],
    outcome: {
      heading: "Where it stands",
      summary:
        "Geniuz is an early-stage company. This page describes the focus and approach of the consultancy, not client results.",
      points: [
        "Focus: practical AI and automation within SME business processes.",
        "My part: process analysis, solution translation, client acquisition and positioning.",
      ],
      status: "Ongoing venture. No client outcomes or metrics are presented.",
    },
    deliverables: [],
    learnings: [
      {
        heading: "Selling is listening",
        body: [
          "Client conversations have taught me that the most useful thing to bring to a first meeting is good questions, not a finished solution.",
        ],
      },
      {
        heading: "Owning the whole picture",
        body: [
          "Running a company alongside my studies means dealing with positioning, acquisition and delivery at the same time — a crash course in seeing a business from the inside.",
        ],
      },
    ],
    todos: [
      "Anything about Geniuz you are comfortable sharing publicly (types of processes, sectors)?",
      "Review the ‘What I learned’ texts — they are drafts and should be in your own words.",
    ],
  },
];

export const otherProjects: OtherProject[] = [
  {
    organization: "Partnify",
    category: "Growth Strategy",
    year: "2025",
    description:
      "Researched why new users of a collaboration platform did not become active, and advised on onboarding — selected from four alternatives in an MCDA.",
  },
  { organization: "Wehkamp / Hulaloop", category: "Process & Strategy Analysis", year: "2024" },
  { organization: "Appbakkers", category: "AI Data Analysis", year: "2024" },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

/** Returns the next case in order, wrapping around to the first. */
export function getNextCaseStudy(slug: string) {
  const index = caseStudies.findIndex((c) => c.slug === slug);
  return caseStudies[(index + 1) % caseStudies.length];
}
