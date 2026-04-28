/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Award, Link as LinkIcon, Mail, MapPin, Phone } from "lucide-react";
import Me from "@/app/assets/image/Home Page.webp";
import { getDisplayName, getJobTitle } from "@/lib/site-content";

function ResumeSidebar({
  resume,
  profile,
  importantLinks,
  languages,
  certificates,
}) {
  return (
    <aside className="h-fit w-full space-y-10 rounded-2xl border border-white/10 bg-white/5 p-6 lg:w-1/4">
      <div className="flex items-center gap-4">
        {resume?.avatarImage ? (
          <img
            src={resume.avatarImage}
            alt={`${resume.profileName || "Resume"} headshot`}
            width={64}
            height={64}
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
          <p className="text-lg font-bold">
            {resume?.profileName || getDisplayName(profile)}
          </p>
          <p className="text-sm text-white/60">
            {resume?.headline || getJobTitle(profile)}
          </p>
        </div>
      </div>

      <div className="space-y-4 text-sm">
        <ResumeContact
          icon={Mail}
          value={resume?.email || profile?.email || "omidhope2007@gmail.com"}
        />
        <ResumeContact
          icon={Phone}
          value={
            resume?.phoneNumber || profile?.phoneNumber || "+43 681-81580180"
          }
        />
        <ResumeContact
          icon={MapPin}
          value={resume?.address || profile?.address || "Vienna, Austria"}
        />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-white">
          Important Links
        </p>

        {importantLinks.length ? (
          importantLinks.map((link) => (
            <div
              key={`${link.label}-${link.url}`}
              className="flex items-center gap-2 text-sm text-white/80"
            >
              <LinkIcon size={16} />
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                {link.label}
              </a>
            </div>
          ))
        ) : (
          <p className="text-sm text-white/60">No links added yet.</p>
        )}
      </div>

      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-white">
          Languages
        </p>
        <ul className="mt-3 space-y-1 text-sm text-white/80">
          {languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-white">
          Certificates
        </p>

        <div className="mt-3 space-y-3 text-sm text-white/80">
          {certificates.length ? (
            certificates.map((certificate) => (
              <div
                key={`${certificate.title}-${certificate.credentialUrl || certificate.issuedAtLabel}`}
                className="flex items-start gap-2"
              >
                <Award size={16} className="mt-1" />
                <div>
                  <p className="font-semibold">{certificate.title}</p>
                  {certificate.issuer ? (
                    <p className="text-xs opacity-70">{certificate.issuer}</p>
                  ) : null}
                  {certificate.issuedAtLabel ? (
                    <p className="text-xs opacity-70">
                      Issued: {certificate.issuedAtLabel}
                    </p>
                  ) : null}
                  {certificate.score ? (
                    <p className="text-xs opacity-70">
                      Score: {certificate.score}
                    </p>
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
  );
}

function ResumeContact({ icon: Icon, value }) {
  return (
    <div className="flex items-center gap-2 text-white/80">
      <Icon size={16} />
      <span>{value}</span>
    </div>
  );
}

export default ResumeSidebar;
