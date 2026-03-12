// const express = require("express");
// const {
//   createOthers,
//   getAllOthers,
//   deleteOthers,
//   getSingleOthers,
//   updateOthers,
//   createForNext,
//   getAllForNext,
//   deleteForNext,
//   getSingleForNext,
//   updateForNext,
// } = require("../controllers/otherController");

// const router = express.Router();

// router.post("/", createOthers);
// router.get("/", getAllOthers);
// router.delete("/:id", deleteOthers);
// router.get("/:id", getSingleOthers);
// router.put("/:id", updateOthers);

// router.post("/fornext", createForNext);
// router.get("/fornext", getAllForNext);
// router.delete("/fornext/:id", deleteForNext);
// router.get("/fornext/:id", getSingleForNext);
// router.put("/fornext/:id", updateForNext);

// module.exports = router;
const express = require("express");
const {
  createOthers,
  getAllOthers,
  deleteOthers,
  getSingleOthers,
  updateOthers,
  createForNext,
  getAllForNext,
  deleteForNext,
  getSingleForNext,
  updateForNext,
} = require("../controllers/otherController");

const router = express.Router();

/* ---------- ForNext Routes FIRST ---------- */

router.post("/fornext", createForNext);
router.get("/fornext", getAllForNext);
router.get("/fornext/:id", getSingleForNext);
router.put("/fornext/:id", updateForNext);
router.delete("/fornext/:id", deleteForNext);

/* ---------- Others Routes ---------- */

router.post("/", createOthers);
router.get("/", getAllOthers);
router.get("/:id", getSingleOthers);
router.put("/:id", updateOthers);
router.delete("/:id", deleteOthers);

module.exports = router;