const express = require("express");
const { getAllPromotions, createPromotion, deletePromotion } = require("../Controllers/promotionController");
const router = express.Router();


// Get all promotions
router.get("/", getAllPromotions);

// Create new promotion
router.post("/", createPromotion);

// Delete promotion
router.delete("/:id", deletePromotion);

module.exports = router;
