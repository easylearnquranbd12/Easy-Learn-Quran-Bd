const express = require("express");
const {
  createTecher,
  getAllTechers,
  getTecherById,
  deleteTecher,
  updateTecher,
} = require("../controllers/techersController");

const router = express.Router();

router.post("/", createTecher);
router.get("/", getAllTechers);
router.get("/:id", getTecherById);
router.delete("/:id", deleteTecher);
router.put("/:id", updateTecher);
module.exports = router;
