// routes/dashboardRoutes.js
const express = require("express");
const { getSummary, getUserPdfsByStatus, getUsersByMonth, getTopCollections } = require("../Controllers/dashboardController");
const router = express.Router();


router.get("/summary", getSummary); // usersCount, adminPdfCount, userPdfCount
router.get("/user-pdfs-status", getUserPdfsByStatus); // [{status, count}, ...]
router.get("/users-by-month", getUsersByMonth); // [{label, count}, ...]
router.get("/top-collections", getTopCollections); // [{name, count}, ...]

module.exports = router;
