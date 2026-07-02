const crypto = require("node:crypto");

const DEFAULT_SECRET = "portfolio-prime-chat-secret";
const DEFAULT_EXPIRES_MINUTES = 60 * 24 * 14;

const getSecret = () => process.env.AUTH_TOKEN_SECRET || DEFAULT_SECRET;

const toBase64Url = (value) =>
  Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const fromBase64Url = (value) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const paddingLength = (4 - (normalized.length % 4)) % 4;
  return Buffer.from(`${normalized}${"=".repeat(paddingLength)}`, "base64").toString("utf8");
};

const signPayload = (payload) => {
  const payloadBase64 = toBase64Url(JSON.stringify(payload));
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(payloadBase64)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

  return `${payloadBase64}.${signature}`;
};

const verifySignature = (payloadBase64, signature) => {
  const expected = crypto
    .createHmac("sha256", getSecret())
    .update(payloadBase64)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
};

const issueAuthToken = ({ userId, tokenVersion, expiresMinutes = DEFAULT_EXPIRES_MINUTES }) => {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const payload = {
    sub: String(userId),
    v: Number(tokenVersion) || 1,
    iat: nowSeconds,
    exp: nowSeconds + expiresMinutes * 60,
  };

  return signPayload(payload);
};

const decodeAuthToken = (token) => {
  if (!token || typeof token !== "string") {
    return null;
  }

  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) {
    return null;
  }

  if (!verifySignature(payloadBase64, signature)) {
    return null;
  }

  try {
    const payload = JSON.parse(fromBase64Url(payloadBase64));

    if (!payload?.sub || !payload?.exp || !payload?.v) {
      return null;
    }

    const nowSeconds = Math.floor(Date.now() / 1000);
    if (payload.exp <= nowSeconds) {
      return null;
    }

    return {
      userId: String(payload.sub),
      tokenVersion: Number(payload.v) || 1,
      issuedAt: Number(payload.iat) || nowSeconds,
      expiresAt: Number(payload.exp),
    };
  } catch (_error) {
    return null;
  }
};

module.exports = {
  decodeAuthToken,
  issueAuthToken,
};
