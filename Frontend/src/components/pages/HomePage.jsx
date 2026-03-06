"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Atom, Github, Linkedin, X } from "lucide-react";
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

  return (
    <div className="w-full min-h-screen bg-[#0f172a] text-white">
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-20 px-6 lg:px-8 py-16 lg:py-24">
          <div className="w-full lg:w-[40%] flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
              <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-blue-900/60 via-blue-700/50 to-indigo-500/40 blur-2xl opacity-80" />
              <div className="absolute inset-0 rounded-[28px] bg-white/5 border border-white/10 backdrop-blur-sm" />
              <img
                src={Me}
                alt="Portrait of Omid Teimory"
                width="640"
                height="640"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="relative w-full aspect-square object-cover rounded-[28px] border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>

          <div className="w-full lg:w-[60%] flex flex-col justify-center space-y-7">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-100 px-3.5 py-2.5 rounded-full w-fit border border-emerald-400/30 shadow-[0_10px_40px_rgba(16,185,129,0.18)]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-semibold">
                Open to work: freelance or full-time frontend roles
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Frontend Web Developer
            </h1>

            <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
              HTML, CSS, JavaScript, React, React Suite, Tailwind, Bootstrap,
              React Router DOM, Redux, GitHub, Figma, Adobe Illustrator, Postman
              | Studying backend development (Node.js, databases)
            </p>

            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-white/10 rounded-lg border border-white/10 text-sm font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition shadow-lg shadow-blue-900/40"
                href="https://github.com/omid2007hope"
                rel="noopener noreferrer"
                target="_blank"
              >
                View GitHub
              </a>

              <a
                href="/contact"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg font-semibold transition"
              >
                Get In Touch
              </a>
            </div>

            <div className="flex flex-wrap gap-8 pt-6">
              {social.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col items-center space-y-2"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition flex justify-center items-center font-bold"
                    aria-label={item.name}
                  >
                    {item.icon}
                  </a>
                  <span className="text-sm font-semibold">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-500 px-5 py-5 flex items-center justify-center rounded-full hover:bg-blue-600 border-2 border-blue-950 fixed right-8 bottom-8"
            aria-label="Open chat"
            aria-expanded={open}
            aria-controls="portfolio-chatbox"
          >
            <Atom size={35} />
          </button>
          <ChatBox open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default Home;
