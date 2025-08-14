const express = require("express");
const { getAllImageAndText, getImageAndTextById, createImageAndText, updateImageAndText, deleteImageAndText } = require("../Controllers/imageandtextController");


const router = express.Router();

router.get("/", getAllImageAndText);
router.get("/:id", getImageAndTextById);
router.post("/", createImageAndText);
router.put("/:id", updateImageAndText);
router.delete("/:id", deleteImageAndText);

module.exports = router ;
