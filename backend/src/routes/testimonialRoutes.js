const express = require("express");
const {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  deleteTestimonial,
  updateTestimonial,
  createfaq,
  getAllFaq,
  deleteFaq,
} = require("../controllers/testimonialController");

const router = express.Router();

router.post("/", createTestimonial);
router.get("/", getAllTestimonials);
router.get("/:id", getTestimonialById);
router.delete("/:id", deleteTestimonial);
router.put("/:id", updateTestimonial);


module.exports = router;
