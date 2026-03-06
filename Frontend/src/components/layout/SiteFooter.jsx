"use client";

import Link from "next/link";

function SiteFooter({ profile }) {
  const navigationLinks =
    profile?.navigationLinks?.length
      ? profile.navigationLinks
      : [
          { label: "Home", to: "/" },
          { label: "Projects", to: "/projects" },
          { label: "About", to: "/about" },
          { label: "Contact", to: "/contact" },
        ];

  const footerText =
    profile?.footerText ||
    `© ${new Date().getFullYear()} Omid Teimory. All rights reserved.`;

  return (
    <div className="mt-20 flex flex-col items-center space-y-4 border-t border-white/10 pt-8">
      <div className="flex flex-wrap justify-center gap-8 text-white/70">
        {navigationLinks.map((item) => (
          <Link key={item.to} href={item.to} className="transition hover:text-white">
            {item.label}
          </Link>
        ))}
      </div>

      <p className="text-center text-sm text-white/40">{footerText}</p>
    </div>
  );
}

export default SiteFooter;
