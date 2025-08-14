const express = require("express")

const {
    createEnrollment,
    getAllEnrollments,
    getEnrollmentById,
    updateEnrollmentStatus,
    deleteEnrollment,
    getEnrollmentsByStudent,
    getEnrollmentsByCourse,
    updateEnrollmentProgress,
    getEnrollmentStats,
} = require("../Controllers/enrollmentController")

const router = express.Router()

// Basic CRUD operations
router.post("/enrollments", createEnrollment)
router.get("/enrollments", getAllEnrollments)
router.get("/enrollments/stats", getEnrollmentStats)
router.get("/enrollments/:id", getEnrollmentById)
router.delete("/enrollments/:id", deleteEnrollment)

// Status and progress updates
router.put("/enrollments/:id/status", updateEnrollmentStatus)
router.put("/enrollments/:id/progress", updateEnrollmentProgress)

// Filter by student or course
router.get("/enrollments/student/:studentId", getEnrollmentsByStudent)
router.get("/enrollments/course/:courseId", getEnrollmentsByCourse)

module.exports = router
