import { getChatConversation, sendChatMessage } from "@/lib/api";

export const fetchChatConversation = (sessionId) =>
  getChatConversation(sessionId);

export const submitChatMessage = (payload) => sendChatMessage(payload);
