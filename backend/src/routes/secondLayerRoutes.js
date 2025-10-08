const express = require("express");
const {
  getAllSentence,
  createSentence,
  deleteSentence,
  updateSentenceField,
  getSentenceField,
  createExerciseSentence,
  getAllVerb,
  createVerb,
  deleteVerb,
  updateVerbField,
  getVerbField,
  createExerciseVerb,
  getAllTense,
  createTense,
  deleteTense,
  updateTenseField,
  getTenseField,
  createExerciseTense,
  getAllArticle,
  createArticle,
  deleteArticle,
  updateArticleField,
  getArticleField,
  createExerciseArticle,
  getAllPreposition,
  createPreposition,
  deletePreposition,
  updatePrepositionField,
  getPrepositionField,
  createExercisePreposition,
} = require("../Controllers/secondLayerController");

const router = express.Router();

// sentence
router.get("/sentence", getAllSentence);
router.post("/sentence", createSentence);
router.delete("/sentence/:id", deleteSentence);
// sentence field
router.put("/sentenceField/:id", updateSentenceField);
router.get("/sentenceField", getSentenceField);
router.post("/createsentenceExercise", createExerciseSentence);

// Verb
router.get("/verb", getAllVerb);
router.post("/verb", createVerb);
router.delete("/verb/:id", deleteVerb);
// Verb field
router.put("/verbField/:id", updateVerbField);
router.get("/verbField", getVerbField);
router.post("/createverbExercise", createExerciseVerb);

// Tense
router.get("/tense", getAllTense);
router.post("/tense", createTense);
router.delete("/tense/:id", deleteTense);
// Verb field
router.put("/tenseField/:id", updateTenseField);
router.get("/tenseField", getTenseField);
router.post("/createtenseExercise", createExerciseTense);
// Article
router.get("/article", getAllArticle);
router.post("/article", createArticle);
router.delete("/article/:id", deleteArticle);
// Article field
router.put("/articleField/:id", updateArticleField);
router.get("/articleField", getArticleField);
router.post("/createarticleExercise", createExerciseArticle);
// Preposition
router.get("/preposition", getAllPreposition);
router.post("/preposition", createPreposition);
router.delete("/preposition/:id", deletePreposition);
// Preposition field
router.put("/prepositionField/:id", updatePrepositionField);
router.get("/prepositionField", getPrepositionField);
router.post("/createprepositionExercise", createExercisePreposition);

module.exports = router;
