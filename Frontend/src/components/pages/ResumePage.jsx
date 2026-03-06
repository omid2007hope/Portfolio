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
    <div className="w-full min-h-screen bg-[#0f172a] text-white px-6 py-16 flex justify-center">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-12">
          {/* SIDEBAR */}
          <aside className="w-full lg:w-1/4 bg-white/5 border border-white/10 rounded-2xl p-6 h-fit space-y-10">
            {/* Profile */}
            <div className="flex items-center gap-4">
              <img
                src={Me}
                alt="Omid Teimory headshot"
                width="64"
                height="64"
                loading="lazy"
                decoding="async"
                className="w-16 h-16 rounded-full bg-white/20 border border-white/10"
              />
              <div>
                <h2 className="font-bold text-lg">Omid Teimory</h2>
                <p className="text-white/60 text-sm">Frontend Developer</p>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <Mail size={16} /> <span>omidhope2007@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Phone size={16} /> <span>+43 681-81580180</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin size={16} />{" "}
                <span>EichenStrasse 13/2, Vienna 1120, Austria</span>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">
                Important Links
              </h3>

              <div className="flex items-center gap-2 text-white/80 text-sm">
                <LinkIcon size={16} />
                <a
                  href="https://omidteimory.com"
                  target="_blank"
                  className="hover:text-blue-400"
                >
                  Portfolio
                </a>
              </div>

              <div className="flex items-center gap-2 text-white/80 text-sm">
                <LinkIcon size={16} />
                <a
                  href="https://github.com/omid2007hope"
                  target="_blank"
                  className="hover:text-blue-400"
                >
                  GitHub
                </a>
              </div>

              <div className="flex items-center gap-2 text-white/80 text-sm">
                <LinkIcon size={16} />
                <a
                  href="https://www.linkedin.com/in/omid-teimory-48233638b"
                  target="_blank"
                  className="hover:text-blue-400"
                >
                  LinkedIn
                </a>
              </div>

              <div className="flex items-center gap-2 text-white/80 text-sm">
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

            {/* Languages */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">
                Languages
              </h3>
              <ul className="mt-3 space-y-1 text-white/80 text-sm">
                <li>English - Fluent</li>
                <li>German - Basic</li>
                <li>Persian - Native</li>
              </ul>
            </div>

            {/* Certificates */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">
                Certificates
              </h3>

              <div className="mt-3 space-y-3 text-white/80 text-sm">
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

          {/* MAIN CONTENT */}
          <main className="w-full lg:w-3/4 space-y-16">
            {/* TOP HEADER */}
            <header className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <img
                src={Me}
                alt="Omid Teimory"
                width="160"
                height="160"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                className="w-40 h-40 rounded-2xl object-cover shadow-lg border border-white/10"
              />

              <div>
                <h1 className="text-4xl font-extrabold">Omid Teimory</h1>
                <p className="text-white/60 text-lg mt-2">
                  Frontend Developer & UI/UX Designer
                </p>

                <p className="text-white/70 mt-4 max-w-2xl leading-relaxed">
                  A front-end developer specializing in modern UI engineering,
                  React, Tailwind, and clean component-based architecture.
                  Focused on speed, precision, and creating smooth, intentional
                  digital experiences. Currently expanding into backend
                  development to become a full-stack engineer.
                </p>
              </div>
            </header>

            {/* EXPERIENCE */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Experience</h2>

              <div className="flex gap-6 mb-10">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex justify-center items-center">
                  <Book />
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Frontend Developer - Freelancer
                  </h3>
                  <p className="text-white/60 text-sm">
                    2024 - Present - Vienna, Austria
                  </p>

                  <ul className="list-disc ml-6 mt-3 space-y-1 text-white/80">
                    <li>
                      Building responsive, high-performance interfaces using
                      React & Tailwind.
                    </li>
                    <li>
                      Designing component systems, UI/UX flows, routing, and
                      front-end architecture.
                    </li>
                    <li>
                      Developing dashboards, animated gradients, charts,
                      data-driven UI components.
                    </li>
                    <li>
                      Created <strong>Velora</strong> - a complete e-commerce
                      front-end with product arrays, selectors, detail pages,
                      cart flows, responsive grids, and dynamic UI logic.
                    </li>
                    <li>
                      Built a professional portfolio showcasing animations, UI
                      polish, and multi-page routing.
                    </li>
                    <li>
                      Implemented user account systems with localStorage,
                      editable profile data, and validation.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex justify-center items-center">
                  <Book />
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Web Development Student - Independent
                  </h3>
                  <p className="text-white/60 text-sm">2023 - Present</p>

                  <ul className="list-disc ml-6 mt-3 space-y-1 text-white/80">
                    <li>
                      Studying full-stack development: React, Tailwind, Node.js,
                      MongoDB, SQL.
                    </li>
                    <li>
                      Building production-level UIs including portfolios, task
                      managers, and finance tools.
                    </li>
                    <li>
                      Practicing advanced UI/UX design, alignment precision,
                      spacing, typography mastery.
                    </li>
                    <li>
                      Learning professional component architecture and state
                      logic patterns.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* EDUCATION */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Education</h2>

              <div className="flex gap-6 mb-10">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex justify-center items-center">
                  <Book />
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Full-Stack Web Development
                  </h3>
                  <p className="text-white/60 text-sm">
                    2023 - Present - Self-Taught
                  </p>

                  <p className="text-white/80 mt-2 max-w-2xl">
                    Studying modern front-end and back-end technologies
                    including React, Tailwind, Node.js, Express, REST APIs,
                    MongoDB, and SQL. Focused on real-world projects, component
                    architecture, UI/UX, and scalable front-end systems.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex justify-center items-center">
                  <Book />
                </div>

                <div>
                  <h3 className="font-bold text-lg">Educational Background</h3>
                  <ul className="text-white/80 space-y-1 mt-2 text-sm">
                    <li>Full-Stack Program (Online) - 2025-Present</li>
                    <li>HAK Schule, Austria - 2025</li>
                    <li>Infenium Schule, Austria - 2024-2025</li>
                    <li>High School, Iran - 2019-2024</li>
                    <li>Elementary School, Iran - 2013-2019</li>
                  </ul>
                </div>
              </div>
            </section>
            {/* SKILLS */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Skills</h2>

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
      <h4 className="text-white/60 font-semibold uppercase text-sm">{title}</h4>
      <div className="flex flex-wrap gap-2 mt-3">
        {items.map((item) => (
          <span
            key={item}
            className="px-4 py-1 bg-white/10 border border-white/10 rounded-lg text-sm font-semibold"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Resume;
