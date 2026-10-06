require("dotenv").config();
const express = require("express");
const cors = require("cors");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

// Middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.options("*", cors());

// Health Check Route
app.get("/", (req, res) => {
  res.send("ProResume AI Backend is running cleanly");
});

// Resume API Routes
app.use("/", resumeRoutes);

// Server execution block
const PORT = process.env.PORT || 8080;
if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () =>
    console.log(`Server running on port ${PORT}`)
  );
}

module.exports = app;
