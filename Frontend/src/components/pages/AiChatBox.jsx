"use client";

import { useEffect, useRef, useState } from "react";
import { Forward, X } from "lucide-react";
import { getChatConversation, sendChatMessage } from "@/lib/api";

const STORAGE_KEY = "portfolio-chat-session-id";
const defaultMessage = {
  id: "welcome",
  text: "Welcome! Ask me anything.",
  from: "bot",
  time: "now",
};

const formatMessageTime = (value) => {
  if (!value) {
    return "now";
  }

  return new Date(value).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const mapBackendMessages = (messages = []) =>
  messages.map((message, index) => ({
    id: `${message.sentAt || index}-${index}`,
    text: message.text,
    from: message.sender === "user" ? "you" : "bot",
    time: formatMessageTime(message.sentAt),
  }));

function ChatBox({ open, setOpen }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([defaultMessage]);
  const [sessionId] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const existingSessionId = window.localStorage.getItem(STORAGE_KEY);
    const nextSessionId =
      existingSessionId ||
      window.crypto?.randomUUID?.() ||
      `portfolio-${Date.now()}`;

    window.localStorage.setItem(STORAGE_KEY, nextSessionId);
    return nextSessionId;
  });

  const listRef = useRef(null);
  const taRef = useRef(null);

  useEffect(() => {
    if (!sessionId || !open) {
      return;
    }

    let cancelled = false;

    const loadConversation = async () => {
      const conversation = await getChatConversation(sessionId);

      if (cancelled || !conversation?.messages?.length) {
        return;
      }

      setMessages(mapBackendMessages(conversation.messages));
    };

    loadConversation();

    return () => {
      cancelled = true;
    };
  }, [open, sessionId]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${ta.scrollHeight}px`;
  }, [message]);

  const markError = (id, text) => {
    setMessages((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              text,
              time: formatMessageTime(new Date()),
            }
          : entry,
      ),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !sessionId) return;

    const userMsg = {
      id: Date.now(),
      text: message.trim(),
      from: "you",
      time: formatMessageTime(new Date()),
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessage("");

    const thinkingId = `${Date.now()}-thinking`;

    setMessages((prev) => [
      ...prev,
      { id: thinkingId, text: "Thinking...", from: "bot", time: "now" },
    ]);

    try {
      const data = await sendChatMessage({
        sessionId,
        message: userMsg.text,
      });

      markError(thinkingId, data.reply || "No reply received.");
    } catch (err) {
      markError(thinkingId, `Error: ${err.message || "Could not reach server."}`);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

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
          <button onClick={() => setOpen(false)} className="rounded-md p-1 hover:bg-white/10">
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
              className={`flex ${entry.from === "you" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[78%] rounded-lg px-3 py-2 text-sm leading-snug shadow-sm ${
                  entry.from === "you"
                    ? "rounded-br-sm bg-blue-600 text-white"
                    : "border border-blue-100 bg-white text-slate-700"
                }`}
              >
                <div>{entry.text}</div>
                <div className="mt-1 text-right text-[10px] opacity-70">{entry.time}</div>
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
              ref={taRef}
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={onKeyDown}
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
