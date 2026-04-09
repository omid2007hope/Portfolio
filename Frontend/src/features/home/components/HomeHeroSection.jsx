"use client";
/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Sparkles } from "lucide-react";
import Me from "@/app/assets/image/Home Page.webp";
import { getSocialIcon } from "@/lib/social-icons";
import {
  getHeaderAvailabilityText,
  getHighlights,
  getHeroSkills,
  getHomeAvailabilityNote,
  getHomeDescription,
  getHomeEyebrow,
  getHomeFeaturedDescription,
  getHomeFeaturedTitle,
  getHomeNextStepText,
  getHomeNextStepTitle,
  getHomeStrengthsText,
  getHomeStrengthsTitle,
  getHomeSupportText,
  getHomeTitle,
  getPrimaryCtaLabel,
  getPrimaryCtaUrl,
  getSecondaryCtaLabel,
  getSecondaryCtaUrl,
  getSocialLinks,
} from "@/lib/site-content";

function HomeHeroSection({ profile }) {
  const skills = getHeroSkills(profile);
  const social = getSocialLinks(profile);
  const highlights = getHighlights(profile);
  const primaryCtaLabel = getPrimaryCtaLabel(profile);
  const primaryCtaUrl = getPrimaryCtaUrl(profile);
  const secondaryCtaLabel = getSecondaryCtaLabel(profile);
  const secondaryCtaUrl = getSecondaryCtaUrl(profile);

  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-6 py-8 text-white">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="order-2 space-y-8 lg:order-1">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-[0_10px_40px_rgba(34,211,238,0.18)]">
            <BriefcaseBusiness className="h-4 w-4" />
            {profile?.availabilityText || getHeaderAvailabilityText(profile)}
          </div>

          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-200/75">
              {getHomeEyebrow(profile)}
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl xl:text-7xl">
              {getHomeTitle(profile)}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              {getHomeDescription(profile)}
            </p>
            <div className="space-y-2 text-sm font-medium uppercase tracking-[0.2em] text-cyan-100/75">
              <p>{getHomeAvailabilityNote(profile)}</p>
              <p>{getHomeSupportText(profile)}</p>
            </div>
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

          <div className="flex flex-wrap gap-4">
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
            <PrimaryCta href={primaryCtaUrl} label={primaryCtaLabel} />

            <Link
              href={secondaryCtaUrl}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              {secondaryCtaLabel}
              <Sparkles className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-8 pt-4">
            {social.map((item) => {
              const Icon = getSocialIcon(item.iconKey);

              return (
                <div
                  key={`${item.name}-${item.url}`}
                  className="flex flex-col items-center space-y-2"
                >
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
                    {getHomeFeaturedDescription(profile)}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {getHomeFeaturedTitle(profile)}
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
                    {getHomeStrengthsTitle(profile)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    {getHomeStrengthsText(profile)}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-sky-400/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-sky-200/70">
                    {getHomeNextStepTitle(profile)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-sky-50">
                    {getHomeNextStepText(profile)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrimaryCta({ href, label }) {
  const className =
    "inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200";

  if (href.startsWith("http")) {
    return (
      <a href={href} rel="noopener noreferrer" target="_blank" className={className}>
        {label}
        <ArrowRight className="h-4 w-4" />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export default HomeHeroSection;
