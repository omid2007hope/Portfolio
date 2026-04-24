const BaseService = require("./BaseService");
const { ContactSubmission } = require("../model/version_1");

module.exports = new (class ContactSubmissionService extends BaseService {
  _serializeSubmission = (submission) => ({
    id: String(submission._id),
    name: submission.name,
    email: submission.email,
    subject: submission.subject,
    message: submission.message,
    status: submission.status,
    source: submission.source,
    ipAddress: submission.ipAddress,
    userAgent: submission.userAgent,
    respondedAt: submission.respondedAt,
    createdAt: submission.createdAt,
    updatedAt: submission.updatedAt,
  });

  createFromRequest = async (payload, req) => {
    const ipAddress =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      "";

    const userAgent = req.get("user-agent") || "";

    const submission = await this.createObject({
      name: payload.name,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
      source: payload.source || "portfolio-contact-form",
      ipAddress,
      userAgent,
    });

    return this._serializeSubmission(submission.toObject());
  };

  listSubmissions = async ({ status } = {}) => {
    const condition = {};

    if (status) {
      condition.status = status;
    }

    const submissions = await this.model
      .find(this._active(condition))
      .sort({ createdAt: -1 })
      .lean();

    return submissions.map(this._serializeSubmission);
  };

  getSubmissionById = async (id) => {
    const submission = await this.model
      .findOne(this._active({ _id: id }))
      .lean();
    return submission ? this._serializeSubmission(submission) : null;
  };

  updateSubmission = async (id, payload) => {
    const data = { ...payload };

    if (data.status === "replied" && !data.respondedAt) {
      data.respondedAt = new Date();
    }

    const submission = await this.update(this._active({ _id: id }), data);
    return submission ? this._serializeSubmission(submission.toObject()) : null;
  };

  deleteSubmission = async (id) => {
    const submission = await this.softDelete({ _id: id }, "system");
    return submission ? this._serializeSubmission(submission.toObject()) : null;
  };
})(ContactSubmission);
