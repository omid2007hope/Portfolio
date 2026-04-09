import Link from "next/link";
import Panel from "@/components/ui/Panel";

function AboutSidebar({ profile, aboutCards = [] }) {
  return (
    <div className="flex flex-col gap-6">
      <AboutFact label="Location" value={profile?.location || "Vienna, Austria"} />
      <AboutFact
        label="Languages"
        value={profile?.spokenLanguages?.join(", ") || "English (Fluent)"}
      />
      <AboutFact
        label="Email"
        value={profile?.email || "omidhope2007@gmail.com"}
        className="break-all"
      />

      <Panel className="border-green-600/30 bg-green-700/10 p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-green-200">
          Availability
        </p>
        <p className="mt-2 text-xl font-semibold text-green-100">
          {profile?.availabilityText || "Open to work and new projects"}
        </p>
      </Panel>

      {aboutCards.map((card) => (
        <AboutFact key={card.label} label={card.label} value={card.value} />
      ))}

      <Link
        className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-4 text-center font-semibold transition hover:bg-blue-700"
        href="/contact"
      >
        Get In Touch
      </Link>
    </div>
  );
}

function AboutFact({ label, value, className = "" }) {
  return (
    <Panel className="p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
        {label}
      </p>
      <p className={`mt-2 text-xl font-semibold ${className}`.trim()}>{value}</p>
    </Panel>
  );
}

export default AboutSidebar;
