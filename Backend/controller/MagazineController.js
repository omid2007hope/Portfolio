const magazineService = require("../services/MagazineService");

const getMagazineContent = async (_req, res) => {
  const content = await magazineService.listMagazineContent();
  return res.status(200).json(content);
};

const postMagazineContent = async (_req, res) => {
  const content = await _req.body;
  const result = await magazineService.postMagazineContent(content);
  return res.status(200).json(result);
};

module.exports = {
  getMagazineContent,
  postMagazineContent,
};
