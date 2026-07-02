"use client";

import PageSection from "@/components/layout/PageSection";
import SiteFooter from "@/components/layout/SiteFooter";
import EngagementBoard from "@/features/publicChat/components/EngagementBoard";
import ChatSidebar from "@/features/publicChat/components/ChatSidebar";
import useChatGroups from "@/features/publicChat/hooks/useChatGroups";

/**
 * PublicChatPage - Main chat page with group selection sidebar and engagement board
 * Allows users to switch between different chat channels (General, Q&A, etc.)
 * Displays messages, replies, and reactions within the selected channel
 */
function PublicChatPage({ profile }) {
  const { selectedGroupId, selectedGroup, switchGroup, availableGroups } =
    useChatGroups("public");

  return (
    <PageSection>
      <div className="space-y-8">
        {/* Page header */}
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200/80">
            Community Discussion
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Public Chat
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            Join the community conversation. Ask questions, share insights, and
            engage with others.
          </p>
        </header>

        {/* Chat container with sidebar and engagement board */}
        <div className="grid min-h-[620px] grid-cols-1 gap-6 rounded-3xl border border-white/10 bg-slate-950/30 p-4 md:p-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-8">
          {/* Sidebar for group selection */}
          <ChatSidebar
            groups={availableGroups}
            selectedGroupId={selectedGroupId}
            onSelectGroup={switchGroup}
          />

          {/* Main chat engagement board */}
          <EngagementBoard
            key={selectedGroupId}
            scope={selectedGroup.scope}
            targetId="main"
            title={selectedGroup.label}
            description={selectedGroup.description}
            composerPlaceholder={`Start a conversation in ${selectedGroup.label}...`}
          />
        </div>

        {/* Footer */}
        <SiteFooter profile={profile} />
      </div>
    </PageSection>
  );
}

export default PublicChatPage;
