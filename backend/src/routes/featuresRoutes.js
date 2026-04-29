const express = require("express");
const {
  deleteFeature,
  createFeature,
  getAllFeatures,
  createAchievements,
  getAllAchievements,
  deleteAchievements,
  createCourses,
  getAllCourses,
  deleteCourses,
  createCountry,
  deleteCountry,
  getAllCountry,
} = require("../controllers/featuresController");

const router = express.Router();

router.post("/", createFeature);
router.get("/", getAllFeatures);
router.delete("/:id", deleteFeature);
// Achievements Routes
router.post("/achievements", createAchievements);
router.get("/achievements", getAllAchievements);
router.delete("/achievements/:id", deleteAchievements);
// Courses Routes
router.post("/courses", createCourses);
router.get("/courses", getAllCourses);
router.delete("/courses/:id", deleteCourses);
// Country   Routes
router.post("/country", createCountry);
router.get("/country", getAllCountry);
router.delete("/country/:id", deleteCountry);
module.exports = router;
