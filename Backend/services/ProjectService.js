const BaseService = require("./BaseService");
const { Project } = require("../model/version_1");
const { mongoose } = require("../model/version_1/shared");

class ProjectService extends BaseService {
  constructor() {
    super(Project);
  }

  _serializeProject = (project) => ({
    id: String(project._id),
    projectId: project.projectId,
    slug: project.slug,
    title: project.title,
    shortDescription: project.shortDescription,
    overview: project.overview,
    challengesAndSolutions: project.challengesAndSolutions,
    improvements: project.improvements,
    highlightQuote: project.highlightQuote,
    role: project.role,
    duration: project.duration,
    status: project.status,
    featured: project.featured,
    techStack: project.techStack || [],
    coverImage: project.coverImage || null,
    showcaseImages: project.showcaseImages || [],
    actions: project.actions || [],
    repositoryUrl: project.repositoryUrl,
    liveDemoUrl: project.liveDemoUrl,
    sortOrder: project.sortOrder,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  });

  listProjects = async ({ featured, status, includeAll = false } = {}) => {
    const condition = {};

    if (!includeAll) {
      condition.status = status || "published";
    } else if (status) {
      condition.status = status;
    }

    if (featured === true) {
      condition.featured = true;
    }

    const projects = await this.model
      .find(this._active(condition))
      .sort({ featured: -1, sortOrder: 1, createdAt: -1 })
      .lean();

    return projects.map(this._serializeProject);
  };

  getProjectByIdentifier = async (identifier, { includeAll = false } = {}) => {
    const normalized = String(identifier).trim();
    const condition = {};

    if (!includeAll) {
      condition.status = "published";
    }

    if (/^\d+$/.test(normalized)) {
      condition.projectId = Number(normalized);
    } else {
      condition.$or = [{ slug: normalized }];

      if (mongoose.Types.ObjectId.isValid(normalized)) {
        condition.$or.push({ _id: normalized });
      }
    }

    const project = await this.model.findOne(this._active(condition)).lean();
    return project ? this._serializeProject(project) : null;
  };

  createProject = async (payload) => {
    const project = await this.createObject(payload);
    return this._serializeProject(project.toObject());
  };

  updateProject = async (id, payload) => {
    const project = await this.update(this._active({ _id: id }), payload);
    return project ? this._serializeProject(project.toObject()) : null;
  };

  deleteProject = async (id) => {
    const project = await this.softDelete({ _id: id }, "system");
    return project ? this._serializeProject(project.toObject()) : null;
  };
}

module.exports = new ProjectService();
