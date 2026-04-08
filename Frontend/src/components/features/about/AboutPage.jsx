import Link from "next/link";
import SiteFooter from "@/components/layout/SiteFooter";
import { getDisplayName } from "@/lib/site-content";

function About({ profile }) {
  const displayName = getDisplayName(profile);
  const aboutParagraphs = [
    {
      content:
        "I build complete web applications from idea to launch, starting with a clear frontend and the simplest useful user flow.",
    },
    {
      content:
        "When a project needs more than good visuals, I connect the interface to APIs, authentication, and data flows without making the product feel heavy.",
    },
    {
      content:
        "The goal is always the same: fast pages, clean structure, and code that is easy to maintain after launch.",
    },
  ];
  const aboutCards = [
    {
      label: "Primary stack",
      value:
        profile?.primaryStack ||
        "React, Next.js, Tailwind CSS, Node.js, MongoDB",
    },
    {
      label: "Working style",
      value: "Fast, practical, and production-focused",
    },
  ];

  return (
    <section className="flex min-h-[calc(100vh-5rem)] w-full justify-center px-6 py-8 text-white">
      <div className="flex w-full max-w-6xl flex-col justify-center">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold">About {displayName}</h1>
          <p className="mt-2 text-lg text-white/70">
            A short look at how {displayName} builds fast, production-ready web
            applications.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
                Location
              </p>
              <p className="mt-2 text-xl font-semibold">
                {profile?.location || "Vienna, Austria"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
                Languages
              </p>
              <p className="mt-2 text-xl font-semibold">
                {profile?.spokenLanguages?.join(", ") || "English (Fluent)"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
                Email
              </p>
              <p className="mt-2 break-all text-xl font-semibold">
                {profile?.email || "omidhope2007@gmail.com"}
              </p>
            </div>

            <div className="rounded-2xl border border-green-600/30 bg-green-700/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-green-200">
                Availability
              </p>
              <p className="mt-2 text-xl font-semibold text-green-100">
                {profile?.availabilityText || "Open to work and new projects"}
              </p>
            </div>

            {aboutCards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
                  {card.label}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{card.value}</h3>
              </div>
            ))}

            <Link
              className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-4 text-center font-semibold transition hover:bg-blue-700"
              href="/contact"
            >
              Get In Touch
            </Link>
          </div>

          <div className="space-y-10 rounded-2xl border border-white/10 bg-white/5 p-8 lg:col-span-2">
            <section>
              <h2 className="text-2xl font-extrabold leading-snug">
                I build fast, modern web applications that help businesses grow.
              </h2>

              {aboutParagraphs.map((paragraph, index) => (
                <p
                  key={`${paragraph.content}-${index}`}
                  className="mt-5 text-lg leading-relaxed text-white/80"
                >
                  {paragraph.content}
                </p>
              ))}
            </section>

            <section className="border-t border-white/10 pt-10">
              <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
                How I work
              </p>
              <h2 className="mt-2 text-2xl font-extrabold leading-snug">
                Clear process, thoughtful implementation, and room to grow
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/80">
                I start by clarifying the goal, then build the smallest useful
                version of the experience and shape the technical layer around
                that. The result is work that is easy to understand, quick to
                use, and straightforward to maintain after launch.
              </p>
            </section>
          </div>
        </div>

        <SiteFooter profile={profile} />
      </div>
    </section>
  );
}

export default About;
