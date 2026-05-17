import PageSection from "@/components/layout/PageSection";
import SiteFooter from "@/components/layout/SiteFooter";
import EngagementBoard from "@/features/publicChat/components/EngagementBoard";
import { Send } from "lucide-react";

function PublicChatPage({ profile }) {
  return (
    <PageSection>
      <div className="w-full h-7/10 flex flex-col border">
        <div className="w-full h-full flex flex-row">
          <aside className="w-3/10 h-full border-r">
            {/* chat box's EXP general, meme, QandA, ruls and more discord style  */}
            <div className="w-full h-9/10"></div>

            {/* input box */}
            <div className="flex flex-col w-full h-1/10 border-t p-2 gap-2">
              <input
                type="text"
                placeholder="Name"
                className="w-full border rounded-lg px-2 py-1"
              />
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Message"
                  className="flex-1 border rounded-lg px-2 py-1"
                />
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Send />
                </button>
              </div>
            </div>
          </aside>
          {/* Chat box -- Renrders chat here  */}
          <div className="w-7/10 h-full"></div>
        </div>
      </div>
      <SiteFooter profile={profile} />
    </PageSection>
  );
}

export default PublicChatPage;
