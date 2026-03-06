"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../../app/assets/image/Logo.svg";

function Header({ profile }) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  const navItems =
    profile?.navigationLinks?.length
      ? profile.navigationLinks
      : [
          { label: "Home", to: "/" },
          { label: "About", to: "/about" },
          { label: "Projects", to: "/projects" },
          { label: "Contact", to: "/contact" },
        ];

  const isActive = (route) => pathname === route;
  const availabilityText = profile?.availabilityText || "Open to work";
  const contactCtaLabel = profile?.homeSecondaryCtaLabel || "Get In Touch";

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-slate-950/65 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {profile?.logoImage ? (
            <img
              src={profile.logoImage}
              alt={`${profile.fullName || "Portfolio"} logo`}
              className="h-14 w-14 rounded-2xl border border-white/15 bg-white/5 p-2 object-cover"
            />
          ) : (
            <Image
              src={Logo}
              alt="Omid Teimory logo"
              width={56}
              height={56}
              className="h-14 w-14 rounded-2xl border border-white/15 bg-white/5 p-2"
              priority
            />
          )}

          <div className="flex flex-col leading-none">
            <Link href="/resume">
              <span className="text-lg font-semibold tracking-tight text-white">
                {profile?.fullName || "Omid Teimory"}
              </span>
            </Link>
            <Link href="/resume">
              <span className="text-sm text-slate-300 transition hover:text-white">
                {profile?.jobTitle || "Frontend developer"}
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
