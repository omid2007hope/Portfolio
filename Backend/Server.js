const express = require("express");

const connectDB = require("./config/database");
const { loadEnv } = require("./config/env");
const errorHandler = require("./middleware/error/errorHandler");
const notFoundHandler = require("./middleware/error/notFoundHandler");
const { applyCorsHeaders } = require("./middleware/request/cors");
const healthRoutes = require("./routes/health");
const routes = require("./routes");

loadEnv();

const app = express();

app.use(applyCorsHeaders);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/", healthRoutes);
app.use("/api", routes);
app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  const port = process.env.PORT || 4000;
  await connectDB();

  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        `Port ${port} is already in use. Stop the existing server or set PORT to a different value before starting this process.`,
      );
      process.exit(1);
    }

    console.error("Failed to start server:", err);
    process.exit(1);
  });

  return server;
};

if (require.main === module) {
  startServer().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
}

module.exports = app;
