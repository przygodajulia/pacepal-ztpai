const Race = require("../models/race.model");

const getRaces = async (req, res) => {
  try {
    const { rows } = await Race.getAllRaces();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch races" });
  }
};

const getRace = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await Race.getRaceById(id);

    if (!rows.length) {
      return res.status(404).json({ error: "Race not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch race" });
  }
};

const signupForRace = async (req, res) => {
  try {
    const userId = req.user.id;
    const raceId = req.params.id;

    const { rows: existing } = await Race.isUserRegistered(userId, raceId);
    if (existing.length) {
      return res.status(400).json({ error: "Already registered" });
    }

    const { rows } = await Race.registerUser(userId, raceId);
    res.status(201).json({
      message: "Successfully signed up!",
      registrationId: rows[0].registrationid
    });
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
};

module.exports = {
  getRaces,
  getRace,
  signupForRace
};
