const express = require("express");
const router = express.Router();
const db = require("../src/db");
const { requireAuth } = require("./auth");

// Get all races the user is registered for
router.get("/", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const query = `
      SELECT r.raceid, r.title, r.location, r.date, r.price, r.description, r.imageurl, r.distance,
             CASE WHEN r.date < NOW() THEN TRUE ELSE FALSE END AS finished
      FROM races r
      JOIN user_race_registration ur ON ur.raceid = r.raceid
      WHERE ur.userid = $1
      ORDER BY r.date ASC
    `;
    const { rows } = await db.query(query, [userId]);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching user races:", err);
    res.status(500).json({ error: "Failed to fetch your races" });
  }
});

module.exports = { router };
