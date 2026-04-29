const express = require("express");
const { createFaqs, getAllFaqs, deleteFaqs } = require("../controllers/faqController");


const router = express.Router();


router.post("/", createFaqs);
router.get("/", getAllFaqs);
router.delete("/:id", deleteFaqs);

module.exports = router;
