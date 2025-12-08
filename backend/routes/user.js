// routes/user.js
const express = require("express");
const router = express.Router();
const { requireAuth } = require("./auth");
const db = require("../src/db");

// Get current user info
router.get("/me", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const query = `
      SELECT userid, name, surname, email, location
      FROM users
      WHERE userid = $1
    `;
    const { rows } = await db.query(query, [userId]);

    if (rows.length === 0) return res.status(404).json({ error: "User not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error("Failed to fetch user info:", err);
    res.status(500).json({ error: "Failed to fetch user info" });
  }
});

module.exports = { router };
