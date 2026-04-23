const express = require("express");
const {
  createEnroll,
  getAllEnrolls,
  getEnrollById,
  deleteEnroll,
  updateEnroll,
} = require("../controllers/enrollController");

const router = express.Router();

router.post("/enroll", createEnroll);
router.get("/enroll", getAllEnrolls);
router.get("/enroll/:id", getEnrollById);
router.delete("/enroll/:id", deleteEnroll);
router.put("/enroll/:id", updateEnroll);
module.exports = router;
