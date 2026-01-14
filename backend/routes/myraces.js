const express = require("express");
const router = express.Router();
const { requireAuth } = require("../controllers/auth.controller"); 
const controller = require("../controllers/myraces.controller");

router.get("/", requireAuth, controller.getMyRaces);

module.exports = router;
