"use client";
/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  getDisplayName,
  getHeaderAvailabilityText,
  getHeaderBannerText,
  getHeaderContactCtaLabel,
  getJobTitle,
  getNavigationLinks,
} from "@/lib/site-content";

function Header({ profile }) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const progressMessage = getHeaderBannerText(profile);
  const navItems = getNavigationLinks(profile);

  const isActive = (route) => pathname === route;
  const availabilityText = getHeaderAvailabilityText(profile);
  const contactCtaLabel = getHeaderContactCtaLabel(profile);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-slate-950/65 backdrop-blur-xl">
      <div className="border-b border-amber-300/15 bg-amber-400/10 px-6 py-2 text-center text-xs font-medium tracking-[0.18em] text-amber-100 uppercase">
        {progressMessage}
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {profile?.logoImage ? (
            <img
              src={profile.logoImage}
              alt={`${getDisplayName(profile)} logo`}
              className="h-14 w-14 rounded-2xl border border-white/15 bg-white/5 p-2 object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-lg font-semibold text-white">
              {getDisplayName(profile).slice(0, 1)}
            </div>
          )}

          <div className="flex flex-col leading-none">
            <Link href="/resume">
              <span className="text-lg font-semibold tracking-tight text-white">
                {getDisplayName(profile)}
              </span>
            </Link>
            <Link href="/resume">
              <span className="text-sm text-slate-300 transition hover:text-white">
                {getJobTitle(profile)}
              </span>
            </Link>
          </div>
        </div>

        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className={`text-sm font-semibold transition ${
                isActive(item.to)
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-100">
            {availabilityText}
          </span>

          <Link
            href="/contact"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            {contactCtaLabel}
          </Link>
        </nav>

        <button
          type="button"
          className="p-3 text-white md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="space-y-4 border-t border-white/10 bg-slate-950/95 px-6 py-5 backdrop-blur-md md:hidden">
          <div className="rounded-lg border border-amber-300/20 bg-amber-400/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100">
            {progressMessage}
          </div>

          {navItems.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              onClick={() => setOpen(false)}
              className={`block text-base font-semibold transition ${
                isActive(item.to)
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-100">
            {availabilityText}
          </div>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block w-full rounded-xl bg-white px-5 py-3 text-center font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            {contactCtaLabel}
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
