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
  getSingleSentence,
  updateSentence,
  getAllExerciseSentence,
  deleteExerciseSentence,
  getAllExerciseVerb,
  deleteExerciseVerb,
  getAllExerciseTense,
  deleteExerciseTense,
  getAllExerciseArticle,
  deleteExerciseArticle,
  getAllExercisePreposition,
  deleteExercisePreposition,
  getSingleVerb,
  updateVerb,
  getSingleTense,
  updateTense,
  getSingleArticle,
  updateArticle,
  getSinglePreposition,
  updatePreposition,
} = require("../controllers/secondLayerController");

const router = express.Router();

// sentence
router.get("/sentence", getAllSentence);
router.post("/sentence", createSentence);
router.delete("/sentence/:id", deleteSentence);
router.get("/sentence/:id", getSingleSentence);
router.put("/sentence/:id", updateSentence);
// sentence field
router.put("/sentenceField/:id", updateSentenceField);
router.get("/sentenceField", getSentenceField);
// sentence exercise
router.post("/createExerciseSentence", createExerciseSentence);
router.get("/getAllExerciseSentence", getAllExerciseSentence);
router.delete("/deleteExerciseSentence/:id", deleteExerciseSentence);

// Verb
router.get("/verb", getAllVerb);
router.post("/verb", createVerb);
router.delete("/verb/:id", deleteVerb);
router.get("/verb/:id", getSingleVerb);
router.put("/verb/:id", updateVerb);
// Verb field
router.put("/verbField/:id", updateVerbField);
router.get("/verbField", getVerbField);
// Verb exercise
router.post("/createExerciseVerb", createExerciseVerb);
router.get("/getAllExerciseVerb", getAllExerciseVerb);
router.delete("/deleteExerciseVerb/:id", deleteExerciseVerb);

// Tense
router.get("/tense", getAllTense);
router.post("/tense", createTense);
router.delete("/tense/:id", deleteTense);
router.get("/tense/:id", getSingleTense);
router.put("/tense/:id", updateTense);

// tense field
router.put("/tenseField/:id", updateTenseField);
router.get("/tenseField", getTenseField);
// Tense exercise
router.post("/createExerciseTense", createExerciseTense);
router.get("/getAllExerciseTense", getAllExerciseTense);
router.delete("/deleteExerciseTense/:id", deleteExerciseTense);
// Article
router.get("/article", getAllArticle);
router.post("/article", createArticle);
router.delete("/article/:id", deleteArticle);
router.get("/article/:id", getSingleArticle);
router.put("/article/:id", updateArticle);
// Article field
router.put("/articleField/:id", updateArticleField);
router.get("/articleField", getArticleField);
// Article exercise
router.post("/createExerciseArticle", createExerciseArticle);
router.get("/getAllExerciseArticle", getAllExerciseArticle);
router.delete("/deleteExerciseArticle/:id", deleteExerciseArticle);
// Preposition
router.get("/preposition", getAllPreposition);
router.post("/preposition", createPreposition);
router.delete("/preposition/:id", deletePreposition);
router.get("/preposition/:id", getSinglePreposition);
router.put("/preposition/:id", updatePreposition);
// Preposition field
router.put("/prepositionField/:id", updatePrepositionField);
router.get("/prepositionField", getPrepositionField);
// Preposition exercise
router.post("/createExercisePreposition", createExercisePreposition);
router.get("/getAllExercisePreposition", getAllExercisePreposition);
router.delete("/deleteExercisePreposition/:id", deleteExercisePreposition);

module.exports = router;
