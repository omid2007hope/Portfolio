"use client";

import Image from "next/image";
import { Sparkle } from "lucide-react";
import Portfolio from "../../../app/assets/image/Portfolio.jpeg";
import Portfolio1 from "../../../app/assets/image/Portfolio1.png";
import Portfolio2 from "../../../app/assets/image/Portfolio2.png";
import Velora from "../../../app/assets/image/Velora.jpeg";
import Velora1 from "../../../app/assets/image/Velora1.png";
import Velora2 from "../../../app/assets/image/Velora2.png";

function ProjectShowcase({ projectId }) {
  const projects = [
    {
      id: 0,
      title: "Velora || E-commerce",
      desc: "Front-end e-commerce website showcasing modern UX, product logic, and performance.",
      img: Velora,
      showCase: [Velora1, Velora2],
      tech: [
        "HTML",
        "Tailwind CSS",
        "React",
        "React Router DOM",
        "Redux",
        "React Suite",
        "GitHub",
      ],
      src: "https://github.com/omid2007hope/Velora",
      liveDemo: "https://velorashop.app",
      duration: "8 Weeks",
    },
    {
      id: 1,
      title: "Omid Teimory || Portfolio",
      desc: "Personal portfolio with case studies, resume, and contact workflows.",
      img: Portfolio,
      showCase: [Portfolio1, Portfolio2],
      tech: [
        "HTML",
        "Tailwind CSS",
        "React",
        "React Router DOM",
        "Redux",
        "React Suite",
        "GitHub",
      ],
      src: "https://github.com/omid2007hope/Omid-Teimory",
      liveDemo: "https://omidteimory.com",
      duration: "2 Weeks",
    },
    {
      id: 2,
      title: "Spectre",
      desc: "Project Spectre",
      showCase: [],
      tech: [
        "HTML",
        "Tailwind CSS",
        "React",
        "React Router DOM",
        "Redux",
        "React Suite",
        "GitHub",
        "node.js",
        "express.js",
      ],
      src: "https://github.com/omid2007hope/Data-Science-Project",
      liveDemo: "",
      duration: "In Progress",
    },
  ];

  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return <div className="p-20 text-white">Project not found.</div>;
  }

  return (
    <div className="flex min-h-screen w-full justify-center px-6 py-16 text-white">
      <div className="w-full max-w-7xl">
        <h1 className="text-4xl font-extrabold leading-snug">{project.title}</h1>
        <p className="mt-2 mb-12 max-w-3xl text-lg text-white/70">
          {project.desc}
        </p>

        <div className="mb-12 h-96 w-full overflow-hidden rounded-2xl">
          {project.img ? (
            <Image
              src={project.img}
              alt={`${project.title} cover`}
              width={1280}
              height={720}
              priority
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-900/70 text-slate-400">
              Preview coming soon
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <aside className="space-y-10">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">
                Tech Stack
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-white/10 bg-white/10 px-4 py-1 text-sm font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/60">
                Details
              </h3>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                    <Sparkle />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase text-white/60">
                      Role
                    </p>
                    <p className="font-semibold">Developer</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                    <Sparkle />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase text-white/60">
                      Duration
                    </p>
                    <p className="font-semibold">{project.duration}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <button
                type="button"
                onClick={() =>
                  project.liveDemo && window.open(project.liveDemo, "_blank")
                }
                className={`w-full rounded-xl py-3 font-semibold transition ${
                  project.liveDemo
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "cursor-not-allowed border border-white/10 bg-white/5 opacity-70"
                }`}
                aria-disabled={!project.liveDemo}
              >
                {project.liveDemo ? "View Live Site" : "Live site coming soon"}
              </button>

              <button
                type="button"
                onClick={() => window.open(project.src, "_blank")}
                className="w-full rounded-xl border border-white/10 bg-white/10 py-3 font-semibold transition hover:bg-white/20"
              >
                View on GitHub
              </button>
            </div>
          </aside>

          <div className="space-y-14 lg:col-span-2">
            <section>
              <h2 className="mb-4 text-2xl font-bold">Project Overview</h2>
              <p className="leading-relaxed text-white/80">
                This project was built with performance, modern UI, and
                responsive design as top priorities. It demonstrates my
                capability to design, structure, and implement a complete
                frontend application using industry-level tools.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">Challenges & Solutions</h2>
              <p className="leading-relaxed text-white/80">
                The main challenge was crafting a visually polished UI while
                maintaining lightweight performance. Each screen is optimized
                for clarity, motion balance, and strong contrast.
              </p>

              {!!project.showCase.length && (
                <div className="my-8 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
                  {project.showCase.map((imgSrc, index) => (
                    <Image
                      key={imgSrc.src}
                      src={imgSrc}
                      alt={`${project.title} showcase ${index + 1}`}
                      width={640}
                      height={360}
                      className="h-64 w-full rounded-xl bg-slate-700 object-cover"
                    />
                  ))}
                </div>
              )}

              <div className="mt-6 rounded-xl border border-blue-600/30 bg-blue-700/20 p-6">
                <p className="font-semibold leading-relaxed text-blue-300">
                  &ldquo;Building clean UI components with Tailwind ensured speed
                  and full consistency across the project.&rdquo;
                </p>
              </div>

              <p className="mt-6 leading-relaxed text-white/80">
                Additional improvements included modular component design and
                reusable logic.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectShowcase;
