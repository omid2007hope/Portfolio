const dotenv = require("dotenv");

let loaded = false;

const loadEnv = () => {
  if (loaded) {
    return process.env;
  }

  dotenv.config({ path: ".env.local" });
  loaded = true;

  return process.env;
};

module.exports = {
  loadEnv,
};
