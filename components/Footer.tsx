import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-8 py-10 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-semibold tracking-tight text-ink">{site.name}</p>
          <p className="mt-1 text-muted">{site.discipline}</p>
        </div>
        <p className="text-muted">{site.location}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline text-ink">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="link-underline text-ink">
              Email
            </a>
          </li>
          <li>
            <a href={site.cvPath} download="" className="link-underline text-ink">
              CV
            </a>
          </li>
        </ul>
        <p className="text-muted lg:text-right">© {year} {site.name}</p>
      </div>
    </footer>
  );
}
