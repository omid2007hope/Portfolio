import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, X } from "lucide-react";
import Portfolio from "../../../app/assets/image/Portfolio.jpeg";
import Velora from "../../../app/assets/image/Velora.jpeg";

function Project() {
  const projects = [
    {
      id: 0,
      title: "Velora || E-commerce",
      desc: "Front-end e-commerce website showcasing modern UX, product logic, and performance.",
      img: Velora,
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
    },
    {
      id: 1,
      title: "Omid Teimory || Portfolio",
      desc: "Personal portfolio with case studies, resume, and contact workflows.",
      img: Portfolio,
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
    },
    {
      id: 2,
      title: "Spectre",
      desc: "Project Spectre",
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
    },
  ];

  return (
    <div className="flex h-279 w-full justify-center px-6 mt-0 md:mt-55 lg:mt-55 text-white">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Selected Projects
        </h1>
        <p className="mt-2 mb-10 text-lg text-white/70">
          A collection of recent frontend work with a focus on product UI,
          component structure, and responsive implementation.
        </p>

        <div className="mb-10 flex gap-4">
          <button className="rounded-lg border border-white/10 bg-white/5 px-5 py-2 font-medium transition hover:bg-white/10">
            All
          </button>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <Link href={`/project/${project.id}`}>
                <div className="mb-5 h-48 w-full overflow-hidden rounded-xl">
                  {project.img ? (
                    <Image
                      src={project.img}
                      alt={project.title}
                      width={640}
                      height={360}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-slate-900/70 text-sm text-slate-400">
                      Preview coming soon
                    </div>
                  )}
                </div>

                <h2 className="mt-3 text-xl font-bold">{project.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {project.desc}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>

              <div className="mt-5 flex gap-4">
                <a
                  href={project.liveDemo || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 rounded-lg px-4 py-2 text-center text-sm font-semibold ${
                    project.liveDemo
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "cursor-not-allowed border border-white/10 bg-white/5 opacity-60"
                  }`}
                  aria-disabled={!project.liveDemo}
                  tabIndex={project.liveDemo ? undefined : -1}
                >
                  {project.liveDemo ? "Live Demo" : "Live Demo (coming soon)"}
                </a>

                <a
                  href={project.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-center text-sm font-semibold hover:bg-white/20"
                >
                  Source
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center space-y-4 border-t border-white/10 pt-8">
          <div className="flex gap-10 text-white/70">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <Link href="/projects" className="transition hover:text-white">
              Projects
            </Link>
            <Link href="/about" className="transition hover:text-white">
              About
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              Contact
            </Link>
          </div>

          <div className="flex gap-6 pt-4">
            <a
              href="https://github.com/omid2007hope"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 font-bold transition hover:bg-white/10"
              aria-label="GitHub profile"
            >
              <Github />
            </a>

            <a
              href="https://www.linkedin.com/in/omid-teimory-48233638b"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 font-bold transition hover:bg-white/10"
              aria-label="LinkedIn profile"
            >
              <Linkedin />
            </a>

            <a
              href="https://x.com/Omid2007hope"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 font-bold transition hover:bg-white/10"
              aria-label="X profile"
            >
              <X />
            </a>
          </div>

          <p className="text-sm text-white/40">
            (c) 2026 Omid Teimory. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Project;
