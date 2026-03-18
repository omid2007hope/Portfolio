"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react";
import Me from "../../../app/assets/image/Me.jpg";
import { getSocialIcon } from "@/lib/social-icons";
import { getHeroSkills, getHighlights, getSocialLinks } from "@/lib/site-content";

const ChatBox = dynamic(() => import("@/components/features/chat/ChatBox"), {
  ssr: false,
});

function Home({ profile }) {
  const [open, setOpen] = useState(false);
  const skills = getHeroSkills(profile);
  const social = getSocialLinks(profile);
  const highlights = getHighlights(profile);

  const primaryCtaLabel = profile?.homePrimaryCtaLabel || "View Portfolio";
  const primaryCtaUrl =
    profile?.homePrimaryCtaUrl || profile?.portfolioUrl || "/projects";
  const secondaryCtaLabel = profile?.homeSecondaryCtaLabel || "Explore Projects";
  const secondaryCtaUrl = profile?.homeSecondaryCtaUrl || "/projects";

  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-6 py-8 text-white">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="order-2 space-y-8 lg:order-1">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-[0_10px_40px_rgba(34,211,238,0.18)]">
            <BriefcaseBusiness className="h-4 w-4" />
            {profile?.availabilityText || "Open to freelance and full-time full-stack roles"}
          </div>

          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-200/75">
              {profile?.jobTitle || "Full-Stack Developer"}
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl xl:text-7xl">
              {profile?.headline || "Full-stack developer specialized in frontend experiences."}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              {profile?.shortBio ||
                "I build full-stack web products with a frontend-first mindset, combining React, Next.js, modern CSS, and scalable architecture for fast, polished user experiences."}
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
            {primaryCtaUrl.startsWith("http") ? (
              <a
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
                href={primaryCtaUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {primaryCtaLabel}
                <ArrowRight className="h-4 w-4" />
              </a>
            ) : (
              <Link
                href={primaryCtaUrl}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                {primaryCtaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}

            <Link
              href={secondaryCtaUrl}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              {secondaryCtaLabel}
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
            {social.map((item) => {
              const Icon = getSocialIcon(item.iconKey);
              return (
                <div key={`${item.name}-${item.url}`} className="flex flex-col items-center space-y-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
                    aria-label={item.name}
                  >
                    <Icon />
                  </a>
                  <span className="text-sm font-semibold text-slate-300">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="relative w-full max-w-xl">
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.34),transparent_25%),radial-gradient(circle_at_70%_80%,rgba(37,99,235,0.34),transparent_30%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(15,23,42,0.92),rgba(10,35,64,0.86))] p-5 shadow-[0_30px_120px_rgba(2,8,23,0.55)]">
              <div className="mb-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-200/65">
                    {profile?.heroBadge || "Currently building"}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {profile?.currentFocus || "Frontend-led product work with backend architecture support"}
                  </p>
                </div>
                <div className="rounded-full bg-emerald-400/15 p-3 text-emerald-200">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/50">
                {profile?.portraitImage ? (
                  <img
                    src={profile.portraitImage}
                    alt={`Portrait of ${profile.fullName || "Omid Teimory"}`}
                    className="aspect-[4/5] w-full object-cover object-center"
                  />
                ) : (
                  <Image
                    src={Me}
                    alt="Portrait of Omid Teimory"
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="aspect-[4/5] w-full object-cover object-center"
                  />
                )}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Core strengths
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    {profile?.primaryStack ||
                      "React, Next.js, Tailwind CSS, Node.js, MongoDB, and product-focused UI systems."}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-sky-400/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-sky-200/70">
                    Next step
                  </p>
                  <p className="mt-2 text-sm leading-6 text-sky-50">
                    {profile?.longBio ||
                      "I lead with frontend quality, then support it with backend architecture, APIs, and data flows that keep the product fast, reliable, and maintainable."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="fixed bottom-8 right-8 z-[160] flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/20 bg-blue-600 text-white shadow-[0_20px_60px_rgba(37,99,235,0.45)] transition hover:bg-blue-500"
            aria-label="Open chat"
            aria-expanded={open}
            aria-controls="portfolio-chatbox"
          >
            <Atom size={30} />
          </button>
        )}
        <ChatBox open={open} setOpen={setOpen} />
      </div>
    </section>
  );
}

export default Home;
