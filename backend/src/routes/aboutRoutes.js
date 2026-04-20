const express = require("express");

const { createAboutPage, getAllAboutPages, getAboutPageById, deleteAboutPage, updateAboutPage } = require("../controllers/aboutController");
const router = express.Router();

router.post("/about", createAboutPage);
router.get("/about", getAllAboutPages);
router.get("/about/:id", getAboutPageById);
router.delete("/about/:id", deleteAboutPage);
router.put("/about/:id", updateAboutPage);
module.exports = router;
