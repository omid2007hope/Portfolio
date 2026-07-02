const crypto = require("node:crypto");

const BaseService = require("./BaseService");
const UserModel = require("../model/version_1/user");
const { createHttpError } = require("../utils/httpError");
const { issueAuthToken } = require("../utils/token");

const LOGIN_CODE_LENGTH = 6;
const LOGIN_CODE_TTL_MINUTES = 15;

const normalizeEmail = (value) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

const hashCode = (value) =>
  crypto.createHash("sha256").update(String(value)).digest("hex");

const randomDigits = (length) => {
  const max = 10 ** length;
  const value = crypto.randomInt(0, max);
  return String(value).padStart(length, "0");
};

module.exports = new (class AuthService extends BaseService {
  _serializeAuthResponse = (user) => ({
    userId: user.id,
    email: user.email || "",
    anonymousName: user.name,
    token: issueAuthToken({
      userId: user.id,
      tokenVersion: user.authTokenVersion || 1,
    }),
  });

  _buildAnonymousName = async () => {
    const latestUser = await this.model
      .findOne({ isDeleted: { $ne: true } })
      .sort({ createdAt: -1 })
      .lean();

    const latestCounterMatch = latestUser?.name?.match(/^Anonymous\s+(\d+)$/i);
    const latestCounter = latestCounterMatch ? Number(latestCounterMatch[1]) : 0;
    const nextCounter = Number.isFinite(latestCounter) ? latestCounter + 1 : 1;
    return `Anonymous ${nextCounter}`;
  };

  requestLoginCode = async (emailInput) => {
    const email = normalizeEmail(emailInput);

    if (!email || !email.includes("@")) {
      throw createHttpError(400, "A valid email address is required.");
    }

    let user = await this.model.findOne({ email });

    if (!user) {
      const anonymousName = await this._buildAnonymousName();
      const userId = `sub-${crypto.randomUUID()}`;
      user = await this.createObject({
        id: userId,
        name: anonymousName,
        email,
        isEmailVerified: false,
        authTokenVersion: 1,
      });
    }

    const code = randomDigits(LOGIN_CODE_LENGTH);
    const expiresAt = new Date(Date.now() + LOGIN_CODE_TTL_MINUTES * 60 * 1000);

    user.loginCodeHash = hashCode(code);
    user.loginCodeExpiresAt = expiresAt;
    await user.save();

    return {
      email,
      code,
      expiresAt,
      message:
        "Login code generated. Integrate an email provider to deliver this code externally.",
    };
  };

  verifyLoginCode = async ({ email: emailInput, code }) => {
    const email = normalizeEmail(emailInput);
    const codeValue = typeof code === "string" ? code.trim() : "";

    if (!email || !codeValue) {
      throw createHttpError(400, "email and code are required.");
    }

    const user = await this.model.findOne({ email });

    if (!user) {
      throw createHttpError(404, "No account found for this email.");
    }

    const now = new Date();
    if (!user.loginCodeHash || !user.loginCodeExpiresAt || user.loginCodeExpiresAt < now) {
      throw createHttpError(401, "Login code is invalid or expired.");
    }

    if (hashCode(codeValue) !== user.loginCodeHash) {
      throw createHttpError(401, "Login code is invalid or expired.");
    }

    user.isEmailVerified = true;
    user.loginCodeHash = "";
    user.loginCodeExpiresAt = null;
    await user.save();

    return this._serializeAuthResponse(user);
  };
})(UserModel);
