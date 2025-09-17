const express = require("express");
const { translateText } = require("../Controllers/translateController");

const router = express.Router();

// POST /api/translate
router.post("/", translateText);

module.exports = router;
