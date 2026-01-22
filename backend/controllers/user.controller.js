const User = require("../models/user.model");

const getCurrentUser = async (req, res) => {
  try {
    // from requireAuth
    const userId = req.user.id;
    const { rows } = await User.getUserById(userId);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Failed to fetch user info:", err);
    res.status(500).json({ error: "Failed to fetch user info" });
  }
};

module.exports = {
  getCurrentUser,
};
