const express = require("express");
const cors = require("cors");
const { router: authRoutes } = require("./routes/auth"); // import the router

const app = express();
app.use(cors());
app.use(express.json());

// Attach routes
app.use("/auth", authRoutes);

// Test route
app.get("/api", (req, res) => res.json({ message: "Backend works" }));

// Use a fixed port inside the container
const PORT = 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Backend running on port ${PORT}`)
);

// NEXT STEPS
// - render desired template on Frontend side
// - new branch