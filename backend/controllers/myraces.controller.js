const MyRaces = require("../models/myraces.model");

const getMyRaces = async (req, res) => {
  try {
    const userId = req.user.id; // from requireAuth
    const { rows } = await MyRaces.getUserRaces(userId);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching user races:", err);
    res.status(500).json({ error: "Failed to fetch your races" });
  }
};

module.exports = {
  getMyRaces,
};
