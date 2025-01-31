const express = require("express");
const { TurkishAnnouncementController, EnglishAnnouncementController } = require("../controllers/Announcement");

const router = express.Router();

router.get("/tr", TurkishAnnouncementController.index);
router.get("/en", EnglishAnnouncementController.index);

module.exports = router;