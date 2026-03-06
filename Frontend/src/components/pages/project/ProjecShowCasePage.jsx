"use client";

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
      // img: VCCE,
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
    return <div className="text-white p-20">Project not found.</div>;
  }

  return (
    <div className="w-full min-h-screen bg-[#0f172a] text-white px-6 py-16 flex justify-center">
        <div className="w-full max-w-7xl">
          <h1 className="text-4xl font-extrabold leading-snug">
            {project.title}
          </h1>

          <p className="text-white/70 text-lg mt-2 mb-12 max-w-3xl">
            {project.desc}
          </p>

          <div className="w-full h-96 rounded-2xl overflow-hidden mb-12">
            <img
              src={project.img}
              alt={`${project.title} cover`}
              width="1280"
              height="720"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <aside className="space-y-10">
              <div>
                <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wide">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-1 bg-white/10 border border-white/10 rounded-lg text-sm font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wide mb-3">
                  Details
                </h3>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex justify-center items-center">
                      <Sparkle />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase font-medium">
                        Role
                      </p>
                      <p className="font-semibold">Developer</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex justify-center items-center">
                      <Sparkle />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase font-medium">
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
                  className={`w-full py-3 rounded-xl font-semibold transition ${
                    project.liveDemo
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-white/5 border border-white/10 cursor-not-allowed opacity-70"
                  }`}
                  aria-disabled={!project.liveDemo}
                >
                  {project.liveDemo
                    ? "View Live Site"
                    : "Live site coming soon"}
                </button>

                <button
                  type="button"
                  onClick={() => window.open(project.src, "_blank")}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-semibold transition"
                >
                  View on GitHub
                </button>
              </div>
            </aside>

            <div className="lg:col-span-2 space-y-14">
              <section>
                <h2 className="text-2xl font-bold mb-4">Project Overview</h2>

                <p className="text-white/80 leading-relaxed">
                  This project was built with performance, modern UI, and
                  responsive design as top priorities. It demonstrates my
                  capability to design, structure, and implement a complete
                  frontend application using industry-level tools.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">
                  Challenges & Solutions
                </h2>

                <p className="text-white/80 leading-relaxed">
                  The main challenge was crafting a visually polished UI while
                  maintaining lightweight performance. Each screen is optimized
                  for clarity, motion balance, and strong contrast.
                </p>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  {project.showCase.map((imgSrc, index) => (
                    <img
                      key={imgSrc}
                      src={imgSrc}
                      alt={`${project.title} showcase ${index + 1}`}
                      width="640"
                      height="360"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-64 object-cover bg-slate-700 rounded-xl"
                    />
                  ))}
                </div>

                <div className="p-6 bg-blue-700/20 border border-blue-600/30 rounded-xl mt-6">
                  <p className="font-semibold text-blue-300 leading-relaxed">
                    &ldquo;Building clean UI components with Tailwind ensured speed
                    and full consistency across the project.&rdquo;
                  </p>
                </div>

                <p className="text-white/80 leading-relaxed mt-6">
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
