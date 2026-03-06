// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const projectService = require("../service/ProjectService");

const getProjects = async (req, res) => {
  const featured = req.query.featured === "true" ? true : undefined;
  const includeAll = req.query.includeAll === "true";
  const status = req.query.status || undefined;

  const projects = await projectService.listProjects({
    featured,
    includeAll,
    status,
  });

  return res.status(200).json(projects);
};

const getProjectByIdentifier = async (req, res) => {
  const project = await projectService.getProjectByIdentifier(
    req.params.identifier,
    { includeAll: req.query.includeAll === "true" },
  );

  if (!project) {
    return res.status(404).json({ error: "Project not found." });
  }

  return res.status(200).json(project);
};

const createProject = async (req, res) => {
  const project = await projectService.createProject(req.body || {});
  return res.status(201).json(project);
};

const updateProject = async (req, res) => {
  const project = await projectService.updateProject(req.params.id, req.body || {});

  if (!project) {
    return res.status(404).json({ error: "Project not found." });
  }

  return res.status(200).json(project);
};

const deleteProject = async (req, res) => {
  const project = await projectService.deleteProject(req.params.id);

  if (!project) {
    return res.status(404).json({ error: "Project not found." });
  }

  return res.status(200).json({
    message: "Project deleted successfully.",
    project,
  });
};

module.exports = {
  createProject,
  deleteProject,
  getProjectByIdentifier,
  getProjects,
  updateProject,
};
