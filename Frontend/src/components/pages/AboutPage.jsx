import Link from "next/link";
import SiteFooter from "@/components/layout/SiteFooter";

function About({ profile }) {
  const aboutParagraphs = profile?.aboutParagraphs?.length
    ? profile.aboutParagraphs
    : [
        {
          content:
            "As a passionate web developer, I specialize in building intuitive, responsive, and accessible web applications.",
        },
        {
          content:
            "I focus on building products that are both visually sharp and technically solid.",
        },
        {
          content:
            "Let us build something exceptional together. I am open to work, collaborations, and freelance engagements.",
        },
      ];

  const aboutCards = profile?.aboutCards?.length
    ? profile.aboutCards
    : [
        { label: "Primary stack", value: profile?.primaryStack || "React, Next.js, Tailwind" },
        { label: "Current focus", value: profile?.currentFocus || "Frontend + backend growth" },
      ];

  return (
    <section className="flex min-h-[calc(100vh-5rem)] w-full justify-center px-6 py-8 text-white">
      <div className="flex w-full max-w-6xl flex-col justify-center">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold">
            About {profile?.fullName || "Omid Teimory"}
          </h1>
          <p className="mt-2 text-lg text-white/70">
            Learn more about {profile?.fullName || "me"}, the work behind this portfolio, and how we can collaborate.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
                Location
              </p>
              <h1 className="mt-2 text-xl font-semibold">
                {profile?.location || "Vienna, Austria"}
              </h1>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
                Languages
              </p>
              <h1 className="mt-2 text-xl font-semibold">
                {profile?.spokenLanguages?.join(", ") || "English (Fluent)"}
              </h1>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
                Email
              </p>
              <h1 className="mt-2 break-all text-xl font-semibold">
                {profile?.email || "omidhope2007@gmail.com"}
              </h1>
            </div>

            <div className="rounded-2xl border border-green-600/30 bg-green-700/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-green-200">
                Availability
              </p>
              <h1 className="mt-2 text-xl font-semibold text-green-100">
                {profile?.availabilityText || "Open to work and new projects"}
              </h1>
            </div>

            {aboutCards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
                  {card.label}
                </p>
                <h1 className="mt-2 text-xl font-semibold">{card.value}</h1>
              </div>
            ))}

            <Link
              className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-4 text-center font-semibold transition hover:bg-blue-700"
              href="/contact"
            >
              Get In Touch
            </Link>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 lg:col-span-2">
            <h2 className="text-2xl font-extrabold leading-snug">
              {profile?.headline || "Crafting user-focused digital experiences."}
            </h2>

            {aboutParagraphs.map((paragraph, index) => (
              <p key={`${paragraph.content}-${index}`} className="mt-5 text-lg leading-relaxed text-white/80">
                {paragraph.content}
              </p>
            ))}
          </div>
        </div>

        <SiteFooter profile={profile} />
      </div>
    </section>
  );
}

export default About;
