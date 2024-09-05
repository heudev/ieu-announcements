const express = require("express");
const { TurkishSflAnnouncementController, EnglishSflAnnouncementController } = require("../controllers/SflAnnouncement");

const router = express.Router();

router.get("/tr", TurkishSflAnnouncementController.index);
router.get("/en", EnglishSflAnnouncementController.index);

module.exports = router;