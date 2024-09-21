const express = require("express");
const { TurkishDmAnnouncementController, EnglishDmAnnouncementController } = require("../controllers/DmAnnouncement");

const router = express.Router();

router.get("/tr", TurkishDmAnnouncementController.index);
router.get("/en", EnglishDmAnnouncementController.index);

module.exports = router;