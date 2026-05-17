"use client";

import PageSection from "@/components/layout/PageSection";
import SiteFooter from "@/components/layout/SiteFooter";
import EngagementBoard from "@/features/publicChat/components/EngagementBoard";

/**
 * QandAPage - Simplified Q&A community page
 * Focuses specifically on Q&A discussions
 * Uses EngagementBoard directly for a streamlined experience
 */
function QandAPage({ profile }) {
  return (
    <PageSection>
      <div className="space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200/80">
            Knowledge Hub
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Q&A Community Page
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            Ask practical development questions and answer others with clear,
            experience-based solutions.
          </p>
        </header>

        <EngagementBoard
          scope="qanda"
          targetId="main"
          title="Ask or Answer"
          description="Questions are messages; replies are threaded answers."
          composerPlaceholder="Ask a question or share an answer"
        />

        <SiteFooter profile={profile} />
      </div>
    </PageSection>
  );
}

export default QandAPage;
