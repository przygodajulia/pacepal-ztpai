const express = require("express");
const router = express.Router();
const controller = require("../controllers/race.controller");
const { requireAuth } = require("../controllers/auth.controller");

router.get("/", requireAuth, controller.getRaces);
router.get("/:id", requireAuth, controller.getRace);
router.post("/:id/signup", requireAuth, controller.signupForRace);

module.exports = router;