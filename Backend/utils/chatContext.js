const VALID_SCOPES = new Set(["group", "magazine", "qanda"]);

const SCOPE_ALIASES = {
  general: "group",
  general_chat: "group",
  qa: "qanda",
};

const normalizeScope = (scope) => {
  const normalized = String(scope || "group")
    .trim()
    .toLowerCase();

  if (VALID_SCOPES.has(normalized)) {
    return normalized;
  }

  return SCOPE_ALIASES[normalized] || "group";
};

const normalizeTargetId = (targetId) => {
  const normalized = String(targetId || "global").trim();
  return normalized || "global";
};

const normalizeUserId = (userId) => String(userId || "").trim();

const normalizeFeedLimit = (limit, fallback = 100) => {
  const parsed = Number.parseInt(limit, 10);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(Math.max(parsed, 1), 200);
};

module.exports = {
  normalizeFeedLimit,
  normalizeScope,
  normalizeTargetId,
  normalizeUserId,
  VALID_SCOPES,
};
