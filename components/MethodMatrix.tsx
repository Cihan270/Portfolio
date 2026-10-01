import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { caseStudies } from "@/data/projects";
import { methodMatrix } from "@/data/methods";

/**
 * Methods × projects. A filled mark means the method was used in that project.
 * Full grid from md up; a stacked list with project marks below that.
 */
export function MethodMatrix() {
  const columns = caseStudies.map((c) => ({
    slug: c.slug,
    label: c.organization === "Nedap Livestock Management" ? "Nedap" : c.organization,
    short: c.organization === "Dutch National Police" ? "Police" : c.organization.split(" ")[0],
  }));
  const grid = { gridTemplateColumns: `minmax(0, 1.6fr) repeat(${columns.length}, minmax(0, 1fr))` };

  return (
    <Reveal className="mt-20 md:mt-24">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h3 className="text-2xl font-medium tracking-tight text-ink">Methods across projects</h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            The same toolkit, applied to different problems. A mark means the method was used in that project.
          </p>
        </div>

        <div className="lg:col-span-8">
          {/* Matrix */}
          <div className="hidden border-t border-ink md:block">
            <div className="grid items-end gap-x-2 border-b border-line pb-3" style={grid}>
              <span className="label pt-3">Method</span>
              {columns.map((c) => (
                <Link
                  key={c.slug}
                  href={`/work/${c.slug}`}
                  className="label pt-3 text-center !text-ink transition-opacity hover:opacity-60"
                >
                  {c.short}
                </Link>
              ))}
            </div>

            {methodMatrix.map((row) => (
              <div key={row.method} className="grid items-center gap-x-2 border-b border-line" style={grid}>
                <span className="py-3 text-sm text-ink-2" title={row.description}>
                  {row.method}
                </span>
                {columns.map((c) => {
                  const used = row.usedIn.includes(c.slug);
                  return (
                    <span key={c.slug} className="flex justify-center py-3">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${used ? "bg-ink" : "border border-line-strong"}`}
                      />
                      <span className="sr-only">
                        {row.method} {used ? "used in" : "not used in"} {c.label}
                      </span>
                    </span>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Stacked version for small screens */}
          <ul className="border-t border-ink md:hidden">
            {methodMatrix.map((row) => (
              <li key={row.method} className="border-b border-line py-4">
                <p className="text-sm font-medium text-ink">{row.method}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {columns
                    .filter((c) => row.usedIn.includes(c.slug))
                    .map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/work/${c.slug}`}
                          className="inline-flex border border-line-strong px-2 py-1 text-xs text-ink-2"
                        >
                          {c.short}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
