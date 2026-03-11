const express = require("express");
const {
  getAllIdiomFormat,
  createIdiomFormat,
  deleteIdiomFormat,
  getSingleIdiomFormat,
  updateIdiomFormat,
  updateIdiomFormatField,
  getIdiomFormatField,
  createExerciseIdiomFormat,
  getAllExerciseIdiomFormat,
  deleteExerciseIdiomFormat,
  getAllVocabularyFormat,
  createVocabularyFormat,
  deleteVocabularyFormat,
  getSingleVocabularyFormat,
  updateVocabularyFormat,
  updateVocabularyFormatField,
  getVocabularyFormatField,
  createExerciseVocabularyFormat,
  getAllExerciseVocabularyFormat,
  getAllElegantFormat,
  createElegantFormat,
  deleteElegantFormat,
  getSingleElegantFormat,
  updateElegantFormat,
  updateElegantFormatField,
  getElegantFormatField,
  createExerciseElegantFormat,
  getAllExerciseElegantFormat,
  deleteExerciseElegantFormat,
  getAllTantusterFormat,
  createTantusterFormat,
  deleteTantusterFormat,
  getSingleTantusterFormat,
  updateTantusterFormat,
  updateTantusterFormatField,
  getTantusterFormatField,
  createExerciseTantusterFormat,
  getAllExerciseTantusterFormat,
  deleteExerciseTantusterFormat,
  getAllNewTantusterFormat,
  createNewTantusterFormat,
  deleteNewTantusterFormat,
  getSingleNewTantusterFormat,
  updateNewTantusterFormat,
  createExerciseNewTantusterFormat,
  getAllExerciseNewTantusterFormat,
  deleteExerciseNewTantusterFormat,
  deleteExerciseVocabularyFormat,
  updateNewTantusterFormatField,
  getNewTantusterFormatField,
} = require("../controllers/sixLayerController");

const router = express.Router();

// idiom
router.get("/idiom", getAllIdiomFormat);
router.post("/idiom", createIdiomFormat);
router.delete("/idiom/:id", deleteIdiomFormat);
router.get("/idiom/:id", getSingleIdiomFormat);
router.put("/idiom/:id", updateIdiomFormat);
// Idiom field
router.put("/idiomField/:id", updateIdiomFormatField);
router.get("/idiomField", getIdiomFormatField);
// Idiom exercise
router.post("/createExerciseIdiom", createExerciseIdiomFormat);
router.get("/getAllExerciseIdiom", getAllExerciseIdiomFormat);
router.delete("/deleteExerciseIdiom/:id", deleteExerciseIdiomFormat);
// Vocabulary
router.get("/vocabulary", getAllVocabularyFormat);
router.post("/vocabulary", createVocabularyFormat);
router.delete("/vocabulary/:id", deleteVocabularyFormat);
router.get("/vocabulary/:id", getSingleVocabularyFormat);
router.put("/vocabulary/:id", updateVocabularyFormat);
// Vocabulary field
router.put("/vocabularyField/:id", updateVocabularyFormatField);
router.get("/vocabularyField", getVocabularyFormatField);
// Vocabulary exercise
router.post("/createExerciseVocabulary", createExerciseVocabularyFormat);
router.get("/getAllExerciseVocabulary", getAllExerciseVocabularyFormat);
router.delete("/deleteExerciseVocabulary/:id", deleteExerciseVocabularyFormat);

// elegant
router.get("/elegant", getAllElegantFormat);
router.post("/elegant", createElegantFormat);
router.delete("/elegant/:id", deleteElegantFormat);
router.get("/elegant/:id", getSingleElegantFormat);
router.put("/elegant/:id", updateElegantFormat);
// elegant field
router.put("/elegantField/:id", updateElegantFormatField);
router.get("/elegantField", getElegantFormatField);
// elegant exercise
router.post("/createExerciseElegant", createExerciseElegantFormat);
router.get("/getAllExerciseElegant", getAllExerciseElegantFormat);
router.delete("/deleteExerciseElegant/:id", deleteExerciseElegantFormat);

//  tantuster
router.get("/tantuster", getAllTantusterFormat);
router.post("/tantuster", createTantusterFormat);
router.delete("/tantuster/:id", deleteTantusterFormat);
router.get("/tantuster/:id", getSingleTantusterFormat);
router.put("/tantuster/:id", updateTantusterFormat);
// tantuster field
router.put("/tantusterField/:id", updateTantusterFormatField);
router.get("/tantusterField", getTantusterFormatField);
// tantuster exercise
router.post("/createExerciseTantuster", createExerciseTantusterFormat);
router.get("/getAllExerciseTantuster", getAllExerciseTantusterFormat);
router.delete("/deleteExerciseTantuster/:id", deleteExerciseTantusterFormat);

// new tantuster
router.get("/newtantuster", getAllNewTantusterFormat);
router.post("/newtantuster", createNewTantusterFormat);
router.delete("/newtantuster/:id", deleteNewTantusterFormat);
router.get("/newtantuster/:id", getSingleNewTantusterFormat);
router.put("/newtantuster/:id", updateNewTantusterFormat);
// new tantuster field
router.put("/newtantusterField/:id", updateNewTantusterFormatField);
router.get("/newtantusterField", getNewTantusterFormatField);
// new tantuster exercise
router.post("/createExerciseNewTantuster", createExerciseNewTantusterFormat);
router.get("/getAllExerciseNewTantuster", getAllExerciseNewTantusterFormat);
router.delete(
  "/deleteExerciseNewTantuster/:id",
  deleteExerciseNewTantusterFormat,
);

module.exports = router;
