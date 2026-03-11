const express = require("express");
const {
  createOthers,
  getAllOthers,
  deleteOthers,
  getSingleOthers,
  updateOthers,
} = require("../controllers/otherController");

const router = express.Router();

router.post("/", createOthers);
router.get("/", getAllOthers);
router.delete("/:id", deleteOthers);
router.get("/:id", getSingleOthers);
router.put("/:id", updateOthers);

module.exports = router;
