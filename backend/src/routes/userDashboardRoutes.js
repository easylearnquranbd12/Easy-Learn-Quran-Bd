const express = require("express")
const router = express.Router()
const { getUserDashboard, updateUserProgress, updateCourseProgress, removeFavorite, toggleFavorite, getAchievements, getFavorites, getEnrolledCourses } = require("../Controllers/userDashboardController")
const { verifyToken } = require("../middleware/authMiddleware")

// Get user dashboard data (requires authentication)
router.get("/dashboard/:email", getUserDashboard)

// Update user progress for a course
router.put("/progress/:email", updateUserProgress)
router.get("/dashboard/:email", getUserDashboard)
router.get("/enrolled-courses/:email", getEnrolledCourses)
router.get("/favorites/:email", getFavorites)
router.get("/achievements/:email", getAchievements)

// Action routes
router.post("/favorites/toggle", toggleFavorite)
router.post("/favorites/remove", removeFavorite)
router.post("/course-progress", updateCourseProgress)
module.exports = router
