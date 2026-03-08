const portfolioProfileService = require("../services/PortfolioProfileService");

const listProfiles = async (_req, res) => {
  const profiles = await portfolioProfileService.listProfiles();
  return res.status(200).json(profiles);
};

const getProfile = async (_req, res) => {
  const profile = await portfolioProfileService.getPublicProfile();

  if (!profile) {
    return res.status(404).json({ error: "Portfolio profile not found." });
  }

  return res.status(200).json(profile);
};

const getProfileById = async (req, res) => {
  const profile = await portfolioProfileService.getProfileById(req.params.id);

  if (!profile) {
    return res.status(404).json({ error: "Profile not found." });
  }

  return res.status(200).json(profile);
};

const createProfile = async (req, res) => {
  const profile = await portfolioProfileService.createProfile(req.body || {});
  return res.status(201).json(profile);
};

const updateProfile = async (req, res) => {
  const profile = await portfolioProfileService.updateProfileById(
    req.params.id,
    req.body || {},
  );

  if (!profile) {
    return res.status(404).json({ error: "Profile not found." });
  }

  return res.status(200).json(profile);
};

const deleteProfile = async (req, res) => {
  const profile = await portfolioProfileService.deleteProfileById(req.params.id);

  if (!profile) {
    return res.status(404).json({ error: "Profile not found." });
  }

  return res.status(200).json({
    message: "Profile deleted successfully.",
    profile,
  });
};

module.exports = {
  createProfile,
  deleteProfile,
  getProfile,
  getProfileById,
  listProfiles,
  updateProfile,
};
