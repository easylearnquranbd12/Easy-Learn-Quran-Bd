const express = require("express");
const {
  updateTravelingFormatField,
  getTravelingFormatField,
  createTravelingFormat,
  getAllTravelingFormat,
  deleteTravelingFormat,
  getSingleTravelingFormat,
  updateTravelingFormat,
  createExerciseTravelingFormat,
  getAllExerciseTravelingFormat,
  deleteExerciseTravelingFormat,
  updateGoodSongFormatField,
  getGoodSongFormatField,
  createGoodSongFormat,
  getAllGoodSongFormat,
  deleteGoodSongFormat,
  getSingleGoodSongFormat,
  updateGoodSongFormat,
  createExerciseGoodSongFormat,
  getAllExerciseGoodSongFormat,
  deleteExerciseGoodSongFormat,
  updateGoodMovieFormatField,
  getGoodMovieFormatField,
  createGoodMovieFormat,
  getAllGoodMovieFormat,
  deleteGoodMovieFormat,
  getSingleGoodMovieFormat,
  updateGoodMovieFormat,
  createExerciseGoodMovieFormat,
  getAllExerciseGoodMovieFormat,
  deleteExerciseGoodMovieFormat,
  updateGoodPoremFormatField,
  getGoodPoremFormatField,
  createGoodPoremFormat,
  getAllGoodPoremFormat,
  deleteGoodPoremFormat,
  getSingleGoodPoremFormat,
  updateGoodPoremFormat,
  createExerciseGoodPoremFormat,
  getAllExerciseGoodPoremFormat,
  deleteExerciseGoodPoremFormat,
  updateGoodNobelFormatField,
  getGoodNobelFormatField,
  createGoodNobelFormat,
  getAllGoodNobelFormat,
  deleteGoodNobelFormat,
  getSingleGoodNobelFormat,
  updateGoodNobelFormat,
  createExerciseGoodNobelFormat,
  getAllExerciseGoodNobelFormat,
  deleteExerciseGoodNobelFormat,
  updateOldGenerationFormatField,
  getOldGenerationFormatField,
  createOldGenerationFormat,
  getAllOldGenerationFormat,
  updateOldGenerationFormat,
  getSingleOldGenerationFormat,
  deleteOldGenerationFormat,
  createExerciseOldGenerationFormat,
  getAllExerciseOldGenerationFormat,
  deleteExerciseOldGenerationFormat,
  updateStoryWritingFormatField,
  getStoryWritingFormatField,
  createStoryWritingFormat,
  getAllStoryWritingFormat,
  updateStoryWritingFormat,
  getSingleStoryWritingFormat,
  deleteStoryWritingFormat,
  createExerciseStoryWritingFormat,
  getAllExerciseStoryWritingFormat,
  deleteExerciseStoryWritingFormat,
  updateLetterWritingFormatField,
  getLetterWritingFormatField,
  createLetterWritingFormat,
  getAllLetterWritingFormat,
  updateLetterWritingFormat,
  getSingleLetterWritingFormat,
  deleteLetterWritingFormat,
  createExerciseLetterWritingFormat,
  getAllExerciseLetterWritingFormat,
  deleteExerciseLetterWritingFormat,
  updateMcqFormatField,
  getMcqFormatField,
  deleteMcqFormat,
  getAllMcqFormat,
  createMcqFormat,
} = require("../controllers/sevenLayerController");

const router = express.Router();

/* --------------------------------------------------------------------------
 ✅ Traveling ROUTES
-------------------------------------------------------------------------- */
// Idea share field
router.put("/travelingField/:id", updateTravelingFormatField);
router.get("/travelingField", getTravelingFormatField);
// Idea share CRUD
router.post("/traveling", createTravelingFormat);
router.get("/traveling", getAllTravelingFormat);
router.delete("/traveling/:id", deleteTravelingFormat);
router.get("/traveling/:id", getSingleTravelingFormat);
router.put("/traveling/:id", updateTravelingFormat);
// Idea Share exercise
router.post("/createExerciseTraveling", createExerciseTravelingFormat);
router.get("/getAllExerciseTraveling", getAllExerciseTravelingFormat);
router.delete("/deleteExerciseTraveling/:id", deleteExerciseTravelingFormat);

/* --------------------------------------------------------------------------
 ✅ Good Song
-------------------------------------------------------------------------- */
// Idea share field
router.put("/goodSongField/:id", updateGoodSongFormatField);
router.get("/goodSongField", getGoodSongFormatField);
// Idea share CRUD
router.post("/goodSong", createGoodSongFormat);
router.get("/goodSong", getAllGoodSongFormat);
router.delete("/goodSong/:id", deleteGoodSongFormat);
router.get("/goodSong/:id", getSingleGoodSongFormat);
router.put("/goodSong/:id", updateGoodSongFormat);
// Idea Share exercise
router.post("/createExerciseGoodSong", createExerciseGoodSongFormat);
router.get("/getAllExerciseGoodSong", getAllExerciseGoodSongFormat);
router.delete("/deleteExerciseGoodSong/:id", deleteExerciseGoodSongFormat);

/* --------------------------------------------------------------------------
 ✅ Good Movie
-------------------------------------------------------------------------- */
// Idea share field
router.put("/goodMovieField/:id", updateGoodMovieFormatField);
router.get("/goodMovieField", getGoodMovieFormatField);
// Idea share CRUD
router.post("/goodMovie", createGoodMovieFormat);
router.get("/goodMovie", getAllGoodMovieFormat);
router.delete("/goodMovie/:id", deleteGoodMovieFormat);
router.get("/goodMovie/:id", getSingleGoodMovieFormat);
router.put("/goodMovie/:id", updateGoodMovieFormat);
// Idea Share exercise
router.post("/createExerciseGoodMovie", createExerciseGoodMovieFormat);
router.get("/getAllExerciseGoodMovie", getAllExerciseGoodMovieFormat);
router.delete("/deleteExerciseGoodMovie/:id", deleteExerciseGoodMovieFormat);

/* --------------------------------------------------------------------------
 ✅ Good Porem
-------------------------------------------------------------------------- */
// Idea share field
router.put("/goodPoremField/:id", updateGoodPoremFormatField);
router.get("/goodPoremField", getGoodPoremFormatField);
// Idea share CRUD
router.post("/goodPorem", createGoodPoremFormat);
router.get("/goodPorem", getAllGoodPoremFormat);
router.delete("/goodPorem/:id", deleteGoodPoremFormat);
router.get("/goodPorem/:id", getSingleGoodPoremFormat);
router.put("/goodPorem/:id", updateGoodPoremFormat);
// Idea Share exercise
router.post("/createExerciseGoodPorem", createExerciseGoodPoremFormat);
router.get("/getAllExerciseGoodPorem", getAllExerciseGoodPoremFormat);
router.delete("/deleteExerciseGoodPorem/:id", deleteExerciseGoodPoremFormat);

/* --------------------------------------------------------------------------
 ✅ Good Nobel
-------------------------------------------------------------------------- */
// Idea share field
router.put("/goodNobelField/:id", updateGoodNobelFormatField);
router.get("/goodNobelField", getGoodNobelFormatField);
// Idea share CRUD
router.post("/goodNobel", createGoodNobelFormat);
router.get("/goodNobel", getAllGoodNobelFormat);
router.delete("/goodNobel/:id", deleteGoodNobelFormat);
router.get("/goodNobel/:id", getSingleGoodNobelFormat);
router.put("/goodNobel/:id", updateGoodNobelFormat);
// Idea Share exercise
router.post("/createExerciseGoodNobel", createExerciseGoodNobelFormat);
router.get("/getAllExerciseGoodNobel", getAllExerciseGoodNobelFormat);
router.delete("/deleteExerciseGoodNobel/:id", deleteExerciseGoodNobelFormat);

/* --------------------------------------------------------------------------
 ✅ Old Generation ROUTES
-------------------------------------------------------------------------- */
// Old Generation field
router.put("/oldGenerationField/:id", updateOldGenerationFormatField);
router.get("/oldGenerationField", getOldGenerationFormatField);
// Old Generation CRUD
router.post("/oldGeneration", createOldGenerationFormat);
router.get("/oldGeneration", getAllOldGenerationFormat);
router.put("/oldGeneration/:id", updateOldGenerationFormat);
router.get("/oldGeneration/:id", getSingleOldGenerationFormat);
router.delete("/oldGeneration/:id", deleteOldGenerationFormat);
// Old Generation exercise
router.post("/createExerciseOldGeneration", createExerciseOldGenerationFormat);
router.get("/getAllExerciseOldGeneration", getAllExerciseOldGenerationFormat);
router.delete(
  "/deleteExerciseOldGeneration/:id",
  deleteExerciseOldGenerationFormat,
);

/* --------------------------------------------------------------------------
 ✅ Story Writing ROUTES
-------------------------------------------------------------------------- */
// Story Writing field
router.put("/storyWritingField/:id", updateStoryWritingFormatField);
router.get("/storyWritingField", getStoryWritingFormatField);
// Story Writing CRUD
router.post("/storyWriting", createStoryWritingFormat);
router.get("/storyWriting", getAllStoryWritingFormat);
router.put("/storyWriting/:id", updateStoryWritingFormat);
router.get("/storyWriting/:id", getSingleStoryWritingFormat);
router.delete("/storyWriting/:id", deleteStoryWritingFormat);
// Story Writing exercise
router.post("/createExerciseStoryWriting", createExerciseStoryWritingFormat);
router.get("/getAllExerciseStoryWriting", getAllExerciseStoryWritingFormat);
router.delete(
  "/deleteExerciseStoryWriting/:id",
  deleteExerciseStoryWritingFormat,
);

/* --------------------------------------------------------------------------
 ✅ Letter Writing ROUTES
-------------------------------------------------------------------------- */
// Letter Writing field
router.put("/letterWritingField/:id", updateLetterWritingFormatField);
router.get("/letterWritingField", getLetterWritingFormatField);
// Letter Writing CRUD
router.post("/letterWriting", createLetterWritingFormat);
router.get("/letterWriting", getAllLetterWritingFormat);
router.put("/letterWriting/:id", updateLetterWritingFormat);
router.get("/letterWriting/:id", getSingleLetterWritingFormat);
router.delete("/letterWriting/:id", deleteLetterWritingFormat);
// Letter Writing exercise
router.post("/createExerciseLetterWriting", createExerciseLetterWritingFormat);
router.get("/getAllExerciseLetterWriting", getAllExerciseLetterWritingFormat);
router.delete(
  "/deleteExerciseLetterWriting/:id",
  deleteExerciseLetterWritingFormat,
);

/* --------------------------------------------------------------------------
 ✅ MCQ ROUTES
-------------------------------------------------------------------------- */
router.put("/mcqField/:id", updateMcqFormatField);
router.get("/mcqField", getMcqFormatField);
router.delete("/mcq/:id", deleteMcqFormat);
router.get("/mcq", getAllMcqFormat);
router.post("/mcq", createMcqFormat);

module.exports = router;
