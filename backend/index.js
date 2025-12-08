const express = require("express");
const cors = require("cors");
const { router: authRoutes } = require("./routes/auth"); // import the router
const { router: racesRouter } = require("./routes/races");
const { router: myRacesRouter } = require("./routes/myraces");
const { router: userRouter } = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.json());

// Attach routes
app.use("/auth", authRoutes);
app.use("/races", racesRouter);
app.use("/my_races", myRacesRouter);
app.use("/user", userRouter);

// Test route
app.get("/api", (req, res) => res.json({ message: "Backend works" }));

// Use a fixed port inside the container
const PORT = 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Backend running on port ${PORT}`)
);