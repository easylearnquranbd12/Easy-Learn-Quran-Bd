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
  getAllNewTantuster,
  createNewTantuster,
  deleteNewTantuster,
  updateNewTantusterField,
  getNewTantusterField,
  createExerciseNewTantuster,
  getAllTantuster,
  createTantuster,
  deleteTantuster,
  updateTantusterField,
  getTantusterField,
  createExerciseTantuster,
  getAllIdiom,
  createIdiom,
  deleteIdiom,
  updateIdiomField,
  getIdiomField,
  createExerciseIdiom,
} = require("../Controllers/firstLayerController");

const router = express.Router();

// idiom
router.get("/idiom", getAllIdiom);
router.post("/idiom", createIdiom);
router.delete("/idiom/:id", deleteIdiom);
// Idiom field
router.put("/idiomField/:id", updateIdiomField);
router.get("/idiomField", getIdiomField);
router.post("/createExerciseIdiom", createExerciseIdiom);
// Vocabulary
router.get("/vocabulary", getAllVocabulary);
router.post("/vocabulary", createVocabulary);
router.delete("/vocabulary/:id", deleteVocabulary);
// Vocabulary field
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

//  tantuster
router.get("/tantuster", getAllTantuster);
router.post("/tantuster", createTantuster);
router.delete("/tantuster/:id", deleteTantuster);
// tantuster field
router.put("/tantusterField/:id", updateTantusterField);
router.get("/tantusterField", getTantusterField);
router.post("/createExerciseTantuster", createExerciseTantuster);

// new tantuster
router.get("/newtantuster", getAllNewTantuster);
router.post("/newtantuster", createNewTantuster);
router.delete("/newtantuster/:id", deleteNewTantuster);
// new tantuster field
router.put("/newtantusterField/:id", updateNewTantusterField);
router.get("/newtantusterField", getNewTantusterField);
router.post("/createExerciseNewTantuster", createExerciseNewTantuster);

module.exports = router;
