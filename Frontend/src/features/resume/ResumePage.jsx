import SiteFooter from "@/components/layout/SiteFooter";
import ResumeHero from "@/features/resume/components/ResumeHero";
import ResumeSidebar from "@/features/resume/components/ResumeSidebar";
import ResumeSkillsSection from "@/features/resume/components/ResumeSkillsSection";
import ResumeTimelineSection from "@/features/resume/components/ResumeTimelineSection";

function ResumePage({ resume, profile }) {
  const importantLinks = resume?.importantLinks || [];
  const languages = resume?.languages || ["English - Fluent"];
  const certificates = resume?.certificates || [];
  const experience = resume?.experience || [];
  const education = resume?.education || [];
  const skillGroups = resume?.skillGroups || [];

  return (
    <div className="flex min-h-screen w-full justify-center px-6 py-16 text-white">
      <div className="flex w-full max-w-7xl flex-col gap-12 lg:flex-row">
        <ResumeSidebar
          resume={resume}
          profile={profile}
          importantLinks={importantLinks}
          languages={languages}
          certificates={certificates}
        />

        <main className="w-full space-y-16 lg:w-3/4">
          <ResumeHero resume={resume} profile={profile} />
          <ResumeTimelineSection
            title="Experience"
            entries={experience}
            emptyText="No experience items added yet."
          />
          <ResumeTimelineSection
            title="Education"
            entries={education}
            compact
            emptyText="No education items added yet."
          />
          <ResumeSkillsSection skillGroups={skillGroups} />
          <SiteFooter profile={profile} />
        </main>
      </div>
    </div>
  );
}

export default ResumePage;
