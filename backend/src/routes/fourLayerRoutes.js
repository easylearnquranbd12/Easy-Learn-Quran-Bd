const express = require("express");
const {
  getTravelingField,
  updateTravelingField,
  createTraveling,
  getAllTraveling,
  deleteTraveling,
  getSingleTraveling,
  updateTraveling,
  createExerciseTraveling,
  getAllExerciseTraveling,
  deleteExerciseTraveling,
  updateGoodSongField,
  getGoodSongField,
  createGoodSong,
  getAllGoodSong,
  deleteGoodSong,
  getSingleGoodSong,
  updateGoodSong,
  createExerciseGoodSong,
  getAllExerciseGoodSong,
  deleteExerciseGoodSong,
  updateGoodMovieField,
  getGoodMovieField,
  createGoodMovie,
  getAllGoodMovie,
  deleteGoodMovie,
  getSingleGoodMovie,
  createExerciseGoodMovie,
  getAllExerciseGoodMovie,
  deleteExerciseGoodMovie,
  updateGoodMovie,
  updateGoodPoremField,
  getGoodPoremField,
  createGoodPorem,
  getAllGoodPorem,
  deleteGoodPorem,
  getSingleGoodPorem,
  updateGoodPorem,
  createExerciseGoodPorem,
  getAllExerciseGoodPorem,
  deleteExerciseGoodPorem,
  updateGoodNobelField,
  getGoodNobelField,
  createGoodNobel,
  getAllGoodNobel,
  deleteGoodNobel,
  getSingleGoodNobel,
  updateGoodNobel,
  createExerciseGoodNobel,
  getAllExerciseGoodNobel,
  deleteExerciseGoodNobel,
} = require("../controllers/fourLayerControlller");

const router = express.Router();

/* --------------------------------------------------------------------------
 ✅ Traveling ROUTES
-------------------------------------------------------------------------- */
// Idea share field
router.put("/travelingField/:id", updateTravelingField);
router.get("/travelingField", getTravelingField);
// Idea share CRUD
router.post("/traveling", createTraveling);
router.get("/traveling", getAllTraveling);
router.delete("/traveling/:id", deleteTraveling);
router.get("/traveling/:id", getSingleTraveling);
router.put("/traveling/:id", updateTraveling);
// Idea Share exercise
router.post("/createExerciseTraveling", createExerciseTraveling);
router.get("/getAllExerciseTraveling", getAllExerciseTraveling);
router.delete("/deleteExerciseTraveling/:id", deleteExerciseTraveling);

/* --------------------------------------------------------------------------
 ✅ Good Song
-------------------------------------------------------------------------- */
// Idea share field
router.put("/goodSongField/:id", updateGoodSongField);
router.get("/goodSongField", getGoodSongField);
// Idea share CRUD
router.post("/goodSong", createGoodSong);
router.get("/goodSong", getAllGoodSong);
router.delete("/goodSong/:id", deleteGoodSong);
router.get("/goodSong/:id", getSingleGoodSong);
router.put("/goodSong/:id", updateGoodSong);
// Idea Share exercise
router.post("/createExerciseGoodSong", createExerciseGoodSong);
router.get("/getAllExerciseGoodSong", getAllExerciseGoodSong);
router.delete("/deleteExerciseGoodSong/:id", deleteExerciseGoodSong);

/* --------------------------------------------------------------------------
 ✅ Good Movie
-------------------------------------------------------------------------- */
// Idea share field
router.put("/goodMovieField/:id", updateGoodMovieField);
router.get("/goodMovieField", getGoodMovieField);
// Idea share CRUD
router.post("/goodMovie", createGoodMovie);
router.get("/goodMovie", getAllGoodMovie);
router.delete("/goodMovie/:id", deleteGoodMovie);
router.get("/goodMovie/:id", getSingleGoodMovie);
router.put("/goodMovie/:id", updateGoodMovie);
// Idea Share exercise
router.post("/createExerciseGoodMovie", createExerciseGoodMovie);
router.get("/getAllExerciseGoodMovie", getAllExerciseGoodMovie);
router.delete("/deleteExerciseGoodMovie/:id", deleteExerciseGoodMovie);


/* --------------------------------------------------------------------------
 ✅ Good Porem
-------------------------------------------------------------------------- */
// Idea share field
router.put("/goodPoremField/:id", updateGoodPoremField);
router.get("/goodPoremField", getGoodPoremField);
// Idea share CRUD
router.post("/goodPorem", createGoodPorem);
router.get("/goodPorem", getAllGoodPorem);
router.delete("/goodPorem/:id", deleteGoodPorem);
router.get("/goodPorem/:id", getSingleGoodPorem);
router.put("/goodPorem/:id", updateGoodPorem);
// Idea Share exercise
router.post("/createExerciseGoodPorem", createExerciseGoodPorem);
router.get("/getAllExerciseGoodPorem", getAllExerciseGoodPorem);
router.delete("/deleteExerciseGoodPorem/:id", deleteExerciseGoodPorem);


/* --------------------------------------------------------------------------
 ✅ Good Nobel
-------------------------------------------------------------------------- */
// Idea share field
router.put("/goodNobelField/:id", updateGoodNobelField);
router.get("/goodNobelField", getGoodNobelField);
// Idea share CRUD
router.post("/goodNobel", createGoodNobel);
router.get("/goodNobel", getAllGoodNobel);
router.delete("/goodNobel/:id", deleteGoodNobel);
router.get("/goodNobel/:id", getSingleGoodNobel);
router.put("/goodNobel/:id", updateGoodNobel);
// Idea Share exercise
router.post("/createExerciseGoodNobel", createExerciseGoodNobel);
router.get("/getAllExerciseGoodNobel", getAllExerciseGoodNobel);
router.delete("/deleteExerciseGoodNobel/:id", deleteExerciseGoodNobel);

module.exports = router;
