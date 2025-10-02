const express = require("express");
const {
  getSentences,
  createSentence,
  deleteSentence,
  getElegant,
  createElegant,
  deleteElegant,
  createVocabulary,
  getAllVocabulary,
  deleteVocabulary,
  updateVocabularyField,
  getVocabularyField,
  toggleVocabularyActive,
  createExercise,
} = require("../Controllers/firstLayerController");

const router = express.Router();

// Vacabulary
router.get("/vocabulary", getAllVocabulary);
router.post("/vocabulary", createVocabulary);
router.delete("/vocabulary/:id", deleteVocabulary);
// Vacabulary field
router.put("/vocabularyField/:id", updateVocabularyField);
router.get("/vocabularyField", getVocabularyField);
router.post("/createExercise", createExercise);

router.get("/", getSentences);
router.post("/", createSentence);
router.delete("/:id", deleteSentence);
router.get("/elegant", getElegant);
router.post("/elegant", createElegant);
router.delete("/elegant/:id", deleteElegant);

module.exports = router;
