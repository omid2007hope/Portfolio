const path = require("path");
const dotenv = require("dotenv");

let loaded = false;

const backendRoot = path.resolve(__dirname, "..");
const candidateEnvFiles = [
  path.join(backendRoot, ".env.local"),
  path.join(backendRoot, ".env"),
];

const loadEnv = () => {
  if (loaded) {
    return process.env;
  }

  candidateEnvFiles.forEach((envPath) => {
    dotenv.config({ path: envPath, override: false });
  });

  loaded = true;

  return process.env;
};

module.exports = {
  loadEnv,
};
