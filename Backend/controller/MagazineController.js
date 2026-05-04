const magazineService = require("../services/MagazineService");
const { createHttpError } = require("../utils/httpError");

const getMagazineContent = async (_req, res) => {
  const content = await magazineService.listMagazineContent();
  return res.status(200).json(content);
};

const postMagazineContent = async (_req, res) => {
  const magazineId = Number(_req.body?.magazineId);

  if (!Number.isFinite(magazineId)) {
    throw createHttpError(400, "magazineId must be a valid number.");
  }

  const content = {
    ..._req.body,
    magazineId,
    title: _req.body?.title?.trim(),
    description: _req.body?.description?.trim(),
    date: _req.body?.date?.trim(),
  };

  if (_req.file?.path) {
    content.photo = _req.file.path;
  }

  const result = await magazineService.postMagazineContent(content);
  return res.status(200).json(result);
};

module.exports = {
  getMagazineContent,
  postMagazineContent,
};
