const express = require("express");
const {
  createVocabulary,
  getAllVocabulary,
  deleteVocabulary,
  updateVocabularyField,
  getVocabularyField,
  createExercise,
  getAllElegant,
  createElegant,
  deleteElegant,
  updateElegantField,
  getElegantField,
  createExerciseElegant,
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

// elegant
router.get("/elegant", getAllElegant);
router.post("/elegant", createElegant);
router.delete("/elegant/:id", deleteElegant);
// elegant field
router.put("/elegantField/:id", updateElegantField);
router.get("/elegantField", getElegantField);
router.post("/createExerciseElegant", createExerciseElegant);

module.exports = router;
