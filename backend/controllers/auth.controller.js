const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserAuth = require("../models/userAuth.model");

// JWT helpers
const signToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// Register user
const registerUser = async (req, res) => {
  try {
    const { email, password, name, surname, location } = req.body;
    if (!email || !password || !name || !surname)
      return res.status(400).json({ error: "Missing fields" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await UserAuth.createUser({ email, hashedPassword, name, surname, location });

    const token = signToken({ id: rows[0].userid, email: rows[0].email });
    res.json({ token, user: rows[0] });
  } catch (err) {
    if (err.code === "23505")
      return res.status(409).json({ error: "Email already in use" });
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });

  try {
    const user = await UserAuth.getUserByEmail(email);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken({ id: user.userid, email: user.email });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal error" });
  }
};

// Middleware to protect routes
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1]; // expects "Bearer <token>"
  if (!token) return res.status(401).json({ error: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  signToken,
  requireAuth,
};
