const express = require("express");
const {
  updateOldGenerationField,
  getOldGenerationField,
  createExerciseOldGeneration,
  createOldGeneration,
  deleteOldGeneration,
  getAllOldGeneration,
  updateStoryWritingField,
  getStoryWritingField,
  createExerciseStoryWriting,
  createStoryWriting,
  deleteStoryWriting,
  getAllStoryWriting,
  updateLetterWritingField,
  getLetterWritingField,
  createExerciseLetterWriting,
  createLetterWriting,
  deleteLetterWriting,
  getAllLetterWriting,
  updateMcqField,
  getMcqField,
  deleteMcq,
  getAllMcq,
  createMcq,
  updateOldGeneration,
  getSingleOldGeneration,
  getAllExerciseOldGeneration,
  deleteExerciseOldGeneration,
  updateStoryWriting,
  getSingleStoryWriting,
  getAllExerciseStoryWriting,
  deleteExerciseStoryWriting,
  updateLetterWriting,
  getSingleLetterWriting,
  getAllExerciseLetterWriting,
  deleteExerciseLetterWriting,
} = require("../controllers/fiveLayerController");

const router = express.Router();

/* --------------------------------------------------------------------------
 ✅ Old Generation ROUTES
-------------------------------------------------------------------------- */
// Old Generation field
router.put("/oldGenerationField/:id", updateOldGenerationField);
router.get("/oldGenerationField", getOldGenerationField);
// Old Generation CRUD
router.post("/oldGeneration", createOldGeneration);
router.get("/oldGeneration", getAllOldGeneration);
router.put("/oldGeneration/:id", updateOldGeneration);
router.get("/oldGeneration/:id", getSingleOldGeneration);
router.delete("/oldGeneration/:id", deleteOldGeneration);
// Old Generation exercise
router.post("/createExerciseOldGeneration", createExerciseOldGeneration);
router.get("/getAllExerciseOldGeneration", getAllExerciseOldGeneration);
router.delete("/deleteExerciseOldGeneration/:id", deleteExerciseOldGeneration);

/* --------------------------------------------------------------------------
 ✅ Story Writing ROUTES
-------------------------------------------------------------------------- */
// Story Writing field
router.put("/storyWritingField/:id", updateStoryWritingField);
router.get("/storyWritingField", getStoryWritingField);
// Story Writing CRUD
router.post("/storyWriting", createStoryWriting);
router.get("/storyWriting", getAllStoryWriting);
router.put("/storyWriting/:id", updateStoryWriting);
router.get("/storyWriting/:id", getSingleStoryWriting);
router.delete("/storyWriting/:id", deleteStoryWriting);
// Story Writing exercise
router.post("/createExerciseStoryWriting", createExerciseStoryWriting);
router.get("/getAllExerciseStoryWriting", getAllExerciseStoryWriting);
router.delete("/deleteExerciseStoryWriting/:id", deleteExerciseStoryWriting);

/* --------------------------------------------------------------------------
 ✅ Letter Writing ROUTES
-------------------------------------------------------------------------- */
// Letter Writing field
router.put("/letterWritingField/:id", updateLetterWritingField);
router.get("/letterWritingField", getLetterWritingField);
// Letter Writing CRUD
router.post("/letterWriting", createLetterWriting);
router.get("/letterWriting", getAllLetterWriting);
router.put("/letterWriting/:id", updateLetterWriting);
router.get("/letterWriting/:id", getSingleLetterWriting);
router.delete("/letterWriting/:id", deleteLetterWriting);
// Letter Writing exercise
router.post("/createExerciseLetterWriting", createExerciseLetterWriting);
router.get("/getAllExerciseLetterWriting", getAllExerciseLetterWriting);
router.delete("/deleteExerciseLetterWriting/:id", deleteExerciseLetterWriting);

/* --------------------------------------------------------------------------
 ✅ MCQ ROUTES
-------------------------------------------------------------------------- */
router.put("/mcqField/:id", updateMcqField);
router.get("/mcqField", getMcqField);
router.delete("/mcq/:id", deleteMcq);
router.get("/mcq", getAllMcq);
router.post("/mcq", createMcq);

module.exports = router;
