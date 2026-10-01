import { Hero } from "@/components/sections/Hero";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { WorkingModel } from "@/components/sections/WorkingModel";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ToolkitGrid } from "@/components/sections/ToolkitGrid";
import { EducationJourney } from "@/components/sections/EducationJourney";
import { GraduationCTA } from "@/components/sections/GraduationCTA";
import { FitCheck } from "@/components/sections/FitCheck";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/data/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: [site.linkedin],
  jobTitle: "Business IT & Management student",
  address: { "@type": "PostalAddress", addressLocality: "Apeldoorn", addressCountry: "NL" },
  affiliation: [
    { "@type": "CollegeOrUniversity", name: "Windesheim University of Applied Sciences" },
    { "@type": "CollegeOrUniversity", name: "University of Twente" },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <HeroBanner />
      <Hero />
      <WorkingModel />
      <ExperienceTimeline />
      <SelectedWork />
      <FitCheck />
      <ToolkitGrid />
      <EducationJourney />
      <GraduationCTA />
      <Contact />
    </>
  );
}
