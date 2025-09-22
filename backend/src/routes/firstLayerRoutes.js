const express = require("express");
const { getSentences, createSentence, deleteSentence } = require("../Controllers/firstLayerController");

const router = express.Router();

router.get("/", getSentences);
router.post("/", createSentence);
router.delete("/:id", deleteSentence);

module.exports = router;
