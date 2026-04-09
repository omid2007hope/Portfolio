const BaseService = require("./BaseService");
const { Resume } = require("../model/version_1");

class ResumeService extends BaseService {
  constructor() {
    super(Resume);
  }

  _serializeResume = (resume) => ({
    id: String(resume._id),
    profileName: resume.profileName,
    headline: resume.headline,
    summary: resume.summary,
    email: resume.email,
    phoneNumber: resume.phoneNumber,
    address: resume.address,
    avatarImage: resume.avatarImage,
    importantLinks: resume.importantLinks || [],
    languages: resume.languages || [],
    certificates: resume.certificates || [],
    experience: [...(resume.experience || [])].sort(
      (a, b) => a.sortOrder - b.sortOrder,
    ),
    education: [...(resume.education || [])].sort(
      (a, b) => a.sortOrder - b.sortOrder,
    ),
    skillGroups: [...(resume.skillGroups || [])].sort(
      (a, b) => a.sortOrder - b.sortOrder,
    ),
    createdAt: resume.createdAt,
    updatedAt: resume.updatedAt,
  });

  listResumes = async () => {
    const resumes = await this.model
      .find(this._active({}))
      .sort({ updatedAt: -1, createdAt: -1 })
      .lean();

    return resumes.map(this._serializeResume);
  };

  getLatestResume = async () => {
    const resume = await this.model
      .findOne(this._active({}))
      .sort({ updatedAt: -1, createdAt: -1 })
      .lean();

    return resume ? this._serializeResume(resume) : null;
  };

  getResumeById = async (id) => {
    const resume = await this.model.findOne(this._active({ _id: id })).lean();
    return resume ? this._serializeResume(resume) : null;
  };

  createResume = async (payload) => {
    const resume = await this.createObject(payload);
    return this._serializeResume(resume.toObject());
  };

  updateResume = async (id, payload) => {
    const resume = await this.update(this._active({ _id: id }), payload);
    return resume ? this._serializeResume(resume.toObject()) : null;
  };

  deleteResume = async (id) => {
    const resume = await this.softDelete({ _id: id }, "system");
    return resume ? this._serializeResume(resume.toObject()) : null;
  };
}

module.exports = new ResumeService();
