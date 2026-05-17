import PageSection from "@/components/layout/PageSection";
import SiteFooter from "@/components/layout/SiteFooter";
import { Dice1, Send } from "lucide-react";

const dataSamlpe_1 = [
  { id: 1, groupeName: "generalChat" },
  { id: 2, groupeName: "QandA" },
];

const dataSample_2 = [
  {
    id: 1,
    message: "test message",
    date: new Date(),
    likes: 10,
    dislikes: 5,
    replys: [
      {
        id: 1,
        message: "test message",
        date: new Date(),
        likes: 10,
        dislikes: 5,
      },
    ],
  },
];

function PublicChatPage({ profile }) {
  return (
    <PageSection>
      <div className="w-full h-7/10 flex flex-col border">
        <div className="w-full h-full flex flex-row">
          <aside className="w-3/10 h-full border-r">
            {/* chat box's EXP general, meme, QandA, ruls and more discord style  */}
            <div className="flex flex-col justify-start items-center w-full h-9/10">
              <div className="gap-1 mt-1 flex flex-col justify-start items-center w-full h-full">
                {dataSamlpe_1.map((items) => {
                  return (
                    <div
                      className="py-1 w-95/100 rounded-lg flex justify-center items-center border"
                      key={items.id}
                    >
                      {items.groupeName}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* input box */}
            <div className="flex flex-col w-full h-1/10s border-t p-2 gap-2">
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
          <div className="flex flex-col justify-center items-center w-7/10 h-full">
            {dataSample_2.map((items) => {
              return (
                <div
                  key={items.id}
                  className="flex flex-col p-20 rounded-lg border"
                >
                  {/* Video or image for the future need bcakend first */}
                  <div></div>
                  {/* text  */}
                  <div>
                    {/* message */}
                    <div className="flex flex-row items-center "></div>
                    {/* like and dislikes  */}
                    <div className="flex flex-row items-center "></div>
                    {/* replys  */}
                    {items.replys.map((rep) => {
                      return null;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <SiteFooter profile={profile} />
    </PageSection>
  );
}

export default PublicChatPage;
