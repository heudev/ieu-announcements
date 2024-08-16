const express = require("express");
const SflAnnouncement = require("../controllers/SflAnnouncement");
const router = express.Router();

router.get("/", SflAnnouncement.index);

module.exports = router;