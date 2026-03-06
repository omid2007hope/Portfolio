"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  BriefcaseBusiness,
  Github,
  Linkedin,
  Sparkles,
  X,
} from "lucide-react";
import Me from "../../app/assets/image/Me.jpg";

const ChatBox = dynamic(() => import("./AiChatBox"), { ssr: false });

function Home() {
  const [open, setOpen] = useState(false);

  const skills = [
    "HTML",
    "CSS",
    "Tailwind CSS",
    "JavaScript",
    "React",
    "React Suite",
    "Redux",
    "React Router DOM",
    "GitHub",
    "Figma",
    "Adobe Illustrator",
    "Postman",
  ];

  const social = [
    {
      name: "GitHub",
      icon: <Github />,
      url: "https://github.com/omid2007hope",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin />,
      url: "https://www.linkedin.com/in/omid-teimory-48233638b/",
    },
    { name: "X", icon: <X />, url: "https://x.com/Omid2007hope" },
  ];

  const highlights = [
    { label: "Based in", value: "Vienna, Austria" },
    { label: "Primary stack", value: "React, Next.js, Tailwind" },
    { label: "Current focus", value: "Frontend + backend growth" },
  ];

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-8 text-white">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="order-2 space-y-8 lg:order-1">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-[0_10px_40px_rgba(34,211,238,0.18)]">
            <BriefcaseBusiness className="h-4 w-4" />
            Open to freelance and full-time frontend roles
          </div>

          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-200/75">
              Frontend Engineer
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl xl:text-7xl">
              Interfaces with structure, motion, and clarity.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              I build polished web products with React, modern CSS, and strong
              layout discipline. The goal is simple: clear UX, sharp visuals,
              and frontend code that scales cleanly.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-100">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
              href="https://github.com/omid2007hope"
              rel="noopener noreferrer"
              target="_blank"
            >
              View GitHub
              <ArrowRight className="h-4 w-4" />
            </a>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Explore Projects
              <Sparkles className="h-4 w-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-6 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
            >
              Get In Touch
            </Link>
          </div>

          <div className="flex flex-wrap gap-8 pt-4">
            {social.map((item) => (
              <div
                key={item.name}
                className="flex flex-col items-center space-y-2"
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
                  aria-label={item.name}
                >
                  {item.icon}
                </a>
                <span className="text-sm font-semibold text-slate-300">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="relative w-full max-w-xl">
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.34),transparent_25%),radial-gradient(circle_at_70%_80%,rgba(37,99,235,0.34),transparent_30%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(15,23,42,0.92),rgba(10,35,64,0.86))] p-5 shadow-[0_30px_120px_rgba(2,8,23,0.55)]">
              <div className="mb-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-200/65">
                    Currently building
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    Clean portfolio and product interfaces
                  </p>
                </div>
                <div className="rounded-full bg-emerald-400/15 p-3 text-emerald-200">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/50">
                <Image
                  src={Me}
                  alt="Portrait of Omid Teimory"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="aspect-[4/5] w-full object-cover object-center"
                />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Core strengths
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    Responsive layout systems, component design, interaction
                    polish, and frontend implementation quality.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-sky-400/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-sky-200/70">
                    Next step
                  </p>
                  <p className="mt-2 text-sm leading-6 text-sky-50">
                    Expanding into Node.js and backend architecture without
                    losing frontend precision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-8 right-8 z-[160] flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/20 bg-blue-600 text-white shadow-[0_20px_60px_rgba(37,99,235,0.45)] transition hover:bg-blue-500"
          aria-label="Open chat"
          aria-expanded={open}
          aria-controls="portfolio-chatbox"
        >
          <Atom size={30} />
        </button>
        <ChatBox open={open} setOpen={setOpen} />
      </div>
    </section>
  );
}

export default Home;
