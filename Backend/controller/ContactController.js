// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const contactSubmissionService = require("../service/ContactSubmissionService");

const listContacts = async (req, res) => {
  const submissions = await contactSubmissionService.listSubmissions({
    status: req.query.status || undefined,
  });

  return res.status(200).json(submissions);
};

const getContactById = async (req, res) => {
  const submission = await contactSubmissionService.getSubmissionById(req.params.id);

  if (!submission) {
    return res.status(404).json({ error: "Contact submission not found." });
  }

  return res.status(200).json(submission);
};

const createContactSubmission = async (req, res) => {
  const { name, email, subject, message, source } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      error: "name, email, subject, and message are required.",
    });
  }

  const submission = await contactSubmissionService.createFromRequest(
    { name, email, subject, message, source },
    req,
  );

  return res.status(201).json({
    message: "Contact submission created successfully.",
    submission,
  });
};

const updateContactSubmission = async (req, res) => {
  const submission = await contactSubmissionService.updateSubmission(
    req.params.id,
    req.body || {},
  );

  if (!submission) {
    return res.status(404).json({ error: "Contact submission not found." });
  }

  return res.status(200).json(submission);
};

const deleteContactSubmission = async (req, res) => {
  const submission = await contactSubmissionService.deleteSubmission(req.params.id);

  if (!submission) {
    return res.status(404).json({ error: "Contact submission not found." });
  }

  return res.status(200).json({
    message: "Contact submission deleted successfully.",
    submission,
  });
};

module.exports = {
  createContactSubmission,
  deleteContactSubmission,
  getContactById,
  listContacts,
  updateContactSubmission,
};
