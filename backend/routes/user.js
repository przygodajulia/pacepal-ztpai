const express = require("express");
const router = express.Router();
const { requireAuth } = require("../controllers/auth.controller");
const controller = require("../controllers/user.controller");

router.get("/me", requireAuth, controller.getCurrentUser);

module.exports = router;
