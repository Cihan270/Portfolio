import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { contact } from "@/data/profile";
import { site } from "@/data/site";

export function Contact() {
  const links = [
    { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: ArrowUpRight },
    { label: "LinkedIn", value: "linkedin.com/in/remzicihanuz", href: site.linkedin, external: true, icon: ArrowUpRight },
    { label: "CV", value: "Download PDF", href: site.cvPath, download: true, icon: ArrowDownToLine },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line bg-surface">
      <div className="container-page py-24 md:py-36">
        <Reveal>
          <p className="label">
            <span className="text-ink">07</span> · Contact
          </p>
          <h2
            id="contact-title"
            className="mt-8 max-w-5xl text-5xl leading-[0.98] font-medium tracking-[-0.045em] text-ink sm:text-7xl lg:text-8xl"
          >
            {contact.heading}
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{contact.body}</p>
        </Reveal>

        <ul className="mt-16 border-t border-ink">
          {links.map((l, i) => {
            const Icon = l.icon;
            return (
              <Reveal as="li" key={l.label} delay={i * 0.06}>
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  {...(l.download ? { download: "" } : {})}
                  className="group grid grid-cols-[5rem_1fr_auto] items-center gap-4 border-b border-line py-6 transition-colors hover:bg-paper sm:grid-cols-[10rem_1fr_auto] sm:py-8"
                >
                  <span className="label">{l.label}</span>
                  <span className="truncate text-lg font-medium tracking-tight text-ink sm:text-3xl">{l.value}</span>
                  <Icon
                    size={22}
                    strokeWidth={1.5}
                    aria-hidden
                    className="mr-1 text-ink transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
