const express = require("express");
const router = express.Router();
const { requireAuth } = require("./auth");
const controller = require("../controllers/myraces.controller");

router.get("/", requireAuth, controller.getMyRaces);

module.exports = router;
