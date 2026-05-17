import { fetchJson } from "@/api/client";

const buildQuery = (params = {}) => {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    search.set(key, String(value));
  });

  const query = search.toString();
  return query ? `?${query}` : "";
};

// GET /users
export const getUsers = async () => (await fetchJson("/users")) || [];

// POST /users
export const createUser = async (payload) =>
  fetchJson("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });

// GET /messages?scope=&targetId=&userId=
export const getMessages = async (filters = {}) =>
  (await fetchJson(`/messages${buildQuery(filters)}`)) || [];

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

// GET /replies?scope=&targetId=&messageId=&userId=
export const getReplies = async (filters = {}) =>
  (await fetchJson(`/replies${buildQuery(filters)}`)) || [];

// GET /replies/user/:userId
export const getRepliesByUser = async (userId) =>
  (await fetchJson(`/replies/user/${userId}`)) || [];

// GET /replies/message/:messageId
export const getRepliesByMessage = async (messageId) =>
  (await fetchJson(`/replies/message/${messageId}`)) || [];

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
