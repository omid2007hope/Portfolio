"use client";

import { Forward, X } from "lucide-react";
import { usePortfolioChat } from "@/features/chat/hooks/usePortfolioChat";

function ChatBox({ open, setOpen }) {
  const {
    message,
    messages,
    listRef,
    textareaRef,
    setMessage,
    handleSubmit,
    handleKeyDown,
  } = usePortfolioChat(open);

  return (
    <aside
      id="portfolio-chatbox"
      role="complementary"
      aria-label="Chat"
      className={`fixed bottom-6 right-6 z-[170] h-[75vh] max-h-[75vh] w-80 overflow-hidden rounded-xl shadow-2xl transition-all duration-200 ${
        open
          ? "scale-100 opacity-100"
          : "pointer-events-none scale-95 opacity-0"
      }`}
      style={{
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto",
      }}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-blue-200 bg-slate-100 shadow-lg">
        <header className="flex items-center justify-between bg-blue-600 px-3 py-2 text-white">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/25 text-sm font-semibold">
              CB
            </div>
            <div>
              <div className="text-sm font-medium">Chat</div>
              <div className="text-xs opacity-90">Online</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-md p-1 hover:bg-white/10"
          >
            <X size={16} />
          </button>
        </header>

        <div
          ref={listRef}
          className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-slate-50 px-3 py-3"
          role="log"
          aria-live="polite"
        >
          {messages.map((entry) => (
            <div
              key={entry.id}
              className={`flex ${
                entry.from === "you" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[78%] rounded-lg px-3 py-2 text-sm leading-snug shadow-sm ${
                  entry.from === "you"
                    ? "rounded-br-sm bg-blue-600 text-white"
                    : "border border-blue-100 bg-white text-slate-700"
                }`}
              >
                <div>{entry.text}</div>
                <div className="mt-1 text-right text-[10px] opacity-70">
                  {entry.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t border-blue-100 bg-slate-100 px-3 pb-3 pt-2"
        >
          <div className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              rows={1}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              aria-label="Message text"
              className="min-h-[36px] max-h-28 flex-1 resize-none rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              disabled={!message.trim()}
              className="rounded-lg bg-blue-600 p-2.5 text-white transition hover:bg-blue-700 disabled:opacity-50"
              aria-label="Send message"
            >
              <Forward size={16} />
            </button>
          </div>
        </form>
      </div>
    </aside>
  );
}

export default ChatBox;
