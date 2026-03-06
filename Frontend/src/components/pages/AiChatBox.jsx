"use client";

import { useEffect, useRef, useState } from "react";
import { Forward, X } from "lucide-react";

function ChatBox({ open, setOpen }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome! Ask me anything.", from: "bot", time: "now" },
  ]);

  const listRef = useRef(null);
  const taRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = ta.scrollHeight + "px";
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: message.trim(),
      from: "you",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessage("");

    const thinkingId = Date.now() + 1;

    setMessages((prev) => [
      ...prev,
      { id: thinkingId, text: "Thinking...", from: "bot", time: "now" },
    ]);

    const isDev = process.env.NODE_ENV === "development";
    const DEFAULT_CHAT_API = isDev
      ? "http://localhost:3001/api/chat"
      : "/api/chat";
    const endpoint = process.env.NEXT_PUBLIC_CHAT_API?.trim() || DEFAULT_CHAT_API;

    const markError = (errMsg) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === thinkingId
            ? {
                ...m,
                text: errMsg,
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              }
            : m,
        ),
      );
    };

    if (!endpoint) {
      markError("Chat backend not configured.");
      return;
    }

    // Dev fallback: avoid noisy 404s when no local backend exists.
    const isDefaultEndpoint = endpoint === DEFAULT_CHAT_API;
    if (
      isDev &&
      isDefaultEndpoint &&
      endpoint.includes("localhost")
    ) {
      markError(
        "Chat is offline in dev. Run `npm start` in /Server or set NEXT_PUBLIC_CHAT_API.",
      );
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });

      const contentType = res.headers.get("content-type") || "";
      const rawText = await res.text();
      const isJson = contentType.includes("application/json");

      let data = {};
      if (isJson && rawText.trim().length) {
        try {
          data = JSON.parse(rawText);
        } catch (err) {
          console.error("Failed to parse JSON from /api/chat", err);
          throw new Error("Invalid JSON response from server");
        }
      }

      if (!res.ok) {
        const errMsg =
          data?.reply || rawText || `Request failed with status ${res.status}`;
        console.error("Non-200 response from /api/chat:", res.status, errMsg);
        if (res.status === 404 && isDefaultEndpoint) {
          markError(
            "Chat service not running. Start /Server or set NEXT_PUBLIC_CHAT_API.",
          );
          return;
        }
        throw new Error(errMsg);
      }

      const reply =
        (typeof data?.reply === "string" && data.reply.trim().length
          ? data.reply
          : null) ||
        (rawText?.trim().length ? rawText : null) ||
        "No reply received.";

      setMessages((prev) =>
        prev.map((m) =>
          m.id === thinkingId
            ? {
                ...m,
                text: reply,
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              }
            : m,
        ),
      );
    } catch (err) {
      console.error("Chat request failed", err);
      const msg = err?.message || "Could not reach server.";
      const hint =
        msg.includes("404") || msg.includes("Not Found")
          ? " (deploy /api/chat or set NEXT_PUBLIC_CHAT_API)"
          : "";
      markError(`Error: ${msg}${hint}`);
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
      className={`fixed right-6 bottom-6 z-[170] h-[75vh] max-h-[75vh] w-80 overflow-hidden rounded-xl shadow-2xl transform transition-all duration-200 ${
        open
          ? "scale-100 opacity-100"
          : "scale-95 opacity-0 pointer-events-none"
      }`}
      style={{
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto",
      }}
    >
      {/* MAIN CONTAINER */}
      <div className="flex flex-col h-full bg-slate-100 border border-blue-200 rounded-xl overflow-hidden shadow-lg">
        {/* HEADER */}
        <header className="flex items-center justify-between px-3 py-2 bg-blue-600 text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center text-sm font-semibold">
              CB
            </div>
            <div>
              <div className="text-sm font-medium">Chat</div>
              <div className="text-xs opacity-90">Online</div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1 hover:bg-white/10 rounded-md"
          >
            <X size={16} />
          </button>
        </header>

        {/* MESSAGES */}
        <div
          ref={listRef}
          className="flex-1 min-h-0 px-3 py-3 overflow-y-auto space-y-3 bg-slate-50"
          role="log"
          aria-live="polite"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.from === "you" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[78%] px-3 py-2 rounded-lg text-sm leading-snug shadow-sm ${
                  m.from === "you"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-white border border-blue-100 text-slate-700"
                }`}
              >
                <div>{m.text}</div>
                <div className="text-[10px] opacity-70 mt-1 text-right">
                  {m.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* INPUT BAR */}
        <form
          onSubmit={handleSubmit}
          className="px-3 pb-3 pt-2 bg-slate-100 border-t border-blue-100"
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
              className="flex-1 resize-none text-black px-3 py-2 min-h-[36px] max-h-28 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400 bg-white text-sm"
            />

            <button
              type="submit"
              disabled={!message.trim()}
              className="p-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition"
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
