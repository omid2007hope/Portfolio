const mongoose = require("mongoose");
const { getMongoUrl } = require("./mongo");

const connectDB = async () => {
  const mongoUrl = getMongoUrl();

  if (!mongoUrl) {
    throw new Error(
      "MongoDB connection failed: set MONGO_URL or MONGO_URI before starting the API",
    );
  }

  await mongoose.connect(mongoUrl, {
    autoIndex: true,
  });

  console.log("MongoDB connected");
};

module.exports = connectDB;
