const express = require("express");
const { TurkishOimAnnouncementController, EnglishOimAnnouncementController } = require("../controllers/OimAnnouncement");

const router = express.Router();

router.get("/tr", TurkishOimAnnouncementController.index);
router.get("/en", EnglishOimAnnouncementController.index);

module.exports = router;