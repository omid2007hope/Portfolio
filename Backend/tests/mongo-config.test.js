describe("Mongo config", () => {
  const originalMongoUrl = process.env.MONGO_URL;
  const originalMongoUri = process.env.MONGO_URI;

  afterEach(() => {
    if (originalMongoUrl === undefined) {
      delete process.env.MONGO_URL;
    } else {
      process.env.MONGO_URL = originalMongoUrl;
    }

    if (originalMongoUri === undefined) {
      delete process.env.MONGO_URI;
    } else {
      process.env.MONGO_URI = originalMongoUri;
    }

    jest.resetModules();
  });

  test("prefers MONGO_URL when present", () => {
    process.env.MONGO_URL = "mongodb://preferred";
    process.env.MONGO_URI = "mongodb://fallback";

    const { getMongoUrl } = require("../config/mongo");

    expect(getMongoUrl()).toBe("mongodb://preferred");
  });

  test("accepts MONGO_URI for deployment compatibility", () => {
    delete process.env.MONGO_URL;
    process.env.MONGO_URI = "mongodb://uri-only";

    const { getMongoUrl } = require("../config/mongo");

    expect(getMongoUrl()).toBe("mongodb://uri-only");
  });
});
