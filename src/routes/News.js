const express = require("express");
const { TurkishNewsController, EnglishNewsController } = require("../controllers/News");

const router = express.Router();

router.get("/tr", TurkishNewsController.index);
router.get("/en", EnglishNewsController.index);

module.exports = router;