/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Me from "@/app/assets/image/Home Page.webp";
import { getDisplayName, getJobTitle } from "@/lib/site-content";

function ResumeHero({ resume, profile }) {
  return (
    <header className="flex flex-col items-center gap-8 md:flex-row md:items-start">
      {resume?.avatarImage ? (
        <img
          src={resume.avatarImage}
          alt={resume.profileName || "Resume avatar"}
          className="h-40 w-40 rounded-2xl border border-white/10 object-cover shadow-lg"
        />
      ) : (
        <Image
          src={Me}
          alt={getDisplayName(profile)}
          width={160}
          height={160}
          priority
          className="h-40 w-40 rounded-2xl border border-white/10 object-cover shadow-lg"
        />
      )}

      <div>
        <h1 className="text-4xl font-extrabold">
          {resume?.profileName || getDisplayName(profile)}
        </h1>
        <p className="mt-2 text-lg text-white/60">
          {resume?.headline || getJobTitle(profile)}
        </p>

        <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
          {resume?.summary ||
            profile?.shortBio ||
            "Resume content is not available yet."}
        </p>
      </div>
    </header>
  );
}

export default ResumeHero;
