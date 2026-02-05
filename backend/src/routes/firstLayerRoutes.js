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
  updateIdiom,
  getSingleIdiom,
  updateVocabulary,
  getSingleVocabulary,
  createExerciseVocabulary,
  getSingleElegant,
  updateElegant,
  getSingleTantuster,
  updateTantuster,
  getSingleNewTantuster,
  updateNewTantuster,
  getAllExerciseVocabulary,
  deleteExerciseVocabulary,
  getAllExerciseElegant,
  deleteExerciseElegant,
  getAllExerciseTantuster,
  deleteExerciseTantuster,
  getAllExerciseNewTantuster,
  deleteExerciseNewTantuster,
  getAllExerciseIdiom,
  deleteExerciseIdiom,
} = require("../Controllers/firstLayerController");

const router = express.Router();

// idiom
router.get("/idiom", getAllIdiom);
router.post("/idiom", createIdiom);
router.delete("/idiom/:id", deleteIdiom);
router.get("/idiom/:id", getSingleIdiom);
router.put("/idiom/:id", updateIdiom);
// Idiom field
router.put("/idiomField/:id", updateIdiomField);
router.get("/idiomField", getIdiomField);
// Idiom exercise
router.post("/createExerciseIdiom", createExerciseIdiom);
router.get("/getAllExerciseIdiom", getAllExerciseIdiom);
router.delete("/deleteExerciseIdiom/:id", deleteExerciseIdiom);
// Vocabulary
router.get("/vocabulary", getAllVocabulary);
router.post("/vocabulary", createVocabulary);
router.delete("/vocabulary/:id", deleteVocabulary);
router.get("/vocabulary/:id", getSingleVocabulary);
router.put("/vocabulary/:id", updateVocabulary);
// Vocabulary field
router.put("/vocabularyField/:id", updateVocabularyField);
router.get("/vocabularyField", getVocabularyField);
// Vocabulary exercise
router.post("/createExerciseVocabulary", createExerciseVocabulary);
router.get("/getAllExerciseVocabulary", getAllExerciseVocabulary);
router.delete("/deleteExerciseVocabulary/:id", deleteExerciseVocabulary);

// elegant
router.get("/elegant", getAllElegant);
router.post("/elegant", createElegant);
router.delete("/elegant/:id", deleteElegant);
router.get("/elegant/:id", getSingleElegant);
router.put("/elegant/:id", updateElegant);
// elegant field
router.put("/elegantField/:id", updateElegantField);
router.get("/elegantField", getElegantField);
// elegant exercise
router.post("/createExerciseElegant", createExerciseElegant);
router.get("/getAllExerciseElegant", getAllExerciseElegant);
router.delete("/deleteExerciseElegant/:id", deleteExerciseElegant);


//  tantuster
router.get("/tantuster", getAllTantuster);
router.post("/tantuster", createTantuster);
router.delete("/tantuster/:id", deleteTantuster);
router.get("/tantuster/:id", getSingleTantuster);
router.put("/tantuster/:id", updateTantuster);
// tantuster field
router.put("/tantusterField/:id", updateTantusterField);
router.get("/tantusterField", getTantusterField);
// tantuster exercise
router.post("/createExerciseTantuster", createExerciseTantuster);
router.get("/getAllExerciseTantuster", getAllExerciseTantuster);
router.delete("/deleteExerciseTantuster/:id", deleteExerciseTantuster);

// new tantuster
router.get("/newtantuster", getAllNewTantuster);
router.post("/newtantuster", createNewTantuster);
router.delete("/newtantuster/:id", deleteNewTantuster);
router.get("/newtantuster/:id", getSingleNewTantuster);
router.put("/newtantuster/:id", updateNewTantuster);
// new tantuster field
router.put("/newtantusterField/:id", updateNewTantusterField);
router.get("/newtantusterField", getNewTantusterField);
// new tantuster exercise
router.post("/createExerciseNewTantuster", createExerciseNewTantuster);
router.get("/getAllExerciseNewTantuster", getAllExerciseNewTantuster);
router.delete("/deleteExerciseNewTantuster/:id", deleteExerciseNewTantuster);

module.exports = router;
