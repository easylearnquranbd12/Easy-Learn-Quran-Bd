const express = require("express");
const {
  updateGoodSongField,
  getGoodSongField,
  createExerciseGoodSong,
  createSongs,
  deleteSong,
  getAllSongs,
} = require("../Controllers/fourthLayerController");

const router = express.Router();

// Good Song field
router.put("/goodSongField/:id", updateGoodSongField);
router.get("/goodSongField", getGoodSongField);
router.post("/createExerciseGoodSong", createExerciseGoodSong);
// Good Song
router.delete("/goodSongs/:id", deleteSong);
router.get("/goodSongs", getAllSongs);
router.post("/goodSongs", createSongs);

module.exports = router;
