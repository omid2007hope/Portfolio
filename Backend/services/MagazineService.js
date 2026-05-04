const BaseService = require("./BaseService");
const { Magazine } = require("../model/version_1");

module.exports = new (class MagazineService extends BaseService {
  _serializeMagazine = (content) => ({
    id: String(content._id),
    magazineId: content.magazineId,
    photo: content.photo || null,
    title: content.title,
    description: content.description,
    date: content.date,
    createdAt: content.createdAt,
    updatedAt: content.updatedAt,
  });

  listMagazineContent = async () => {
    const content = await this.model
      .find(this._active({}))
      .sort({ date: -1, magazineId: 1, createdAt: -1 })
      .lean();

    return content.map(this._serializeMagazine);
  };

  postMagazineContent = async (content) => {
    const newContent = await this.createObject(content);
    return this._serializeMagazine(newContent.toObject());
  };
})(Magazine);
