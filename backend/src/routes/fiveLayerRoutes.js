const express = require("express");
const {
  // ✅ Old Generation
  updateOldGenerationField,
  getOldGenerationField,
  createExerciseOldGeneration,
  createOldGeneration,
  deleteOldGeneration,
  getAllOldGeneration,

  // ✅ Story Writing
  updateStoryWritingField,
  getStoryWritingField,
  createExerciseStoryWriting,
  createStoryWriting,
  deleteStoryWriting,
  getAllStoryWriting,

  // ✅ Letter Writing
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
} = require("../controllers/fiveLayerController");

const router = express.Router();

/* --------------------------------------------------------------------------
 ✅ OLD GENERATION ROUTES
-------------------------------------------------------------------------- */
router.put("/oldGenerationField/:id", updateOldGenerationField);
router.get("/oldGenerationField", getOldGenerationField);
router.post("/createExerciseOldGeneration", createExerciseOldGeneration);
router.delete("/oldGeneration/:id", deleteOldGeneration);
router.get("/oldGeneration", getAllOldGeneration);
router.post("/oldGeneration", createOldGeneration);

/* --------------------------------------------------------------------------
 ✅ STORY WRITING ROUTES
-------------------------------------------------------------------------- */
router.put("/storyWritingField/:id", updateStoryWritingField);
router.get("/storyWritingField", getStoryWritingField);
router.post("/createExerciseStoryWriting", createExerciseStoryWriting);
router.delete("/storyWriting/:id", deleteStoryWriting);
router.get("/storyWriting", getAllStoryWriting);
router.post("/storyWriting", createStoryWriting);

/* --------------------------------------------------------------------------
 ✅ LETTER WRITING ROUTES
-------------------------------------------------------------------------- */
router.put("/letterWritingField/:id", updateLetterWritingField);
router.get("/letterWritingField", getLetterWritingField);
router.post("/createExerciseLetterWriting", createExerciseLetterWriting);
router.delete("/letterWriting/:id", deleteLetterWriting);
router.get("/letterWriting", getAllLetterWriting);
router.post("/letterWriting", createLetterWriting);
/* --------------------------------------------------------------------------
 ✅ MCQ ROUTES
-------------------------------------------------------------------------- */
router.put("/mcqField/:id", updateMcqField);
router.get("/mcqField", getMcqField);
router.delete("/mcq/:id", deleteMcq);
router.get("/mcq", getAllMcq);
router.post("/mcq", createMcq);

module.exports = router;
