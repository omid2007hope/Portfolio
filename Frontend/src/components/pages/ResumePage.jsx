import Image from "next/image";
import {
  Award,
  Book,
  Link as LinkIcon,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Me from "../../app/assets/image/Me.jpg";
import SiteFooter from "@/components/layout/SiteFooter";

function Resume({ resume, profile }) {
  const importantLinks = resume?.importantLinks || [];
  const languages = resume?.languages || ["English - Fluent"];
  const certificates = resume?.certificates || [];
  const experience = resume?.experience || [];
  const education = resume?.education || [];
  const skillGroups = resume?.skillGroups || [];

  return (
    <div className="flex min-h-screen w-full justify-center px-6 py-16 text-white">
      <div className="flex w-full max-w-7xl flex-col gap-12 lg:flex-row">
        <aside className="h-fit w-full space-y-10 rounded-2xl border border-white/10 bg-white/5 p-6 lg:w-1/4">
          <div className="flex items-center gap-4">
            {resume?.avatarImage ? (
              <img
                src={resume.avatarImage}
                alt={`${resume.profileName || "Resume"} headshot`}
                className="h-16 w-16 rounded-full border border-white/10 bg-white/20 object-cover"
              />
            ) : (
              <Image
                src={Me}
                alt="Omid Teimory headshot"
                width={64}
                height={64}
                className="h-16 w-16 rounded-full border border-white/10 bg-white/20 object-cover"
              />
            )}
            <div>
              <h2 className="text-lg font-bold">{resume?.profileName || profile?.fullName || "Omid Teimory"}</h2>
              <p className="text-sm text-white/60">{resume?.headline || profile?.jobTitle || "Frontend Developer"}</p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-2 text-white/80">
              <Mail size={16} /> <span>{resume?.email || profile?.email || "omidhope2007@gmail.com"}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Phone size={16} /> <span>{resume?.phoneNumber || profile?.phoneNumber || "+43 681-81580180"}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin size={16} />
              <span>{resume?.address || profile?.address || "Vienna, Austria"}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Important Links
            </h3>

            {importantLinks.length ? (
              importantLinks.map((link) => (
                <div key={`${link.label}-${link.url}`} className="flex items-center gap-2 text-sm text-white/80">
                  <LinkIcon size={16} />
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                    {link.label}
                  </a>
                </div>
              ))
            ) : (
              <p className="text-sm text-white/60">No links added yet.</p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Languages
            </h3>
            <ul className="mt-3 space-y-1 text-sm text-white/80">
              {languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Certificates
            </h3>

            <div className="mt-3 space-y-3 text-sm text-white/80">
              {certificates.length ? (
                certificates.map((certificate) => (
                  <div key={`${certificate.title}-${certificate.credentialUrl || certificate.issuedAtLabel}`} className="flex items-start gap-2">
                    <Award size={16} className="mt-1" />
                    <div>
                      <p className="font-semibold">{certificate.title}</p>
                      {certificate.issuer ? (
                        <p className="text-xs opacity-70">{certificate.issuer}</p>
                      ) : null}
                      {certificate.issuedAtLabel ? (
                        <p className="text-xs opacity-70">Issued: {certificate.issuedAtLabel}</p>
                      ) : null}
                      {certificate.score ? (
                        <p className="text-xs opacity-70">Score: {certificate.score}</p>
                      ) : null}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white/60">No certificates added yet.</p>
              )}
            </div>
          </div>
        </aside>

        <main className="w-full space-y-16 lg:w-3/4">
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
                alt="Omid Teimory"
                width={160}
                height={160}
                priority
                className="h-40 w-40 rounded-2xl border border-white/10 object-cover shadow-lg"
              />
            )}

            <div>
              <h1 className="text-4xl font-extrabold">{resume?.profileName || profile?.fullName || "Omid Teimory"}</h1>
              <p className="mt-2 text-lg text-white/60">
                {resume?.headline || profile?.jobTitle || "Frontend Developer & UI/UX Designer"}
              </p>

              <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
                {resume?.summary || profile?.shortBio || "Resume content is not available yet."}
              </p>
            </div>
          </header>

          <section>
            <h2 className="mb-6 text-2xl font-bold">Experience</h2>
            {experience.length ? (
              experience.map((entry) => (
                <ResumeEntry key={`${entry.title}-${entry.period}`} entry={entry} />
              ))
            ) : (
              <p className="text-white/70">No experience items added yet.</p>
            )}
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold">Education</h2>
            {education.length ? (
              education.map((entry) => (
                <ResumeEntry key={`${entry.title}-${entry.period}`} entry={entry} compact />
              ))
            ) : (
              <p className="text-white/70">No education items added yet.</p>
            )}
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold">Skills</h2>
            {skillGroups.length ? (
              skillGroups.map((group) => (
                <SkillGroup key={group.title} title={group.title} items={group.items} />
              ))
            ) : (
              <p className="text-white/70">No skill groups added yet.</p>
            )}
          </section>

          <SiteFooter profile={profile} />
        </main>
      </div>
    </div>
  );
}

function ResumeEntry({ entry, compact = false }) {
  return (
    <div className="mb-10 flex gap-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
        <Book />
      </div>

      <div>
        <h3 className="text-lg font-bold">{entry.title}</h3>
        {(entry.period || entry.location || entry.subtitle) && (
          <p className="text-sm text-white/60">
            {[entry.subtitle, entry.period, entry.location].filter(Boolean).join(" - ")}
          </p>
        )}

        {entry.description ? (
          <p className="mt-2 max-w-2xl text-white/80">{entry.description}</p>
        ) : null}

        {entry.bullets?.length ? (
          <ul className={`mt-3 list-disc space-y-1 text-white/80 ${compact ? "ml-5" : "ml-6"}`}>
            {entry.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function SkillGroup({ title, items }) {
  return (
    <div className="mb-8">
      <h4 className="text-sm font-semibold uppercase text-white/60">{title}</h4>
      <div className="mt-3 flex flex-wrap gap-2">
        {(items || []).map((item) => (
          <span
            key={item}
            className="rounded-lg border border-white/10 bg-white/10 px-4 py-1 text-sm font-semibold"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Resume;
