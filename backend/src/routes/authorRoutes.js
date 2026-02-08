const express = require("express");
const { getAllAuthors, createAuthor, deleteAuthor } = require("../controllers/authorController");


const router = express.Router();


router.get("/", getAllAuthors);
router.post("/", createAuthor);
router.delete("/:id", deleteAuthor);

module.exports = router;
