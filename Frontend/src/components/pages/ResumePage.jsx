import Image from "next/image";
import {
  Book,
  Mail,
  Phone,
  MapPin,
  Award,
  Link as LinkIcon,
} from "lucide-react";
import Me from "../../app/assets/image/Me.jpg";

function Resume() {
  return (
    <div className="flex min-h-screen w-full justify-center px-6 py-16 text-white">
      <div className="flex w-full max-w-7xl flex-col gap-12 lg:flex-row">
        <aside className="h-fit w-full space-y-10 rounded-2xl border border-white/10 bg-white/5 p-6 lg:w-1/4">
          <div className="flex items-center gap-4">
            <Image
              src={Me}
              alt="Omid Teimory headshot"
              width={64}
              height={64}
              className="h-16 w-16 rounded-full border border-white/10 bg-white/20 object-cover"
            />
            <div>
              <h2 className="text-lg font-bold">Omid Teimory</h2>
              <p className="text-sm text-white/60">Frontend Developer</p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-2 text-white/80">
              <Mail size={16} /> <span>omidhope2007@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Phone size={16} /> <span>+43 681-81580180</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin size={16} />
              <span>EichenStrasse 13/2, Vienna 1120, Austria</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Important Links
            </h3>

            <div className="flex items-center gap-2 text-sm text-white/80">
              <LinkIcon size={16} />
              <a
                href="https://omidteimory.com"
                target="_blank"
                className="hover:text-blue-400"
              >
                Portfolio
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm text-white/80">
              <LinkIcon size={16} />
              <a
                href="https://github.com/omid2007hope"
                target="_blank"
                className="hover:text-blue-400"
              >
                GitHub
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm text-white/80">
              <LinkIcon size={16} />
              <a
                href="https://www.linkedin.com/in/omid-teimory-48233638b"
                target="_blank"
                className="hover:text-blue-400"
              >
                LinkedIn
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm text-white/80">
              <LinkIcon size={16} />
              <a
                href="https://velorashop.app"
                target="_blank"
                className="hover:text-blue-400"
              >
                Velora Shop
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Languages
            </h3>
            <ul className="mt-3 space-y-1 text-sm text-white/80">
              <li>English - Fluent</li>
              <li>German - Basic</li>
              <li>Persian - Native</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Certificates
            </h3>

            <div className="mt-3 space-y-3 text-sm text-white/80">
              <div className="flex items-start gap-2">
                <Award size={16} className="mt-1" />
                <div>
                  <p className="font-semibold">
                    IBM Web Development Fundamentals
                  </p>
                  <p className="text-xs opacity-70">Issued: Oct 26, 2025</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Award size={16} className="mt-1" />
                <div>
                  <p className="font-semibold">OSD Zertifikat A1 - German</p>
                  <p className="text-xs opacity-70">Score: 94/100</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="w-full space-y-16 lg:w-3/4">
          <header className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <Image
              src={Me}
              alt="Omid Teimory"
              width={160}
              height={160}
              priority
              className="h-40 w-40 rounded-2xl border border-white/10 object-cover shadow-lg"
            />

            <div>
              <h1 className="text-4xl font-extrabold">Omid Teimory</h1>
              <p className="mt-2 text-lg text-white/60">
                Frontend Developer & UI/UX Designer
              </p>

              <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
                A front-end developer specializing in modern UI engineering,
                React, Tailwind, and clean component-based architecture.
                Focused on speed, precision, and creating smooth, intentional
                digital experiences. Currently expanding into backend
                development to become a full-stack engineer.
              </p>
            </div>
          </header>

          <section>
            <h2 className="mb-6 text-2xl font-bold">Experience</h2>

            <div className="mb-10 flex gap-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                <Book />
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Frontend Developer - Freelancer
                </h3>
                <p className="text-sm text-white/60">
                  2024 - Present - Vienna, Austria
                </p>

                <ul className="ml-6 mt-3 list-disc space-y-1 text-white/80">
                  <li>Building responsive, high-performance interfaces using React and Tailwind.</li>
                  <li>Designing component systems, UI/UX flows, routing, and front-end architecture.</li>
                  <li>Developing dashboards, animated gradients, charts, and data-driven UI components.</li>
                  <li>Created Velora, a complete e-commerce front-end with cart flows and dynamic UI logic.</li>
                  <li>Built a professional portfolio showcasing animations, UI polish, and multi-page routing.</li>
                  <li>Implemented user account systems with localStorage, editable profile data, and validation.</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                <Book />
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Web Development Student - Independent
                </h3>
                <p className="text-sm text-white/60">2023 - Present</p>

                <ul className="ml-6 mt-3 list-disc space-y-1 text-white/80">
                  <li>Studying full-stack development: React, Tailwind, Node.js, MongoDB, and SQL.</li>
                  <li>Building production-level UIs including portfolios, task managers, and finance tools.</li>
                  <li>Practicing advanced UI/UX design, spacing, and typography control.</li>
                  <li>Learning professional component architecture and state management patterns.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold">Education</h2>

            <div className="mb-10 flex gap-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                <Book />
              </div>

              <div>
                <h3 className="text-lg font-bold">Full-Stack Web Development</h3>
                <p className="text-sm text-white/60">
                  2023 - Present - Self-Taught
                </p>

                <p className="mt-2 max-w-2xl text-white/80">
                  Studying modern front-end and back-end technologies including
                  React, Tailwind, Node.js, Express, REST APIs, MongoDB, and
                  SQL. Focused on real-world projects, component architecture,
                  UI/UX, and scalable front-end systems.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                <Book />
              </div>

              <div>
                <h3 className="text-lg font-bold">Educational Background</h3>
                <ul className="mt-2 space-y-1 text-sm text-white/80">
                  <li>Full-Stack Program (Online) - 2025-Present</li>
                  <li>HAK Schule, Austria - 2025</li>
                  <li>Infenium Schule, Austria - 2024-2025</li>
                  <li>High School, Iran - 2019-2024</li>
                  <li>Elementary School, Iran - 2013-2019</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold">Skills</h2>

            <SkillGroup
              title="Front-End Development"
              items={[
                "HTML5",
                "CSS3",
                "JavaScript (ES6+)",
                "React (Hooks, Components)",
                "React Router",
                "Tailwind CSS",
                "Responsive Design",
                "Component Architecture",
                "Lucide Icons",
                "Heroicons",
                "Headless UI",
              ]}
            />

            <SkillGroup
              title="UI / UX & Component Design"
              items={[
                "Responsive Layouts",
                "Animated Gradients",
                "Neon / Conic-Gradient Charts",
                "Blur / Glow Effects",
                "Advanced Tailwind Styling",
                "Product Cards & Grids",
                "Detail Pages",
                "Color & Size Selectors",
                "Mobile-First UI",
                "Precision Spacing",
                "High-Fidelity Components",
              ]}
            />

            <SkillGroup
              title="State & Logic"
              items={[
                "LocalStorage User Systems",
                "Profile Update Logic",
                "Form Handling & Validation",
                "Sign-In / Sign-Out Systems",
                "Dynamic Modals & Sidebars",
                "Reusable Form Components",
              ]}
            />

            <SkillGroup
              title="Data & Architecture"
              items={[
                "Product Array Structures",
                "Multi-Page Flow Systems",
                "Routing Logic",
                "Basic Node.js",
                "REST API Understanding",
                "Data-Driven UI",
              ]}
            />

            <SkillGroup
              title="Tools & Platforms"
              items={[
                "Git & GitHub",
                "Figma",
                "Vercel",
                "Netlify",
                "npm",
                "VS Code",
                "Linux",
                "Chrome DevTools",
              ]}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

function SkillGroup({ title, items }) {
  return (
    <div className="mb-8">
      <h4 className="text-sm font-semibold uppercase text-white/60">{title}</h4>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-lg border border-white/10 bg-white/10 px-4 py-1 text-sm font-semibold"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Resume;
