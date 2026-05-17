import { fetchJson } from "@/api/client";

// GET /users
export const getUsers = async () => (await fetchJson("/users")) || [];

// POST /users
export const createUser = async (payload) =>
  fetchJson("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });

// GET /messages
export const getMessages = async () => (await fetchJson("/messages")) || [];

// GET /messages/user/:userId
export const getMessagesByUser = async (userId) =>
  (await fetchJson(`/messages/user/${userId}`)) || [];

// POST /messages
export const createMessage = async (payload) =>
  fetchJson("/messages", {
    method: "POST",
    body: JSON.stringify(payload),
  });

// PATCH /messages/:messageId/like
export const toggleMessageLike = async (messageId, userId) =>
  fetchJson(`/messages/${messageId}/like`, {
    method: "PATCH",
    body: JSON.stringify({ userId }),
  });

// PATCH /messages/:messageId/dislike
export const toggleMessageDislike = async (messageId, userId) =>
  fetchJson(`/messages/${messageId}/dislike`, {
    method: "PATCH",
    body: JSON.stringify({ userId }),
  });

// GET /replies
export const getReplies = async () => (await fetchJson("/replies")) || [];

// GET /replies/user/:userId
export const getRepliesByUser = async (userId) =>
  (await fetchJson(`/replies/user/${userId}`)) || [];

// POST /replies
export const createReply = async (payload) =>
  fetchJson("/replies", {
    method: "POST",
    body: JSON.stringify(payload),
  });

// PATCH /replies/:replyId/like
export const toggleReplyLike = async (replyId, userId) =>
  fetchJson(`/replies/${replyId}/like`, {
    method: "PATCH",
    body: JSON.stringify({ userId }),
  });

// PATCH /replies/:replyId/dislike
export const toggleReplyDislike = async (replyId, userId) =>
  fetchJson(`/replies/${replyId}/dislike`, {
    method: "PATCH",
    body: JSON.stringify({ userId }),
  });
