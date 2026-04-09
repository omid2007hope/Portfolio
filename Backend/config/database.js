const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    throw new Error("MongoDB connection failed: MONGO_URL is not set");
  }

  await mongoose.connect(mongoUrl, {
    autoIndex: true,
  });

  console.log("MongoDB connected");
};

module.exports = connectDB;
