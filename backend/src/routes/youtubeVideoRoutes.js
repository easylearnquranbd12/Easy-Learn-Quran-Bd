const express = require("express");
const { 
  getAllMedia,
  getActiveMedia,
  createMedia,
  updateMedia,
  deleteMedia
} = require("../Controllers/youtubeVideoController");

const router = express.Router();

// Get all media items
router.get("/", getAllMedia);

// Get active media
router.get("/active", getActiveMedia);

// Create media
router.post("/", createMedia);
router.post("/upload-media", createMedia); // Add this for backward compatibility

// Update media
router.put("/:id", updateMedia);

// Delete media
router.delete("/:id", deleteMedia);

module.exports = router;