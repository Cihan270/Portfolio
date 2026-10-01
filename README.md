# Remzi Cihan Uz — Portfolio

Personal portfolio for Business IT & Management, technology consulting and business analysis.
Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Motion and Lucide icons. Every page is
statically generated, so it deploys to Vercel with no configuration.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build (also type-checks)
npm run start      # serve the production build
npm run lint       # ESLint
npx tsc --noEmit   # TypeScript only
```

## Project structure

```
app/
  layout.tsx                 Root layout: fonts, metadata, navbar, footer
  page.tsx                   Homepage (composes the sections below)
  work/[slug]/page.tsx       Case-study pages, one per entry in data/projects.ts
  work/[slug]/opengraph-image.tsx   Social preview image per case
  opengraph-image.tsx        Social preview image for the homepage
  icon.svg                   Favicon (placeholder monogram)
  sitemap.ts, robots.ts      SEO
  not-found.tsx              404 page
  globals.css                Design tokens (colors, type scale) and base styles

components/
  Navbar, Footer, Button, Tag, SectionHeading, StatusBadge, FocusWords, PortraitSlot
  ProjectCard, ProcessDiagram, DevTodo
  sections/                  HeroBanner, Hero, WorkingModel, ExperienceTimeline, SelectedWork,
                             FitCheck, ToolkitGrid, EducationJourney, GraduationCTA, Contact
  MethodMatrix               Methods × projects grid
  case/                      CaseStudyLayout, CaseSection, Breadcrumbs, NextProject
  visuals/                   CaseVisual (abstract SVG diagrams), McdaFigure
  motion/                    MotionProvider, Reveal (fade-in on scroll, respects reduced motion)

data/
  site.ts                    Name, email, LinkedIn, CV path, portrait, navigation
  profile.ts                 Hero text, experience, toolkit, education, graduation, about, contact
  projects.ts                Case studies + "Other work"
  methods.ts                 Which method was used in which project (the matrix)
  fit.ts                     Criteria, scores and verdicts for the fit check
  types.ts                   TypeScript types for all content

lib/og.tsx                   Shared Open Graph image renderer
public/                      Static files (CV, images)
```

## Change the content

All text lives in `data/`. You never need to touch components for normal edits.

- **Contact details, availability line, navigation** → `data/site.ts`
- **Hero, experience, toolkit, education, graduation interests, contact copy** → `data/profile.ts`
- **Case studies** → `data/projects.ts`

### Case studies

Each case in `caseStudies` becomes a page at `/work/<slug>`. The order of the array is the order on
the homepage and the order of the "Next case" links.

To add a case, copy an existing object and change the fields. Useful fields:

| Field | What it does |
| --- | --- |
| `slug` | URL segment. Keep it lowercase with hyphens. |
| `context.type` | `"academic"` shows the Windesheim disclaimer; `"venture"` for own companies. |
| `confidential` | Shows the confidentiality note. |
| `visual` | Which abstract diagram to show (`unive`, `nedap`, `duo`, `police`, `geniuz`). New diagrams go in `components/visuals/CaseVisual.tsx`. |
| `mcdaAlternatives` | Optional. Shows an illustrative, score-free MCDA matrix. |
| `outcome.status` | Always states whether this was a recommendation or an implemented result. |
| `deliverables` | Leave `[]` to hide the section. |
| `todos` | Open questions. Shown as yellow boxes **only in `npm run dev`**, never in production. |

"Other work" projects are in `otherProjects` at the bottom of the same file. Add a `description` to
show a one-liner.

### Placeholders and open questions

Run `npm run dev` and look for the yellow **Dev only** boxes on the case pages. They list what is
still missing. They never appear on the live site.

## Replace the CV

Overwrite `public/Remzi-Cihan-Uz-CV.pdf` with your own PDF **using the same file name**. Every
"Download CV" button, the navbar and the footer point to that file.

To use a different file name, change `cvPath` in `data/site.ts`.

## Add photos

**Portrait (hero):**

1. Put the image in `public/images/`, e.g. `public/images/portrait.jpg` (portrait orientation, about
   1200×1500 px, under 400 KB).
2. In `data/site.ts`, point `portrait` at it:
   ```ts
   portrait: { base: "/images/portrait", widths: [600, 900], alt: "Remzi Cihan Uz" },
   ```
   Set it to `null` to fall back to the monogram card.

**Favicon:** replace `app/icon.svg` (or add `app/icon.png`).

## The scratch-reveal band

The band at the very top shows an illustration you can scratch away with the
cursor to reveal a second one underneath.

- Component: `components/ScratchReveal.tsx` (canvas, procedural brush)
- Section and overlay text: `components/sections/HeroBanner.tsx` + `heroOverlay` in `data/profile.ts`
- Images: `public/images/hero-plain-*.webp` (top) and `hero-tech-*.webp` (bottom)
- Settings: `site.heroBanner` in `data/site.ts` — `enabled: false` removes the band

**Replacing the images.** Generate both at 2000×833 or larger, with identical
framing — same camera distance, same position of the person, only the background
different. Then run, from the project root:

```bash
npm i -D puppeteer-core          # once
node scripts/hero-images.mjs path/to/plain.webp path/to/tech.webp
```

That writes `hero-plain-{800,1200,1600,2000}.webp` and the same for `hero-tech`.
If the two images are a few pixels out of line, pass the offset of the second
one: `--dx 3 --dy 1`.

Nothing is revealed until the visitor moves the pointer. Strokes shrink and
disappear after 2.7 seconds, so the image always returns to its starting state.
With reduced motion the top image is simply shown.

## The two interactive parts

**Methods × projects matrix** (under Selected work). Which method was used in
which project is defined in `data/methods.ts`. Add a row, or add a project slug
to `usedIn`, and the matrix updates.

**Assignment fit check** (`#fit` on the homepage). A small multi-criteria
decision analysis the visitor operates: they weight what their assignment needs,
the model scores the match with your profile.

- Criteria, your scores (1–5) and the evidence behind them: `data/fit.ts`
- Starting points for the preset buttons: `fitPresets` in the same file
- The four verdicts and their thresholds: `fitBands`

The score is the weighted average of your criterion scores, mapped from 1–5 onto
0–10. Keep the low scores honest — a model that also says "this is not a fit" is
the reason the high scores are believable. Everything runs in the browser; no
data is sent anywhere.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new), import the repository. Vercel detects Next.js
   automatically; keep the default settings.
3. Under **Settings → Environment Variables**, add
   `NEXT_PUBLIC_SITE_URL` = your final URL (e.g. `https://remzicihanuz.nl` or the `*.vercel.app` URL).
   This is used for canonical URLs, the sitemap and social previews.
4. Deploy. Every push to the main branch redeploys automatically.

Or from the command line:

```bash
npx vercel
```

## Design notes

- Palette and type scale are defined once in `app/globals.css` (`@theme`).
- The recurring motif **Business → Analysis → Technology → Change** appears in the "How I approach a
  problem" band, the case-study process diagrams and the social preview images.
- Motion is limited to one-time fade-ins, a slow emphasis change in the hero and hover states. All of
  it switches off when the visitor has "reduce motion" enabled.
- Case diagrams are recreated abstractions. Do not replace them with client screenshots or internal
  documents.
