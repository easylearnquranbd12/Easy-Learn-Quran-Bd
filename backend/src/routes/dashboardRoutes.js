// routes/dashboardRoutes.js
const express = require("express");
const { getSummary, getUsersByMonth, getUserDashboardSummary } = require("../controllers/dashboardController");
const router = express.Router();


router.get("/summary", getSummary); 
router.get("/users-by-month", getUsersByMonth); 

// User
router.get("/summary/:email", getUserDashboardSummary);
module.exports = router;
