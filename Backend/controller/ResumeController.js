const resumeService = require("../services/ResumeService");

const listResumes = async (_req, res) => {
  const resumes = await resumeService.listResumes();
  return res.status(200).json(resumes);
};

const getResume = async (_req, res) => {
  const resume = await resumeService.getLatestResume();

  if (!resume) {
    return res.status(404).json({ error: "Resume not found." });
  }

  return res.status(200).json(resume);
};

const getResumeById = async (req, res) => {
  const resume = await resumeService.getResumeById(req.params.id);

  if (!resume) {
    return res.status(404).json({ error: "Resume not found." });
  }

  return res.status(200).json(resume);
};

const createResume = async (req, res) => {
  const resume = await resumeService.createResume(req.body || {});
  return res.status(201).json(resume);
};

const updateResume = async (req, res) => {
  const resume = await resumeService.updateResume(req.params.id, req.body || {});

  if (!resume) {
    return res.status(404).json({ error: "Resume not found." });
  }

  return res.status(200).json(resume);
};

const deleteResume = async (req, res) => {
  const resume = await resumeService.deleteResume(req.params.id);

  if (!resume) {
    return res.status(404).json({ error: "Resume not found." });
  }

  return res.status(200).json({
    message: "Resume deleted successfully.",
    resume,
  });
};

module.exports = {
  createResume,
  deleteResume,
  getResume,
  getResumeById,
  listResumes,
  updateResume,
};
