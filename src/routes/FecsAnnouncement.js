const express = require("express");
const { TurkishFecsAnnouncementController, EnglishFecsAnnouncementController } = require("../controllers/FecsAnnouncement");

const router = express.Router();

router.get("/tr", TurkishFecsAnnouncementController.index);
router.get("/en", EnglishFecsAnnouncementController.index);

module.exports = router;