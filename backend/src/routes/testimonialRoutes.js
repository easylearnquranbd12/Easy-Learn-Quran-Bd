const express = require("express");
const { getAllAuthors, createAuthor, deleteAuthor } = require("../Controllers/testimonialController");



const router = express.Router();


router.get("/", getAllAuthors);
router.post("/", createAuthor);
router.delete("/:id", deleteAuthor);

module.exports = router;
