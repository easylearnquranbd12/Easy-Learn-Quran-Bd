// routes/dashboardRoutes.js
const express = require("express");
const { getSummary, getUserPdfsByStatus, getUsersByMonth, getTopCollections, getUserDashboardSummary } = require("../Controllers/dashboardController");
const router = express.Router();


router.get("/summary", getSummary); 
router.get("/user-pdfs-status", getUserPdfsByStatus); 
router.get("/users-by-month", getUsersByMonth); 
router.get("/top-collections", getTopCollections); 

// User
router.get("/summary/:email", getUserDashboardSummary);
module.exports = router;
