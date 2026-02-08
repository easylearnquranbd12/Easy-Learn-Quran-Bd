const express = require("express");
const {
  updateGoodSongField,
  getGoodSongField,
  createExerciseGoodSong,
  createSongs,
  deleteSong,
  getAllSongs,
  updateGoodMovieField,
  getGoodMovieField,
  createExerciseGoodMovie,
  deleteMovie,
  getAllMovies,
  createMovies,
} = require("../controllers/fourthLayerController");

const router = express.Router();

// Good Song field
router.put("/goodSongField/:id", updateGoodSongField);
router.get("/goodSongField", getGoodSongField);
router.post("/createExerciseGoodSong", createExerciseGoodSong);
// Good Song
router.delete("/goodSongs/:id", deleteSong);
router.get("/goodSongs", getAllSongs);
router.post("/goodSongs", createSongs);

// Good Song field
router.put("/goodMovieField/:id", updateGoodMovieField);
router.get("/goodMovieField", getGoodMovieField);
router.post("/createExerciseGoodMovie", createExerciseGoodMovie);
// Good Song
router.delete("/goodMovies/:id", deleteMovie);
router.get("/goodMovies", getAllMovies);
router.post("/goodMovies", createMovies);

module.exports = router;
