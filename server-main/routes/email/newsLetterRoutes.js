const express = require("express");
const newsLetterController = require("../../controllers/email/newsLetterController.js");

const router = express.Router();

router.post("/newsletter", newsLetterController.newsLetter);

module.exports = router;
