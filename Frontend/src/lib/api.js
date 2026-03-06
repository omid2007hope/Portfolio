const DEFAULT_SERVER_API_BASE = "http://localhost:4000/api";

const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

export const getApiBaseUrl = () => {
  const envBase =
    process.env.API_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (envBase) {
    return trimTrailingSlash(envBase);
  }

  if (typeof window !== "undefined") {
    if (window.location.port === "3000") {
      return `${window.location.protocol}//${window.location.hostname}:4000/api`;
    }

    return `${window.location.origin}/api`;
  }

  return DEFAULT_SERVER_API_BASE;
};

export const getApiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
};

const readResponseBody = async (response) => {
  const contentType = response.headers.get("content-type") || "";
  const rawText = await response.text();

  if (!rawText.trim().length) {
    return null;
  }

  if (contentType.includes("application/json")) {
    return JSON.parse(rawText);
  }

  return rawText;
};

export const fetchJson = async (path, options = {}) => {
  const response = await fetch(getApiUrl(path), {
    cache: "no-store",
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await readResponseBody(response);

  if (!response.ok) {
    const message =
      data?.error ||
      data?.message ||
      (typeof data === "string" ? data : null) ||
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
};

export const getProfile = async () => {
  try {
    return await fetchJson("/profile");
  } catch (_error) {
    return null;
  }
};

export const getProjects = async (query = "") => {
  try {
    return (await fetchJson(`/projects${query}`)) || [];
  } catch (_error) {
    return [];
  }
};

export const getProject = async (identifier) => {
  try {
    return await fetchJson(`/projects/${identifier}`);
  } catch (_error) {
    return null;
  }
};

export const getResume = async () => {
  try {
    return await fetchJson("/resume");
  } catch (_error) {
    return null;
  }
};

export const createContactSubmission = async (payload) =>
  fetchJson("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const sendChatMessage = async (payload) =>
  fetchJson("/chat", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getChatConversation = async (sessionId) => {
  try {
    return await fetchJson(`/chat/${sessionId}`);
  } catch (_error) {
    return null;
  }
};
