const express = require("express");
const Announcement = require("../controllers/Announcement");
const router = express.Router();

router.get("/", Announcement.index);

module.exports = router;