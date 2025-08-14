const express = require("express")
const { getDashboardAnalytics } = require("../Controllers/dashboardController")

const router = express.Router()

// Dashboard analytics routes
router.get("/analytics", getDashboardAnalytics)

module.exports = router
