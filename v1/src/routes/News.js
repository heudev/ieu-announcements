const express = require("express");
const News = require("../controllers/News");
const router = express.Router();

router.get("/", News.index);

module.exports = router;