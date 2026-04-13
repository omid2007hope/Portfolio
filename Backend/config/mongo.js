const getMongoUrl = () => process.env.MONGO_URL || process.env.MONGO_URI || "";

module.exports = {
  getMongoUrl,
};
