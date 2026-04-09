"use client";

import { useEffect, useRef, useState } from "react";
import {
  fetchChatConversation,
  submitChatMessage,
} from "@/features/chat/services/chatService";

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

const getSessionId = () => {
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
};

export function usePortfolioChat(open) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([defaultMessage]);
  const [sessionId] = useState(getSessionId);
  const listRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!sessionId || !open) {
      return;
    }

    let cancelled = false;

    const loadConversation = async () => {
      const conversation = await fetchChatConversation(sessionId);

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
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [message]);

  const replaceMessage = (id, text) => {
    setMessages((current) =>
      current.map((entry) =>
        entry.id === id
          ? { ...entry, text, time: formatMessageTime(new Date()) }
          : entry,
      ),
    );
  };

  const submit = async () => {
    if (!message.trim() || !sessionId) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: message.trim(),
      from: "you",
      time: formatMessageTime(new Date()),
    };

    setMessages((current) => [...current, userMessage]);
    setMessage("");

    const thinkingId = `${Date.now()}-thinking`;
    setMessages((current) => [
      ...current,
      { id: thinkingId, text: "Thinking...", from: "bot", time: "now" },
    ]);

    try {
      const data = await submitChatMessage({
        sessionId,
        message: userMessage.text,
      });

      replaceMessage(thinkingId, data.reply || "No reply received.");
    } catch (error) {
      replaceMessage(
        thinkingId,
        `Error: ${error.message || "Could not reach server."}`,
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submit();
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await submit();
    }
  };

  return {
    message,
    messages,
    listRef,
    textareaRef,
    setMessage,
    handleSubmit,
    handleKeyDown,
  };
}
