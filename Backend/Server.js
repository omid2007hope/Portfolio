const app = require("./app");
const connectDB = require("./config/database");

connectDB()
  .then(() => {
    const port = process.env.PORT || 4000;
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
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });
