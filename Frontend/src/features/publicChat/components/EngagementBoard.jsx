"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  createMessage,
  createReply,
  getMessages,
  getReplies,
  toggleMessageDislike,
  toggleMessageLike,
  toggleReplyDislike,
  toggleReplyLike,
} from "@/api/chat/Chat_API";

const USER_ID_KEY = "pp-chat-user-id";
const AUTH_TOKEN_KEY = "pp-chat-auth-token";

const buildUserId = () =>
  `guest-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const toTime = (value) => {
  if (!value) {
    return "";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return parsed.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function EngagementBoard({
  scope,
  targetId,
  title,
  description,
  composerPlaceholder,
  compact = false,
  collapsible = false,
}) {
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [messageDraft, setMessageDraft] = useState("");
  const [replyDrafts, setReplyDrafts] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [expanded, setExpanded] = useState(!collapsible);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const existingId = window.localStorage.getItem(USER_ID_KEY);
    const existingToken = window.localStorage.getItem(AUTH_TOKEN_KEY) || "";
    const resolvedId = existingId || buildUserId();

    window.localStorage.setItem(USER_ID_KEY, resolvedId);

    setUserId(resolvedId);
    setAuthToken(existingToken);
  }, []);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const [messageList, replyList] = await Promise.all([
          getMessages({ scope, targetId }),
          getReplies({ scope, targetId }),
        ]);

        if (!mounted) {
          return;
        }

        setMessages(Array.isArray(messageList) ? messageList : []);
        setReplies(Array.isArray(replyList) ? replyList : []);
      } catch (err) {
        if (!mounted) {
          return;
        }

        setError(err?.message || "Failed to load discussion.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [scope, targetId, refreshKey]);

  const sortedMessages = useMemo(() => {
    const clone = [...messages];
    clone.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    return compact ? clone.slice(-5) : clone;
  }, [compact, messages]);

  const repliesByMessage = useMemo(() => {
    const map = {};

    replies.forEach((entry) => {
      const key = entry.messageId;
      if (!key) {
        return;
      }

      if (!map[key]) {
        map[key] = [];
      }

      map[key].push(entry);
    });

    Object.keys(map).forEach((key) => {
      map[key].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    });

    return map;
  }, [replies]);



  const signupHref = `/signup?next=${encodeURIComponent(
    `/public-chat?scope=${scope}&targetId=${targetId}`,
  )}`;

  const refresh = () => setRefreshKey((prev) => prev + 1);

  const submitMessage = async (event) => {
    event.preventDefault();

    if (!messageDraft.trim() || !userId || !authToken) {
      return;
    }

    try {
      await createMessage({
        id: userId,
        message: messageDraft.trim(),
        scope,
        targetId,
      });

      setMessageDraft("");
      setError("");
      if (collapsible) {
        setExpanded(true);
      }
      refresh();
    } catch (err) {
      setError(err?.message || "Failed to post message.");
    }
  };

  const submitReply = async (event, messageId) => {
    event.preventDefault();

    const draft = replyDrafts[messageId] || "";

    if (!draft.trim() || !userId || !authToken) {
      return;
    }

    try {
      await createReply({
        id: userId,
        messageId,
        message: draft.trim(),
        scope,
        targetId,
      });

      setReplyDrafts((prev) => ({ ...prev, [messageId]: "" }));
      setError("");
      refresh();
    } catch (err) {
      setError(err?.message || "Failed to post reply.");
    }
  };

  const reactToMessage = async (messageId, kind) => {
    if (!userId) {
      return;
    }

    try {
      if (kind === "like") {
        await toggleMessageLike(messageId, userId);
      } else {
        await toggleMessageDislike(messageId, userId);
      }

      setError("");
      refresh();
    } catch (err) {
      setError(err?.message || "Failed to update reaction.");
    }
  };

  const reactToReply = async (replyId, kind) => {
    if (!userId) {
      return;
    }

    try {
      if (kind === "like") {
        await toggleReplyLike(replyId, userId);
      } else {
        await toggleReplyDislike(replyId, userId);
      }

      setError("");
      refresh();
    } catch (err) {
      setError(err?.message || "Failed to update reply reaction.");
    }
  };

  return (
    <section className="space-y-5 rounded-2xl border border-white/10 bg-slate-950/60 p-4 md:p-5 lg:min-h-[165px] lg:p-6">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-white md:text-2xl ">
          {title}
        </h3>
        {description ? (
          <p className="text-sm leading-7 text-slate-300 md:text-base">
            {description}
          </p>
        ) : null}
        {collapsible ? (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-2 inline-flex rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
          >
            {expanded ? "Hide comments" : "Show comments"}
          </button>
        ) : null}
      </div>

      {!expanded ? null : (
        <>
          {!authToken ? (
            <section className="space-y-3 rounded-xl border border-cyan-300/20 bg-cyan-400/5 p-3 md:p-4">
              <p className="text-sm text-cyan-100">
                You need an account to post. Your visible name is auto-generated as Anonymous N.
              </p>

              <Link
                href={signupHref}
                className="inline-flex rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Sign up to comment and chat
              </Link>
            </section>
          ) : (
            <p className="text-xs text-emerald-200">Signed in as anonymous account. Posting enabled.</p>
          )}

          <form
            className="grid gap-3 md:grid-cols-[1fr_auto]"
            onSubmit={submitMessage}
          >
            <input
              value={messageDraft}
              onChange={(event) => setMessageDraft(event.target.value)}
              placeholder={composerPlaceholder || "Write a message"}
              className="rounded-xl border border-white/15 bg-slate-900/70 px-3 py-2.5 text-sm text-white placeholder:text-slate-400"
              disabled={!authToken}
            />
            <button
              type="submit"
              className="rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!authToken}
            >
              Send
            </button>
          </form>

          {loading ? (
            <p className="text-sm text-slate-400">Loading discussion...</p>
          ) : null}
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}

          <div className="space-y-4 ">
            {sortedMessages.map((entry) => {
              const threadReplies = repliesByMessage[entry.id] || [];

              return (
                <article
                  key={entry.id}
                  className="space-y-3  rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <header className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-cyan-100">
                      {entry.userName || "Anonymous"}
                    </p>
                    <p className="text-xs text-slate-400">
                      {toTime(entry.createdAt)}
                    </p>
                  </header>

                  <p className="text-sm leading-7  text-slate-200 md:text-[15px]">
                    {entry.message}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => reactToMessage(entry.id, "like")}
                      className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-emerald-100"
                    >
                      Like ({entry.likes?.length || 0})
                    </button>
                    <button
                      type="button"
                      onClick={() => reactToMessage(entry.id, "dislike")}
                      className="rounded-full border border-rose-300/30 bg-rose-400/10 px-3 py-1 text-rose-100"
                    >
                      Dislike ({entry.dislikes?.length || 0})
                    </button>
                  </div>

                  <div className="space-y-2 rounded-xl border border-white/10 bg-slate-900/50 p-3">
                    {threadReplies.map((reply) => (
                      <div
                        key={reply.id}
                        className="space-y-2 rounded-lg bg-white/5 p-2"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs font-semibold text-slate-100">
                            {reply.userName || "Anonymous"}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {toTime(reply.createdAt)}
                          </p>
                        </div>
                        <p className="text-xs leading-6 text-slate-200">
                          {reply.message}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-[11px]">
                          <button
                            type="button"
                            onClick={() => reactToReply(reply.id, "like")}
                            className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2 py-1 text-emerald-100"
                          >
                            Like ({reply.likes?.length || 0})
                          </button>
                          <button
                            type="button"
                            onClick={() => reactToReply(reply.id, "dislike")}
                            className="rounded-full border border-rose-300/30 bg-rose-400/10 px-2 py-1 text-rose-100"
                          >
                            Dislike ({reply.dislikes?.length || 0})
                          </button>
                        </div>
                      </div>
                    ))}

                    <form
                      className="flex gap-2"
                      onSubmit={(event) => submitReply(event, entry.id)}
                    >
                      <input
                        value={replyDrafts[entry.id] || ""}
                        onChange={(event) =>
                          setReplyDrafts((prev) => ({
                            ...prev,
                            [entry.id]: event.target.value,
                          }))
                        }
                        placeholder="Reply to this message"
                        className="min-w-0 flex-1 rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-xs text-white placeholder:text-slate-400"
                        disabled={!authToken}
                      />
                      <button
                        type="submit"
                        className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={!authToken}
                      >
                        Reply
                      </button>
                    </form>
                  </div>
                </article>
              );
            })}

            {!loading && !error && sortedMessages.length === 0 ? (
              <p className="text-sm text-slate-400">
                No messages yet. Start the first conversation.
              </p>
            ) : null}
          </div>
        </>
      )}
    </section>
  );
}

export default EngagementBoard;
