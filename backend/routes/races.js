const express = require("express");
const router = express.Router();
const db = require("../src/db");
const { requireAuth } = require("./auth");

// ------------------ RACE ROUTES ------------------

// Get all races (protected)
router.get("/", requireAuth, async (req, res) => {
  try {
    const query = `
      SELECT raceid, title, location, date, price, description, imageurl, distance
      FROM races
      ORDER BY date ASC
    `;
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error("Error loading races:", err);
    res.status(500).json({ error: "Failed to fetch races" });
  }
});

// Get specific race by ID (protected)
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT raceid, title, location, date, price, description, imageurl, distance
      FROM races
      WHERE raceid = $1
    `;
    const { rows } = await db.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Race not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error loading race:", err);
    res.status(500).json({ error: "Failed to fetch race" });
  }
});

// Sign up for a race (protected)
router.post("/:id/signup", requireAuth, async (req, res) => {
    try {
      const { id } = req.params; // race ID
      const userId = req.user.id; // logged-in user ID from requireAuth middleware
  
      // 1️⃣ Check if race exists
      const raceCheck = await db.query(
        "SELECT raceid FROM races WHERE raceid = $1",
        [id]
      );
      if (raceCheck.rows.length === 0) {
        return res.status(404).json({ error: "Race not found" });
      }
  
      // 2️⃣ Check if user already registered
      const existingRegistration = await db.query(
        "SELECT registrationid FROM user_race_registration WHERE userid = $1 AND raceid = $2",
        [userId, id]
      );
  
      if (existingRegistration.rows.length > 0) {
        return res.status(400).json({ error: "You are already signed up for this race" });
      }
  
      // 3️⃣ Insert new registration
      const insertQuery = `
        INSERT INTO user_race_registration (userid, raceid)
        VALUES ($1, $2)
        RETURNING registrationid
      `;
      const { rows } = await db.query(insertQuery, [userId, id]);
  
      res.status(201).json({ message: "Successfully signed up!", registrationId: rows[0].registrationid });
  
    } catch (err) {
      console.error("Error signing up for race:", err);
      res.status(500).json({ error: "Failed to sign up for race" });
    }
  });  

// Get available distances (protected)
router.get("/filters/distances", requireAuth, async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT distance
      FROM races
      ORDER BY distance
    `;
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error("Error loading distances:", err);
    res.status(500).json({ error: "Failed to fetch distances" });
  }
});

// Get available locations (protected)
router.get("/filters/locations", requireAuth, async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT location
      FROM races
      ORDER BY location
    `;
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error("Error loading locations:", err);
    res.status(500).json({ error: "Failed to fetch locations" });
  }
});

module.exports = { router };
